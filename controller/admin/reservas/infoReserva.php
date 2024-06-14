<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);

?>


<ul id="opcionInfoReserva">

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


<script>
    var reserva = {

        "idReserva": <?php echo $reserva['idReserva'] ?>,
        "llegada": "<?php echo $reserva['llegada'] ?>",
        "salida": "<?php echo $reserva['salida'] ?>",
        "idCliente": <?php echo $reserva['idCliente'] ?>

    }

    $("#panelInfo").load("../../../controller/admin/reservas/opcionesInfoReserva/calendario.php?reserva=" +
        JSON.stringify(reserva));


    $(".liCalendario").on("click", function() {

        $("#panelInfo").load("../../../controller/admin/reservas/opcionesInfoReserva/calendario.php?reserva=" +
            JSON.stringify(reserva));

    });

    $(".liCliente").on("click", function() {

        $("#panelInfo").load("../../../controller/admin/reservas/opcionesInfoReserva/cliente.php?reserva=" +
            JSON.stringify(reserva));

    });


    $(".liHabitaciones").on("click", function() {

        $("#panelInfo").load("../../../controller/admin/reservas/opcionesInfoReserva/habitaciones.php?reserva=" +
            JSON.stringify(reserva));

    });


    $(".liHuespedes").on("click", function() {

        $("#panelInfo").load("../../../controller/admin/reservas/opcionesInfoReserva/huespedes.php?reserva=" +
            JSON.stringify(reserva));

    });

    $(".liFactura").on("click", function() {

        $("#panelInfo").load("../../../controller/admin/reservas/opcionesInfoReserva/factura.php?reserva=" +
            JSON.stringify(reserva));

    });

    $("#cerrar").on("click", function() {

        $(".divInfo").empty();
        $(".divOpcion").removeClass("divInfo");
        $("#modal").css("display", "none");
        location.reload();


    });
</script>