<?php

$cliente = $_GET['cliente'];

$cliente = json_decode($cliente, true);


?>

<br>
<img src="http://localhost/Sistema%20Hotel/img/borrarAlerta.png">
<br>
<h2>¿Desea eliminar al cliente <?php echo $cliente['correo'] ?></h2>
<br>

<button class="btnSi" data-id-cliente="<?php echo $cliente['idCliente'] ?>" data-correo="<?php echo $cliente['correo'] ?>" data-nombre="<?php echo $cliente['nombre'] ?>" data-apellido="<?php echo $cliente['apellido'] ?>" data-telefono="<?php echo $cliente['telefono'] ?>" >Si</button>
<button class="btnNo">No</button>