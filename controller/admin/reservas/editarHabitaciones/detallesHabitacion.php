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


<script>
    $("#opcion").load("../../../controller/admin/reservas/editarHabitaciones/detalles/reserva.php?habitacion=" +
        "<?php echo $habitacion ?>"
    );


    $(".reserva").on("click", function() {

        $("#opcion").load("../../../controller/admin/reservas/editarHabitaciones/detalles/reserva.php?habitacion=" +
            "<?php echo $habitacion ?>"
        );

        widthDivDetalles();
    });


    $(".cliente").on("click", function() {


        $("#opcion").empty();
        $("#opcion").load("../../../controller/admin/reservas/editarHabitaciones/detalles/cliente.php?habitacion=" +
            "<?php echo $habitacion ?>"
        );

        widthDivDetalles();


    });

    $(".huespedes").on("click", function() {


        $("#opcion").empty();
        $("#opcion").load("../../../controller/admin/reservas/editarHabitaciones/detalles/huespedes.php?habitacion=" +
            "<?php echo $habitacion ?>"
        );

        widthDivDetalles();

    });



    $("#cerrar").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");
        $("#divOpcion").removeClass("panelHabitacionRemplazar");
        $("#divOpcion").removeClass("panelHabitacionAsignar");
        $("#divOpcion").empty();
        widthDivDetalles();

    });


    function widthDivDetalles () {


        $("#divDetalles").css("width", "400px");
        $("#divDetalles").css("marginLeft", "40%");
        $(".logoDetalles").css("marginLeft", "170px");
    }
</script>