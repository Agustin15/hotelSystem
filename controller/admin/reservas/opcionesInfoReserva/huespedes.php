<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);

$idReserva = $reserva['idReserva'];

require("../../../../model/claseHabitaciones.php");
$claseHabitaciones = new habitaciones();

?>

<div id="huespedes">

    <?php

    $habitacionesReservadas = $claseHabitaciones->getHabitaciones($idReserva);

    $habitacionesReservadas = $habitacionesReservadas->fetch_all(MYSQLI_ASSOC);

    if (count($habitacionesReservadas) > 0) {

        $cantAdultos = 0;
        $cantNinos = 0;


        //suma adultos
        if (count($habitacionesReservadas) == 1) {

            $cantAdultos = $habitacionesReservadas[0]['adultos'];
        } else {

            $cantAdultos = array_reduce($habitacionesReservadas, function ($ac, $element) {

                $ac += $element['adultos'] + $element['adultos'];
                return $ac;
            }, 0);
        }

        //suma niños
        if (count($habitacionesReservadas) == 1) {

            $cantNinos = $habitacionesReservadas[0]['ninos'];
        } else {

            $cantNinos = array_reduce($habitacionesReservadas, function ($ac, $element) {

                $ac = 0;
                $ac += $element['ninos'] + $element['ninos'];
                return $ac;
            });
        }

    ?>

        <img src="../../../img/huespedesInfo.png">
        <br>
        <h4>Huespedes</h4>
        <br>

        <label>Adultos:<?php echo $cantAdultos ?></label>
        <br>
        <label>Niños:<?php echo $cantNinos ?></label>

    <?php
    } else {

    ?>

        <div id="sinDatosInfo">
            
            <h1>No hay datos aun</h1>
            <br>
            <img src="../../../img/sinDatos.png">

        </div>
    <?php
    }

    ?>

</div>