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

    public function GET($req)
    {

        if (empty($req['option'])) {
            return array("error" => "Undefined variable option", "status" => 404);
        } else {

            $option = $req['option'];

            switch ($option) {
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

                    try {

                        $gananciasPorMes = [];
                        $gananciasPorMes = array_map(function ($mes) {


                            $totalIngresosMes = $this->pay->calculateTotalIngresosMes($mes, date("Y"));

                            $totalGananciasMes = array("month" => $mes, "revenues" => $totalIngresosMes);

                            return $totalGananciasMes;
                        }, $mesesConsulta);

                        return $gananciasPorMes;
                    } catch (Throwable $th) {
                        return array("error" => $th->getMessage(), "status" => 404);
                    }


                    break;

                case "itemDataDashboard":

                    try {
                        $totalRevenuesActualYear = $this->pay->calculateTotalIngresosAnio();
                        $totalRevenuesActualMonth = $this->pay->calculateTotalIngresosMes(date("m"), date("Y"));

                        $dataRevenuesActual =  array(
                            "totalRevenuesActualYear" => $totalRevenuesActualYear,
                            "totalRevenuesActualMonth" => $totalRevenuesActualMonth
                        );

                        return $dataRevenuesActual;
                    } catch (Throwable $th) {
                        return array("error" => $th->getMessage(), "status" => 404);
                    }

                    break;
                case "getRevenue":

                    try {
                        $idBooking = $req['idBooking'];

                        $revenue =  $this->pay->getPago($idBooking);

                        return $revenue;
                    } catch (Throwable $th) {
                        return array("error" => $th->getMessage(), "status" => 404);
                    }
                    break;
            }
        }
    }

    public function DELETE() {}
}
