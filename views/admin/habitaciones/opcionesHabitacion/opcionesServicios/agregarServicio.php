<?php

require("../../../.././../model/claseServicios.php");
$claseServicio = new servicio();
$numHabitacion = $_GET['numHabitacion'];

?>

<h2>Agregar servicio</h2>

<br>

<div id="optionAddService"></div>

<ul id="servicesList">

    <div id="optionSup">
        <li id="liPhone">
            <h4>Telefono</h4>
            <br>
            <img src="../../../img/telephone.png">
        </li>

        <li id="liMassages">
            <h4>Masajes</h4>
            <br>
            <img src="../../../img/massage.png">
        </li>

    </div>

    <div id="optionInf">

        <li id="liMiniBar">
            <h4>Minibar</h4>
            <br>
            <img src="../../../img/minibar.png">
        </li>

        <li id="liCantina">
            <h4>Cantina</h4>
            <br>
            <img src="../../../img/bar-counter.png">
        </li>

    </div>


</ul>
<br>

<script>
    $("#liPhone").on("click", function() {

        $("#modalServices").css("display", "block");
        $("#modalServices").css("cursor", "none");

        $("#optionAddService").empty();
        $("#optionAddService").addClass("panelPhone");

        let numHabitacion = <?php echo $numHabitacion ?>;
        $("#optionAddService").load("opcionesHabitacion/opcionesServicios/agregarServicios/telefonoServicio.php?numHabitacion=" + numHabitacion);

    });

    $("#liMassages").on("click", function() {

        $("#modalServices").css("display", "block");
        $("#modalServices").css("cursor", "none");

        $("#optionAddService").empty();
        $("#optionAddService").addClass("panelMassage");

        let numHabitacion = <?php echo $numHabitacion ?>;
        $("#optionAddService").load("opcionesHabitacion/opcionesServicios/agregarServicios/masajeServicio.php?numHabitacion=" + numHabitacion);

    });

    $("#liMiniBar").on("click", function() {


        $("#optionAddService").empty();
        $("#optionAddService").addClass("panelMiniBar");

        let numHabitacion = <?php echo $numHabitacion ?>;
        $("#optionAddService").load("opcionesHabitacion/opcionesServicios/agregarServicios/miniBarServicio.php?numHabitacion=" + numHabitacion);

    });


    $("#liCantina").on("click", function() {

        $("#optionAddService").empty();
        $("#optionAddService").addClass("panelCantina");

        let numHabitacion = <?php echo $numHabitacion ?>;
        $("#optionAddService").load("opcionesHabitacion/opcionesServicios/agregarServicios/cantinaServicio.php?numHabitacion=" + numHabitacion);

    });
</script>