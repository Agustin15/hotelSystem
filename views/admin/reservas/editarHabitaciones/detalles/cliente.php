<?php

$habitacion = $_GET['habitacion'];

require("../../../../../model/claseReservas.php");
require("../../../../../model/claseHabitaciones.php");
require("../../../../../model/claseCliente.php");

$claseReservas = new reservas();
$claseHabitaciones = new habitaciones();
$claseCliente = new cliente();

date_default_timezone_set('America/Montevideo');
$hoy=date("Y-m-d");

$habitacionReservada=$claseHabitaciones->getHabitacionReservadaFechaAndNum($hoy,$habitacion);

$reserva=$claseReservas->getReservaPoridReserva($habitacionReservada['idReservaHabitacion']);

$cliente=$claseCliente->getClienteUpdate($reserva['idClienteReserva']);

?>

<div id="cliente">
<img src="../../../img/personal-information.png">
<br>
<h4>Cliente</h4>
<br>

<label>Nombre:<?php echo $cliente['nombre'] ?></label>
<br>
<label>Apellido:<?php echo $cliente['apellido'] ?></label>
<br>
<label class="liCorreo">Correo:<?php echo $cliente['correo'];?></label>

</div>