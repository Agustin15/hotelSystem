<?php

require("../../../model/claseReservas.php");
require("../../../model/claseHabitaciones.php");
require("../../../model/clasePago.php");

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

    $cantReservasNoColisionan = 0;
    $datosReserva = json_decode(file_get_contents("php://input"), true);

    $peticion = null;

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


          $llegada = new DateTime($llegada);
          $salida = new DateTime($salida);
          $noches = $llegada->diff($salida)->days;
          $totalHabitaciones = 0;
          $habitacionesReservadas = $claseHabitaciones->getHabitaciones($idReserva);

          foreach ($habitacionesReservadas->fetch_all(MYSQLI_ASSOC) as $habitacionReservada) {

            $habitacion = $claseHabitaciones->buscarCategoriaPorNumero($habitacionReservada['numHabitacionReservada']);
            $habitacion = $habitacion->fetch_array(MYSQLI_ASSOC);
            $precioHabitacion = $claseHabitaciones->getPrecioHabitacion($habitacion['tipoHabitacion']);
            $precioEstadiaHabitacion = $precioHabitacion['precio'] * $noches;
            $totalHabitaciones += $precioEstadiaHabitacion;
          }

          $resultado = $claseReservas->updateReserva();

          if ($resultado) {

            $claseHabitaciones->updateFechasHabitacionReservada(
              $llegada->format("Y-m-d"),
              $salida->format("Y-m-d"),
              $idReserva
            );
            $resultado = $clasePago->updatePago($idReserva, $totalHabitaciones);
            $peticion = array("respuesta" => $resultado);
          }
        }
      }
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
