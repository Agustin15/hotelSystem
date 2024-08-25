<?php

function totalRoomsBookingClient($booking)
{

    $totalRoomsBooking = array_reduce($booking['rooms'], function ($ac, $room) {

        $ac += $room['quantity'];
        return $ac;
    }, 0);

    return $totalRoomsBooking;
}

function selectAleatoryRoomCategory($categoryRoom, $freeRooms, $roomBooking)
{

    $roomsForClient = [];
    $roomsCategorySelected = array_values(array_filter($freeRooms, function ($freeRoom) use ($categoryRoom) {
        return $freeRoom['tipoHabitacion'] == $categoryRoom;
    }));

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

    $roomsSelectedForClient = array_map(function ($roomBooking) use ($freeRooms) {

        return selectAleatoryRoomCategory($roomBooking['category'], $freeRooms, $roomBooking);
    }, $booking['rooms']);

    return  $roomsSelectedForClient;
}


function setRoomsToBookingBd($idReserva, $habitacion, $dataClient, $llegada, $salida, $roomsSelectedForClient)
{


    foreach ($roomsSelectedForClient as $room) {

          foreach($room as $roomData){
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

function sendMail($client, $llegada, $salida, $booking,$option)
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


function validateUserIncome($dataClient,$dataBooking,$msj){

    $respuesta=null;
    if (
        $dataClient['nombre'] != $dataBooking['client']['name'] && $dataClient['apellido'] !=
        $dataBooking['client']['lastName']
    ) {

        $respuesta = array("respuesta" => $msj);
    }

    return $respuesta;
}