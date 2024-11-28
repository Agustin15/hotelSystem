<?php

require("../../../model/claseReservas.php");

$booking = new reservas();

$response = null;

switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":

        $bookings = $booking->getAllReservas()->fetch_all(MYSQLI_ASSOC);

        if ($bookings) {
            $response = $bookings;
        }

        echo json_encode($response);
        break;
}
