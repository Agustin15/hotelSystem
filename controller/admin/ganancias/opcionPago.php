<?php

require("../../../model/clasePago.php");
$clasePago = new pago();
$peticion = null;

switch ($_SERVER['REQUEST_METHOD']) {


    case "GET":

        if ($_GET['option'] == "dashboardGraphic") {

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
            $gananciasPorMes = array_map(function ($mes) use ($clasePago) {


                $totalIngresosMes = $clasePago->calculateTotalIngresosMes($mes, date("Y"));

                $totalGananciasMes = array("month" => $mes, "revenues" => $totalIngresosMes);

                return $totalGananciasMes;
            }, $mesesConsulta);

            $peticion = $gananciasPorMes;
        }

        echo json_encode($peticion);

        break;
}
