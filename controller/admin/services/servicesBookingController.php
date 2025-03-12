<?php
require("../../model/service.php");
require_once("../../config/connection.php");
require(__DIR__ . "./../revenues/revenuesController.php");
require(__DIR__ . "./../services/servicesController.php");
require_once(__DIR__ . "./../authToken.php");

class servicesBookingController
{

    private $service, $servicesController, $revenuesController, $authToken, $connection;
    public function __construct()
    {

        $this->service = new Service();
        $this->revenuesController = new revenuesController();
        $this->servicesController = new servicesController();
        $this->connection = Connection::getInstance()->getConnection();
        $this->authToken = new authToken();
    }

    public function POST($req)
    {

        try {
            $idBooking = $req["idBooking"];
            $numRoom = $req["numRoom"];
            $amountService = $req["amountService"];
            $option = $req["option"];

            $serviceAddedToRoom = false;

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }

            $this->connection->autocommit(FALSE);
            $this->connection->begin_transaction();

            if ($option == "minibar" || $option == "cantina") {
                $products = $req["products"];

                $serviceAdded = $this->addServiceOfMinibarOrBar($idBooking, $numRoom, $products);
                if (isset($serviceAdded["error"])) {
                    throw new Error($serviceAdded["error"]);
                } else {
                    $serviceAddedToRoom = true;
                }
            } else {
                $idService = $req["idService"];
                $quantity = $req["quantity"];

                $serviceAdded = $this->addServiceOfTelephoneOrMassage($idBooking, $idService, $numRoom, $quantity);
                if (isset($serviceAdded["error"])) {
                    throw new Error($serviceAdded["error"]);
                } else {
                    $serviceAddedToRoom = true;
                }
            }

            if ($serviceAddedToRoom == TRUE) {
                $bookingRevenueFound  = $this->revenuesController->findRevenueByIdBooking($idBooking);

                if (isset($bookingRevenueFound["error"])) {

                    throw new Error($bookingRevenueFound["error"]);
                }

                $newAmount = $bookingRevenueFound["deposito"] + $amountService;
                $amountBookingUpdated = $this->revenuesController->PUT($idBooking, $newAmount);

                if (isset($amountBookingUpdated["error"]) || !$amountBookingUpdated) {
                    throw new Error("Error, no se pudo actualizar el deposito de la reserva");
                }

                if ($amountBookingUpdated) {
                    $this->connection->commit();
                    return $amountBookingUpdated;
                }
            }
        } catch (Throwable $th) {
            $this->connection->rollback();
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }


