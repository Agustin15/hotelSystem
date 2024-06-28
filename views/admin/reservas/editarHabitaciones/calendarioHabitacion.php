<?php

$habitacion = $_GET['habitacion'];


require("../../../../model/claseHabitaciones.php");

$claseHabitaciones = new habitaciones();


date_default_timezone_set('America/Argentina/Buenos_Aires');
$hoy = date("Y-m-d");

?>
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js'></script>


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
        if (!empty($habitacionesMasCercanasReservadas)) {
        ?>

            $("#reservaMasCercana").css("width", "550px");
            $("#reservaMasCercana").css("marginLeft", "35%");

            let reservasHabitacionesMasCercanas = [];
            reservasHabitacionesMasCercanas = <?php echo json_encode($habitacionesMasCercanasReservadas) ?>;
            let calendar = document.getElementById('calendar');
            let events = [];

            events = reservasHabitacionesMasCercanas.map((reserva) => {

                let numReserva = reserva.idReservaHabitacion;
                let inicioReserva = reserva.fechaLlegadaHabitacion;
                let finReserva = reserva.fechaSalidaHabitacion;

                let evento = {

                    title: 'Reserva '+numReserva,
                    start: inicioReserva,
                    end: finReserva,
                    url: "lista.php?idReserva=" + numReserva,
                    backgroundColor: "#329DBF"
                };

                return evento;

            });
            cargarCalendario(calendar, events);


        <?php

        }
        ?>
    });
</script>