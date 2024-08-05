<?php

$numHabitacion = $_GET['numHabitacion'];

?>

<img id="cerrarPanelService" src="../../../img/cerrarVentana.png">

<nav id="menuServicesRoom">

    <ul>

        <li id="liHistoryService">
            <img src="../../../img/historyBookings.png">
            <br>
            Historial de servicios
        </li>

        <li id="liAddService">
            <img src="../../../img/addService.png">
            <br>
            Agregar servicio
        </li>
        <li id="liDeleteService">
            <img src="../../../img/addService.png">
            <br>
            Eliminar servicio
        </li>
    </ul>
</nav>

<br>

<img id="iconServiceRoom" src="../../../img/servicioInfo.png">
<br>

<h1>Habitacion <?php echo $numHabitacion ?></h1>
<br>
<div id="panelOptionService"></div>


<div id="modalServices"></div>

