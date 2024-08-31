<?php

require("../../../model/claseReservas.php");
require("../../../model/claseHabitaciones.php");
require("../../../model/clasePago.php");
include("funcionesOpcionReserva.php");

$claseReservas = new reservas();
$claseHabitaciones = new habitaciones();
$clasePago = new pago();

switch ($_SERVER['REQUEST_METHOD']) {

  case "POST":

    $datosReserva = json_decode(file_get_contents("php://input"), true);

    $peticion = null;

    $idClienteReserva = $datosReserva['reserva']['idCliente'];
    $llegada = $datosReserva['reserva']['llegada'];
    $salida = $datosReserva['reserva']['salida'];
    $cantidadHabitaciones = $datosReserva['reserva']['cantidadHabitaciones'];

    $reservasCliente = $claseReservas->getReservaPorIdCliente($idClienteReserva);

    $reservasConflicto = array_filter($reservasCliente, function ($key) use ($salida, $llegada) {

      return strtotime($key['fechaLlegada']) <= strtotime($salida)
        && strtotime($key['fechaSalida']) >= strtotime($llegada);
    });

    if (count($reservasConflicto) > 0) {

      $peticion = array("respuesta" => "Este cliente ya tiene una reserva por estas fechas");
    } else {


      $claseReservas->setIdCliente($idClienteReserva);
      $claseReservas->setLlegada($llegada);
      $claseReservas->setSalida($salida);
      $claseReservas->setCantidadHabitaciones($cantidadHabitaciones);

      $resultado = $claseReservas->addReservaBd();


      $peticion = array("respuesta" => $resultado);
    }

    $peticionJson = json_encode($peticion);

    echo $peticionJson;

    break;
  case "PUT":

    $peticion;

    $cantReservasNoColisionan = 0;
    $datosReserva = json_decode(file_get_contents("php://input"), true);

    $idReserva = $datosReserva['reserva']['idReserva'];
    $idClienteReserva = $datosReserva['reserva']['idCliente'];
    $llegada = $datosReserva['reserva']['llegada'];
    $salida = $datosReserva['reserva']['salida'];
    $cantidadHabitaciones = $datosReserva['reserva']['cantidadHabitaciones'];
    $resultado = null;
    $idClienteUpdate = null;


    $claseReservas->setIdReserva($idReserva);
    $claseReservas->setIdCliente($idClienteReserva);
    $claseReservas->setLlegada($llegada);
    $claseReservas->setSalida($salida);
    $claseReservas->setCantidadHabitaciones($cantidadHabitaciones);


    $reservaActual = $claseReservas->getReservaPoridReserva($idReserva);


    if ($reservaActual['idClienteReserva'] != $idClienteReserva) {

      $reservasDelNuevoCliente = $claseReservas->getReservaPorIdCliente($idClienteReserva);

      if (isset($reservasDelNuevoCliente)) {

        $reservasConflicto = array_filter($reservasDelNuevoCliente, function ($key) use ($salida, $llegada) {

          return strtotime($key['fechaLlegada']) <= strtotime($salida)
            && strtotime($key['fechaSalida']) >= strtotime($llegada);
        });

        if (count($reservasConflicto) > 0) {

          $peticion = array("respuesta" => "Este cliente ya tiene una reserva por estas fechas");
        } else {

          $peticion = updateBooking($idReserva, $llegada, $salida, $claseHabitaciones, $claseReservas, $clasePago);
        }
      }
    } else {

      $peticion = updateBooking($idReserva, $llegada, $salida, $claseHabitaciones, $claseReservas, $clasePago);
    }

    $peticionJson = json_encode($peticion);

    echo $peticionJson;

    break;


  case "DELETE":


    $datosReserva = json_decode($_GET['reserva'], true);

    $resultado = $claseReservas->deleteReserva($datosReserva['idReserva']);

    $peticion = array("resultado" => $resultado);
    $peticionJson = json_encode($peticion);

    echo $peticionJson;

    break;

 
}
