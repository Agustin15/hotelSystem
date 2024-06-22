<?php

$habitacion = $_GET['habitacion'];

require("../../../../../model/claseReservas.php");
require("../../../../../model/claseHabitaciones.php");
require("../../../../../model/claseCliente.php");

$claseReservas = new reservas();
$claseHabitaciones = new habitaciones();
$claseCliente = new cliente();

date_default_timezone_set('America/Argentina/Buenos_Aires');
$hoy = date("Y-m-d");

$habitacionReservada = $claseHabitaciones->getHabitacionReservadaFechaAndNum($hoy, $habitacion);
$llegada = new DateTime($habitacionReservada['fechaLlegadaHabitacion']);
$salida = new DateTime($habitacionReservada['fechaSalidaHabitacion']);

?>

<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js'></script>

<script>
    var numReserva = <?php echo $habitacionReservada['idReservaHabitacion'] ?>;
    var inicioReserva = "<?php echo $llegada->format("Y-m-d"); ?>";
    var finReserva = "<?php echo $salida->format("Y-m-d"); ?>";


    $("#viewCalendario").on("click", function() {

        $("#divDetalles").css("width", "550px");
        $("#divDetalles").css("marginLeft", "35%");
        $(".logoDetalles").css("marginLeft", "240px");

        var calendar = document.getElementById('calendar');

        evento = {

            title: 'Reserva ' + numReserva,
            start: inicioReserva,
            end: finReserva,
        };

        let events = [];

        events.push(evento);

        cargarCalendario(calendar, events);

    });
</script>

<div id="reserva">
    <img src="../../../img/reservaId.png">
    <br>
    <h4>Reserva</h4>
    <br>
    <label><a id="linkReserva" href="lista.php?idReserva=<?php echo $habitacionReservada['idReservaHabitacion']; ?>">
            <?php echo $habitacionReservada['idReservaHabitacion']; ?></label></a>
    <br>
    <button id="viewCalendario">Ver calendario</button>

    <br>
    <div id='calendar'></div>


</div>