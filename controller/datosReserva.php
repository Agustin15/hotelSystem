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

            $roomsSelectedForClient = getRoomsSelectedForClient($booking, $freeRooms);


            if (gettype($roomsSelectedForClient[0]) == "string") {

                $respuesta = array("respuesta" => $roomsSelectedForClient[0]);
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


                        $roomAdded = setRoomsToBookingBd($bookingClient['idReserva'], $habitacion, $dataClient, $llegada, $salida, $roomsSelectedForClient);

                        if ($roomAdded) {


                            $resultPago = $pago->setPago($bookingClient['idReserva'], $dataClient['idCliente'], $booking['totalDeposit']);

                            if ($resultPago) {
                                $resultMail = sendMail($client, $llegada, $salida, $booking);

                                if ($resultMail) {

                                    $respuesta = array("respuesta" => $resultMail);
                                }
                            }
                        }
                    }
                }
            }
            echo json_encode($respuesta);
        }

        break;


    case "PUT":

        $updatebooking = json_decode(file_get_contents("php://input"), true);

        $totalRoomsBooking = totalRoomsBookingClient($updatebooking['booking']);
        $llegada = new DateTime($updatebooking['booking']['date']['start']);
        $salida = new DateTime($updatebooking['booking']['date']['end']);


        $freeRooms = getFreeRooms($habitacion, $updatebooking['booking']);

        // $roomsSelectedForClient = getRoomsSelectedForClient($updatebooking['booking'], $freeRooms);


        // if (gettype($roomsSelectedForClient[0]) == "string") {

        //     $respuesta = array("respuesta" => $roomsSelectedForClient[0]);
        // } else {

        //     $dataClient = $cliente->getClienteCorreo($updatebooking['client']['mail'])->fetch_array(MYSQLI_ASSOC);



        //     $reserva->setIdCliente($dataClient['idCliente']);
        //     $reserva->setLlegada($llegada->format("Y-m-d"));
        //     $reserva->setSalida($salida->format("Y-m-d"));
        //     $reserva->setCantidadHabitaciones($totalRoomsBooking + $updatebooking['quantityRoomsBookingPast']);

        //     $resultUpdate = $reserva->updateReserva();

        //     if ($resultUpdate) {


        //         $roomAdded = setRoomsToBookingBd(
        //             $updatebooking['idBooking'],
        //             $habitacion,
        //             $dataClient,
        //             $llegada->format("Y-m-d"),
        //             $salida->format("Y-m-d"),
        //             $roomsSelectedForClient
        //         );

        //         if ($roomAdded) {

        //             $pastPay = $pago->getPago($updatebooking['idBooking']);

        //             $newDeposit = $updatebooking['booking']['totalDeposit'] + $pastPay['deposito'];
        //             $resultPago = $pago->updatePago($updatebooking['idBooking'], $newDeposit);

        //             if ($resultPay) {

        //                 $respuesta = array("respuesta" => $resultPay);
        //             }
        //         }
        //     }
        // }


        echo json_encode($freeRooms);


        break;


    case "GET":

        $dataBooking = json_decode($_GET['dataBooking'], true);

        $dataClient = $cliente->getClienteCorreo($dataBooking['client']['mail'])->fetch_array(MYSQLI_ASSOC);

        $llegada = new DateTime($dataBooking['date']['start']);
        $salida = new DateTime($dataBooking['date']['end']);

        $bookingExisting = $reserva->getReservaPorIdClienteAndFecha(
            $dataClient['idCliente'],
            $llegada->format("Y-m-d"),
            $salida->format("Y-m-d")
        );


        $respuesta = json_encode($bookingExisting);
        echo $respuesta;
        break;
}
