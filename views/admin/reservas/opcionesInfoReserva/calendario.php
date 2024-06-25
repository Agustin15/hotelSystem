<?php
if (!empty($_GET['reserva'])) {

    $datosCalendario = $_GET['reserva'];

    $datosCalendario = json_decode($datosCalendario, true);

    $llegada = new DateTime($datosCalendario['llegada']);
    $salida = new DateTime($datosCalendario['salida']);
}
?>

<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js'></script>

<br>
<img src="../../../img/reservaId.png">
<br>

<h1>Calendario</h1>
<br>
<button id="btnViewCalendar">Ver Calendario</button>
<br>

<div id="calendarInfoReserva"></div>

<script>
    $("#btnViewCalendar").on("click", function() {


        let calendar = document.getElementById('calendarInfoReserva');


        let numReserva = <?php echo $datosCalendario['idReserva']; ?>;
        let inicioReserva = "<?php echo $llegada->format("Y-m-d"); ?>";
        let finReserva = "<?php echo $salida->format("Y-m-d"); ?>";

        const event = {

            title: 'Reserva ' + numReserva,
            start: inicioReserva,
            end: finReserva,
            url: "lista.php?idReserva=" + numReserva,
            backgroundColor: "#329DBF"
        };

        let events = [];

        
        events.push(event);


        cargarCalendario(calendar, events);

    });
</script>