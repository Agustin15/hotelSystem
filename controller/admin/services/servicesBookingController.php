<?php
require("../../model/service.php");
require_once("../../config/connection.php");
require(__DIR__ . "./../authToken.php");

class servicesBookingController
{

    private $service, $authToken, $connection;
    public function __construct()
    {

        $this->service = new Service();
        $this->connection = new Connection();
        $this->authToken = new authToken();
    }

    public function POST($req)
    {

        try {
            $option = $req["option"];
            $idBooking = $req["idBooking"];
            $numRoom = $req["numRoom"];
            $serviceAdded =  null;
            $error =  false;

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }

            if ($option == "minibar" || $option == "cantina") {
                $products = $req["products"];
                foreach ($products as $product) {
                    try {

                        $this->connection->connect()->begin_transaction();
                        $resultServiceAdded =  $this->service->addServiceBooking(
                            $product["idService"],
                            $product["quantity"],
                            $idBooking,
                            $numRoom
                        );

                        if ($resultServiceAdded) {
                            $this->connection->connect()->commit();
                        } else {
                            throw new Error("No se pudo agregar el servicio a la habitacion");
                        }
                    } catch (Throwable $th) {
                        $error = true;
                        $this->connection->connect()->rollback();
                        throw $th;
                    }
                }

                if (!$error) {
                    $serviceAdded = true;
                }
            } else {
                $idService = $req["idService"];
                $quantity = $req["quantity"];
                $serviceAdded =  $this->service->addServiceBooking($idService, $quantity, $idBooking, $numRoom);
            }

            return $serviceAdded;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }

    public function PUT($req)
    {

        try {
            $option = $req["option"];
            $serviceUpdated = null;
            $error = false;

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }

            if ($option == "minibar" || $option == "cantina") {
                $products = $req["products"];
                foreach ($products as $product) {
                    try {

                        $this->connection->connect()->begin_transaction();
                        $resultServiceUpdated =  $this->service->updateQuantityServiceBooking(
                            $product["newQuantity"],
                            $product["idServiceRoom"],
                        );

                        if ($resultServiceUpdated) {
                            $this->connection->connect()->commit();
                        } else {
                            throw new Error("No se pudo actualizar el servicio a la habitacion");
                        }
                    } catch (Throwable $th) {
                        $error = true;
                        $this->connection->connect()->rollback();
                        throw $th;
                    }
                }

                if (!$error) {
                    $serviceUpdated = true;
                }
            } else {
                $idServiceRoom = $req["idServiceRoom"];
                $quantity = $req["newQuantity"];
                $serviceUpdated =   $this->service->updateQuantityServiceBooking(
                    $quantity,
                    $idServiceRoom,
                );
            }


            return $serviceUpdated;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }

    public function DELETE() {}

    public function getServicesBooking($req)
    {

        try {
            $idBooking = $req['idBooking'];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $bookingServices = $this->service->getServicesByIdBookingWithDetails($idBooking)->fetch_all(MYSQLI_ASSOC);

            if (count($bookingServices) > 0) {
                $bookingServicesDetails = array_map(function ($service) {

                    return array(
                        "name" => $service['nombreServicio'],
                        "description" => $service['descripcionServicio'],
                        "icon" => base64_encode($service['imagen']),
                        "room" => $service['numHabitacionServicio']
                    );
                }, $bookingServices);

                return $bookingServicesDetails;
            }
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getHistoryServicesByCurrentBookingRoom($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
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


    public function getServiceByIdAndNumRoomAndBooking($req)
    {
        try {

            $idService = $req["serviceToAdd"]["idService"];
            $idBooking = $req["serviceToAdd"]["idBooking"];
            $numRoom = $req["serviceToAdd"]["numRoom"];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $serviceFind = $this->service->getServiceByIdAndNumRoomAndBooking($idService, $idBooking, $numRoom);
            return $serviceFind;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function returnStatesOfProductsServices($req)
    {
        try {

            $products = $req["products"];
            $idBooking = $req["idBooking"];
            $numRoom = $req["numRoom"];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }

            $productsState = array_map(function ($product) use ($idBooking, $numRoom) {

                $serviceFind = $this->service->getServiceByIdAndNumRoomAndBooking(
                    $product["idService"],
                    $idBooking,
                    $numRoom
                );
                if ($serviceFind) {
                    $product["state"] = "toUpdate";
                } else {
                    $product["state"] = "toAdd";
                }

                return $product;
            }, $products);

            return $productsState;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
