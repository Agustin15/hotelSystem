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

    public function GET($req)
    {

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
    }
}
