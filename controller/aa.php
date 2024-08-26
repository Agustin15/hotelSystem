<?php

$array =
    [
        "numRoom" => 11,
        "adults" => "1",
        "childrens" => "0"


    ];

$rooms = [];
$numRooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
foreach ($numRooms as $numRoom) {
    if (count(array_keys($array))>3) {
        $rooms = array_filter($array, function ($ar) use ($numRoom) {

            return $ar['numRoom'] == $numRoom;
        });
    }else{
        if(in_array($numRoom,$array)){

            
            array_push($rooms,$numRoom);
        }
    }
}

print_r($rooms);
