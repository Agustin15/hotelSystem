<?php
require("../../../model/claseServicios.php");
$service = new servicio();

$request = null;

switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":

        $option = $_GET['option'];

        switch ($option) {
            case "getServicesBooking":

                $idBooking = $_GET['idBooking'];
                $bookingServices = $service->getServicesByIdBookingWithDetails($idBooking)->fetch_all(MYSQLI_ASSOC);

                if (count($bookingServices) > 0) {
                    $bookingServicesDetails = array_map(function ($service) {

                        return array(
                            "name" => $service['nombreServicio'],
                            "description" => $service['descripcionServicio'],
                            "icon" => base64_encode($service['imagen']),
                            "room" => $service['numHabitacionServicio']
                        );
                    }, $bookingServices);

                    $request = $bookingServicesDetails;
                }
                break;
        }

        echo json_encode($request);
        break;
}
