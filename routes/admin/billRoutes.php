<?php
require("../../controller/admin/bill/billController.php");
$billController = new billController();

$method = $_SERVER['REQUEST_METHOD'];
$req;
$response;

if (isset($_GET["params"])) {

    $req = json_decode($_GET["params"], true);
} else {

    $req = json_decode(file_get_contents("php://input"), true);
}

$routes = [
    "GET" => function () use ($billController, $req) {
        return $billController->detailsBill($req);
    }
];

if (array_key_exists($method, $routes)) {

    $response = $routes[$method]();

    if (isset($response["error"])) {
        http_response_code($response["status"]);
    }

    echo json_encode($response);
}
