<?php

require("../model/clasePago.php");

class revenuesController
{
    private $pay;

    public function __construct()
    {

        $this->pay = new pago();
    }

    public function POST($req)
    {

        $res = null;
        $resultPay = $this->pay->setPago($req['idBooking'], $req['client'], $req['amount']);


        $res = array("response" => $resultPay);

        return $res;
    }

    public function PUT($req)
    {
        $res = null;
        $resultUpdatePay = $this->pay->updatePago($req['idBooking'], $req['newAmount']);
        $res = array("response" => $resultUpdatePay);

        return $res;
    }

    public function GET($req)
    {
        $res = null;
        switch ($req['option']) {
            case "dashboardGraphic":

                $mesesConsulta = array(
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


                $gananciasPorMes = [];
                $gananciasPorMes = array_map(function ($mes) {


                    $totalIngresosMes = $this->pay->calculateTotalIngresosMes($mes, date("Y"));

                    $totalGananciasMes = array("month" => $mes, "revenues" => $totalIngresosMes);

                    return $totalGananciasMes;
                }, $mesesConsulta);

                $res = $gananciasPorMes;

                break;

            case "itemDataDashboard":

                $totalRevenuesActualYear = $this->pay->calculateTotalIngresosAnio();
                $totalRevenuesActualMonth = $this->pay->calculateTotalIngresosMes(date("m"), date("Y"));

                $dataRevenuesActual =  array(
                    "totalRevenuesActualYear" => $totalRevenuesActualYear,
                    "totalRevenuesActualMonth" => $totalRevenuesActualMonth
                );

                $res = $dataRevenuesActual;
                break;
            case "getRevenue":

                $idBooking = $req['idBooking'];

                $revenue =  $this->pay->getPago($idBooking);

                if ($revenue) {

                    $res = $revenue;
                }

                break;
        }

        return $res;
    }

    public function DELETE(){}
}
