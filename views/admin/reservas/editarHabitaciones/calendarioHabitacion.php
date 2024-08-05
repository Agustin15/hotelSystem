<?php

$habitacion = $_GET['habitacion'];


require("../../../../model/claseHabitaciones.php");

$claseHabitaciones = new habitaciones();


date_default_timezone_set('America/Argentina/Buenos_Aires');
$hoy = date("Y-m-d");

?>



<div id="reservaMasCercana">

    <img id="cerrar" src="../../../img/cerrarVentana.png">
    <img src="../../../img/reservaId.png">
    <br>
    <h4>Reservas mas cercanas de la habitacion <?php echo $habitacion ?></h4>
    <br>

    <?php



    $habitacionesMasCercanasReservadas = $claseHabitaciones->habitacionesMasCercanasReservadas(
        $habitacion,
        $hoy
    );

    if (empty($habitacionesMasCercanasReservadas)) {

    ?>

        <div id="sinDatos">
            <h4>No hay ninguna reserva cercana </h4>
            <br>
            <img src="../../../img/withoutBooking.png">

        </div>

    <?php
    } else {

    ?>

        <h4>Reservas:</h4>
        <br>

        <div id='calendar' data-reserva-cercana-habitacion='<?php echo  json_encode($habitacionesMasCercanasReservadas) ?>'></div>

    <?php
    }
    ?>
</div>