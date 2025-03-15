<?php
require_once("../../model/service.php");
require_once(__DIR__ . "./../authToken.php");

class servicesController
{

    private $service, $authToken;
    public function __construct()
    {

        $this->service = new Service();
        $this->authToken = new authToken();
    }

    public function POST($req)
    {

        $nameService = $req["name"];
        $priceService = $req["price"];
        $descriptionService = $req["description"];
        $iconService = $req["image"];
        $maxStock  = $req["stock"];

        try {

            $serviceFound = $this->findProductByDescription($descriptionService, $nameService);

            if (isset($serviceFound["error"])) {
                throw new Error($serviceFound["error"]);
            }

            if ($serviceFound) {
                throw new Error("Producto ya existente");
            }

            $serviceUpdated = $this->service->addServiceHotel(
                $nameService,
                $descriptionService,
                $priceService,
                $iconService,
                $maxStock,
            );

            return $serviceUpdated;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }




    public function PUT($req)
    {


        try {
            $nameService = $req["name"];
            $idService = $req["idService"];
            $priceService = $req["price"];
            $descriptionService = $req["description"];
            $iconService = $req["image"];
            $maxStock  = $req["stock"];


            if ($nameService == "Minibar" || $nameService == "Cantina") {
                $serviceFound = $this->findProductByDescriptionAndDistinctId($descriptionService, $nameService, $idService);

                if (isset($serviceFound["error"])) {
                    throw new Error($serviceFound["error"]);
                }

                if ($serviceFound) {
                    throw new Error("Producto ya existente");
                }
            }


            $serviceUpdated = $this->service->updateServiceHotel(
                $nameService,
                $descriptionService,
                $priceService,
                $iconService,
                $maxStock,
                $idService
            );

            return $serviceUpdated;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

    public function PATCHmaxStock($idService, $newMaxStock)
    {
        try {
            $maxStockUpdated = $this->service->updateMaxStockServiceHotel($newMaxStock, $idService);
            return $maxStockUpdated;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

    public function DELETE($req)
    {

        try {

            $idService = $req["idService"];
            $serviceDeleted = $this->service->deleteService($idService);
            return $serviceDeleted;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

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

    public function findServiceById($idService)
    {
        try {
            $serviceFound = $this->service->getServiceHotelByIdService($idService);
            $serviceFound["imagen"] = null;
            if (!isset($serviceFound)) {
                throw new Error("Error, no se pudo encontrar el servicio");
            }
            return $serviceFound;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
    public function findServiceByName($nameService)
    {
        try {
            $serviceFound = $this->service->getServiceByName($nameService);
            if (!isset($serviceFound)) {
                throw new Error("Error, no se pudo encontrar el servicio");
            }
            $serviceFound[0]["imagen"] = null;
            return $serviceFound[0];
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function findProductByDescription($descriptionService, $nameService)
    {
        try {
            $serviceFound = $this->service->getServiceByDescription($descriptionService, $nameService);

            if ($serviceFound) {
                $serviceFound["imagen"] = null;
            }

            return $serviceFound;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function findProductByDescriptionAndDistinctId($descriptionService, $nameService, $idService)
    {
        try {
            $serviceFound = $this->service->getProductByDescriptionWithDistinctId($descriptionService, $nameService, $idService);

            if ($serviceFound) {
                $serviceFound["imagen"] = null;
            }


            return $serviceFound;
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
    public function getServiceByNameLimitIndex($req)
    {

        try {

            $nameService = $req["nameService"];
            $index = $req["index"];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $serviceFind = $this->service->getServiceByNameLimitIndex($nameService, $index);
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
