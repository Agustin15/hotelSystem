<?php

require("../../../model/clasePago.php");
$pay = new pago();
$response = null;

switch ($_SERVER['REQUEST_METHOD']) {

    case "POST":
        $dataBooking = json_decode(file_get_contents("php://input"), true);

        $resultPay = $pay->setPago($dataBooking['idBooking'], $dataBooking['client'], $dataBooking['amount']);


        $response = array("response" => $resultPay);

        echo json_encode($response);
        break;


    case "PUT":
        $dataBooking = json_decode(file_get_contents("php://input"), true);

        $resultUpdatePay = $pay->updatePago($dataBooking['idBooking'], $dataBooking['newAmount']);
        $response = array("response" => $resultUpdatePay);

        echo json_encode($response);
        break;



    case "GET":
        switch ($_GET['option']) {
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
                $gananciasPorMes = array_map(function ($mes) use ($pay) {


                    $totalIngresosMes = $pay->calculateTotalIngresosMes($mes, date("Y"));

                    $totalGananciasMes = array("month" => $mes, "revenues" => $totalIngresosMes);

                    return $totalGananciasMes;
                }, $mesesConsulta);

                $response = $gananciasPorMes;

                break;

            case "itemDataDashboard":

                $totalRevenuesActualYear = $pay->calculateTotalIngresosAnio();
                $totalRevenuesActualMonth = $pay->calculateTotalIngresosMes(date("m"), date("Y"));

                $dataRevenuesActual =  array(
                    "totalRevenuesActualYear" => $totalRevenuesActualYear,
                    "totalRevenuesActualMonth" => $totalRevenuesActualMonth
                );

                $response = $dataRevenuesActual;
                break;
            case "getRevenue":

                $idBooking = json_decode($_GET['idBooking']);

                $revenue =  $pay->getPago($idBooking);

                if ($revenue) {

                    $response = $revenue;
                }

                break;
        }

        echo json_encode($response);

        break;
}
