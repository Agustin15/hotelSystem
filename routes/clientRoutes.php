<?php

require("../controller/admin/client/clientController.php");

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
    "PUT" => function () use ($clientController, $req) {
        return $clientController->PUT($req);
    },
    "DELETE" => function () use ($clientController, $req) {
        return $clientController->DELETE($req);
    },
    "GET" => function () use ($clientController, $req) {

        $optionGet = match ($req["option"]) {

            "allClients" => $clientController->getAllClients($req),
            "AllYearsVisitClients" => $clientController->getAllYearsVisitClients($req),
            "clientsGraphic" => $clientController->getClientsGraphic($req),
            "clientsTable" => $clientController->getClientsTable($req),
            "clientsRows" => $clientController->getClientsRows($req),
            "dataClient" => $clientController->getDataClient($req),
            "getClientByMailAndName" => $clientController->getClientByMailAndName($req),
            "ifExistClient" => $clientController->getIfExistClient($req),
            "rowsBookingsClient" => $clientController->getRowsBookingsClient($req),
            "bookingsClient" => $clientController->getBookingsClient($req)
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
