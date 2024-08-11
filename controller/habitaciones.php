<?php

$dateBooking = json_decode($_GET['dateBooking'], true);



require "../model/claseHabitaciones.php";
$habitacion = new habitaciones();

function createRoomData($habitacion, $habitacionHotel)
{

   $categoriaHabitacion = $habitacion->buscarCategoriaPorNumero($habitacionHotel['numHabitacion']);

   $categoriaHabitacion = $categoriaHabitacion->fetch_array(MYSQLI_ASSOC);

   $datosHabitacion = $habitacion->getPrecioHabitacion($categoriaHabitacion['tipoHabitacion']);

   return array(
      "category" => $categoriaHabitacion['tipoHabitacion'],
      "imageOne" => base64_encode($datosHabitacion['imagenUno']),
      "imageTwo" => base64_encode($datosHabitacion['imagenDos']),
      "imageThree" => base64_encode($datosHabitacion['imagenTres']),
      "numberRoom" => $habitacionHotel['numHabitacion'],
      "beds" => $datosHabitacion['camas'],
      "ability" => $datosHabitacion['capacidad'],
      "price" => $datosHabitacion['precio']
   );
}


$habitacionesHotel = $habitacion->getAllHabitacionesHotel();


$habitacionesDisponibles = array_map(function ($habitacionHotel) use ($habitacion, $dateBooking) {

   $llegada = new DateTime($dateBooking['start']);
   $salida = new DateTime($dateBooking['end']);

   $reservasHabitacion = $habitacion->habitacionesReservadas($habitacionHotel['numHabitacion']);
   $habitacionesConFechaDisponible =  $habitacion->getHabitacionDisponible(
      $llegada->format("Y-m-d"),
      $salida->format("Y-m-d"),
      $habitacionHotel['numHabitacion']
   );


   if (empty($reservasHabitacion) || count($reservasHabitacion) == count($habitacionesConFechaDisponible)) {

      //esta disponible
      return createRoomData($habitacion, $habitacionHotel);
   }
}, $habitacionesHotel);


echo json_encode($habitacionesDisponibles);