    public function addServiceOfTelephoneOrMassage($idBooking, $idService, $numRoom, $quantity)
    {


        $serviceAddedToRoom = false;


        try {

            $serviceRoomFound = $this->findServiceByIdAndNumRoomAndBooking($idBooking, $idService, $numRoom);

            if (isset($serviceRoomFound["error"])) {

                throw new Error("Error,no se pudo encontrar el servicio de la habitacion");
            }
            if ($serviceRoomFound) {
                $newQuantity = $quantity + $serviceRoomFound["cantidad"];
                $serviceUpdated = $this->PATCHquantityServiceBooking($serviceRoomFound["idServicioHabitacion"], $newQuantity);

                if (isset($serviceUpdated["error"])) {

                    throw new Error($serviceUpdated["error"]);
                } else {

                    $serviceAddedToRoom = true;
                }
            } else {

                $serviceAddedToRoom =  $this->service->addServiceBooking($idService, $quantity, $idBooking, $numRoom);

                if (!$serviceAddedToRoom) {
                    throw new Error("Error, no se pudo agregar el servicio a la habitacion");
                } else {
                    $serviceAddedToRoom = true;
                }
            }

            return $serviceAddedToRoom;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage());
        }
    }

    public function addServiceOfMinibarOrBar($idBooking, $numRoom, $products)
    {

        $errorServiceToRoom = false;
        $serviceRoomOk = false;
        try {

            foreach ($products as $product) {

                $serviceRoomFound = $this->findServiceByIdAndNumRoomAndBooking(
                    $idBooking,
                    $product["idService"],
                    $numRoom
                );

                if (isset($serviceRoomFound["error"])) {

                    throw new Error("Error,no se pudo encontrar el servicio de la habitacion");
                }

                if ($serviceRoomFound) {

                    $newQuantity = $product["quantity"] + $serviceRoomFound["cantidad"];
                    $serviceUpdated =  $this->PATCHquantityServiceBooking(
                        $serviceRoomFound["idServicioHabitacion"],
                        $newQuantity
                    );

                    if (isset($serviceUpdated["error"])) {
                        $errorServiceToRoom = true;
                    }
                } else {

                    $resultServiceAdded =  $this->service->addServiceBooking(
                        $product["idService"],
                        $product["quantity"],
                        $idBooking,
                        $numRoom
                    );

                    if (!$resultServiceAdded) {
                        $errorServiceToRoom = true;
                    }
                }


                if ($errorServiceToRoom == FALSE) {


                    $serviceRoomHotelFound = $this->servicesController->findServiceById($product["idService"]);

                    if (isset($serviceRoomHotelFound["error"]) || !$serviceRoomHotelFound) {
                        $errorServiceToRoom = true;
                    } else {
                        $newMaxStock = $serviceRoomHotelFound["maxStock"] - $product["quantity"];
                        $serviceRoomHotelUpdated  = $this->servicesController->PATCHmaxStock($product["idService"], $newMaxStock);

                        if (isset($serviceRoomHotelUpdated["error"]) || !$serviceRoomHotelUpdated) {
                            $errorServiceToRoom = true;
                        }
                    }
                }
            }

            if ($errorServiceToRoom == TRUE) {
                throw new Error("Error, no se pudieron agregar los productos");
            } else {
                $serviceRoomOk = true;
            }

            return $serviceRoomOk;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage());
        }
    }
    public function PATCHquantityServiceBooking($idServiceRoom, $newQuantity)
    {

        try {

            $serviceToRoomUpdated = false;

            $serviceUpdated =   $this->service->updateQuantityServiceBooking(
                $newQuantity,
                $idServiceRoom,
            );

            if (!$serviceUpdated) {
                throw new Error("Error, no se pudo actualizar el servicio de la habitacion");
            } else {
                $serviceToRoomUpdated = true;
            }

            return $serviceToRoomUpdated;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }

    public function DELETE($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }

            $this->connection->autocommit(FALSE);
            $this->connection->begin_transaction();

            $idServiceRoom = $req["idServiceRoom"];

            $serviceRoomFound = $this->findServiceRoomByIdServiceRoom($idServiceRoom);

            if (isset($serviceRoomFound["error"])) {
                throw new Error($serviceRoomFound["error"]);
            }

            $resultDelete = $this->service->deleteServiceBooking($idServiceRoom);

            if (!$resultDelete) {
                throw new Error("Error, no se pudo eliminar el servicio a la habitacion");
            }

            if ($serviceRoomFound["nombreServicio"] == "Minibar" || $serviceRoomFound["nombreServicio"] == "Cantina") {

                $newMaxStock = $serviceRoomFound["maxStock"] + $serviceRoomFound["cantidad"];
                $serviceHotelUpdated =  $this->servicesController->PATCHmaxStock($serviceRoomFound["idService"], $newMaxStock);

                if (isset($serviceRoomFound["error"]) || !$serviceHotelUpdated) {
                    throw new Error("Error, no se pudo actualizar el stock del servicio");
                }
            }

            $bookingRevenueFound =  $this->revenuesController->findRevenueByIdBooking(
                $serviceRoomFound["idReservaHabitacionServicio"]
            );
            if (isset($bookingRevenueFound["error"])) {
                throw new Error($bookingRevenueFound["error"]);
            }

            $newAmount = $bookingRevenueFound["deposito"] - ($serviceRoomFound["cantidad"] * $serviceRoomFound["precio"]);
            $amountBookingUpdated = $this->revenuesController->PUT(
                $serviceRoomFound["idReservaHabitacionServicio"],
                $newAmount
            );

            if (!$amountBookingUpdated) {
                throw new Error("Error, no se pudo actualizar el deposito de la reserva");
            } else {
                $this->connection->commit();
                return $amountBookingUpdated;
            }
        } catch (Throwable $th) {
            $this->connection->rollback();
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function findServiceRoomByIdServiceRoom($idServiceRoom)
    {

        try {

            $serviceRoomFound = $this->service->getServiceRoomByIdServiceRoom($idServiceRoom);
            if (!isset($serviceRoomFound)) {
                throw new Error("Error, no pudo encontrar el servicio de la habitacion");
            }
            $serviceRoomFound["imagen"] = null;

            return $serviceRoomFound;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getServicesBooking($req)
    {

        try {
            $idBooking = $req['idBooking'];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $bookingServices = $this->service->getServicesByIdBookingWithDetails($idBooking)->fetch_all(MYSQLI_ASSOC);
            $bookingServicesDetails = array_map(function ($service) {

                $service["imagen"] = base64_encode($service["imagen"]);
                return $service;
            }, $bookingServices);

            return $bookingServicesDetails;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getHistoryServicesByCurrentBookingRoom($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $servicesCurrentRoomBooking = $this->service->getHistoryServicesByCurrentBookingRoom($req["numRoom"], $req["idBooking"]);
            $servicesCurrentRoomBooking = array_map(function ($service) {
                $service["imagen"] = base64_encode($service["imagen"]);
                return $service;
            }, $servicesCurrentRoomBooking);

            return $servicesCurrentRoomBooking;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function  getDetailsServicesByCurrentBookingRoom($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $servicesCurrentRoomBooking = $this->service->getDetailsServicesByCurrentBookingRoom($req["numRoom"], $req["idBooking"]);
            $servicesCurrentRoomBooking = array_map(function ($service) {
                $service["imagen"] = base64_encode($service["imagen"]);
                return $service;
            }, $servicesCurrentRoomBooking);

            return $servicesCurrentRoomBooking;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function findServiceByIdAndNumRoomAndBooking($idBooking, $idService, $numRoom)
    {
        try {
            $serviceFound = $this->service->getServiceByIdAndNumRoomAndBooking($idService, $idBooking, $numRoom);
            return $serviceFound;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }



    public function getServiceRoomDetailsByNumRoomAndBooking($req)
    {
        try {

            $nameService = $req["serviceToFind"]["nameService"];
            $idBooking = $req["serviceToFind"]["idBooking"];
            $numRoom = $req["serviceToFind"]["numRoom"];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $serviceDetailsRoomFound = $this->service->getServiceRoomDetailsByNumRoomAndBooking(
                $nameService,
                $idBooking,
                $numRoom
            );

            $serviceDetailsRoomFound = array_map(function ($service) {
                $service["imagen"] = base64_encode($service["imagen"]);
                return $service;
            }, $serviceDetailsRoomFound);

            return $serviceDetailsRoomFound;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
