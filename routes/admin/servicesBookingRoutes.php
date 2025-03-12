<?php

require("../../controller/admin/services/servicesBookingController.php");

$servicesBookingController = new servicesBookingController();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$req;

if (isset($_GET['params'])) {
    $req = json_decode($_GET['params'], true);
} else {
    $req = json_decode(file_get_contents("php://input"), true);
}

$routes = [
    "POST" => function () use ($servicesBookingController, $req) {
        return $servicesBookingController->POST($req);
    },
    "DELETE" => function () use ($servicesBookingController, $req) {
        return $servicesBookingController->DELETE($req);
    },
    "GET" => function () use ($servicesBookingController, $req) {

        $optionGet = match ($req["option"]) {
            "getServicesBooking" => $servicesBookingController->getServicesBooking($req),
            "getHistoryServicesByCurrentBookingRoom" => $servicesBookingController->getHistoryServicesByCurrentBookingRoom($req),
            "getDetailsServicesByCurrentBookingRoom" => $servicesBookingController->getDetailsServicesByCurrentBookingRoom($req),
            "getServiceRoomDetailsByNumRoomAndBooking" => $servicesBookingController->getServiceRoomDetailsByNumRoomAndBooking($req)
        };

        return $optionGet;
    }
];


if (array_key_exists($method, $routes)) {

    $response = $routes[$method]();

    if (isset($response["error"])) {
        http_response_code($response["status"]);
    }

    echo json_encode($response);
}
