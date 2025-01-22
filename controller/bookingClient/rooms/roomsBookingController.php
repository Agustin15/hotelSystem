<?php

require_once("../../conexion/conexion.php");
require("../../model/claseHabitaciones.php");


class roomsBookingController
{

    private $rooms;

    public function __construct()
    {

        $this->rooms = new habitaciones();
    }

    public function POST($req)
    {

        $roomsBooking = $req['rooms'];
        $conexion = new conexion();

        $error = null;
        foreach ($roomsBooking as $roomBooking) {
            try {

                $conexion->conectar()->begin_transaction();

                $resultRoomAdded =  $this->rooms->setHabitacionReservada(
                    $req['idBooking'],
                    $req['client'],
                    $roomBooking['numRoom'],
                    $req['startBooking'],
                    $req['endBooking'],
                    $roomBooking['adults'],
                    $roomBooking['childs']
                );

                if ($resultRoomAdded) {
                    $conexion->conectar()->commit();
                }
            } catch (Throwable $th) {
                $error = $th;
                $conexion->conectar()->rollback();
                return array("error" => $th->getMessage(), "status" => 502);
            } finally {
                $conexion->cerrarConexion();
            }
        }

        if (!$error) {

            return array("response" => true);
        }
    }


    public function getRoomsFreeCategory($req)
    {

        try {

            $allRoomsCategory = $this->rooms->getAllRoomsHotelWithDetails($req['dataBooking']["category"]);

            $allRoomsCategory =  array_map(function ($room) {

                return array(
                    "category" => $room["categoria"],
                    "numRoom" => $room["numHabitacion"],
                    "icon" => base64_encode($room["imagenDos"]),
                    "price" => $room["precio"],
                    "capacity" => $room["capacidad"]
                );
            }, $allRoomsCategory);

            $roomsFreeCategory  = array_filter($allRoomsCategory, function ($roomCategory) use ($req) {

                $bookingsFreeRoom = $this->rooms->getHabitacionDisponible(
                    $req['dataBooking']["startBooking"],
                    $req['dataBooking']["endBooking"],
                    $roomCategory["numRoom"]
                );
                $allBookingsRoom  = $this->rooms->habitacionesReservadas($roomCategory["numRoom"]);

                if (count($allBookingsRoom) == 0  || count($bookingsFreeRoom) == count($allBookingsRoom)) {

                    return $roomCategory;
                }
            });

            return array_values($roomsFreeCategory);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
