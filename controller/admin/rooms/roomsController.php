<?php
require("../../../model/claseHabitaciones.php");
$rooms = new habitaciones();
$response = null;

switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":

        $roomsCategorys = $rooms->getAllCategoryRooms();

        if ($roomsCategorys) {

            $roomsCategorys = array_map(function($room) {

                return array(
                    "category" => $room['categoria'],
                    "imageTwo" => base64_encode($room['imagenDos'])
                );
            }, $roomsCategorys);

            $response=$roomsCategorys;
        }

        echo json_encode($response);

        break;
}
