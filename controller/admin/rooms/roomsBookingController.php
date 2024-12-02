<?php

require_once("../../../conexion/conexion.php");

require("../../../model/claseHabitaciones.php");

$claseHabitacion = new habitaciones();
$response = null;

switch ($_SERVER['REQUEST_METHOD']) {

    case "POST":

        $dataBooking = json_decode(file_get_contents("php://input"), true);

        $roomsBooking = $dataBooking['rooms'];

        $conexion = new conexion();

        $resultError = null;
        foreach ($roomsBooking as $roomBooking) {
            try {
                $conexion->conectar()->begin_transaction();

                $resultRoomAdded =  $claseHabitacion->setHabitacionReservada(
                    $dataBooking['idBooking'],
                    $dataBooking['client'],
                    $roomBooking['numRoom'],
                    $dataBooking['startBooking'],
                    $dataBooking['endBooking'],
                    $roomBooking['adults'],
                    $roomBooking['childs']
                );

                if ($resultRoomAdded) {
                    $conexion->conectar()->commit();
                } else {

                    throw new Exception("No se pudo agregar la habitacion");
                }
            } catch (Exception $error) {
                $conexion->conectar()->rollback();
                $resultError = $error->getMessage();
                return;
            } finally {
                $conexion->cerrarConexion();
            }
        }
        if (!$resultError) {

            $response = array("response" => true);
        } else {
            $response = array("response" => false);
        }

        echo json_encode($response);

        break;

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


                $response = $quantityCategorysRoomsReserved;

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

                $response = $dataCategoryRooms;
                break;

            case "getDataRoomsBooking":

                $idBooking = $_GET['idBooking'];
                $roomsDetailsBooking = $claseHabitacion->getHabitaciones($idBooking)->fetch_all(MYSQLI_ASSOC);
                $response = $roomsDetailsBooking;
                break;

            case "getDataRoomsBookingAndCategory":

                $idBooking = $_GET['idBooking'];
                $roomsDetailsBooking = $claseHabitacion->roomsBookingAndDetails($idBooking);

                if (count($roomsDetailsBooking) > 0) {
                    $roomsDetailsBookingFixed = array_map(function ($room) {

                        return array(
                            "numRoom" => $room['numHabitacionReservada'],
                            "category" => $room['categoria'],
                            "image" => base64_encode($room['imagenDos'])

                        );
                    }, $roomsDetailsBooking);
                    $response = $roomsDetailsBookingFixed;
                }

                break;

            case "roomsFreeCategory":

                $dataBooking = json_decode($_GET["dataBooking"], true);

                $allRoomsCategory = $claseHabitacion->getAllRoomsHotelWithDetails($dataBooking["category"]);

                $allRoomsCategory =  array_map(function ($room) {

                    return array(
                        "category" => $room["categoria"],
                        "numRoom" => $room["numHabitacion"],
                        "icon" => base64_encode($room["imagenDos"]),
                        "price" => $room["precio"],
                        "capacity" => $room["capacidad"]
                    );
                }, $allRoomsCategory);

                $roomsFreeCategory  = array_filter($allRoomsCategory, function ($roomCategory) use ($claseHabitacion, $dataBooking) {

                    $bookingsFreeRoom = $claseHabitacion->getHabitacionDisponible(
                        $dataBooking["startBooking"],
                        $dataBooking["endBooking"],
                        $roomCategory["numRoom"]
                    );
                    $allBookingsRoom  = $claseHabitacion->habitacionesReservadas($roomCategory["numRoom"]);

                    if (count($allBookingsRoom) == 0  || count($bookingsFreeRoom) == count($allBookingsRoom)) {

                        return $roomCategory;
                    }
                });

                $response = $roomsFreeCategory;

                break;
        }

        echo json_encode(array_values($response));
        break;
}
