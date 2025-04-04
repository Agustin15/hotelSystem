<?php

require_once("../../config/connection.php");
require("../../model/room.php");
require("../../model/service.php");
require_once(__DIR__ . "../../authToken.php");


class roomsBookingController
{

    private $rooms, $service, $authToken;

    public function __construct()
    {

        $this->rooms = new Room();
        $this->service = new Service();
        $this->authToken = new authToken();
    }

    public function POST($idBooking, $idClient, $roomsBooking, $startBooking, $endBooking)
    {
        $error = false;
        try {
            foreach ($roomsBooking as $roomBooking) {

                $resultRoomAdded =  $this->rooms->addRoomBooking(
                    $idBooking,
                    $idClient,
                    $roomBooking['numRoom'],
                    $startBooking,
                    $endBooking,
                    $roomBooking['adults'],
                    $roomBooking['childs']
                );

                if (!$resultRoomAdded) {
                    $error = true;
                }
            }

            if ($error == TRUE) {

                throw new Error("Error al agregar las habitaciones");
            } else {
                return true;
            }
        } catch (Throwable $th) {

            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

    public function PUT($roomsToUpdate, $idBooking, $idClient, $startDate, $endDate)
    {

        try {

            $error = false;
            foreach ($roomsToUpdate as $room) {

                $resultUpdated = $this->rooms->updateRoomBooking(
                    $idBooking,
                    $idClient,
                    $room['numRoom'],
                    $startDate,
                    $endDate,
                    $room['adults'],
                    $room['childs']
                );

                if (!$resultUpdated) {
                    $error = true;
                }
            }

            if ($error) {
                throw new Error("Error, no se pudieron actualizar las habitaciones");
            }
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }
    public function DELETE($idBooking, $roomsToDelete)
    {

        $errorDelete = false;
        try {

            foreach ($roomsToDelete as $roomToDelete) {

                $deleteRoomOfBooking = $this->rooms->deleteRoomByIdBookingAndNumRoom(
                    $idBooking,
                    $roomToDelete["numHabitacionReservada"]
                );

                if (!$deleteRoomOfBooking) {
                    $errorDelete = true;
                }
            }

            if ($errorDelete == true) {

                throw new Error("Error, no se pudo eliminar la habitacion reservada");
            } else {
                return true;
            }
        } catch (Throwable $th) {

            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function findRoomsToDeleteInCart($idBooking, $roomsCart)
    {

        try {

            $roomsOfBooking = $this->findRoomsByIdBooking($idBooking);

            if (isset($roomsOfBooking["error"])) {
                throw new Error("Error, no se pudo buscar las habitaciones de la reserva");
            }

            $roomsToDelete = array_filter($roomsOfBooking, function ($roomOfBooking) use ($roomsCart, $idBooking) {

                $roomNotInCart = $this->roomBookingNotInCart($roomsCart, $roomOfBooking["numHabitacionReservada"]);
                if ($roomNotInCart == true) {
                    return array("idBooking" => $idBooking, "numRoom" => $roomOfBooking["numHabitacionReservada"]);
                }
            });

            return  array_values($roomsToDelete);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }



    public function findRoomsToUpdateInCart($idBooking, $idClient, $startBooking, $endBooking, $roomsCart)
    {

        try {

            $roomsOfBooking = $this->findRoomsByIdBooking($idBooking);

            if (isset($roomsOfBooking["error"])) {
                throw new Error("Error, no se pudo buscar las habitaciones de la reserva");
            }

            $roomsToUpdate = array_filter($roomsCart, function ($roomCart) use (
                $roomsOfBooking,
                $idBooking,
                $idClient,
                $startBooking,
                $endBooking,
            ) {

                $roomInBooking = $this->roomCartInBookingRooms($roomsOfBooking, $roomCart["numRoom"]);
                if ($roomInBooking == true) {
                    return array(
                        "idBooking" => $idBooking,
                        "idClient" => $idClient,
                        "numRoom" => $roomCart["numRoom"],
                        "startBooking" => $startBooking,
                        "endBooking" => $endBooking,
                        "adults" => $roomCart["adults"],
                        "childs" => $roomCart["childs"],
                    );
                }
            });

            return  array_values($roomsToUpdate);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function findRoomsToAddInCart($idBooking, $idClient, $startBooking, $endBooking, $roomsCart)
    {
        try {

            $roomsOfBooking = $this->findRoomsByIdBooking($idBooking);

            if (isset($roomsOfBooking["error"])) {
                throw new Error("Error, no se pudo buscar las habitaciones de la reserva");
            }

            $roomsOfBooking  = array_map(function ($roomOfBooking) {
                return array("numHabitacionReservada" => $roomOfBooking["numHabitacionReservada"]);
            }, $roomsOfBooking);

            $roomsToAdd = array_filter($roomsCart, function ($roomCart) use (
                $idBooking,
                $idClient,
                $startBooking,
                $endBooking,
                $roomsOfBooking,
            ) {

                $roomInCart = $this->roomCartInBookingRooms($roomsOfBooking, $roomCart["numRoom"]);
                if (!$roomInCart) {
                    return array(
                        "idBooking" => $idBooking,
                        "idClient" => $idClient,
                        "numRoom" => $roomCart["numRoom"],
                        "startBooking" => $startBooking,
                        "endBooking" => $endBooking,
                        "adults" => $roomCart["adults"],
                        "childs" => $roomCart["childs"],
                    );
                }
            });

            return array_values($roomsToAdd);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function roomBookingNotInCart($roomsCart, $numRoomBooking)
    {
        $roomsOfCart = array_map(function ($roomCart) {
            return array("numRoom" => $roomCart["numRoom"]);
        }, $roomsCart);

        $roomNotInCart = true;
        foreach ($roomsOfCart as $roomOfCart) {
            $keyRoom = array_search($numRoomBooking, $roomOfCart);
            if ($keyRoom) {
                $roomNotInCart = false;
                break;
            }
        }
        return $roomNotInCart;
    }


    public function roomCartInBookingRooms($roomsOfBooking, $numRoomCart)
    {


        $roomInCart = false;
        foreach ($roomsOfBooking as $roomOfBooking) {
            $keyRoom = array_search($numRoomCart, $roomOfBooking);
            if ($keyRoom) {
                $roomInCart = true;
                break;
            }
        }
        return $roomInCart;
    }

    public function getDashboardGraphic($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }

            $allRoomsReserved = $this->rooms->getAllRoomsBookingByYear($req['year'])->fetch_all(MYSQLI_ASSOC);

            $quantityCategorysRoomsReserved = array_map(function ($categoryRoom) use ($allRoomsReserved) {

                $categoryRoomsReserved = array_filter($allRoomsReserved, function ($roomReserved)
                use ($categoryRoom) {

                    $dataRoomReserved = $this->rooms->getCategoryByNumRoom($roomReserved['numHabitacionReservada'])->fetch_array(MYSQLI_ASSOC);
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
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $categoryRooms = $this->rooms->getAllCategoryRooms();

            $dataCategoryRooms = array_map(function ($categoryRoom) {
                $totalRoomCategory = count($this->rooms->getRoomsByCategory($categoryRoom['categoria']));

                $roomsCategory = $this->rooms->getRoomsByCategory($categoryRoom['categoria']);

                $totalRoomCategoryBusy = array_reduce($roomsCategory, function ($ac, $roomCategory) {

                    $today = date("Y-m-d");
                    $habitacionOcupada = $this->rooms->getStateRoomByNumRoomAndDate($roomCategory['numHabitacion'], $today);

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

    public function getBookingByRoomReserved($req)
    {
        try {

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $bookingRoomBusy = $this->rooms->getStateRoomByNumRoomAndDate($req["numRoom"], date("Y-m-d"));
            return $bookingRoomBusy;
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
                return array("error" => $tokenVerify["error"], "status" => 401);
            }

            $roomsDetailsBooking = $this->rooms->getAllRoomsByIdBooking($idBooking)->fetch_all(MYSQLI_ASSOC);
            return  array_values($roomsDetailsBooking);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function findRoomsByIdBooking($idBooking)
    {

        try {

            $roomsOfBooking = $this->rooms->getAllRoomsByIdBooking($idBooking)->fetch_all(MYSQLI_ASSOC);
            return $roomsOfBooking;
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
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $roomsBookingDetails = $this->rooms->roomsBookingAndDetails($idBooking);
            $roomsDetailsBooking =  array_map(function ($room) use ($idBooking) {

                $dataBookingRoom = array(
                    "category" => $room["categoria"],
                    "numRoom" => $room["numHabitacion"],
                    "icon" => base64_encode($room["imagenDos"]),
                    "priceRoom" => $room["precio"],
                    "status" => "Actual",
                    "adults" => $room["adultos"],
                    "childs" => $room["ninos"],

                );

                $serviceRoomFound = $this->service->getDetailsServicesByCurrentBookingRoom($room["numHabitacion"], $idBooking);

                if (count($serviceRoomFound) > 0) {

                    $amountService = array_reduce($serviceRoomFound, function ($ac, $service) {
                        return $ac += $service["cantidad"] * $service["precio"];
                    }, 0);

                    if ($amountService > 0) $dataBookingRoom["amountServiceRoom"] = $amountService;
                }
                return $dataBookingRoom;
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
                return array("error" => $tokenVerify["error"], "status" => 401);
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
                return array("error" => $tokenVerify["error"], "status" => 401);
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

    public function verifyStateRoomsToBooking($req)
    {

        try {
            $dataBookingToUpdate = $req["dataBookingToUpdate"];
            $roomsToBooking = $dataBookingToUpdate["roomsToBooking"];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }


            $roomsToBookingAvailables = array_filter($roomsToBooking, function ($roomToBooking) use ($dataBookingToUpdate) {

                $allBookingsAvailableRoomDistinctIdBooking =   $this->rooms->getAllBookingRoomAvailableDistinctIdBooking(
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
                return array("error" => $tokenVerify["error"], "status" => 401);
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
                return array("error" => $tokenVerify["error"], "status" => 401);
            }

            $bookingsRoom = $this->rooms->getAllBookingsByRoomAndYearLimit($req["numRoom"], $req["year"], $req["index"]);

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
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $bookingsRoom = $this->rooms->getAllBookingsByRoomAndYear($req["numRoom"], $req["year"]);
            return $bookingsRoom;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getNextBookingsRoom($req)
    {
        try {

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $nextBookingsRoom =  $this->rooms->getNextBookingsRoom($req["numRoom"]);
            return $nextBookingsRoom;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
