<?php

$habitacion = $_GET['habitacion'];

?>


<div id="divDetalles">


    <ul id="opcionDetalles">
        <li class="reserva">
            <img src="../../../img/reservaId.png">
            <br>
            <a>Reserva</a>
        </li>


        <li class="cliente">
            <img src="../../../img/personal-information.png">
            <br>
            <a>Cliente</a>
        </li>

        <li class="huespedes">
            <img src="../../../img/huespedesInfo.png">
            <br>
            <a>Huespedes</a>
        </li>

    </ul>
    <img src="../../../img/cerrarVentana.png" id="cerrar">

    <br>
    <img class="logoDetalles" src="../../../img/detalles.png">
    <br>

    <h1>Habitacion <?php echo $habitacion ?></h1>

    <br>
    <div id="opcion">


    </div>
    <br>



</div>

