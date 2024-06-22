<?php

$habitacion = $_GET['habitacion'];


require("../../../../model/claseHabitaciones.php");

$claseHabitaciones = new habitaciones();


date_default_timezone_set('America/Argentina/Buenos_Aires');
$hoy =date("Y-m-d");

?>
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js'></script>


<div id="reservaMasCercana">

    <img id="cerrar" src="../../../img/cerrarVentana.png">
    <img src="../../../img/reservaId.png">
    <br>
    <h4>Reserva mas cercana de la habitacion <?php echo $habitacion ?></h4>
    <br>

    <?php



    $habitacionMasCercanaReservada = $claseHabitaciones->habitacionMasCercanaReservada(
        $habitacion,
        $hoy
    );

    if (!isset($habitacionMasCercanaReservada) || empty($habitacionMasCercanaReservada)) {

    ?>

        <div id="sinDatos">
            <h4>No hay ninguna reserva cercana </h4>
            <br>
            <img src="../../../img/withoutBooking.png">

        </div>

    <?php
    } else {

        $llegada = new DateTime($habitacionMasCercanaReservada['fechaLlegadaHabitacion']);
        $salida = new DateTime($habitacionMasCercanaReservada['fechaSalidaHabitacion']);
    ?>

        <h4>Reserva:<?php echo $habitacionMasCercanaReservada['idReservaHabitacion']  ?></h4>
        <br>
        <button id="viewCalendario">Ver calendario</button>

        <br>
        <div id='calendar'></div>

    <?php
    }
    ?>
</div>


<script>
    $("#cerrar").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");
        $("#divOpcion").removeClass("reservaMasCercana");
        $("#divOpcion").empty();


    });

    $("#viewCalendario").on("click", function() {

        <?php
        if (!empty($habitacionMasCercanaReservada)) {
        ?>

            var numReserva = <?php echo $habitacionMasCercanaReservada['idReservaHabitacion'] ?>;
            var inicioReserva = "<?php echo $llegada->format("Y-m-d"); ?>";
            var finReserva = "<?php echo $salida->format("Y-m-d"); ?>";

            $("#reservaMasCercana").css("width", "550px");
            $("#reservaMasCercana").css("marginLeft", "35%");
           
            var calendar = document.getElementById('calendar');

            evento = {

                title: 'Reserva ' + numReserva,
                start: inicioReserva,
                end: finReserva,
            };

            let events = [];

            events.push(evento);

            cargarCalendario(calendar, events);


        <?php

        }
        ?>
    });
</script>