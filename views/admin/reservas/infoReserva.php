<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);

?>


<ul id="opcionInfoReserva" data-id-reserva="<?php echo $reserva['idReserva'] ?>" data-llegada="<?php echo $reserva['llegada'] ?>" data-salida="<?php echo $reserva['salida'] ?>" data-id-cliente="<?php echo $reserva['idCliente'] ?>">

    <li class="liCalendario">
        <img src="../../../img/reservaId.png">

        Calendario
    </li>
    <li class="liCliente">
        <img src="../../../img/personal-information.png">
        <br>
        Cliente
    </li>
    <li class="liHabitaciones">
        <img src="../../../img/habitacionesInfo.png">
        Habitaciones
    </li>

    <li class="liHuespedes">
        <img src="../../../img/huespedesInfo.png">
        Huespedes
    </li>

    <li class="liServicios">
        <img src="../../../img/servicioInfo.png">
        <br>
        Servicios
    </li>

    <li class="liFactura">
        <img src="../../../img/pagoInfo.png">
        <br>
        Deposito

    </li>
</ul>

<img id="cerrar" src="../../../img/cerrarVentana.png">

<br>
<img src="../../../img/detalles.png" id="iconoInfoReserva">
<br>
<h1>
    Datos Reserva <?php echo $reserva['idReserva'] ?>
</h1>

<br>

<div id="panelInfo">


</div>