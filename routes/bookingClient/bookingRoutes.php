<?php

require("../../controller/bookingClient/bookings/bookingController.php");


$bookingController = new bookingController();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$req;

if (isset($_GET['params'])) {
    $req = json_decode($_GET['params'], true);
} else {
    $req = json_decode(file_get_contents("php://input"), true);
}


$routes = [
    "POST" => function () use ($bookingController, $req) {
        return $bookingController->POST($req);
    },
    "PUT" => function () use ($bookingController, $req) {
        return $bookingController->PUT($req);
    },
    "GET" => function () use ($bookingController, $req) {

        $optionGet = match ($req["option"]) {
            "bookingByClientMailAndDate" => $bookingController->getBookingByClientMailAndDate($req)
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
