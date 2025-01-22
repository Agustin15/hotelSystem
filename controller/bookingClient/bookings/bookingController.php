<?php

require("../../model/claseReservas.php");

class bookingController
{

    private $booking;
    public function __construct()
    {
        $this->booking = new reservas();
    }

    public function POST($req)
    {

        try {

            $this->booking->setIdCliente($req['client']);
            $this->booking->setLlegada($req['startBooking']);
            $this->booking->setSalida($req['endBooking']);
            $this->booking->setCantidadHabitaciones($req['roomsQuantity']);
            $res =  $this->booking->addReservaBd();
            return $res;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

    public function PUT($req)
    {

        try {

            $this->booking->setIdReserva($req['idBooking']);
            $this->booking->setIdCliente($req['idClient']);
            $this->booking->setLlegada($req['startBooking']);
            $this->booking->setSalida($req['endBooking']);
            $this->booking->setCantidadHabitaciones($req['quantityRooms']);

            $resultBookingUpdate = $this->booking->updateReserva();

            return $resultBookingUpdate;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }



    public function getBookingByClientMailAndDate($req)
    {
        try {

            $bookingFind =  $this->booking->getBookingByClientMailAndDate(
                $req['dataBooking']['mail'],
                $req['dataBooking']['startBooking'],
                $req['dataBooking']['endBooking']
            );

            return $bookingFind;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
