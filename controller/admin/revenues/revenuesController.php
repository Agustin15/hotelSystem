<?php

require("../../model/revenue.php");
require(__DIR__ . "./../authToken.php");
class revenuesController
{
    private $pay, $authToken;

    public function __construct()
    {

        $this->pay = new Revenue();
        $this->authToken = new authToken();
    }

    public function POST($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $resultPay = $this->pay->addRevenue($req['idBooking'], $req['client'], $req['amount']);
            return array("response" => $resultPay);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 502);
        }
    }

    public function PUT($req)
    {
        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $resultUpdatePay = $this->pay->updateRevenueById($req['idBooking'], $req['newAmount']);
            return array("response" => $resultUpdatePay);
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getDashboardGraphic($req)
    {
        $months = array(
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
        );

        $year = $req["year"];
        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $revenuesByMonth = [];
            $revenuesByMonth = array_map(function ($month) use ($year) {

                $amountByMonth = $this->pay->calculateTotalMonthRevenues($month, $year);

                $amountRevenuesByMonth = array("month" => $month, "revenues" => $amountByMonth);

                return $amountRevenuesByMonth;
            }, $months);

            return $revenuesByMonth;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getItemDataDashboard($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }
            $totalRevenuesActualYear = $this->pay->calculateTotalYearRevenues();
            $totalRevenuesActualMonth = $this->pay->calculateTotalMonthRevenues(date("m"), date("Y"));

            $dataRevenuesActual =  array(
                "totalRevenuesActualYear" => $totalRevenuesActualYear,
                "totalRevenuesActualMonth" => $totalRevenuesActualMonth
            );

            return $dataRevenuesActual;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }



    public function getRevenueByIdBooking($req)
    {
        try {
            $idBooking = $req['idBooking'];
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }

            $revenue =  $this->pay->getRevenueById($idBooking);

            return $revenue;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);
        }
    }

    public function getAllYearsRevenues($req)
    {

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }

            $yearsRevenues = $this->pay->getAllYearsRevenues();
            return $yearsRevenues;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);;
        }
    }

    public function getAllRevenuesByYearLimitIndex($req)
    {

        $year = $req["year"];
        $index = $req["index"];

        try {
            $tokenVerify = $this->authToken->verifyToken();
            if (isset($tokenVerify["error"])) {
                throw new Error($tokenVerify["error"]);
            }

            $revenues = $this->pay->getAllRevenuesByYearLimitIndex($year, $index);
            return $revenues;
        } catch (Throwable $th) {
            return array("error" => $th->getMessage(), "status" => 404);;
        }
    }


    public function DELETE() {}
}
