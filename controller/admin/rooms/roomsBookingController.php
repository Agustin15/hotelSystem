<?php

require("../../../model/claseHabitaciones.php");

$claseHabitacion = new habitaciones();


switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":


        switch ($_GET['option']) {
            case "dashboardGraphic":

                $allRoomsReserved = $claseHabitacion->getAllHabitacionesReservadasYear(date("Y"))->fetch_all(MYSQLI_ASSOC);

                $quantityCategorysRoomsReserved = array_map(function ($categoryRoom) use ($allRoomsReserved, $claseHabitacion) {

                    $categoryRoomsReserved = array_filter($allRoomsReserved, function ($roomReserved)
                    use ($categoryRoom, $claseHabitacion) {

                        $dataRoomReserved = $claseHabitacion->buscarCategoriaPorNumero($roomReserved['numHabitacionReservada'])->fetch_array(MYSQLI_ASSOC);

                        return $dataRoomReserved['tipoHabitacion'] == $categoryRoom['categoria'];
                    });

                    return array('categoryRoom' => $categoryRoom['categoria'], 'quantityReserved' => count($categoryRoomsReserved));
                }, $claseHabitacion->getAllCategoryRooms());


                $peticion = $quantityCategorysRoomsReserved;

                break;

            case "itemDataDashboard":

                $categoryRooms = $claseHabitacion->getAllCategoryRooms();

                $dataCategoryRooms = array_map(function ($categoryRoom) use ($claseHabitacion) {
                    $totalRoomCategory = count($claseHabitacion->getAllHabitacionesCategoria($categoryRoom['categoria']));

                    $roomsCategory = $claseHabitacion->getAllHabitacionesCategoria($categoryRoom['categoria']);

                    $totalRoomCategoryBusy = array_reduce($roomsCategory, function ($ac, $roomCategory) use ($claseHabitacion) {

                        $today = date("Y-m-d");
                        $habitacionOcupada = $claseHabitacion->reservasHabitacionOcupada($roomCategory['numHabitacion'], $today);

                        ($habitacionOcupada) ? $ac++ : $ac;

                        return $ac;
                    }, 0);

                    return array(
                        "category" => $categoryRoom['categoria'],
                        "totalRoomCategory" => $totalRoomCategory,
                        "totalRoomCategoryBusy" => $totalRoomCategoryBusy,
                        "totalRoomCategoryFree" => $totalRoomCategory - $totalRoomCategoryBusy
                    );
                }, $categoryRooms);

                $peticion=$dataCategoryRooms;
                break;
        }


        echo json_encode($peticion);
        break;
}