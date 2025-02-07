<?php
require "../../model/rooms.php";
$room = new Room();


function quantityCategoryRoom($roomsAvailables, $room, $filter)
{

   $quantityCategory = array_reduce($roomsAvailables, function ($ac, $roomAvailable) use ($filter) {

      ($roomAvailable['tipoHabitacion'] == $filter) ? $ac++ : $ac;
      return $ac;
   }, 0);

   return array("category" => $filter, "quantity" => $quantityCategory);
}

function createRoomData($categoryRoom)
{

   return array(
      "category" => $categoryRoom['categoria'],
      "imageOne" => base64_encode($categoryRoom['imagenUno']),
      "imageTwo" => base64_encode($categoryRoom['imagenDos']),
      "imageThree" => base64_encode($categoryRoom['imagenTres']),
      "beds" => $categoryRoom['camas'],
      "ability" => $categoryRoom['capacidad'],
      "price" => $categoryRoom['precio']
   );
}

switch ($_SERVER['REQUEST_METHOD']) {

   case "GET":

      if ($_GET['option'] == "roomsHotel") {

         try {

            $categoryRooms = $room->getAllCategoryRooms();

            $dataCategoryRoom = array_map(function ($category) {

               return createRoomData($category);
            }, $categoryRooms);

            echo json_encode($dataCategoryRoom);
         } catch (Throwable $th) {
            http_response_code(404);
            echo json_encode(array("error" => $th->getMessage()));
         }
      } else {

         try {

            $dateBooking = json_decode($_GET['dateBooking'], true);


            $roomsHotel = $room->getAllRoomsHotel();


            $roomsAvailablesByDate= array_filter($roomsHotel, function ($roomAvailable) use ($room, $dateBooking) {

               $start = new DateTime($dateBooking['start']);
               $end = new DateTime($dateBooking['end']);

               $roomsBooking = $room->roomsBookingByNumRoom($roomAvailable['numHabitacion']);
               $roomsAvailablesByDate =  $room->getAllRoomsAvailablesByDateAndNumRoom(
                  $start->format("Y-m-d"),
                  $end->format("Y-m-d"),
                  $roomAvailable['numHabitacion']
               );


               if (empty($roomsBooking) || count($roomsBooking) == count($roomsAvailablesByDate)) {

                  return $roomAvailable;
               }
            });

            $categoryQuantity= array_map(function ($detallesCategoriaHabitacion) use ($room, $roomsAvailablesByDate) {

               return quantityCategoryRoom(array_values($roomsAvailablesByDate), $room, $detallesCategoriaHabitacion['categoria']);
            }, $room->getAllCategoryRooms());

            echo json_encode($categoryQuantity);
         } catch (Throwable $th) {
            http_response_code(404);
            echo json_encode(array("error" => $th->getMessage()));
         }
      }


      break;
}
