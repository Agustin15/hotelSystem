<?php

function totalRoomsBookingClient($booking)
{

    $totalRoomsBooking = array_reduce($booking['rooms'], function ($ac, $room) {

        $ac += $room['quantity'];
        return $ac;
    }, 0);

    return $totalRoomsBooking;
}

function selectAleatoryRoomCategory(
    $categoryRoom,
    $freeRooms,
    $roomBooking,
    $roomsSelectedForClient,
    $bookingRooms
) {

    $roomsForClient = [];
    $roomsCategorySelected = array_values(array_filter($freeRooms, function ($freeRoom) use ($categoryRoom) {
        return $freeRoom['tipoHabitacion'] == $categoryRoom;
    }));

    $numRoomsCategorySelected = array_map(function ($room) {

        return $room['numHabitacion'];
    }, $roomsCategorySelected);



    $totalCategoryRoomsBooking = array_reduce($bookingRooms, function ($ac, $room) use ($categoryRoom) {

        if ($room['category'] == $categoryRoom) $ac++;
        return $ac;
    }, 0);



    if (count($numRoomsCategorySelected) < $totalCategoryRoomsBooking) {

        return array("advertencia" => "No hay habitaciones " . $categoryRoom . " suficientes");
    } else {

        foreach ($numRoomsCategorySelected as $numRoom) {

            if (
                count($roomsForClient) == $roomBooking['quantity']
            ) break;

            $roomIsSelected = false;

            if (!empty($roomsSelectedForClient)) {

                $arrayFlatted = [];
                foreach ($roomsSelectedForClient as $rooms) {

                    foreach ($rooms as $room) {
                        array_push($arrayFlatted, $room);
                    }
                }

                $roomIsSelected = array_filter($arrayFlatted, function ($room) use ($numRoom) {

                    return $room['numRoom'] == $numRoom;
                });

                if (count($roomIsSelected) > 0) {

                    $roomIsSelected = true;
                }
            }

            if ($roomIsSelected == false) {

                $roomForClient = array(
                    "numRoom" => $numRoom,
                    "adults" => $roomBooking['guests']['adult'],
                    "childrens" => $roomBooking['guests']['children']

                );
                array_push($roomsForClient, $roomForClient);
            }
        }
    }



    return $roomsForClient;
}


function getFreeRooms($habitacion, $booking)
{
    $freeRooms = array_filter($habitacion->getAllHabitacionesHotel(), function ($roomHotel)
    use ($habitacion, $booking) {

        $reservasHabitacion = $habitacion->habitacionesReservadas($roomHotel['numHabitacion']);

        $reservasHabitacionQueNoColisionan = $habitacion->getHabitacionDisponible($booking['date']['start'], $booking['date']['end'], $roomHotel['numHabitacion']);

        if (empty($reservasHabitacion) || count($reservasHabitacion) == count($reservasHabitacionQueNoColisionan)) {

            return $roomHotel;
        }
    });

    $freeRooms = array_values($freeRooms);

    return $freeRooms;
}

function getRoomsSelectedForClient($booking, $freeRooms)
{

    $roomsSelectedForClient = [];

    foreach ($booking['rooms'] as $roomBooking) {


        $roomForClient = selectAleatoryRoomCategory(
            $roomBooking['category'],
            $freeRooms,
            $roomBooking,
            $roomsSelectedForClient,
            $booking['rooms']
        );

        if (array_key_exists("advertencia", $roomForClient)) {
            return $roomForClient["advertencia"];
        } else {
            array_push($roomsSelectedForClient, $roomForClient);
        }
    }

    return  $roomsSelectedForClient;
}


function setRoomsToBookingBd($idReserva, $habitacion, $dataClient, $llegada, $salida, $roomsSelectedForClient)
{


    foreach ($roomsSelectedForClient as $room) {

        foreach ($room as $roomData) {
            $roomAdded = $habitacion->setHabitacionReservada(
                $idReserva,
                $dataClient['idCliente'],
                $roomData['numRoom'],
                $llegada,
                $salida,
                $roomData['adults'],
                $roomData['childrens']
            );
        }
    }


    return $roomAdded;
}

function sendMail($client, $llegada, $salida, $booking, $option)
{

    $correo = new correo(
        $client['name'],
        $client['lastName'],
        $client['mail'],
        $client['phone'],
        $llegada->format("Y-m-d"),
        $salida->format("Y-m-d"),
        $booking['rooms'],
        $option
    );

    return $correo->sendMail();
}


function validateUserIncome($dataClient, $dataBooking, $msj)
{

    $respuesta = null;
    if (
        $dataClient['nombre'] != $dataBooking['client']['name'] || $dataClient['apellido'] !=
        $dataBooking['client']['lastName']
    ) {

        $respuesta = array('advertencia' => $msj);
    }

    return $respuesta;
}

function updateAtributePhoneClient($dataBooking,$dataClient,$cliente)
{

    if (
        $dataClient['nombre'] == $dataBooking['client']['name'] && $dataClient['apellido']
        == $dataBooking['client']['lastName'] && $dataClient['correo'] ==
        $dataBooking['client']['mail'] && $dataClient['telefono'] !=
        $dataBooking['client']['phone']
    ) {


        $cliente->updatePhone($dataBooking['client']['phone'],$dataClient['idCliente']);
    }
}


function updateAtributeMailClient($dataBooking,$dataClient,$cliente)
{

    if (
        $dataClient['nombre'] == $dataBooking['client']['name'] && $dataClient['apellido']
        == $dataBooking['client']['lastName']  && $dataClient['telefono'] ==
        $dataBooking['client']['phone'] && $dataClient['correo'] !=
        $dataBooking['client']['mail']
    ) {


        $cliente->updateMail($dataBooking['client']['mail'],$dataClient['idCliente']);
    }
}
