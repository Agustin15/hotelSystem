<?php

$numHabitacion = $_GET['numHabitacion'];

?>

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
    </ul>
</nav>

<br>

<img id="iconServiceRoom" src="../../../img/servicioInfo.png">
<br>

<h1>Habitacion <?php echo $numHabitacion ?></h1>
<br>
<div id="panelOptionService"></div>


<div id="modalServices"></div>


<script>
    $(document).ready(function() {


        let numHabitacion = <?php echo $numHabitacion ?>;
        $("#panelOptionService").load("opcionesHabitacion/opcionesServicios/historialServicios.php?numHabitacion=" + numHabitacion);
    });

    $("#liHistoryService").on("click", function() {

        let numHabitacion = <?php echo $numHabitacion ?>;

        $("#panelOptionService").empty();
        $("#panelOptionService").load("opcionesHabitacion/opcionesServicios/historialServicios.php?numHabitacion=" + numHabitacion);

    });

    $("#liAddService").on("click", function() {

        let numHabitacion = <?php echo $numHabitacion ?>;

        $("#panelOptionService").empty();
        $("#panelOptionService").load("opcionesHabitacion/opcionesServicios/agregarServicio.php?numHabitacion=" + numHabitacion);

    });
</script>