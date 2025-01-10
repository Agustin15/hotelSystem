<?php
require("../model/claseHabitaciones.php");

class roomsController
{

    private $rooms;
    public function __construct()
    {

        $this->rooms = new habitaciones();
    }

    public function POST() {}

    public function PUT() {}

    public function DELETE() {}

    public function getAllCategoryRooms($req)
    {

        try {
            $res = null;
            $roomsCategorys = $this->rooms->getAllCategoryRooms();

            if ($roomsCategorys) {

                $roomsCategorys = array_map(function ($room) {

                    return array(
                        "category" => $room['categoria'],
                        "imageTwo" => base64_encode($room['imagenDos'])
                    );
                }, $roomsCategorys);

                $res = $roomsCategorys;
            }

            return $res;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getAllRoomsByCategory($req)
    {

        try {
            $roomsCategory = $this->rooms->getAllRoomsHotelWithDetails($req["category"]);
            $roomsCategory = array_map(function ($room) {

                $bookingRoomBusy = $this->rooms->reservasHabitacionOcupada($room["numHabitacion"], date("Y-m-d"));

                return array(
                    "category" => $room["tipoHabitacion"],
                    "numRoom" => $room["numHabitacion"],
                    "imageTwo" => base64_encode($room["imagenDos"]),
                    "state" => !$bookingRoomBusy ? "available" : "busy",
                    "bookingRoom" => $bookingRoomBusy ? $bookingRoomBusy["idReservaHabitacion"] : null
                );
            }, $roomsCategory);
            return $roomsCategory;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
