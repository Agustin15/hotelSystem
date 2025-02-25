<?php

require("../../controller/admin/users/userController.php");

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

    "PATCH" => function () use ($userController, $req) {

        if ($req["option"] == "updateImageUser") {
            return $userController->PatchUserImage($req);
        } else {
            return $userController->PatchUserPassword($req);
        }
    },
    "PUT" => function () use ($userController, $req) {
        return $userController->PUT($req);
    },
    "GET" => function () use ($userController, $req) {

        $optionGET = match ($req["option"]) {
            "getDataToken" => $userController->getDataToken(),
            "getUserByUsername" => $userController->getDataUserByUsername($req)
        };

        return $optionGET;
    }
];


if (array_key_exists($method, $routes)) {

    $response = $routes[$method]();

    if (isset($response["error"]) || isset($response["errorMessage"])) {
        http_response_code($response["status"]);
    }

    echo json_encode($response);
}
