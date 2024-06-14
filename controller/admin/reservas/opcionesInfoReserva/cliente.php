<?php

$reserva = $_GET['reserva'];

$reserva=json_decode($reserva,true);

$idCliente=$reserva['idCliente'];

require("../../../../model/claseCliente.php");
$claseCliente = new cliente();


$cliente=$claseCliente->getClienteUpdate($idCliente);
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