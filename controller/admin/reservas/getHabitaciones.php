<?php

$idReserva = $_GET['idReserva'];
$opcion = $_GET['opcion'];

require("../../../model/claseHabitaciones.php");
require("../../../model/claseReservas.php");
$claseHabitaciones = new habitaciones();
$claseReservas = new reservas();

$reserva = $claseReservas->getReservaPoridReserva($idReserva);

$peticion = null;

if ($opcion == "remplazar") {

    $habitaciones = $claseHabitaciones->getHabitaciones($idReserva);
    if (empty($habitaciones->fetch_all(MYSQLI_ASSOC))) {

        $peticion = array("Sin habitaciones");
    } else {

        $habitaciones = $claseHabitaciones->getHabitaciones($idReserva);
        $peticion = array(
            "llegada" => $reserva['fechaLlegada'], "salida" => $reserva['fechaSalida'], 
            "habitaciones" => $habitaciones->fetch_all(MYSQLI_ASSOC)
        );
    }
} else {

    $peticion = array("llegada" => $reserva['fechaLlegada'], "salida" => $reserva['fechaSalida']);
}

echo json_encode($peticion);
