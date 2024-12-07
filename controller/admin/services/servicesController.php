<?php
require("../model/claseServicios.php");


class servicesController
{

    private $service;
    public function __construct()
    {

        $this->service = new servicio();
    }

    public function POST() {}

    public function PUT() {}

    public function DELETE() {}

    public function GET($req)
    {

        $res = null;
        $option = $req['option'];

        switch ($option) {
            case "getServicesBooking":

                $idBooking = $req['idBooking'];
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

                    $res = $bookingServicesDetails;
                }
                break;
        }

        return $res;
    }
}
