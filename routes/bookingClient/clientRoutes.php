<?php

require("../../controller/bookingClient/client/clientController.php");

$clientController = new clientController();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$req;

if (isset($_GET['params'])) {
    $req = json_decode($_GET['params'], true);
} else {
    $req = json_decode(file_get_contents("php://input"), true);
}


$routes = [
    "POST" => function () use ($clientController, $req) {
        return $clientController->POST($req);
    },
    "GET" => function () use ($clientController, $req) {

        $optionGet = match ($req["option"]) {
            "getClientByMailAndName" => $clientController->getClientByMailAndName($req),
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
