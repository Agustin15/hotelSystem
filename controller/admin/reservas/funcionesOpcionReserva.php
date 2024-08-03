<?php



function updateBooking($idReserva, $llegada, $salida, $claseHabitaciones, $claseReservas, $clasePago)
{

  $peticion = null;

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

  return $peticion;
}


?>