<?php

require("../model/claseReservas.php");

class bookingController
{

    private $booking;
    public function __construct()
    {
        $this->booking = new reservas();
    }

    public function POST($req)
    {

        $res = null;

        $this->booking->setIdCliente($req['client']);
        $this->booking->setLlegada($req['startBooking']);
        $this->booking->setSalida($req['endBooking']);
        $this->booking->setCantidadHabitaciones($req['roomsQuantity']);

        $res =  $this->booking->addReservaBd();
        return $res;
    }

    public function PUT($req)
    {

        $res = null;
        $this->booking->setIdReserva($req['idBooking']);
        $this->booking->setIdCliente($req['idClient']);
        $this->booking->setLlegada($req['startBooking']);
        $this->booking->setSalida($req['endBooking']);
        $this->booking->setCantidadHabitaciones($req['quantityRooms']);

        $resultBookingUpdate = $this->booking->updateReserva();

        $res = $resultBookingUpdate;


        return $res;
    }

    public function GET($req)
    {

        $res = null;
        $option = $req['option'];
        switch ($option) {

            case "allBookings":
                $bookings = $this->booking->getAllReservas()->fetch_all(MYSQLI_ASSOC);

                if ($bookings) {
                    $res = $bookings;
                }

                break;
            case "bookingByClientAndDate":


                $bookingFind =  $this->booking->getReservaPorIdClienteAndFecha(
                    $req['dataBooking']['idClient'],
                    $req['dataBooking']['startBooking'],
                    $req['dataBooking']['endBooking']
                );

                if ($bookingFind) {
                    $res = $bookingFind;
                }

                break;

            case "bookingByClientMailAndDate":

                $bookingFind =  $this->booking->getBookingByClientMailAndDate(
                    $req['dataBooking']['mail'],
                    $req['dataBooking']['startBooking'],
                    $req['dataBooking']['endBooking']
                );

                if ($bookingFind) {
                    $res = $bookingFind;
                }

                break;

            case "bookingsRowsYear":
                $year = $req['year'];
                $rowsBookingYear = $this->booking->getAllReservasAnio($year)->num_rows;

                if ($rowsBookingYear) {
                    $res = $rowsBookingYear;
                }

                break;

            case "bookingsYearLimit":

                $resultBookings = null;

                if ($req['indexPage'] == 0) {
                    $resultBookings = $this->booking->getBookingsYearLimit($req['year']);
                } else {
                    $resultBookings = $this->booking->getBookingsYearLimitAndIndex($req['year'], $req['indexPage']);
                }

                if ($resultBookings) {

                    $res = $resultBookings;
                }

                break;

            case "allYearsBooking":

                $res = $this->booking->getAllYearsBookings();

                break;
        }



        return $res;
    }

    public function DELETE($req) {}
}
