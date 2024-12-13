<?php
require "../../model/claseHabitaciones.php";
$habitacion = new habitaciones();


function quantityCategoryRoom($habitacionesDisponibles, $habitacion, $filter)
{

   $cantCategoria = array_reduce($habitacionesDisponibles, function ($ac, $habitacionDisponible) use ($filter) {

      ($habitacionDisponible['tipoHabitacion'] == $filter) ? $ac++ : $ac;
      return $ac;
   }, 0);

   return array("category" => $filter, "quantity" => $cantCategoria);
}

function createRoomData($categoriaHabitaciones)
{

   return array(
      "category" => $categoriaHabitaciones['categoria'],
      "imageOne" => base64_encode($categoriaHabitaciones['imagenUno']),
      "imageTwo" => base64_encode($categoriaHabitaciones['imagenDos']),
      "imageThree" => base64_encode($categoriaHabitaciones['imagenTres']),
      "beds" => $categoriaHabitaciones['camas'],
      "ability" => $categoriaHabitaciones['capacidad'],
      "price" => $categoriaHabitaciones['precio']
   );
}

switch ($_SERVER['REQUEST_METHOD']) {

   case "GET":
   
      if ($_GET['option'] == "roomsHotel") {

         try {

            $categoriaHabitacionesHotel = $habitacion->getAllCategoryRooms();

            $datosCategoriaHabitaciones = array_map(function ($categoriaHabitacion) {

               return createRoomData($categoriaHabitacion);
            }, $categoriaHabitacionesHotel);

            echo json_encode($datosCategoriaHabitaciones);
         } catch (Throwable $th) {
            http_response_code(404);
            echo json_encode(array("error" => $th->getMessage()));
         }
      } else {

         try {

            $dateBooking = json_decode($_GET['dateBooking'], true);


            $habitacionesHotel = $habitacion->getAllHabitacionesHotel();


            $habitacionesLibresEnFechaIngresada = array_filter($habitacionesHotel, function ($habitacionHotel) use ($habitacion, $dateBooking) {

               $llegada = new DateTime($dateBooking['start']);
               $salida = new DateTime($dateBooking['end']);

               $reservasHabitacion = $habitacion->habitacionesReservadas($habitacionHotel['numHabitacion']);
               $reservasLibresHabitacion =  $habitacion->getHabitacionDisponible(
                  $llegada->format("Y-m-d"),
                  $salida->format("Y-m-d"),
                  $habitacionHotel['numHabitacion']
               );


               if (empty($reservasHabitacion) || count($reservasHabitacion) == count($reservasLibresHabitacion)) {

                  //esta disponible

                  return $habitacionHotel;
               }
            });

            $categoriasCantidad = array_map(function ($detallesCategoriaHabitacion) use ($habitacion, $habitacionesLibresEnFechaIngresada) {

               return quantityCategoryRoom(array_values($habitacionesLibresEnFechaIngresada), $habitacion, $detallesCategoriaHabitacion['categoria']);
            }, $habitacion->getAllCategoryRooms());

            echo json_encode($categoriasCantidad);
         } catch (Throwable $th) {
            http_response_code(404);
            echo json_encode(array("error" => $th->getMessage()));
         }
      }


      break;
}
