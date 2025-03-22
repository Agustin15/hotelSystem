<?php

require("../../model/bill.php");
require("../../model/service.php");
require("../../model/room.php");
require(__DIR__ . "../../authToken.php");



class billController
{
    private $bill, $room, $service, $authToken;
    public function __construct()
    {
        $this->bill = new Bill();
        $this->service = new Service();
        $this->room = new Room();
        $this->authToken = new authToken();
    }

    public function detailsBill($req)
    {

        try {

            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                return array("error" => $tokenVerify["error"], "status" => 401);
            }
            $idBooking = $req["idBooking"];
            $roomsBooking = $this->room->roomsBookingAndDetails($idBooking);

            if ($roomsBooking) {
                $roomsBooking = array_map(function ($room) {
                    $start = new DateTime($room["fechaLlegadaHabitacion"]);
                    $end = new DateTime($room["fechaSalidaHabitacion"]);
                    $nights =  intval($end->diff($start)->format("%d"));
                    $amount = $room["precio"] * $nights;
                    return array(
                        "description" => "Habitacion " . $room["numHabitacionReservada"] . " " . $room["categoria"],
                        "price" => $room["precio"],
                        "quantity" => 1,
                        "amount" => $amount
                    );
                }, $roomsBooking);
            }

            $servicesBooking = $this->service->getServicesByIdBookingWithDetails($idBooking)->fetch_all(MYSQLI_ASSOC);

            if ($servicesBooking) {
                $servicesBooking = array_map(function ($service) {
                    return array(
                        "description" => "Servicio " . $service["nombreServicio"] . ($service["nombreServicio"] == "Minibar" || $service["nombreServicio"] == "Cantina" ?
                            "(" . $service["descripcionServicio"] . ")" : "") . " a la habitacion " . $service["numHabitacionServicio"],
                        "price" => $service["precio"],
                        "quantity" => $service["cantidad"],
                        "amount" => $service["precio"] * $service["cantidad"]
                    );
                }, $servicesBooking);
            }

            $this->bill->setBillRooms($roomsBooking);
            $this->bill->setBillServices($servicesBooking);
            $this->bill->setBillDetails();

            return $this->bill->getBillDetails();
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
