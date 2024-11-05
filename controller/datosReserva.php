<?php

require "../model/claseHabitaciones.php";
require "../model/claseReservas.php";
require "../model/claseCliente.php";
require "../model/claseCorreo.php";
require "../model/clasePago.php";
require "../model/functionsDataBooking.php";

$habitacion = new habitaciones();
$reserva = new reservas();
$cliente = new cliente();
$pago = new pago();




switch ($_SERVER['REQUEST_METHOD']) {

    case "POST":

        $clientBooking = json_decode(file_get_contents("php://input"), true);

        if (empty($clientBooking)) {

            header("Location:../views/consultaHabitaciones.php");
        } else {


            $client = $clientBooking['client'];
            $booking = $clientBooking['booking'];
            $respuesta;


            $totalRoomsBooking = totalRoomsBookingClient($booking);

            $freeRooms = getFreeRooms($habitacion, $booking);

            if (empty($freeRooms)) {
                $respuesta = array("respuesta" => "¡Ups!,ya no nos quedan habitaciones disponibles");
            } else {
                $roomsSelectedForClient = getRoomsSelectedForClient($booking, $freeRooms);
                $roomsSelectedForClient = getRoomsSelectedForClient($updatebooking['booking'], $freeRooms);

                if (gettype($roomsSelectedForClient) == "string") {

                    $respuesta = array("respuesta" => $roomsSelectedForClient);
                } else {


                    $clientExisted = $cliente->getClienteCorreo($client['mail']);
                    $resultAddClient = true;
                    $roomAdded;

                    if (empty($clientExisted->fetch_array(MYSQLI_ASSOC))) {

                        //agregar cliente
                        $cliente->setNombre($client['name']);
                        $cliente->setApellido($client['lastName']);
                        $cliente->setCorreo($client['mail']);
                        $cliente->setTelefono($client['phone']);
                        $resultAddClient = $cliente->setClienteBd();
                    }
                    if ($resultAddClient) {


                        //agregar reserva
                        $dataClient = $cliente->getClienteCorreo($client['mail'])->fetch_array(MYSQLI_ASSOC);
                        $llegada = new DateTime($booking['date']['start']);
                        $salida = new DateTime($booking['date']['end']);

                        $reserva->setIdCliente($dataClient['idCliente']);
                        $reserva->setLlegada($llegada->format("Y-m-d"));
                        $reserva->setSalida($salida->format("Y-m-d"));
                        $reserva->setCantidadHabitaciones($totalRoomsBooking);

                        $resultAddBooking = $reserva->addReservaBd();


                        if ($resultAddBooking) {

                            $bookingClient = $reserva->getReservaPorIdClienteAndFecha(
                                $dataClient['idCliente'],
                                $llegada->format("Y-m-d"),
                                $salida->format("Y-m-d")
                            );


                            $roomAdded = setRoomsToBookingBd(
                                $bookingClient['idReserva'],
                                $habitacion,
                                $dataClient,
                                $llegada->format("Y-m-d"),
                                $salida->format("Y-m-d"),
                                $roomsSelectedForClient
                            );
                            if ($roomAdded !== true) {
                                $respuesta = array("respuesta" => "¡Ups!, 
                                hubo un error al realizar la reserva,
                                vuelve a intentarlo más tarde");
                            } else {


                                $resultPago = $pago->setPago($bookingClient['idReserva'], $dataClient['idCliente'], $booking['totalDeposit']);

                                $respuesta = array("respuesta" => $resultPago);
                            }
                        }
                    }
                    echo json_encode($respuesta);
                }
            }
        }
        break;


    case "PUT":

        $respuesta;
        $updatebooking = json_decode(file_get_contents("php://input"), true);

        $totalRoomsBooking = totalRoomsBookingClient($updatebooking['booking']);
        $llegada = new DateTime($updatebooking['booking']['date']['start']);
        $salida = new DateTime($updatebooking['booking']['date']['end']);


        $freeRooms = getFreeRooms($habitacion, $updatebooking['booking']);

        if (empty($freeRooms)) {
            $respuesta = array("respuesta" => "¡Ups!,ya no nos quedan habitaciones disponibles");
        } else {
            $roomsSelectedForClient = getRoomsSelectedForClient($updatebooking['booking'], $freeRooms);

            if (gettype($roomsSelectedForClient) == "string") {

                $respuesta = array("respuesta" => $roomsSelectedForClient);
            } else {
                $dataClient = $cliente->getClienteCorreo($updatebooking['client']['mail'])->fetch_array(MYSQLI_ASSOC);

                $reserva->setIdReserva($updatebooking['idBooking']);
                $reserva->setIdCliente($dataClient['idCliente']);
                $reserva->setLlegada($llegada->format("Y-m-d"));
                $reserva->setSalida($salida->format("Y-m-d"));

                $dataBookingPast = $reserva->getReservaPoridReserva($updatebooking['idBooking']);

                $newQuantityRooms = $totalRoomsBooking + $dataBookingPast['cantidadHabitaciones'];
                $reserva->setCantidadHabitaciones($newQuantityRooms);

                $resultUpdate = $reserva->updateReserva();

                if ($resultUpdate) {


                    $roomAdded = setRoomsToBookingBd(
                        $updatebooking['idBooking'],
                        $habitacion,
                        $dataClient,
                        $llegada->format("Y-m-d"),
                        $salida->format("Y-m-d"),
                        $roomsSelectedForClient
                    );

                    if ($roomAdded !== true) {

                        $respuesta = array("respuesta" => "¡Ups!, hubo un error al realizar la reserva,
                        vuelve a intentarlo más tarde");
                    } else {

                        $pastPay = $pago->getPago($updatebooking['idBooking']);

                        $newDeposit = $updatebooking['booking']['totalDeposit'] + $pastPay['deposito'];
                        $resultPay = $pago->updatePago($updatebooking['idBooking'], $newDeposit);

                        $respuesta = array("respuesta" => $resultPay);
                    }
                }
            }
        }
        echo json_encode($respuesta);


        break;


    case "GET":


        $dataBooking = json_decode($_GET['dataBooking'], true);


        $mailInUse = $cliente->comprobateCorreoEnUso(
            $dataBooking['client']['mail'],
            $dataBooking['client']['name'],
            $dataBooking['client']['lastName']
        );
        $phoneInUse = $cliente->comprobateTelefonoEnUso(
            $dataBooking['client']['phone'],
            $dataBooking['client']['name'],
            $dataBooking['client']['lastName']
        );

        if ($mailInUse) {


            $respuesta = array("advertencia" => "Correo ingresado ya en uso");
        } else if ($phoneInUse) {

            $respuesta = array("advertencia" => "Telefono ingresado ya en uso");
        } else {


            $dataClientExist = $cliente->getClienteExistente(
                $dataBooking['client']['name'],
                $dataBooking['client']['lastName'],
                $dataBooking['client']['mail']
            );


            if ($dataClientExist) {
                $llegada = new DateTime($dataBooking['date']['start']);
                $salida = new DateTime($dataBooking['date']['end']);

                $bookingExisting = $reserva->getReservaPorIdClienteAndFecha(
                    $dataClientExist['idCliente'],
                    $llegada->format("Y-m-d"),
                    $salida->format("Y-m-d")
                );
                $respuesta = array("respuesta" => $bookingExisting);
            } else {

                $respuesta = array("respuesta" => $dataClientExist);
            }
        }
        echo json_encode($respuesta);

        break;
}
