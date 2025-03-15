<?php

require("../../controller/admin/revenues/revenuesController.php");

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
    "GET" => function () use ($revenuesController, $req) {

        $optionGet = match ($req["option"]) {
            "dashboardGraphic" => $revenuesController->getDashboardGraphic($req),
            "itemDataDashboard" => $revenuesController->getItemDataDashboard($req),
            "getRevenue" => $revenuesController->getRevenueByIdBooking($req),
            "getRevenueDetailsById" => $revenuesController->getRevenueDetailsById($req),
            "getAllYearsRevenues" => $revenuesController->getAllYearsRevenues($req),
            "getAllRevenuesByYear" => $revenuesController->getAllRevenuesByYear($req),
            "getAllRevenuesByYearLimitIndex" => $revenuesController->getAllRevenuesByYearLimitIndex($req)
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
