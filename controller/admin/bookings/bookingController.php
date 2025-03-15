<?php

require("../../config/connection.php");
require("../../model/booking.php");
require(__DIR__ . "./../revenues/revenuesController.php");
require(__DIR__ . "./../rooms/roomsBookingController.php");
require_once(__DIR__ . "./../authToken.php");

class bookingController
{

    private $booking, $revenuesController, $roomsBookingController, $connection, $authToken;
    public function __construct()
    {
        $this->booking = new Booking();
        $this->revenuesController = new revenuesController();
        $this->roomsBookingController = new roomsBookingController();
        $this->authToken = new authToken();
        $this->connection = Connection::getInstance()->getConnection();
    }

    public function POST($req)
    {

        try {

            $idClient = $req["client"];
            $startBooking = $req["startBooking"];
            $endBooking = $req["endBooking"];
            $rooms = $req["rooms"];
            $quantityRooms = $req["roomsQuantity"];
            $amount = $req["amount"];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }

            $this->connection->autocommit(FALSE);
            $this->connection->begin_transaction();

            $bookingFound = $this->findBookingByClientIdAndDate($idClient, $startBooking, $endBooking);

            if (isset($bookingFound["error"])) {
                throw new Error("Error al buscar la reserva");
            }

            if ($bookingFound) {

                throw new Error("Este cliente ya tiene una reserva en esta fecha,tendra que actualizarla");
            }

            $this->booking->setIdClient($idClient);
            $this->booking->setDateStart($startBooking);
            $this->booking->setDateEnd($endBooking);
            $this->booking->setQuantityRooms($quantityRooms);
            $bookingAdded =  $this->booking->addBooking();

            if (!$bookingAdded) {

                throw new Error("Error, no se pudo agregar la reserva");
            }

            $bookingFound = $this->findBookingByClientIdAndDate($idClient, $startBooking, $endBooking);
            if (isset($bookingFound["error"])) {
                throw new Error("Error al buscar la reserva");
            }


            $roomsAdded =  $this->roomsBookingController->POST(
                $bookingFound["idReserva"],
                $bookingFound["idClienteReserva"],
                $rooms,
                $startBooking,
                $endBooking
            );


            if (!$roomsAdded) {
                throw new Error("Error al agregar las habitaciones");
            }

            $amountBookingAdded = $this->revenuesController->POST(
                $bookingFound["idReserva"],
                $bookingFound["idClienteReserva"],
                $amount
            );

            if (isset($amountBookingAdded["error"]) || !$amountBookingAdded) {
                throw new Error("Error al agregar el deposito de la reserva");
            }

            if ($amountBookingAdded == true) {
                $this->connection->commit();
                return $amountBookingAdded;
            }
        } catch (Throwable $th) {
            $this->connection->rollback();
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }

    public function PUT($req)
    {

        try {

            $idBooking = $req["idBooking"];
            $idClient = $req["idClient"];
            $quantityRooms = $req["quantityRooms"];
            $startBooking = $req["startBooking"];
            $endBooking = $req["endBooking"];
            $rooms = $req["rooms"];
            $amount = $req["amount"];


            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }

            $this->connection->autocommit(FALSE);
            $this->connection->begin_transaction();

            $this->booking->setIdBooking($idBooking);
            $this->booking->setIdClient($idClient);
            $this->booking->setDateStart($startBooking);
            $this->booking->setDateEnd($endBooking);
            $this->booking->setQuantityRooms($quantityRooms);

            $bookingUpdated = $this->booking->updateBookingById();

            if (!$bookingUpdated) {
                throw new Error("Error, no se pudo actualizar la reserva");
            }

            $roomsToDelete = $this->roomsBookingController->findRoomsToDeleteInCart($idBooking, $rooms);

            if (isset($roomsToDelete["error"])) {
                throw new Error("Error, no se pudieron procesar las habitaciones");
            }


            $roomsToAdd = $this->roomsBookingController->findRoomsToAddInCart(
                $idBooking,
                $idClient,
                $startBooking,
                $endBooking,
                $rooms
            );


            if (isset($roomsToAdd["error"])) {
                throw new Error("Error, no se pudieron procesar las habitaciones");
            }

            if (count($roomsToDelete) > 0) {
                $roomsDeleted = $this->roomsBookingController->DELETE($idBooking, $roomsToDelete);

                if (isset($roomsDeleted["error"])) {

                    throw new Error("Error, no se pudieron eliminar las habitaciones");
                }
            }


            if (count($roomsToAdd) > 0) {
                $roomsAdded = $this->roomsBookingController->POST(
                    $idBooking,
                    $idClient,
                    $roomsToAdd,
                    $startBooking,
                    $endBooking
                );

                if (isset($roomsAdded["error"])) {

                    throw new Error("Error, no se pudieron agregar las habitaciones");
                }
            }

            $amountBookingUpdated = $this->revenuesController->PUT($idBooking, $amount);

            if (!$amountBookingUpdated) {
                throw new Error("Error, no se pudo actualizar el deposito de la reserva");
            }

            if ($amountBookingUpdated == TRUE) {
                $this->connection->commit();
                return $amountBookingUpdated;
            }
        } catch (Throwable $th) {
            $this->connection->rollback();
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }


    public function DELETE($req)
    {

        try {
            $idBooking = $req['idBooking'];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $res = $this->booking->deleteBookingById($idBooking);
            return $res;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getAllBookings($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $bookings = $this->booking->getAllBookings()->fetch_all(MYSQLI_ASSOC);

            return $bookings;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function findBookingByClientIdAndDate($idClient, $startBooking, $endBooking)
    {

        try {

            $bookingFind =  $this->booking->getBookingByIdClientAndDate(
                $idClient,
                $startBooking,
                $endBooking
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
                return array("error" => $tokenVerify["error"], "status" => 401);
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
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $rowsBookingYear = $this->booking->getAllBookingsYear($year)->num_rows;


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
                return array("error" => $tokenVerify["error"], "status" => 401);
            }

            $resultBookings = $this->booking->getBookingsYearLimitAndIndex($req['data']['year'], $req['data']['index']);


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
                return array("error" => $tokenVerify["error"], "status" => 401);
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
                return array("error" => $tokenVerify["error"], "status" => 401);
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
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $res = $this->booking->getBookingById($idBooking);
            return $res;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
