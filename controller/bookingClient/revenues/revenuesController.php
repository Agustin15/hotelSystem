<?php

require("../../model/revenue.php");

class revenuesController
{
    private $pay;

    public function __construct()
    {

        $this->pay = new Revenue();
    }

    public function POST($idBooking, $idClient, $amount)
    {

        try {

            $resultPay = $this->pay->addRevenue($idBooking, $idClient, $amount);
            return $resultPay;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

    public function PUT($idBooking, $newAmount)
    {
        try {

            $resultUpdatePay = $this->pay->updateRevenueById($idBooking, $newAmount);
            return $resultUpdatePay;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }


    public function findRevenueByIdBooking($idBooking)
    {
        try {

            $revenue =  $this->pay->getRevenueById($idBooking);
            return $revenue;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

   
}
