<?php

require("../../model/clasePago.php");

class revenuesController
{
    private $pay;

    public function __construct()
    {

        $this->pay = new pago();
    }

    public function POST($req)
    {

        try {

            $resultPay = $this->pay->setPago($req['idBooking'], $req['client'], $req['amount']);
            return array("response" => $resultPay);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

    public function PUT($req)
    {
        try {

            $resultUpdatePay = $this->pay->updatePago($req['idBooking'], $req['newAmount']);
            return array("response" => $resultUpdatePay);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }


    public function getRevenueByIdBooking($req)
    {
        try {
            $idBooking = $req['idBooking'];

            $revenue =  $this->pay->getPago($idBooking);

            return $revenue;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }
}
