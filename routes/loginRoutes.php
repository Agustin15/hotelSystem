<?php

require("../controller/admin/users/userController.php");

$userController = new userController();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$req;

if (isset($_GET['params'])) {
    $req = json_decode($_GET['params'], true);
} else {
    $req = json_decode(file_get_contents("php://input"), true);
}

$routes = [
    "POST" => function () use ($userController, $req) {

        return $userController->login($req);
    }
];


if (array_key_exists($method, $routes)) {

    $response = $routes[$method]();

    if (isset($response["error"])) {
        http_response_code($response["status"]);
    }

    echo json_encode($response);
}
