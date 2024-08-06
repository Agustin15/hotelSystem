<?php

require("../../../.././../../model/claseServicios.php");
require("../../../.././../../model/claseHabitaciones.php");
$claseServicio = new servicio();
$claseHabitacion = new habitaciones();
$numHabitacion = $_GET['numHabitacion'];

$service = $claseServicio->getServicio("masajes");
$idServicio = $service[0]['idServicio'];

$hoy = date("Y-m-d");
$habitacion = $claseHabitacion->getHabitacionReservadaFechaAndNum($hoy, $numHabitacion);
$idReserva = $habitacion['idReservaHabitacion'];

$cantHuespedes = $habitacion['ninos'] + $habitacion['adultos'];

?>

<br>
<img id="cerrar" src="../../../img/cerrarVentana.png">

<img src="../../../img/massage.png">
<br>
<h1>Agregar servicio de masaje</h1>
<br>


<div id="modalService">

</div>


<div id="msjServiceAdd">

<br>
    <img src="../../../img/tickServices.gif">
    <br>
    <p>servicio de masaje agregado a la habitacion <?php echo $numHabitacion?></p>
    <p>de la reserva <?php echo $idReserva ?></p>

    <br>

    <button id="buttonOk">OK</button>
</div>


<form id="formAddMassageService" data-id-reserva="<?php echo $idReserva ?>" data-cant-huespedes="<?php echo $cantHuespedes ?>" data-price="<?php echo $service[0]['precio'] ?>" data-id-servicio="<?php echo $idServicio ?>">

    <label id="tarifa">*Precio por huesped:$<?php echo $service[0]['precio'] ?></label>
    <br><br>
    <label id="lblPrecio">Cantidad de personas:</label>
    <br>
    <input id="cantPersonas" type="number" min="1" placeholder="Personas">

    <img src="../../../img/iconHuesped.png">
    <br>

    <label id="totalService"></label>
    <br>
    <button id="btnAgregar">Agregar</button>
</form>

<br>

<div id="avisoErrorAddService">

    <img src="../../../img/cruzEditar.png">

    <label id="lblAvisoError"></label>
</div>