<?php

require_once("../conexion/conexion.php");
require("../model/claseHabitaciones.php");
require(__DIR__ . "./../authToken.php");


class roomsBookingController
{

    private $rooms, $authToken;

    public function __construct()
    {

        $this->rooms = new habitaciones();
        $this->authToken = new authToken();
    }

    public function POST($req)
    {

        $roomsBooking = $req['rooms'];
        $conexion = new conexion();

        $error = null;
        foreach ($roomsBooking as $roomBooking) {
            try {
                $tokenVerify = $this->authToken->verifyToken();
                if (isset($tokenVerify["error"])) {
                    throw new Error($tokenVerify["error"]);
                }
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

    public function PUT() {}

    public function DELETE($req)
    {

        $roomsToDelete = $req['rooms'];
        $idBooking = $req['idBooking'];
        $errorDeleteQuery = null;
        $conexion = new conexion();
        foreach ($roomsToDelete as $roomToDelete) {

            try {

                $tokenVerify = $this->authToken->verifyToken();
                if (isset($tokenVerify["error"])) {
                    throw new Error($tokenVerify["error"]);
                }
                $conexion->conectar()->begin_transaction();
                $this->rooms->deleteHabitacionReserva($idBooking, $roomToDelete);
                $conexion->conectar()->commit();
            } catch (Throwable $th) {
                $errorDeleteQuery = $th;
                $conexion->conectar()->rollback();
                return array("error" => $th->getMessage(), "status" => 404);
            } finally {

                $conexion->cerrarConexion();
            }
        }

        if (!$errorDeleteQuery) {
            return array("response" => true);
        }
    }

    public function getDashboardGraphic($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }

            $allRoomsReserved = $this->rooms->getAllHabitacionesReservadasYear($req['year'])->fetch_all(MYSQLI_ASSOC);

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
    }


    public function getItemDataDashboard()
    {

        try {

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
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
    }



    public function getDataRoomsBooking($req)
    {

        try {
            $idBooking = $req['idBooking'];
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }

            $roomsDetailsBooking = $this->rooms->getHabitaciones($idBooking)->fetch_all(MYSQLI_ASSOC);
            return  array_values($roomsDetailsBooking);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getRoomsBookingAndDetails($req)
    {
        try {
            $idBooking = $req['idBooking'];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $roomsBookingDetails = $this->rooms->roomsBookingAndDetails($idBooking);
            $roomsDetailsBooking =  array_map(function ($room) {

                return array(
                    "category" => $room["categoria"],
                    "numRoom" => $room["numHabitacion"],
                    "icon" => base64_encode($room["imagenDos"]),
                    "priceRoom" => $room["precio"],
                    "status" => "Actual",
                    "adults" => $room["adultos"],
                    "childs" => $room["ninos"],


                );
            }, $roomsBookingDetails);
            return  array_values($roomsDetailsBooking);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }




    public function getDataRoomsBookingAndCategory($req)
    {

        try {
            $idBooking = $req['idBooking'];
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
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
    }

    public function getRoomsFreeCategory($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
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

    public function verifyStateRoomsToBooking($req)
    {

        try {
            $dataBookingToUpdate = $req["dataBookingToUpdate"];
            $roomsToBooking = $dataBookingToUpdate["roomsToBooking"];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }


            $roomsToBookingAvailables = array_filter($roomsToBooking, function ($roomToBooking) use ($dataBookingToUpdate) {

                $allBookingsAvailableRoomDistinctIdBooking =   $this->rooms->getAllRoomBookingAvailableDistinctIdBooking(
                    $dataBookingToUpdate["startBooking"],
                    $dataBookingToUpdate["endBooking"],
                    $roomToBooking,
                    $dataBookingToUpdate["idBooking"]
                );

                $allBookingsRoomDistinctIdBooking =   $this->rooms->allBookingsRoomDistinctIdBooking(
                    $roomToBooking,
                    $dataBookingToUpdate["idBooking"]
                );

                if (count($allBookingsRoomDistinctIdBooking) == 0 || (count($allBookingsRoomDistinctIdBooking) == count($allBookingsAvailableRoomDistinctIdBooking))) {
                    return $roomToBooking;
                }
            });
            return $roomsToBookingAvailables;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getAllYearsWithRoomsBooking($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $years = $this->rooms->getAllYearsWithRoomsBooking();
            return $years;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getAllBookingsByRoomAndYearLimit($req)
    {
        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            if ($req["index"] == 0) {
                $bookingsRoom = $this->rooms->getFirstsBookingsByRoomAndYear($req["numRoom"], $req["year"]);
            } else {
                $bookingsRoom = $this->rooms->getAllBookingsByRoomAndYearLimit($req["numRoom"], $req["year"], $req["index"]);
            }
            return $bookingsRoom;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getAllBookingsByRoomAndYear($req)
    {
        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $bookingsRoom = $this->rooms->getAllBookingsByRoomAndYear($req["numRoom"], $req["year"]);
            return $bookingsRoom;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
