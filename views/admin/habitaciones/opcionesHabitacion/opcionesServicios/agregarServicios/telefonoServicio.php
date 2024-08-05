<?php

require("../../../.././../../model/claseServicios.php");
require("../../../.././../../model/claseHabitaciones.php");
$claseServicio = new servicio();
$claseHabitacion = new habitaciones();
$numHabitacion = $_GET['numHabitacion'];

$servicePhone = $claseServicio->getServicio("telefono");
$idServicio = $servicePhone[0]['idServicio'];

$hoy = date("Y-m-d");
$habitacion = $claseHabitacion->getHabitacionReservadaFechaAndNum($hoy, $numHabitacion);
$idReserva = $habitacion['idReservaHabitacion'];




?>

<br>
<img id="cerrar" src="../../../img/cerrarVentana.png">

<img src="../../../img/telephone.png">
<br>
<h1>Agregar tarifa telefono</h1>
<br>


<div id="modalService">

</div>

<div id="msjServiceAdd">

</div>


<form id="formAddPhoneService" data-id-reserva="<?php echo $idReserva ?>" data-price="<?php echo $servicePhone[0]['precio'] ?>" data-id-servicio="<?php echo $idServicio ?>">

    <label id="tarifa">*Tarifa:$<?php echo $servicePhone[0]['precio'] ?> por minuto</label>
    <br><br>
    <label id="lblPrecio">Cantidad de minutos de llamada:</label>
    <br>

    <input id="minutosLlamada" type="text" placeholder="Minutos">

    <img id="clock" title="Calcular tarifa" src="../../../img/reloj.png">
    <br>
    <label id="lblTotalPhone"></label>

    <br>
    <button id="btnAgregar">Agregar</button>
</form>

<br>

<div id="avisoErrorAddService">

    <img src="../../../img/cruzEditar.png">

    <label id="lblAvisoError"></label>
</div>