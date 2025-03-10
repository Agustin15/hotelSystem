<?php

require_once("../../config/connection.php");
require("../../model/room.php");


class roomsBookingController
{

    private $rooms;

    public function __construct()
    {

        $this->rooms = new Room();
    }

    public function POST($rooms, $idBooking, $idClient, $startBooking, $endBooking)
    {

        try {

            $result = null;
            $error = false;
            $roomsToBooking = $this->roomsToAssing($rooms, $startBooking, $endBooking);


            if (isset($roomsToBooking['error'])) {

                throw new Error($roomsToBooking['error']);
            }
            foreach ($roomsToBooking as $roomToBooking) {

                $roomAdded = $this->rooms->addRoomBooking(
                    $idBooking,
                    $idClient,
                    $roomToBooking['numRoom'],
                    $startBooking,
                    $endBooking,
                    $roomToBooking['adults'],
                    $roomToBooking['childs']
                );

                if (!$roomAdded) {
                    $error = true;
                    throw new Error("Error al agregar habitacion");
                }
            }

            if (!$error) {
                $result = true;
            } else {
                $result = false;
            }
            return $result;
        } catch (Throwable $th) {

            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

    public function roomsToAssing($rooms, $startBooking, $endBooking)
    {


        $roomsNotAvailables = false;
        $roomsAssingned = [];

        foreach ($rooms as $room) {

            $roomsByCategory =  $this->rooms->getRoomsByCategory($room['category']);

            $roomsCategoryAvailables =  array_filter($roomsByCategory, function ($roomByCategory) use ($startBooking, $endBooking) {

                $bookingsOfRoom =  $this->rooms->roomsBookingByNumRoom($roomByCategory['numHabitacion']);

                $bookingsOfRoomNotMatchDate =  $this->rooms->getAllRoomsAvailablesByDateAndNumRoom($startBooking, $endBooking, $roomByCategory['numHabitacion']);

                if (
                    count($bookingsOfRoom) == 0 ||
                    count($bookingsOfRoomNotMatchDate) == count($bookingsOfRoom)
                ) {
                    return $roomByCategory;
                }
            });

            $roomsCategoryAvailables = array_values($roomsCategoryAvailables);
            if (count($roomsCategoryAvailables) < $this->totalRoomsEqualQuantity($rooms, $room['category'])) {
                $roomsNotAvailables = true;
                break;
            }

            $quantityRoomsAddedToArray = 0;

            for ($f = 0; $f <= count($roomsCategoryAvailables); $f++) {

                $roomInAssinged = $this->findNumRoomInRoomsAssigned(
                    $roomsAssingned,
                    $roomsCategoryAvailables[$f]["numHabitacion"]
                );

                if (!$roomInAssinged) {
                    if ($quantityRoomsAddedToArray < $room["quantity"]) {
                        array_push(
                            $roomsAssingned,
                            array("numRoom" => $roomsCategoryAvailables[$f]["numHabitacion"], "adults" =>
                            $room["guests"]["adult"], "childs" => $room["guests"]["children"])
                        );
                        $quantityRoomsAddedToArray++;
                    } else {
                        break;
                    }
                }
            }
        }

        if ($roomsNotAvailables == true) {
            return array("error" => "Error,no hay habitaciones suficientes");
        }
        return $roomsAssingned;
    }




    public function findNumRoomInRoomsAssigned($roomsAssingned, $numRoom)
    {

        $found = FALSE;
        $quantityFoundNumRoom = array_filter($roomsAssingned, function ($room) use ($numRoom) {

            $key = array_search($numRoom, $room);
            if ($key) {
                return $room;
            }
        });

        if (count($quantityFoundNumRoom) > 0) {
            $found = TRUE;
        }

        return $found;
    }

    public function totalRoomsEqualQuantity($roomsBooking, $category)
    {

        $totalEqualRooms  = array_reduce($roomsBooking, function ($ac, $roomBooking) use ($category) {

            if ($roomBooking['category'] == $category) {
                $ac++;
            }
            return $ac;
        }, 0);

        return $totalEqualRooms;
    }
    public function getRoomsFreeCategory($req)
    {

        try {

            $allRoomsCategory = $this->rooms->getAllRoomsHotelWithDetails($req['dataBooking']["category"]);

            $allRoomsCategory =  array_map(function ($room) {

                return array(
                    "category" => $room["categoria"],
                    "numRoom" => $room["numHabitacion"],
                    "icon" => base64_encode($room["imagenDos"]),
                    "price" => $room["precio"],
                    "capacity" => $room["capacidad"]
                );
            }, $allRoomsCategory);

            $roomsFreeCategory  = array_filter($allRoomsCategory, function ($roomCategory) use ($req) {

                $bookingsFreeRoom = $this->rooms->getAllRoomsAvailablesByDateAndNumRoom(
                    $req['dataBooking']["startBooking"],
                    $req['dataBooking']["endBooking"],
                    $roomCategory["numRoom"]
                );
                $allBookingsRoom  = $this->rooms->roomsBookingByNumRoom($roomCategory["numRoom"]);

                if (count($allBookingsRoom) == 0  || count($bookingsFreeRoom) == count($allBookingsRoom)) {

                    return $roomCategory;
                }
            });

            return array_values($roomsFreeCategory);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
