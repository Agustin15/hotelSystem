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

    public function POST() {}

    public function PUT() {}

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
}
