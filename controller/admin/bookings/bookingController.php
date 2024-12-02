<?php

require("../../../model/claseReservas.php");

$booking = new reservas();

$response = null;

switch ($_SERVER['REQUEST_METHOD']) {


    case "POST":

        $dataBooking = json_decode(file_get_contents("php://input"), true);

        $booking->setIdCliente($dataBooking['client']);
        $booking->setLlegada($dataBooking['startBooking']);
        $booking->setSalida($dataBooking['endBooking']);
        $booking->setCantidadHabitaciones($dataBooking['roomsQuantity']);

        $resultBookingAdd =  $booking->addReservaBd();

        $response = $resultBookingAdd;

        echo json_encode($response);
        break;

    case "GET":

        $option = $_GET['option'];
        switch ($option) {

            case "allBookings":
                $bookings = $booking->getAllReservas()->fetch_all(MYSQLI_ASSOC);

                if ($bookings) {
                    $response = $bookings;
                }

                break;
            case "bookingByClientAndDate":
                $dataBooking = json_decode($_GET['dataBooking'], true);

                $bookingFind =  $booking->getReservaPorIdClienteAndFecha(
                    $dataBooking['idClient'],
                    $dataBooking['startBooking'],
                    $dataBooking['endBooking']
                );

                if ($bookingFind) {
                    $response = $bookingFind;
                }

                break;

                case "bookingByClientMailAndDate":
                    $dataBooking = json_decode($_GET['dataBooking'], true);
    
                    $bookingFind =  $booking->getBookingByClientMailAndDate(
                        $dataBooking['mail'],
                        $dataBooking['startBooking'],
                        $dataBooking['endBooking']
                    );
    
                    if ($bookingFind) {
                        $response = $bookingFind;
                    }
    
                    break;
        }

        echo json_encode($response);
        break;
}
