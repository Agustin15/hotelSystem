<?php

require "../model/claseHabitaciones.php";
require "../model/claseReservas.php";
require "../model/claseCliente.php";
require "../model/claseCorreo.php";
require "../model/clasePago.php";

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

            $freeRooms = [];


            $totalRoomsBooking = array_reduce($booking['rooms'], function ($ac, $room) {

                $ac += $room['quantity'];
                return $ac;
            }, 0);

            function selectAleatoryRoomCategory($categoryRoom, $freeRooms, $roomBooking)
            {

                $roomsForClient = [];
                $roomsCategorySelected = array_filter($freeRooms, function ($freeRoom) use ($categoryRoom) {
                    return $freeRoom['tipoHabitacion'] == $categoryRoom;
                });


                $numRoomsCategorySelected = array_map(function ($room) {

                    return $room['numHabitacion'];
                }, $roomsCategorySelected);


                if (count($numRoomsCategorySelected) < $roomBooking['quantity']) {

                    return "No hay habitaciones " . $categoryRoom . " suficientes";
                } else {

                    foreach ($numRoomsCategorySelected as $numRoom) {

                        if (count($roomsForClient) == $roomBooking['quantity']) break;

                        $roomForClient = array(
                            "numRoom" => $numRoom,
                            "adults" => $roomBooking['guests']['adult'],
                            "childrens" => $roomBooking['guests']['children']
                        );
                        array_push($roomsForClient, $roomForClient);
                    }
                }

                return $roomsForClient;
            }


            $freeRooms = array_map(function ($roomHotel) use ($habitacion, $booking) {

                $reservasHabitacion = $habitacion->habitacionesReservadas($roomHotel['numHabitacion']);

                $reservasHabitacionQueNoColisionan = $habitacion->getHabitacionDisponible($booking['date']['start'], $booking['date']['end'], $roomHotel['numHabitacion']);

                if (empty($reservasHabitacion) || count($reservasHabitacion) == count($reservasHabitacionQueNoColisionan)) {

                    return $roomHotel;
                }
            }, $habitacion->getAllHabitacionesHotel());



            $roomsSelectedForClient = array_map(function ($roomBooking) use ($freeRooms) {

                return selectAleatoryRoomCategory($roomBooking['category'], $freeRooms, $roomBooking);
            }, $booking['rooms']);


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

                        foreach ($roomsSelectedForClient as $room) {

                            foreach ($room as $roomData) {

                                $roomAdded = $habitacion->setHabitacionReservada(
                                    $bookingClient['idReserva'],
                                    $dataClient['idCliente'],
                                    $roomData['numRoom'],
                                    $llegada->format("Y-m-d"),
                                    $salida->format("Y-m-d"),
                                    $roomData['adults'],
                                    $roomData['childrens']
                                );
                            }
                        }

                        if ($roomAdded) {

                            $correo = new correo(
                                $client['name'],
                                $client['lastName'],
                                $client['mail'],
                                $client['phone'],
                                $llegada->format("Y-m-d"),
                                $salida->format("Y-m-d"),
                                $booking['rooms']
                            );


                            $resultPago = $pago->setPago($bookingClient['idReserva'], $dataClient['idCliente'], $booking['totalDeposit']);

                            if ($resultPago) {
                                $resultMail = $correo->sendMail();

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
