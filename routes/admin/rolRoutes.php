<?php

require("../../controller/admin/rol/rolController.php");

$rolController = new rolController();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$routes = [

    "GET" => function () use ($rolController) {

        return $rolController->getAllRols();
    }

];


if (array_key_exists($method, $routes)) {

    $response = $routes[$method]();

    if (isset($response["error"])) {
        http_response_code($response["status"]);
    }

    echo json_encode($response);
}
