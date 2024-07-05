<?php

require "../../../model/claseServicios.php";
require "../../../model/clasePago.php";
$claseServicio = new servicio();
$clasePago = new pago();

switch ($_SERVER["REQUEST_METHOD"]) {

    case "POST":

        $servicio = json_decode(file_get_contents("php://input"), true);

        $resultado = $claseServicio->addServiceToRoom(
            $servicio['idServicio'],
            $servicio['cantidad'],
            $servicio['idReserva'],
            $servicio['numHabitacion']
        );

        if ($resultado) {

            $datosServicio = $claseServicio->getServicioHotel($servicio['idServicio']);
            $totalServicio = $claseServicio->calculateTotalService(
                $servicio['cantidad'],
                $datosServicio['precio']
            );

            $pagoReserva = $clasePago->getPago($servicio['idReserva']);
            $nuevoDeposito = $pagoReserva['deposito'] + $totalServicio;

            $resultado = $clasePago->updatePago($servicio['idReserva'], $nuevoDeposito);

            if ($resultado) {

                $peticion = array("respuesta" => $resultado);
                $peticionJson = json_encode($peticion);
            }
        }

        echo $peticionJson;

        break;
}
