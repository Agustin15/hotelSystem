<?php

require("../vendor/autoload.php");

$dotenv = Dotenv\Dotenv::createImmutable("../");
$dotenv->load();

header("Access-Control-Allow-Origin:" . $_ENV["BACK_URL_LOCALHOST"]);
require("../controller/emailController.php");


$emailController = new emailController();

$method = $_SERVER["REQUEST_METHOD"];
$req = json_decode(file_get_contents("php://input"), true);

$routes = [
    "POST" => function () use ($req, $emailController) {
        return $emailController->sendEmailQuery($req);
    }
];


if (array_key_exists($method, $routes)) {
    $response = $routes[$method]();

    if (isset($response["error"])) {
        http_response_code($response["status"]);
    }

    echo json_encode($response);
}
