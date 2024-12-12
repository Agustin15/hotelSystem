<?php

require("../controller/admin/revenues/revenuesController.php");

$revenuesController = new revenuesController();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$req;

if (isset($_GET['params'])) {
    $req = json_decode($_GET['params'], true);
} else {
    $req = json_decode(file_get_contents("php://input"), true);
}


$routes = [
    "POST" => function () use ($revenuesController, $req) {
        return $revenuesController->POST($req);
    },
    "PUT" => function () use ($revenuesController, $req) {
        return $revenuesController->PUT($req);
    },
    "DELETE" => function () use ($revenuesController, $req) {
        return $revenuesController->DELETE($req);
    },
    "GET" => function () use ($revenuesController, $req) {
        return $revenuesController->GET($req);
    }
];


if (array_key_exists($method, $routes)) {

    $response = $routes[$method]();
    if (isset($response["error"])) {

        header("Content-Type: application/json", true, $response["status"]);
    }

    echo json_encode($response);
}
