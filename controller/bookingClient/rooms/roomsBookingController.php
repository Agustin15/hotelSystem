<?php

require_once("../../config/connection.php");
require("../../model/room.php");


class roomsBookingController
{

    private $rooms;

    public function __construct()
    {

        $this->rooms = new Room();
    }

    public function POST($req)
    {

        $roomsBooking = $req['rooms'];
        $connection = new Connection();

        $error = null;
        foreach ($roomsBooking as $roomBooking) {
            try {

                $connection->connect()->begin_transaction();

                $resultRoomAdded =  $this->rooms->addRoomBooking(
                    $req['idBooking'],
                    $req['client'],
                    $roomBooking['numRoom'],
                    $req['startBooking'],
                    $req['endBooking'],
                    $roomBooking['adults'],
                    $roomBooking['childs']
                );

                if ($resultRoomAdded) {
                    $connection->connect()->commit();
                }
            } catch (Throwable $th) {
                $error = $th;
                $connection->connect()->rollback();
                return array("error" => $th->getMessage(), "status" => 502);
            } finally {
                $connection->closeConnection();
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

                $bookingsFreeRoom = $this->rooms->getAllRoomsAvailablesByDateAndNumRoom(
                    $req['dataBooking']["startBooking"],
                    $req['dataBooking']["endBooking"],
                    $roomCategory["numRoom"]
                );
                $allBookingsRoom  = $this->rooms->roomsBookingByNumRoom($roomCategory["numRoom"]);

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
