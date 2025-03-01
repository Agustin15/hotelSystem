<?php
require("../../model/service.php");
require_once("../../config/connection.php");
require(__DIR__ . "./../authToken.php");

class servicesController
{

    private $service, $authToken, $connection;
    public function __construct()
    {

        $this->service = new Service();
        $this->connection = new Connection();
        $this->authToken = new authToken();
    }

    public function POST() {}

    public function PUT($req)
    {

        $option = $req["option"];
        $serviceUpdated = null;
        $error = false;

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }

            switch ($option) {

                case "updateStockProductByServiceToRoom":

                    $productsToUpdateStock =  $req["products"];

                    foreach ($productsToUpdateStock as $product) {

                        try {

                            $this->connection->connect()->begin_transaction();
                            $serviceFinded =  $this->service->getServiceHotelByIdService($product["idService"]);
                            if ($serviceFinded) {

                                $newMaxStock = $serviceFinded["maxStock"] -  $product["quantity"];

                                $resultServiceUpdated = $this->service->updateMaxStockServiceHotel(
                                    $newMaxStock,
                                    $product["idService"]
                                );
                                if ($resultServiceUpdated) {
                                    $this->connection->connect()->commit();
                                } else {
                                    $error = true;
                                    throw new Error("No se pudo actualizar el servicio");
                                }
                            } else {
                                $error = true;
                                throw new Error("No se pudo encontrar el servicio");
                            }
                        } catch (Throwable $th) {
                            throw $th;
                            $this->connection->connect()->rollback();
                        }
                    }
                    if (!$error) {
                        $serviceUpdated = true;
                    }

                    break;

                case "updateStockOneService":

                    $serviceUpdated = $this->service->updateMaxStockServiceHotel(
                        $req["newMaxStock"],
                        $req["idService"]
                    );
                    break;
            }

            return $serviceUpdated;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }


    public function DELETE() {}

    public function getAllServicesHotel($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $servicesHotel = $this->service->getAllServicesHotel();

            if (count($servicesHotel) > 0) {
                $servicesHotel = array_map(function ($service) {
                    $service["imagen"] = base64_encode($service["imagen"]);
                    return $service;
                }, $servicesHotel);
            }
            return $servicesHotel;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
    public function getServiceByName($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $serviceFind = $this->service->getServiceByName($req["nameService"]);
            if ($serviceFind) {
                $serviceFind = array_map(function ($service) {
                    $service["imagen"] = base64_encode($service["imagen"]);
                    return $service;
                }, $serviceFind);
                return $serviceFind;
            } else {
                throw new Error("Ups,no se encontro el servicio");
            }
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
