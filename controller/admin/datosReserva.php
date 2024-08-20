<?php

$clientBooking = json_decode(file_get_contents("php://input"), true);

if (empty($clientBooking)) {

    header("Location:../views/consultaHabitaciones.php");
} else {


    $client = $clientBooking['client'];
    $booking = $clientBooking['booking'];

    require "../../model/claseHabitaciones.php";
    require "../../model/claseReserva.php";

    $habitacion = new habitaciones();
    $reserva = new reserva();

    $freeRooms = [];

    $freeRooms = array_map(function ($roomHotel) use ($habitacion, $booking) {

        $reservasHabitacion = $habitacion->habitacionesReservadas($roomHotel);

        $reservasHabitacionQueNoColisionan = $habitacion->getHabitacionDisponible($booking['date']['start'], $booking['date']['end'], $roomHotel['numHabitacion']);

        if (empty($reservasHabitacion) || count($reservasHabitacion) == count($reservasHabitacionQueNoColisionan)) {

            return $roomHotel;
        }
    }, $habitacion->getAllHabitacionesHotel());



    $roomsSelectedForClient = array_map(function ($roomBooking) use ($freeRooms) {

        return selectAleatoryRoomCategory($roomBooking['category'], $freeRooms);
    }, $booking['rooms']);



    function selectAleatoryRoomCategory($categoryRoom, $freeRooms)
    {


        $roomsCategorySelected = array_filter($freeRooms, function ($freeRoom) use ($categoryRoom) {
            return $freeRoom['tipoHabitacion'] == $categoryRoom;
        });

        $roomSelectedForClient = rand(min($roomsCategorySelected), max($roomsCategorySelected));

        return $roomSelectedForClient;
    }
}
