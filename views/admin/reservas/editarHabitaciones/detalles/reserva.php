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

<div id="reserva" data-id-reserva='<?php echo $habitacionReservada['idReservaHabitacion'] ?>' data-llegada='<?php echo $llegada->format("Y-m-d") ?>' data-salida='<?php echo $salida->format("Y-m-d") ?>'>

    <img src="../../../img/reservaId.png">
    <br>
    <h4>Reserva</h4>
    <br>
    <label><a id="linkReserva" href="lista.php?idReserva=<?php echo $habitacionReservada['idReservaHabitacion']; ?>">
            <?php echo $habitacionReservada['idReservaHabitacion']; ?></label></a>
    <br>


    <br>
    <div id='calendar'></div>


</div>