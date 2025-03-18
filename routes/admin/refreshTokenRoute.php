<?php

require("../../controller/admin/authToken.php");


$authToken = new authToken();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$req = json_decode(file_get_contents("php://input"), true);



$routes = [
    "POST" => function () use ($authToken, $req) {
        return $authToken->refreshToken();
    },
];


if (array_key_exists($method, $routes)) {

    $response = $routes[$method]();

    if (isset($response["error"])) {
        http_response_code($response["status"]);
    }

    echo json_encode($response);
}
