<?php

$numHabitacion = $_GET['habitacion'];
$idReserva = $_GET['idReserva'];


require("../../../../model/claseHabitaciones.php");
$claseHabitaciones = new habitaciones();

$habitacion = $claseHabitaciones->getHabitacionReservadaIdAndNum($numHabitacion, $idReserva);
$llegada = new DateTime($habitacion['fechaLlegadaHabitacion']);
$salida = new DateTime($habitacion['fechaSalidaHabitacion']);

?>


<img src="../../../img/cerrarVentana.png" id="cerrar">

<div id="formLibrar">

    <br>

    <img src="../../../img/habitacionLibrar.png">
    <br>
    <h1>Modificar habitacion <?php echo $numHabitacion ?></h1>
    <br>

    <label id="fechaLlegada">Fecha llegada:</label>
    <br><br>
    <label><?php echo $llegada->format("d-m-Y")  ?></label>
    <br><br>
    <label id="fechaSalida">Fecha salida:</label>
    <br><br>
    <label><?php echo $salida->format("d-m-Y") ?></label>

    <br><br>
    <label id="lblFechaLiberada">Cambiar fecha de salida:</label>

    <br>
    <input type="date" id="inputFechaLiberada" min="<?php echo $habitacion['fechaLlegadaHabitacion'] ?>"
      max="<?php echo $habitacion['fechaSalidaHabitacion']?>">
    <br>
    <input type="submit" value="Guardar" id="btnLiberar">



    <div id="alertaLibrar">

        <br>
        <img src="../../../img/cruzAgregar.png">
        <label></label>
    </div>
</div>

