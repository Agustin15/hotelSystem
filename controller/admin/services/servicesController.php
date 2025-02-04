<?php
require("../../model/claseServicios.php");
require(__DIR__ . "./../authToken.php");

class servicesController
{

    private $service, $authToken;
    public function __construct()
    {

        $this->service = new servicio();
        $this->authToken = new authToken();
    }

    public function POST($req)
    {

        try {
            $idService = $req["idService"];
            $quantity = $req["quantity"];
            $idBooking = $req["idBooking"];
            $numRoom = $req["numRoom"];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }

            $serviceAdded =  $this->service->addServiceBooking($idService, $quantity, $idBooking, $numRoom);
            return $serviceAdded;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }

    public function PUT($req)
    {

        try {
            $idServiceRoom = $req["idServiceRoom"];
            $quantity = $req["newQuantity"];
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $serviceUpdated =  $this->service->updateServiceBooking($quantity, $idServiceRoom);
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


    public function getAllServicesHotel($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
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
                throw new Error($tokenVerify["error"]);
            }
            $serviceFind = $this->service->getServiceByName($req["nameService"]);
            if ($serviceFind) {
                $serviceFind["imagen"] = base64_encode($serviceFind["imagen"]);
                return $serviceFind;
            } else {
                throw new Error("Ups,no se encontro el servicio");
            }
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
}
