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


            if (gettype($roomsSelectedForClient)=="string") {
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

                        if ($roomAdded) {


                            $resultPago = $pago->setPago($bookingClient['idReserva'], $dataClient['idCliente'], $booking['totalDeposit']);

                            if ($resultPago) {
                                $resultMail = sendMail($client, $llegada, $salida, $booking, "new");

                                if ($resultMail) {

                                    $respuesta = array("respuesta" => $resultMail);
                                }
                            }
                        } else {

                            $respuesta = array("respuesta" => $resultMail);
                        }
                    }
                }
            }
            echo json_encode($respuesta);
        }

        break;


    case "PUT":

        $respuesta;
        $updatebooking = json_decode(file_get_contents("php://input"), true);

        $totalRoomsBooking = totalRoomsBookingClient($updatebooking['booking']);
        $llegada = new DateTime($updatebooking['booking']['date']['start']);
        $salida = new DateTime($updatebooking['booking']['date']['end']);


        $freeRooms = getFreeRooms($habitacion, $updatebooking['booking']);

        $roomsSelectedForClient = getRoomsSelectedForClient($updatebooking['booking'], $freeRooms);


        if (array_key_exists("advertencia", $roomsSelectedForClient)) {
            $respuesta = array("respuesta" => $roomsSelectedForClient['advertencia']);
        } else {

            $dataClient = $cliente->getClienteCorreo($updatebooking['client']['mail'])->fetch_array(MYSQLI_ASSOC);

            $reserva->setIdReserva($updatebooking['idBooking']);
            $reserva->setIdCliente($dataClient['idCliente']);
            $reserva->setLlegada($llegada->format("Y-m-d"));
            $reserva->setSalida($salida->format("Y-m-d"));
            $newQuantityRooms = $totalRoomsBooking + $updatebooking['quantityRoomsBookingPast'];
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

                if ($roomAdded) {

                    $pastPay = $pago->getPago($updatebooking['idBooking']);

                    $newDeposit = $updatebooking['booking']['totalDeposit'] + $pastPay['deposito'];
                    $resultPay = $pago->updatePago($updatebooking['idBooking'], $newDeposit);

                    if ($resultPay) {

                        $bookingRooms = $habitacion->habitacionesDeReserva($updatebooking['idBooking']);

                        $proccesRoom = [];
                        $rooms = [];
                        foreach ($bookingRooms as $room) {

                            if (!in_array($room['numHabitacionReservada'], $proccesRoom)) {

                                $dataRoom = $habitacion->buscarCategoriaPorNumero($room['numHabitacionReservada'])->fetch_array(MYSQLI_ASSOC);

                                $equalsRoom = $habitacion->habitacionesConCategoriaYHuespedesIguales(
                                    $room['idReservaHabitacion'],
                                    $dataRoom['tipoHabitacion'],
                                    $room['adultos'],
                                    $room['ninos']
                                );


                                array_push($rooms, array(
                                    "category" => $dataRoom['tipoHabitacion'],
                                    "guests" => array(
                                        "adult" => $room['adultos'],
                                        "children" => $room['ninos']
                                    ),
                                    "quantity" => count($equalsRoom)
                                ));

                                $proccesRoom = array_map(function ($equalRoom) {

                                    return $equalRoom['numHabitacionReservada'];
                                }, $equalsRoom);
                            }
                        }

                        $bookingUpdateRooms = array("rooms" => $rooms);


                        $resultMail = sendMail($updatebooking['client'], $llegada, $salida, $bookingUpdateRooms, "update");

                        if ($resultMail) {

                            $respuesta = array("respuesta" => $resultMail);
                        }
                    }
                }
            }
        }


        echo json_encode($respuesta);


        break;


    case "GET":


        $dataBooking = json_decode($_GET['dataBooking'], true);

        $dataClientMail = $cliente->getClienteCorreo($dataBooking['client']['mail'])->fetch_array(MYSQLI_ASSOC);
        $dataClientPhone = $cliente->getClienteTelefono($dataBooking['client']['phone'])->fetch_array(MYSQLI_ASSOC);

        if ($dataClientMail) {


            $respuesta = validateUserIncome($dataClientMail, $dataBooking, "Este correo ya esta en uso");

            if ($respuesta) {

                echo json_encode($respuesta);
                break;
            } else {

                updateAtributePhoneClient($dataBooking, $dataClientMail, $cliente);
            }
        }
        if ($dataClientPhone) {

            $respuesta = validateUserIncome($dataClientPhone, $dataBooking, "Este telefono ya esta en uso");

            if ($respuesta) {

                echo json_encode($respuesta);
                break;
            } else {


                updateAtributeMailClient($dataBooking, $dataClientPhone, $cliente);
            }
        }


        $dataClient = $cliente->getClienteExistente(
            $dataBooking['client']['name'],
            $dataBooking['client']['lastName'],
            $dataBooking['client']['mail']
        );


        if ($dataClient) {
            $llegada = new DateTime($dataBooking['date']['start']);
            $salida = new DateTime($dataBooking['date']['end']);

            $bookingExisting = $reserva->getReservaPorIdClienteAndFecha(
                $dataClient['idCliente'],
                $llegada->format("Y-m-d"),
                $salida->format("Y-m-d")
            );
            $respuesta = array("respuesta" => $bookingExisting);
        } else {

            $respuesta = array("respuesta" => $dataClient);
        }


        echo json_encode($respuesta);

        break;
}
