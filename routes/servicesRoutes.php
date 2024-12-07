<?php

require("../controller/admin/services/servicesController.php");

$servicesController= new servicesController();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$req;

if (isset($_GET['params'])) {
    $req = json_decode($_GET['params'], true);
} else {
    $req = json_decode(file_get_contents("php://input"), true);
}

$routes = [
    "POST" => function () use ($servicesController, $req) {
        return $servicesController->POST($req);
    },
    "PUT" => function () use ($servicesController, $req) {
        return $servicesController->PUT($req);
    },
    "DELETE" => function () use ($servicesController, $req) {
        return $servicesController->DELETE($req);
    },
    "GET" => function () use ($servicesController, $req) {
        return $servicesController->GET($req);
    }
];


if (array_key_exists($method, $routes)) {
    
    $response = $routes[$method]();
   
    echo json_encode($response);
}
?>