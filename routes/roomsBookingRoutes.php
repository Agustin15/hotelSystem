<?php

require("../controller/admin/rooms/roomsBookingController.php");

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
    "POST" => function () use ($roomsBookingController, $req) {
        return $roomsBookingController->POST($req);
    },
    "PUT" => function () use ($roomsBookingController, $req) {
        return $roomsBookingController->PUT($req);
    },
    "DELETE" => function () use ($roomsBookingController, $req) {
        return $roomsBookingController->DELETE($req);
    },
    "GET" => function () use ($roomsBookingController, $req) {
        return $roomsBookingController->GET($req);
    }
];


if (array_key_exists($method, $routes)) {
    
    $response = $routes[$method]();
   
    echo json_encode($response);
}

?>