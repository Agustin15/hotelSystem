<?php



require("../../../model/claseReservas.php");
require("../../../model/claseHabitaciones.php");
require("../../../model/clasePago.php");
$claseReservas = new reservas();
$claseHabitacion = new habitaciones();
$clasePago = new pago();



switch ($_SERVER['REQUEST_METHOD']) {

    case "POST":

        $peticion = null;
        $resultado = null;
        $asignar = json_decode(file_get_contents("php://input"), true);

        $idReserva = $asignar['reserva']['idReserva'];
        $numHabitacion = $asignar['reserva']['habitacion'];
        $fechaAgregado =  new DateTime($asignar['reserva']['fechaAgregado']);
        $adultos =  $asignar['reserva']['adultos'];
        $ninos =  $asignar['reserva']['ninos'];

        $reservaClienteActual = $claseReservas->getReservaPoridReserva($idReserva);
        $idCliente = $reservaClienteActual['idClienteReserva'];
        $cantReservasNoColisionan = 0;

        $habitacionesReservadas = $claseHabitacion->habitacionesReservadas($numHabitacion);

        $habitacionReservada = false;
        $llegada = $reservaClienteActual['fechaLlegada'];
        $salida = $reservaClienteActual['fechaSalida'];

        if (isset($habitacionesReservadas)) {

            $reservasConflicto = array_filter($habitacionesReservadas, function ($key) use ($salida, $llegada) {

                return strtotime($key['fechaLlegadaHabitacion']) <= strtotime($salida) &&
                    strtotime($key['fechaSalidaHabitacion']) >= strtotime($llegada);
            });


            if (count($reservasConflicto) > 0) {
                $peticion = array("respuesta" => "Esta habitacion ya tiene una reserva por esas fechas");
            } else {

                $resultado = $claseHabitacion->setHabitacionReservada(
                    $idReserva,
                    $idCliente,
                    $numHabitacion,
                    $fechaAgregado->format('Y-m-d'),
                    $reservaClienteActual['fechaSalida'],
                    $adultos,
                    $ninos
                );


                if ($resultado) {
                    $habitacionReservada = true;
                }
            }
        } else {


            $resultado = $claseHabitacion->setHabitacionReservada(
                $idReserva,
                $idCliente,
                $numHabitacion,
                $fechaAgregado->format('Y-m-d'),
                $reservaClienteActual['fechaSalida'],
                $adultos,
                $ninos
            );

            if ($resultado) {
                $habitacionReservada = true;
            }
        }

        if ($habitacionReservada == true) {


            $pago = $clasePago->getPago($idReserva);
            $reserva = $claseReservas->getReservaPoridReserva($idReserva);
            $fechaSalida = new DateTime($reserva['fechaSalida']);
            $noches = $fechaAgregado->diff($fechaSalida)->days;

            $depositoNuevo = 0;
            $habitacion = $claseHabitacion->buscarCategoriaPorNumero($numHabitacion);
            $habitacion = $habitacion->fetch_array(MYSQLI_ASSOC);
            $categoria = $habitacion['tipoHabitacion'];
            $habitacionPrecio = $claseHabitacion->getPrecioHabitacion($categoria);
            $precio = $habitacionPrecio["precio"];
            $precioTotalHabitacion = $precio * $noches;

            if (empty($pago['deposito'])) {

                // caso agregando habitacion por admin
                $depositoActual = 0;
                $deposito = $precioTotalHabitacion;

                $resultado = $clasePago->setPago($idReserva, $idCliente, $deposito);
            } else {

                // caso si es una reserva hecha por un cliente o queremos agregar otra habitacion
                $depositoActual = $pago['deposito'];
                $depositoNuevo = $precioTotalHabitacion + $depositoActual;

                $resultado = $clasePago->updatePago($idReserva, $depositoNuevo);
            }

            $peticion = array("respuesta" => $resultado);
        }

        $peticionJson = json_encode($peticion);

        echo $peticionJson;

        break;

    case "PUT":

        $peticion = null;
        $reserva = json_decode(file_get_contents("php://input"), true);
        $opcion = $reserva['reserva']['opcion'];

        if ($opcion == "remplazar") {
            $idReserva = $reserva['reserva']['idReserva'];
            $numHabitacionVieja = $reserva['reserva']['habitacionAnterior'];
            $numHabitacionNueva = $reserva['reserva']['habitacionNueva'];
            $fechaRemplazo = new DateTime($reserva['reserva']['fechaRemplazo']);


            $cantReservasNoColisionan = 0;
            $reservaClienteActual = $claseReservas->getReservaPoridReserva($idReserva);

            $habitacionesReservadas = $claseHabitacion->habitacionesReservadas($numHabitacionNueva);

            $llegada = $reservaClienteActual['fechaLlegada'];
            $salida = $reservaClienteActual['fechaSalida'];

            if (isset($habitacionesReservadas)) {

                $reservasConflicto = array_filter($habitacionesReservadas, function ($key) use ($salida, $llegada) {

                    return strtotime($key['fechaLlegadaHabitacion']) <= strtotime($salida) &&
                        strtotime($key['fechaSalidaHabitacion']) >= strtotime($llegada);
                });

                if (count($reservasConflicto) > 0) {
                    $peticion = array("respuesta" => "Esta habitacion ya tiene una reserva por esas fechas");
                } else {

                    $resultado = $claseHabitacion->updateHabitacionReservada($numHabitacionNueva, $idReserva);

                    if ($resultado) {
                        $claseHabitacion->updateFechaLlegadaHabitacionReservada(
                            $fechaRemplazo->format("Y-m-d"),
                            $numHabitacionNueva,
                            $idReserva
                        );
                        $habitacionRemplazada = true;
                    }
                }
            } else {


                $resultado = $claseHabitacion->updateHabitacionReservada($numHabitacionNueva, $idReserva);

                if ($resultado) {
                    $claseHabitacion->updateFechaLlegadaHabitacionReservada(
                        $fechaRemplazo,
                        $numHabitacionNueva,
                        $idReserva
                    );
                    $habitacionRemplazada = true;
                }
            }

            if ($habitacionRemplazada == true) {

                $habitacionesProcesar = array(
                    array("numHabitacion" => $numHabitacionVieja, "estado" => "vieja"),
                    array("numHabitacion" => $numHabitacionNueva, "estado" => "nueva")
                );
                $pago = $clasePago->getPago($idReserva);
                $depositoSinHabitacionVieja = 0;
                $reserva = $claseReservas->getReservaPoridReserva($idReserva);
                $fechaSalida = new DateTime($reserva['fechaSalida']);
                $noches = $fechaRemplazo->diff($fechaSalida)->days;

                foreach ($habitacionesProcesar as $habitacionProcesar) {

                    $depositoNuevo = 0;
                    $habitacion = $claseHabitacion->buscarCategoriaPorNumero($habitacionProcesar['numHabitacion']);
                    $habitacion = $habitacion->fetch_array(MYSQLI_ASSOC);
                    $categoria = $habitacion['tipoHabitacion'];
                    $habitacionPrecio = $claseHabitacion->getPrecioHabitacion($categoria);
                    $precio = $habitacionPrecio["precio"];
                    $precioTotalHabitacion = $precio * $noches;

                    if ($habitacionProcesar["estado"] == "vieja") {

                        $depositoActual = $pago['deposito'];
                        $depositoSinHabitacionVieja = $depositoActual - $precioTotalHabitacion;
                    } else {

                        $depositoNuevo = $depositoSinHabitacionVieja + $precioTotalHabitacion;
                        $resultado = $clasePago->updatePago($idReserva, $depositoNuevo);

                        $peticion = array("respuesta" => $resultado);
                    }
                }
            }
        } else {

            //liberar habitacion
            $idReserva = $reserva['reserva']['idReserva'];
            $numHabitacion = $reserva['reserva']['habitacion'];
            $fechaLiberada = $reserva['reserva']['fechaLiberada'];


            $habitacionReservada = $claseHabitacion->getHabitacionReservadaIdAndNum($numHabitacion, $idReserva);

            if (strtotime($fechaLiberada) < strtotime($habitacionReservada['fechaSalidaHabitacion'])) {


                $resultadoFecha = $claseHabitacion->updateFechaSalidaHabitacionReservada(
                    $fechaLiberada,
                    $numHabitacion,
                    $idReserva
                );

                if ($resultadoFecha) {
                    $salida = new DateTime($habitacionReservada['fechaSalidaHabitacion']);
                    $fechaLiberada = new DateTime($fechaLiberada);
                    $noches = $fechaLiberada->diff($salida)->days;
                    $pago = $clasePago->getPago($idReserva);

                    $habitacion = $claseHabitacion->buscarCategoriaPorNumero($numHabitacion);
                    $habitacion = $habitacion->fetch_array(MYSQLI_ASSOC);
                    $categoria = $habitacion['tipoHabitacion'];
                    $habitacionPrecio = $claseHabitacion->getPrecioHabitacion($categoria);
                    $precio = $habitacionPrecio["precio"];
                    $precioDiferenciaHabitacion = $precio * $noches;

                    $depositoActual = $pago['deposito'];
                    $depositoNuevo = $depositoActual - $precioDiferenciaHabitacion;
                    $resultadoPago = $clasePago->updatePago($idReserva, $depositoNuevo);

                    if ($resultadoPago) {
                        $peticion = array("respuesta" => "Fecha de salida de la habitacion cambiada");
                    }
                }
            } else {


                $peticion = array("respuesta" => "La fecha de salida sigue siendo la misma");
            }
        }
        $peticionJson = json_encode($peticion);

        echo $peticionJson;
        break;

    case "DELETE":


        $datosHabitacion = json_decode($_GET['datosHabitacion'], true);

        $idReserva = $datosHabitacion['idReserva'];
        $numHabitacion = $datosHabitacion['habitacion'];

        $habitacionReservada = $claseHabitacion->getHabitacionReservadaIdAndNum($numHabitacion, $idReserva);
        $llegada = new DateTime($habitacionReservada['fechaLlegadaHabitacion']);
        $salida = new DateTime($habitacionReservada['fechaSalidaHabitacion']);
        $noches = $llegada->diff($salida)->days;
        $pago = $clasePago->getPago($idReserva);

        $habitacion = $claseHabitacion->buscarCategoriaPorNumero($numHabitacion);
        $habitacion = $habitacion->fetch_array(MYSQLI_ASSOC);
        $categoria = $habitacion['tipoHabitacion'];
        $habitacionPrecio = $claseHabitacion->getPrecioHabitacion($categoria);
        $precio = $habitacionPrecio["precio"];
        $precioEstadiaHabitacion = $precio * $noches;

        $depositoFinal = $pago['deposito'] - $precioEstadiaHabitacion;

        if ($depositoFinal == 0) {

            //significa que esa era la unica habitacion de la reserva

            $resultado = $clasePago->deletePago($idReserva);
            if ($resultado) {
                $resultado = $claseHabitacion->deleteHabitacionReserva($idReserva, $numHabitacion);

                $peticion = array("respuesta" => $resultado);
            }
        } else {

            //no es la unica habitacion de la reserva
            $resultado = $clasePago->updatePago($idReserva, $depositoFinal);

            if ($resultado) {
                $resultado = $claseHabitacion->deleteHabitacionReserva($idReserva, $numHabitacion);
                $peticion = array("respuesta" => $resultado);
            }
        }

        $peticionJson = json_encode($peticion);

        echo $peticionJson;

        break;

    case "GET":


        switch ($_GET['option']) {
            case "dashboardGraphic":

                $allRoomsReserved = $claseHabitacion->getAllHabitacionesReservadasYear(date("Y"))->fetch_all(MYSQLI_ASSOC);

                $quantityCategorysRoomsReserved = array_map(function ($categoryRoom) use ($allRoomsReserved, $claseHabitacion) {

                    $categoryRoomsReserved = array_filter($allRoomsReserved, function ($roomReserved)
                    use ($categoryRoom, $claseHabitacion) {

                        $dataRoomReserved = $claseHabitacion->buscarCategoriaPorNumero($roomReserved['numHabitacionReservada'])->fetch_array(MYSQLI_ASSOC);

                        return $dataRoomReserved['tipoHabitacion'] == $categoryRoom['categoria'];
                    });

                    return array('categoryRoom' => $categoryRoom['categoria'], 'quantityReserved' => count($categoryRoomsReserved));
                }, $claseHabitacion->getAllCategoryRooms());


                $peticion = $quantityCategorysRoomsReserved;

                break;

            case "itemDataDashboard":

                $categoryRooms = $claseHabitacion->getAllCategoryRooms();

                $dataCategoryRooms = array_map(function ($categoryRoom) use ($claseHabitacion) {
                    $totalRoomCategory = count($claseHabitacion->getAllHabitacionesCategoria($categoryRoom['categoria']));

                    $roomsCategory = $claseHabitacion->getAllHabitacionesCategoria($categoryRoom['categoria']);

                    $totalRoomCategoryBusy = array_reduce($roomsCategory, function ($ac, $roomCategory) use ($claseHabitacion) {

                        $today = date("Y-m-d");
                        $habitacionOcupada = $claseHabitacion->reservasHabitacionOcupada($roomCategory['numHabitacion'], $today);

                        ($habitacionOcupada) ? $ac++ : $ac;

                        return $ac;
                    }, 0);

                    return array(
                        "category" => $categoryRoom['categoria'],
                        "totalRoomCategory" => $totalRoomCategory,
                        "totalRoomCategoryBusy" => $totalRoomCategoryBusy,
                        "totalRoomCategoryFree" => $totalRoomCategory - $totalRoomCategoryBusy
                    );
                }, $categoryRooms);

                $peticion=$dataCategoryRooms;
                break;
        }


        echo json_encode($peticion);
        break;
}
