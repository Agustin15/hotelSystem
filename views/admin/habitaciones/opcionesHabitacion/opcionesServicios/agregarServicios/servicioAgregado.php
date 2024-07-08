<?php
$numHabitacion = $_GET['numHabitacion'];
$idReserva = $_GET['idReserva'];
$servicio = $_GET['servicio'];

switch ($servicio) {

    case "telefono":


        $text = "Tarifa de telefono agregada a la habitacion";

        break;

    case "masaje":


        $text = "servicio de masaje agregado a la habitacion";

        break;
}

?>

<div id="modalServicioAgregado">

    <br>
    <img src="../../../img/tickServices.gif">
    <br>
    <p><?php echo $text . " " . $numHabitacion ?></p>
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