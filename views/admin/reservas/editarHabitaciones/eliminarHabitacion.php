<?php

$habitacion = $_GET['habitacion'];

$idReserva = $_GET['idReserva'];

?>

<br>
<img src="http://localhost/Sistema%20Hotel/img/borrarAlerta.png">
<br>
<h2>¿Desea eliminar la habitacion <?php echo $habitacion ?> de la reserva
    <?php echo $idReserva ?>?</h2>
<br>

<button class="btnSi">Si</button>
<button class="btnNo">No</button>


