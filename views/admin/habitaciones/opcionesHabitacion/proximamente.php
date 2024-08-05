<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.13/index.global.min.js'></script>

<?php

if (isset($_GET['numHabitacion'])) {

    $numHabitacion = $_GET['numHabitacion'];

    require("../../../../model/claseHabitaciones.php");
    require("../../../../model/claseCliente.php");

    $claseHabitacion = new habitaciones();

    $claseCliente = new cliente();
?>


    <img id="cerrarVentana" src="../../../img/cerrarVentana.png">

    <img src="../../../img/nextBookings.png">
    <br>
    <h1>Habitacion <?php echo $numHabitacion ?></h1>
    <br>
    <h2>Proximas reservaciones</h2>
    <br>

    <?php

    date_default_timezone_set('America/Montevideo');
    $hoy = date("Y-m-d");
    $reservasHabitacion = $claseHabitacion->habitacionesMasCercanasReservadas($numHabitacion, $hoy);

    if (empty($reservasHabitacion)) {

    ?>

        <div id="sinBookings">

            <img src="../../../img/withoutBooking.png">
            <br>
            <h3>No hay reservas proximas</h3>

        </div>
    <?php

    } else {


    ?>
        <div data-proximas-reservas='<?php echo json_encode($reservasHabitacion)?>' id="calendarProximamente"></div>

<?php

    }
}
?>
