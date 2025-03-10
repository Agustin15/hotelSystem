<?php

require("../../controller/bookingClient/rooms/roomsBookingController.php");

$roomsBookingController = new roomsBookingController();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$req;

if (isset($_GET['params'])) {
    $req = json_decode($_GET['params'], true);
} else {
    $req = json_decode(file_get_contents("php://input"), true);
}

$routes = [
    "GET" => function () use ($roomsBookingController, $req) {
        $optionGet = match ($req["option"]) {

            "roomsFreeCategory" => $roomsBookingController->getRoomsFreeCategory($req),
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
