<?php
require(__DIR__ . "../../../vendor/autoload.php");
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "../../../");
$dotenv->load();

header("Access-Control-Allow-Origin:" . $_ENV["BACK_URL_LOCALHOST"]);


require("../../controller/admin/rooms/roomsBookingController.php");

$roomsBookingController = new roomsBookingController();

$method = $_SERVER['REQUEST_METHOD'];

$response = null;
$req;

if (isset($_GET['params'])) {
    $req = json_decode($_GET['params'], true);
} else {
    $req = json_decode(file_get_contents("php://input"), true);
}

$routes = [
    "GET" => function () use ($roomsBookingController, $req) {
        $optionGet = match ($req["option"]) {

            "dashboardGraphic" => $roomsBookingController->getDashboardGraphic($req),
            "itemDataDashboard" => $roomsBookingController->getItemDataDashboard($req),
            "getDataRoomsBooking" => $roomsBookingController->getDataRoomsBooking($req),
            "getDataRoomsBookingAndCategory" => $roomsBookingController->getDataRoomsBookingAndCategory($req),
            "getRoomsBookingAndDetails" => $roomsBookingController->getRoomsBookingAndDetails($req),
            "roomsFreeCategory" => $roomsBookingController->getRoomsFreeCategory($req),
            "verifyStateRoomsToBooking" => $roomsBookingController->verifyStateRoomsToBooking($req),
            "getAllYearsWithRoomsBooking" => $roomsBookingController->getAllYearsWithRoomsBooking($req),
            "getAllBookingsByRoomAndYearLimit" => $roomsBookingController->getAllBookingsByRoomAndYearLimit($req),
            "getAllBookingsByRoomAndYear" => $roomsBookingController->getAllBookingsByRoomAndYear($req),
            "getNextBookingsRoom" => $roomsBookingController->getNextBookingsRoom($req),
            "getBookingByRoomReserved" => $roomsBookingController->getBookingByRoomReserved($req),
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
