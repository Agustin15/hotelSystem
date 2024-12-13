<?php

require_once("../conexion/conexion.php");

require("../model/claseHabitaciones.php");



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
                return array("error" => $th->getMessage(), "status" => 502);
            } finally {
                $conexion->cerrarConexion();
            }
        }

        if (!$error) {

            return array("response" => true);
        }
    }

    public function PUT() {}

    public function DELETE() {}

    public function GET($req)
    {

        if (empty($req['option'])) {
            return array("error" => "Undefined variable option", "status" => 404);
        } else {
            $option = $req['option'];
            switch ($option) {
                case "dashboardGraphic":

                    try {
                        $allRoomsReserved = $this->rooms->getAllHabitacionesReservadasYear(date("Y"))->fetch_all(MYSQLI_ASSOC);

                        $quantityCategorysRoomsReserved = array_map(function ($categoryRoom) use ($allRoomsReserved) {

                            $categoryRoomsReserved = array_filter($allRoomsReserved, function ($roomReserved)
                            use ($categoryRoom) {

                                $dataRoomReserved = $this->rooms->buscarCategoriaPorNumero($roomReserved['numHabitacionReservada'])->fetch_array(MYSQLI_ASSOC);

                                return $dataRoomReserved['tipoHabitacion'] == $categoryRoom['categoria'];
                            });

                            return array('categoryRoom' => $categoryRoom['categoria'], 'quantityReserved' => count($categoryRoomsReserved));
                        }, $this->rooms->getAllCategoryRooms());


                        return array_values($quantityCategorysRoomsReserved);
                    } catch (Throwable $th) {
                        return array("error" => $th->getMessage(), "status" => 404);
                    }

                    break;

                case "itemDataDashboard":

                    try {
                        $categoryRooms = $this->rooms->getAllCategoryRooms();

                        $dataCategoryRooms = array_map(function ($categoryRoom) {
                            $totalRoomCategory = count($this->rooms->getAllHabitacionesCategoria($categoryRoom['categoria']));

                            $roomsCategory = $this->rooms->getAllHabitacionesCategoria($categoryRoom['categoria']);

                            $totalRoomCategoryBusy = array_reduce($roomsCategory, function ($ac, $roomCategory) {

                                $today = date("Y-m-d");
                                $habitacionOcupada = $this->rooms->reservasHabitacionOcupada($roomCategory['numHabitacion'], $today);

                                ($habitacionOcupada) ? $ac++ : $ac;

                                return $ac;
                            }, 0);

                            return array(
                                "category" => $categoryRoom['categoria'],
                                "totalRoomCategory" => $totalRoomCategory,
                                "totalRoomCategoryBusy" => $totalRoomCategoryBusy,
                                "totalRoomCategoryFree" => $totalRoomCategory - $totalRoomCategoryBusy
                            );
                        }, $categoryRooms);

                        return array_values($dataCategoryRooms);
                    } catch (Throwable $th) {
                        return array("error" => $th->getMessage(), "status" => 404);
                    }

                    break;

                case "getDataRoomsBooking":

                    try {
                        $idBooking = $req['idBooking'];
                        $roomsDetailsBooking = $this->rooms->getHabitaciones($idBooking)->fetch_all(MYSQLI_ASSOC);
                        return  array_values($roomsDetailsBooking);
                    } catch (Throwable $th) {
                        return array("error" => $th->getMessage(), "status" => 404);
                    }

                    break;

                case "getDataRoomsBookingAndCategory":

                    try {
                        $idBooking = $req['idBooking'];
                        $roomsDetailsBooking = $this->rooms->roomsBookingAndDetails($idBooking);

                        if (count($roomsDetailsBooking) > 0) {
                            $roomsDetailsBookingFixed = array_map(function ($room) {

                                return array(
                                    "numRoom" => $room['numHabitacionReservada'],
                                    "category" => $room['categoria'],
                                    "image" => base64_encode($room['imagenDos'])

                                );
                            }, $roomsDetailsBooking);
                            return  array_values($roomsDetailsBookingFixed);
                        }
                    } catch (Throwable $th) {
                        return array("error" => $th->getMessage(), "status" => 404);
                    }


                    break;

                case "roomsFreeCategory":

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

                    break;
            }
        }
    }
}
