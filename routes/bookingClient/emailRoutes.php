<?php
require("../../controller/bookingClient/email/emailController.php");

$emailController = new emailController();

$method = $_SERVER["REQUEST_METHOD"];
$req;


if (isset($_GET["params"])) {

    $req = json_decode($_GET["params"], true);
} else if (isset($_POST["optionPOST"])) {

    $req = array(
        "name" => $_POST["name"],
        "destinary" => $_POST["destinary"],
        "subject" => $_POST["subject"],
        "stateBooking" => $_POST["stateBooking"],
        "file" => $_FILES["file"],
        "optionPOST" => $_POST["optionPOST"]
    );
} else {

    $req = json_decode(file_get_contents("php://input"), true);
}

$routes = [
    "POST" => function () use ($req, $emailController) {
        $optionPost =  match ($req["optionPOST"]) {
            "sendEmail" => $emailController->sendEmail($req),
            "addEmail" => $emailController->POST($req)
        };

        return $optionPost;
    },
    "GET" => function () use ($req, $emailController) {

        return $emailController->getEmailBookingConfirmByIdBooking($req);
    },

    "PATCH" => function () use ($req, $emailController) {

        return $emailController->PatchStateUpdateEmailBookingById($req);
    }
];


if (array_key_exists($method, $routes)) {
    $response = $routes[$method]();

    if (isset($response["error"])) {
        http_response_code($response["status"]);
    }

    echo json_encode($response);
}
