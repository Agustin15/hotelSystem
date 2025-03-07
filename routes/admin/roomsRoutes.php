<?php

require("../../controller/admin/rooms/roomsController.php");

$roomsController = new roomsController();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$req = null;

if (isset($_GET['params'])) {
    $req = json_decode($_GET['params'], true);
} else {
    $req = json_decode(file_get_contents("php://input"), true);
}

$routes = [

    "PUT" => function () use ($roomsController, $req) {
        return $roomsController->PUT($req);
    },
    "DELETE" => function () use ($roomsController, $req) {
        return $roomsController->DELETE($req);
    },
    "GET" => function () use ($roomsController, $req) {

        $optionGet = match ($req["option"]) {
            "getAllCategoryRooms" => $roomsController->getAllCategoryRooms(),
            "getAllCategoryRoomsWithDetails" => $roomsController->getAllCategoryRoomsWithDetails(),
            "getAllRoomsByCategory" => $roomsController->getAllRoomsByCategory($req),
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
