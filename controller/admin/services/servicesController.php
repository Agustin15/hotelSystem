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

    public function POST() {}


    public function PUT($req)
    {


        try {
            $nameService = $req["name"];
            $priceService = $req["price"];
            $descriptionService = $req["description"];
            $iconService = $req["image"];

            $serviceFound = $this->findServiceByName($nameService);

            if (isset($serviceFound["error"])) {
                throw new Error($serviceFound["error"]);
            }
            $serviceUpdated = $this->service->updateServiceHotel(
                $nameService,
                $descriptionService,
                $priceService,
                $iconService,
                null,
                $serviceFound["idServicio"]
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
            $serviceFound[0]["imagen"] = null;

            if (!isset($serviceFound)) {
                throw new Error("Error, no se pudo encontrar el servicio");
            }
            return $serviceFound[0];
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
