<?php

session_id("reserva");
session_start();

$reservaJson = json_decode(file_get_contents('php://input'), true);


if (isset($reservaJson)) {

    $_SESSION['persona'] = json_decode($reservaJson['persona'], true);
    $_SESSION['habitaciones'] = json_decode($reservaJson['habitaciones'], true);
    $_SESSION['fechas'] = json_decode($reservaJson['fechas'], true);
    $_SESSION['depositoFinal'] = json_decode($reservaJson['depositoFinal']);
} else {

    $persona = $_SESSION['persona'];
    $habitaciones = $_SESSION['habitaciones'];
    $fechas = $_SESSION['fechas'];
    $depositoFinal = $_SESSION['depositoFinal'];


    require("../model/claseReserva.php");
    require("../model/claseCorreo.php");
    require("../model/clasePago.php");


    $claseReserva = new reserva();
    $clasePago= new pago();
}



?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilos/styleReservar.css">
    <script src="../alertas/alertas.js"></script>

    <title>Reserva</title>
</head>

<body>
    <header>

        <div id="logo">
            <img src="../img/revision.png" width="50px">
            <h1>Sistema Hotel</h1>
        </div>


        <ul>

            <li><a href="../views/index.html">Inicio</a></li>
            <li><a href="../views/habitaciones.html">Habitaciones</a></li>
            <li><a href="../views/index.html #sobreNosotros">Sobre nosotros</a></li>
            <li><a href="../views/index.html #contacto">Contacto</a></li>


        </ul>


        <ul class="redes">
            <li><img src="../img/instagram.png"></li>
            <li><img src="../img/facebook.png"></li>
            <li><img src="../img/whatsapp.png"></li>

        </ul>
    </header>



    <?php

    $nombre = null;
    $apellido = null;
    $telefono = null;
    $correo = null;
    $fechaLlegada = null;
    $fechaSalida = null;
    $actualizarReserva = null;
    $respuestaReserva = null;
    $respuestaHabitacionReservada = null;
    $habitacionAsignada = null;
    $cantidadHabitaciones = null;
    $ocupadas = 0;
    $jsonMsj = null;
    $habitacionesLibres = [];
    $habitacionesAreservar = [];
    $habitacionesOcupadas = [];
    $cantTipoHabitacion = 0;
    $noHayMasHabitaciones = null;

    foreach ($fechas as $fecha) {

        $fechaLlegada = $fecha['FechaLlegada'];
        $fechaSalida = $fecha['FechaSalida'];
    }


    $fechaLlegada = new DateTimeImmutable($fechaLlegada);
    $fechaSalida = new DateTimeImmutable($fechaSalida);



    foreach ($persona as $dato) {


        $nombre = $dato['Nombre'];
        $apellido = $dato['Apellido'];
        $telefono = $dato['Telefono'];
        $correo = $dato['Correo'];
    }


    $claseReserva->setPersona($nombre, $apellido, $telefono, $correo);

    $datosCliente = $claseReserva->buscarCliente($correo);

    if ($datosCliente->num_rows == 0) {

        $claseReserva->addClienteBd();
    }


    foreach ($habitaciones as $habitacion) {

        $cantidadHabitaciones += $habitacion['CantHabitaciones'];
    }

    $resultadosCliente = $claseReserva->buscarCliente($correo);

    $cliente = $resultadosCliente->fetch_array(MYSQLI_ASSOC);

    $reservasAnteriores = $claseReserva->comprobarExistenciaReserva(
        $cliente['idCliente'],
        $fechaLlegada->format('Y-m-d'),
        $fechaSalida->format('Y-m-d')
    );


    if ($reservasAnteriores != null) {

        $actualizarReserva = $claseReserva->updateCantHabitacionesReserva(
            $reservasAnteriores['idReserva'],
            $cantidadHabitaciones + $reservasAnteriores['cantidadHabitaciones']
        );
    } else {

        $claseReserva->setReserva(
            $cliente['idCliente'],
            $fechaLlegada->format('Y-m-d'),
            $fechaSalida->format('Y-m-d'),
            $cantidadHabitaciones
        );

        $respuestaReserva = $claseReserva->addReservaBd($cliente['idCliente']);

    }

    if ($respuestaReserva || $actualizarReserva) {

    
        foreach ($habitaciones as $habitacion) {

            do {


                $cantTipoHabitacion = $claseReserva->cantHabitaciones($habitacion['Categoria']);
                $habitacionesOcupadas = [];
                $reservas = [];

                do {
                    $habitacionAsignada = $claseReserva->setNumHabitacion($habitacion['Categoria']);
                } while (in_array($habitacionAsignada, $habitacionesLibres,) == true);

                $habitacionesReservadas = $claseReserva->buscarNumHabitacion($habitacionAsignada);


                if ($habitacionesReservadas->num_rows > 0) {
                    foreach ($habitacionesReservadas->fetch_all(MYSQLI_ASSOC) as $habitacionReservada) {

                        $reservas = $claseReserva->buscarReservaPorIdReserva($habitacionReservada['idReservaHabitacion']);
                    }

                    foreach ($reservas->fetch_all(MYSQLI_ASSOC) as $reserva) {
                        if (strtotime($reserva['fechaSalida']) < strtotime($fechaLlegada->format('Y-m-d'))) {

                            array_push($habitacionesLibres, $habitacionAsignada);

                            $datosHabitacionLibre = array(
                                "num" => $habitacionAsignada,
                                "adultos" => $habitacion['CantAdultos'] * $habitacion['CantHabitaciones'],
                                "ninos" => $habitacion['CantNinos'] * $habitacion['CantHabitaciones']
                            );

                            array_push($habitacionesAreservar, $datosHabitacionLibre);
                        } else {

                            array_push($habitacionesOcupadas, $habitacionAsignada);

                            $ocupadas = $claseReserva->guardarCantHabitacionesOcupadas(
                                $habitacion['Categoria'],
                                count($habitacionesOcupadas)
                            );
                        }
                    }
                } else {

                    array_push($habitacionesLibres, $habitacionAsignada);

                    $datosHabitacionLibre = array(
                        "num" => $habitacionAsignada,
                        "adultos" => $habitacion['CantAdultos'], "ninos" => $habitacion['CantNinos']
                    );

                    array_push($habitacionesAreservar, $datosHabitacionLibre);
                }
            } while (
                count($habitacionesLibres) < $habitacion['CantHabitaciones']
                && $ocupadas < $cantTipoHabitacion
            );


            if (count($habitacionesLibres) < $habitacion['CantHabitaciones']) {

                $habitacionesLibres = [];
                $noHayMasHabitaciones = $habitacion['Categoria'];
                break;
            }
        }


        if (count($habitacionesLibres) > 0) {

            $reserva = $claseReserva->buscarReservaPorIdClienteYLlegada(
                $cliente['idCliente'],
                $fechaLlegada->format('Y-m-d')
            );

            foreach ($habitacionesAreservar as $habitacionAreservar) {

                $respuestaHabitacionReservada = $claseReserva->addHabitacionReservada(
                    $reserva['idReserva'],
                    $cliente['idCliente'],
                    $habitacionAreservar['num'],
                    $fechaLlegada->format('Y-m-d'),
                    $fechaSalida->format('Y-m-d'),
                    $habitacionAreservar['adultos'],
                    $habitacionAreservar['ninos']
                );
            }


            if ($respuestaHabitacionReservada) {

                if ($actualizarReserva) {

                    $pagoAnterior = $clasePago->getPago($reservasAnteriores['idReserva']);
                    $clasePago->updatePago($reservasAnteriores['idReserva'], $depositoFinal + $pagoAnterior['deposito']);

                    $msj = "Reserva Realizada";

                    $jsonMsj = json_encode(array("mensaje" => $msj, "nombre" => $nombre, "correo" => $correo));
                } else {
                    $clasePago->setPago($reserva['idReserva'], $cliente['idCliente'], $depositoFinal);

                    $claseCorreo = new correo(
                        $nombre,
                        $apellido,
                        $correo,
                        $telefono,
                        $fechaLlegada->format("d-m-Y"),
                        $fechaSalida->format("d-m-Y"),
                        $habitaciones
                    );


                    $respuestaCorreo = $claseCorreo->sendMail();


                    if ($respuestaCorreo) {


                        $msj = "Reserva Realizada";

                        $jsonMsj = json_encode(array("mensaje" => $msj, "nombre" => $nombre, "correo" => $correo));
                    }
                }
            }
        } else {


            $msj = "No hay mas habitaciones";

            $jsonMsj = json_encode(array("mensaje" => $msj, "categoria" => $noHayMasHabitaciones));
        }

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://localhost/Sistema%20Hotel/views/confirmacionReserva.php");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, array("datosMsj" => $jsonMsj));

        $resultado = curl_exec($ch);

        curl_close($ch);
    }



    ?>



</body>

</html>