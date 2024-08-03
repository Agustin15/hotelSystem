<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);


?>

<br>
<img src="http://localhost/Sistema%20Hotel/img/borrarAlerta.png">
<br>
<h2>¿Desea eliminar la reserva <?php echo $reserva['idReserva'] ?></h2>
<br>

<button data-id-reserva="<?php echo $reserva['idReserva'] ?>" data-llegada="<?php echo $reserva['llegada'] ?>" data-salida="<?php echo $reserva['salida'] ?>" data-cantidad-habitaciones="<?php echo $reserva['cantidadHabitaciones'] ?>" class="btnSi">Si</button>
<button class="btnNo">No</button>