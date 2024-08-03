<?php
if (!empty($_GET['reserva'])) {

    $datosCalendario = $_GET['reserva'];

    $datosCalendario = json_decode($datosCalendario, true);

    $llegada = new DateTime($datosCalendario['llegada']);
    $salida = new DateTime($datosCalendario['salida']);
}
?>
<br>
<img src="../../../img/reservaId.png">
<br>

<h1>Calendario</h1>
<br>

<div id="calendarInfoReserva" data-id-reserva="<?php echo $datosCalendario['idReserva'] ?>" data-llegada="<?php echo $llegada->format("Y-m-d") ?>" data-salida="<?php echo $salida->format("Y-m-d") ?>"></div>