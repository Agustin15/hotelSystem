<?php
require("../../model/claseServicios.php");
require("./../authToken.php");


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
}
