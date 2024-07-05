<?php
$numHabitacion = $_GET['numHabitacion'];
$idReserva = $_GET['idReserva'];
?>

<div id="modalServicioAgregado">

    <br>
    <img src="../../../img/tickServices.gif">
    <br>
    <p>Tarifa de telefono agregada a la habitacion <?php echo $numHabitacion ?></p>
    <p>de la reserva <?php echo $idReserva ?></p>

    <br>

    <button id="buttonOk">OK</button>
</div>

<script>
    $("#buttonOk").on("click", function() {

        $("#modalService").css("display", "none");
        $("#modalService").css("cursor", "auto");

        $("#msjServiceAdd").empty();
        $("#msjServiceAdd").removeClass("serviceAdd");

    });
</script>