<?php

$habitacion = $_GET['habitacion'];

require("../../../../../model/claseReservas.php");
require("../../../../../model/claseHabitaciones.php");


$claseReservas = new reservas();
$claseHabitaciones = new habitaciones();

date_default_timezone_set('America/Montevideo');
$hoy=date("Y-m-d");

$habitacionReservada=$claseHabitaciones->getHabitacionReservadaFechaAndNum($hoy,$habitacion);


?>

<div id="huespedes">
<img src="../../../img/huespedesInfo.png">
<br>
<h4>Huespedes</h4>
<br>


<label>Adulto:<?php echo $habitacionReservada['adultos'] ?></label>
<br>
<label>Niños:<?php echo $habitacionReservada['ninos'] ?></label>
<br>

</div>