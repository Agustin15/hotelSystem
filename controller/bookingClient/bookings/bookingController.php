<?php

require("../../model/booking.php");

class bookingController
{

    private $booking;
    public function __construct()
    {
        $this->booking = new Booking();
    }

    public function POST($req)
    {

        try {

            $this->booking->setIdClient($req['client']);
            $this->booking->setDateStart($req['startBooking']);
            $this->booking->setDateEnd($req['endBooking']);
            $this->booking->setQuantityRooms($req['roomsQuantity']);
            $res =  $this->booking->addBooking();
            return $res;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

    public function PUT($req)
    {

        try {

            $this->booking->setIdBooking($req['idBooking']);
            $this->booking->setIdClient($req['idClient']);
            $this->booking->setDateStart($req['startBooking']);
            $this->booking->setDateEnd($req['endBooking']);
            $this->booking->setQuantityRooms($req['quantityRooms']);

            $resultBookingUpdate = $this->booking->updateBookingById();

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
