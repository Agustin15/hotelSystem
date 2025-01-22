<?php

require("../../model/claseReservas.php");
require(__DIR__ . "./../authToken.php");

class bookingController
{

    private $booking, $authToken;
    public function __construct()
    {
        $this->booking = new reservas();
        $this->authToken = new authToken();
    }

    public function POST($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
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
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
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


    public function getAllBookings($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $bookings = $this->booking->getAllReservas()->fetch_all(MYSQLI_ASSOC);

            return $bookings;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function getBookingsByClientDate($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $bookingFind =  $this->booking->getReservaPorIdClienteAndFecha(
                $req['dataBooking']['idClient'],
                $req['dataBooking']['startBooking'],
                $req['dataBooking']['endBooking']
            );

            return $bookingFind;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function getBookingByClientMailAndDate($req)
    {
        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
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

    public function getBookingsRowsYear($req)
    {
        try {
            $year = $req['year'];
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $rowsBookingYear = $this->booking->getAllReservasAnio($year)->num_rows;


            return $rowsBookingYear;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getBookingsYearLimit($req)
    {
        try {
            $resultBookings = null;
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            if ($req['data']['indexPage'] == 0) {
                $resultBookings = $this->booking->getBookingsYearLimit($req['data']['year']);
            } else {
                $resultBookings = $this->booking->getBookingsYearLimitAndIndex($req['data']['year'], $req['data']['indexPage']);
            }

            return $resultBookings;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function getAllYearsBooking($req)
    {
        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $res = $this->booking->getAllYearsBookings();
            return $res;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function getClientByIdBooking($req)
    {
        try {
            $idBooking = $req['idBooking'];
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $res = $this->booking->getDataClientByIdBooking($idBooking);
            return $res;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function getBookingById($req)
    {

        try {
            $idBooking = $req['idBooking'];
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $res = $this->booking->getReservaPoridReserva($idBooking);
            return $res;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }



    public function DELETE($req)
    {

        try {
            $idBooking = $req['idBooking'];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $res = $this->booking->deleteReserva($idBooking);
            return $res;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
