<?php

require "../../../model/claseServicios.php";
require "../../../model/clasePago.php";
$claseServicio = new servicio();
$clasePago = new pago();

switch ($_SERVER["REQUEST_METHOD"]) {

    case "POST":

        $peticionJson = null;
        $servicio = json_decode(file_get_contents("php://input"), true);

        $total = 0;

        if (count($servicio) > 1) {

            foreach ($servicio as $service) {

                $resultado = $claseServicio->addServiceToRoom(
                    $service['idServicio'],
                    $service['cantidad'],
                    $service['idReserva'],
                    $service['numHabitacion']
                );

                $total += $service['total'];
            }
        } else {

            $resultado = $claseServicio->addServiceToRoom(
                $servicio[0]['idServicio'],
                $servicio[0]['cantidad'],
                $servicio[0]['idReserva'],
                $servicio[0]['numHabitacion']
            );

            $total = $servicio[0]['total'];
        }


        if ($resultado) {

            $pagoReserva = $clasePago->getPago($servicio[0]['idReserva']);
            $nuevoDeposito = $pagoReserva['deposito'] + $total;

            $resultado = $clasePago->updatePago($servicio[0]['idReserva'], $nuevoDeposito);

            if ($resultado) {

                $peticion = array("respuesta" => $resultado);
                $peticionJson = json_encode($peticion);
            }
        }

        echo $peticionJson;

        break;


    case "DELETE":

        $serviceDelete = json_decode($_GET['serviceDelete'], true);

        $respuesta;

        $idReserva = $serviceDelete['idReserva'];
        $idServicioHabitacion = $serviceDelete['idServicioHabitacion'];
        $total = $serviceDelete['totalService'];

        $resultado = $claseServicio->deleteService($serviceDelete['idServicioHabitacion']);

        if ($resultado) {

            $pago = $clasePago->getPago($idReserva);
            $pagoUpdate = $pago['deposito'] - $total;
            $resultadoPago = $clasePago->updatePago($idReserva, $pagoUpdate);

            if ($resultadoPago) {

                $respuesta = array("resultado" => $resultadoPago);
            }
        }

        $respuestaJson = json_encode($respuesta);

        echo $respuestaJson;

        break;

    case "GET":



        $numHabitacion = $_GET['numHabitacion'];

        $servicesRoom = $claseServicio->getServiciosReservaHabitacion($numHabitacion);



        $servicesRoom = array_map(function ($serviceRoom) {

            if (!empty($serviceRoom['imagen'])) {

                $serviceRoom['imagen'] = base64_encode($serviceRoom['imagen']);
            }

            return $serviceRoom;
        }, $servicesRoom);



        echo json_encode($servicesRoom);

        break;
}
