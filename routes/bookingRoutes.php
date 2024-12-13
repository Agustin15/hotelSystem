<?php

require("../controller/admin/bookings/bookingController.php");


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
    "DELETE" => function () use ($bookingController, $req) {
        return $bookingController->DELETE($req);
    },
    "GET" => function () use ($bookingController, $req) {
        return $bookingController->GET($req);
    }
];


if (array_key_exists($method, $routes)) {

    $response = $routes[$method]();

    if (isset($response["error"])) {
        http_response_code($response["status"]);
    }

    echo json_encode($response);
}
