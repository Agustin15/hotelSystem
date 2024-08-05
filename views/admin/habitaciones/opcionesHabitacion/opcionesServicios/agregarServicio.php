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

