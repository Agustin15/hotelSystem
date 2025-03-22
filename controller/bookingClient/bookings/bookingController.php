<?php
require_once("../../config/connection.php");
require("../../model/booking.php");
require(__DIR__ . "../../client/clientController.php");
require(__DIR__ . "../../rooms/roomsBookingController.php");
require(__DIR__ . "../../revenues/revenuesController.php");

class bookingController
{

    private $booking, $clientController, $roomsBookingController, $revenuesController, $connection;
    public function __construct()
    {
        $this->booking = new Booking();
        $this->clientController = new clientController();
        $this->roomsBookingController = new roomsBookingController();
        $this->revenuesController = new revenuesController();
        $this->connection = Connection::getInstance()->getConnection();
    }

    public function POST($req)
    {

        try {


            $nameClient = $req['client']['name'];
            $lastnameClient = $req['client']['lastName'];
            $emailClient = $req['client']['mail'];
            $phoneClient = $req['client']['phone'];
            $startBooking = $req['booking']['date']['start'];
            $endBooking = $req['booking']['date']['end'];
            $roomsBooking = $req['booking']['rooms'];
            $amount = $req['booking']['totalDeposit'];


            $quantityRooms = $this->quantityRooms($roomsBooking);

            $this->connection->autocommit(FALSE);
            $this->connection->begin_transaction();


            $bookingFound = $this->findBookingByClientMailAndDate($emailClient, $startBooking, $endBooking);

            if (isset($bookingFound['error'])) {

                throw new Error("Error al encontrar la reserva");
            }

            if ($bookingFound) {
                throw new Error("Error,reserva existente");
            }

            $clientFound = $this->clientController->findClientByMailAndName($nameClient, $lastnameClient, $emailClient);

            if (isset($clientFound["error"])) {
                throw new Error("Error al encontrar al cliente");
            } else if (!$clientFound) {

                $clientAdded = $this->clientController->POST($nameClient, $lastnameClient, $emailClient, $phoneClient);

                if (!$clientAdded || isset($clientAdded['error'])) {
                    throw new Error("Error al agregar al cliente");
                }
            }


            if (!$bookingFound) {

                //add booking
                $clientData = $this->clientController->findClientByMailAndName(
                    $nameClient,
                    $lastnameClient,
                    $emailClient
                );

                $this->booking->setIdClient($clientData['idCliente']);
                $this->booking->setDateStart($startBooking);
                $this->booking->setDateEnd($endBooking);
                $this->booking->setQuantityRooms($quantityRooms);
                $bookingAdded =  $this->booking->addBooking();

                if (!$bookingAdded) {
                    throw new Error("Error,no se pudo agregar la reserva");
                }

                $bookingFound = $this->findBookingByClientMailAndDate($emailClient, $startBooking, $endBooking);
                $roomsAdded  =  $this->roomsBookingController->POST(
                    $roomsBooking,
                    $bookingFound['idReserva'],
                    $clientData['idCliente'],
                    $startBooking,
                    $endBooking
                );

                if (isset($roomsAdded['error'])) {
                    throw new Error($roomsAdded['error']);
                }

                $amountAdded = $this->revenuesController->POST(
                    $bookingFound['idReserva'],
                    $clientData['idCliente'],
                    $amount
                );

                if (isset($amountAdded['error']) || !$amountAdded) {
                    throw new Error("Error al dar de alta el deposito");
                }

                if ($amountAdded == true) {
                    $this->connection->commit();
                    return $amountAdded;
                }
            }
        } catch (Throwable $th) {
            $this->connection->rollback();
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

    public function PUT($req)
    {

        $emailClient = $req['client']['mail'];
        $startBooking = $req['booking']['date']['start'];
        $endBooking = $req['booking']['date']['end'];
        $roomsBooking = $req['booking']['rooms'];
        $amount = $req['booking']['totalDeposit'];

        try {


            $newRooms = $this->quantityRooms($roomsBooking);


            $this->connection->autocommit(FALSE);
            $this->connection->begin_transaction();

            $bookingFound = $this->findBookingByClientMailAndDate($emailClient, $startBooking, $endBooking);

            if (isset($bookingFound['error'])) {

                throw new Error("Error al encontrar la reserva");
            }

            $newQuantityRooms = $bookingFound['cantidadHabitaciones'] + $newRooms;

            $this->booking->setIdBooking($bookingFound['idReserva']);
            $this->booking->setIdClient($bookingFound['idClienteReserva']);
            $this->booking->setDateStart($bookingFound['fechaLlegada']);
            $this->booking->setDateEnd($bookingFound['fechaSalida']);
            $this->booking->setQuantityRooms($newQuantityRooms);

            $bookingUpdated = $this->booking->updateBookingById();

            if (isset($bookingUpdated['error']) || !$bookingUpdated) {

                throw new Error("Error al actualizar la reserva");
            }

            $roomsAdded = $this->roomsBookingController->POST(
                $roomsBooking,
                $bookingFound['idReserva'],
                $bookingFound['idClienteReserva'],
                $startBooking,
                $endBooking
            );
    

            if (isset($roomsAdded['error'])) {

                throw new Error($roomsAdded['error']);
            }

            $bookingRevenueFound = $this->revenuesController->findRevenueByIdBooking($bookingFound['idReserva']);

            if (isset($bookingRevenueFound['error'])) {

                throw new Error("Error al encontrar el deposito de la reserva");
            }

            $newAmount = $amount + $bookingRevenueFound['deposito'];

            $revenueUpdated  = $this->revenuesController->PUT($bookingFound['idReserva'], $newAmount);

            if (isset($revenueUpdated['error']) || !$revenueUpdated) {

                throw new Error("Error al actualizar el deposito de la reserva ");
            }

            if ($revenueUpdated  == true) {

                $this->connection->commit();
                return $revenueUpdated;
            }
        } catch (Throwable $th) {
            $this->connection->rollback();
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }




    public function quantityRooms($rooms)
    {

        $quantityRooms = array_reduce($rooms, function ($ac, $room) {

            return $ac += $room['quantity'];
        }, 0);

        return $quantityRooms;
    }

    public function findBookingByClientMailAndDate($emailClient, $startBooking, $endBooking)
    {
        try {

            $bookingFind =  $this->booking->getBookingByClientMailAndDate(
                $emailClient,
                $startBooking,
                $endBooking
            );

            return $bookingFind;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function getDetailsBookingByClientMailAndDate($req)
    {
        try {

            $bookingFind =  $this->booking->getBookingDetailsByClientMailAndDate(
                $req['dataToFindBooking']['email'],
                $req['dataToFindBooking']['startDate'],
                $req['dataToFindBooking']['endDate']
            );


            $bookingDetailsFind = array_map(function ($booking) {

                $booking['imagenUno'] = null;
                $booking['imagenTres'] = null;
                $booking['imagenDos'] = base64_encode($booking['imagenDos']);

                return $booking;
            }, $bookingFind);


            return $bookingDetailsFind;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
