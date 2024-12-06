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

    case "PUT":

        $dataToUpdateBooking = json_decode(file_get_contents("php://input"), true);

        $booking->setIdReserva($dataToUpdateBooking['idBooking']);
        $booking->setIdCliente($dataToUpdateBooking['idClient']);
        $booking->setLlegada($dataToUpdateBooking['startBooking']);
        $booking->setSalida($dataToUpdateBooking['endBooking']);
        $booking->setCantidadHabitaciones($dataToUpdateBooking['quantityRooms']);

        $resultBookingUpdate = $booking->updateReserva();

        $response = $resultBookingUpdate;

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

            case "bookingsRowsYear":
                $year = $_GET['year'];
                $rowsBookingYear = $booking->getAllReservasAnio($year)->num_rows;

                if ($rowsBookingYear) {
                    $response = $rowsBookingYear;
                }

                break;

            case "bookingsYearLimit":
                $data = json_decode($_GET['data'], true);

                $resultBookings;
                if ($data['indexPage'] == 0) {
                    $resultBookings = $booking->getBookingsYearLimit($data['year']);
                } else {
                    $resultBookings = $booking->getBookingsYearLimitAndIndex($data['year'], $data['indexPage']);
                }

                if ($resultBookings) {

                    $response = $resultBookings;
                }


                break;
        }

        echo json_encode($response);
        break;
}
