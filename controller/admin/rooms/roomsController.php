<?php
require("../../model/room.php");
require(__DIR__ . "./../authToken.php");

class roomsController
{

    private $rooms, $authToken;
    public function __construct()
    {

        $this->rooms = new Room();
        $this->authToken = new authToken();
    }

    public function PUT($req)
    {
        try {

            $category = $req["category"];
            $imageOne = $req["imageOne"];
            $imageTwo = $req["imageTwo"];
            $imageThree = $req["imageThree"];
            $beds = $req["beds"];
            $capacity = $req["capacity"];
            $terrace = $req["terrace"];
            $price = $req["price"];

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }

            $resultUpdate = $this->rooms->updateRoomData(
                $category,
                $imageOne,
                $imageTwo,
                $imageThree,
                $beds,
                $capacity,
                $terrace,
                $price
            );

            return $resultUpdate;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 500);
        }
    }

    public function DELETE() {}

    public function getAllCategoryRoomsWithDetails()
    {
        try {

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $categoryRooms = $this->rooms->getAllCategoryRooms();

            $categoryRooms = array_map(function ($roomCategory) {

                $roomCategory["imagenUno"] = base64_encode(
                    $roomCategory["imagenUno"]
                );

                $roomCategory["imagenDos"] = base64_encode(
                    $roomCategory["imagenDos"]
                );
                $roomCategory["imagenTres"] = base64_encode(
                    $roomCategory["imagenTres"]
                );

                return $roomCategory;
            }, $categoryRooms);

            return $categoryRooms;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
    public function getAllCategoryRooms()
    {

        try {
            $res = null;

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
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

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $roomsCategory = $this->rooms->getAllRoomsHotelWithDetails($req["category"]);
            $roomsCategory = array_map(function ($room) {

                $bookingRoomBusy = $this->rooms->getStateRoomByNumRoomAndDate($room["numHabitacion"], date("Y-m-d"));

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
