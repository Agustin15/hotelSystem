<div id="suite">

    <br>

    <h1>Habitaciones Suite</h1>
    <form id="formSuite">
        <br>
        <label>Numero de habitacion</label>
        <input id="numHabitacion" min="1" type="number">
        <img id="iconSearch" src="../../../img/searchBooking.png">

    </form>


    <ul id="habitacionesSuite">

        <?php

        date_default_timezone_set('America/Argentina/Buenos_Aires');

        $hoy = strtotime(date("Y-m-d"));

        require("../../../../model/claseReservas.php");
        require("../../../../model/claseHabitaciones.php");

        $claseHabitacion = new habitaciones();
        $claseReservas = new reservas();

        $habitaciones =  $claseHabitacion->getAllHabitacionesCategoria("Suite");

        foreach ($habitaciones as $habitacion) {

        ?>

            <li data-habitacion="<?php echo $habitacion['numHabitacion'] ?>">


                <img class="iconoCalendar" title="reservas cercanas" src="../../../img/reservaId.png">
                <img src="../../../img/bannerHab1.jpg">
                <h4>Habitacion <?php echo $habitacion['numHabitacion'] ?></h4>

                <?php

                $habitacionesReservadas =  $claseHabitacion->habitacionesReservadas($habitacion['numHabitacion']);
                if (empty($habitacionesReservadas)) {

                ?>
                    <label class="lblLibre">Libre</label>
                    <button class="btnOcupar">Ocupar</button>
                    <?php

                } else {

                    $habitacionMasCercana = $claseHabitacion->habitacionMasCercana($habitacion['numHabitacion']);


                    if (

                        strtotime($habitacionMasCercana['fechaLlegadaHabitacion']) <= $hoy &&
                        strtotime($habitacionMasCercana['fechaSalidaHabitacion']) >= $hoy
                    ) {

                    ?>
                        <label class="lblOcupada">Ocupada</label>
                        <button class="btnDetalles">Detalles</button>

                    <?php

                    } else {
                    ?>
                        <label class="lblLibre">Libre</label>
                        <button class="btnOcupar">Ocupar</button>
                <?php


                    }
                }
                ?>



            </li>


        <?php

        }


        ?>



        <div id="sinDatosHabitaciones">

            <h1>Habitacion no encontrada</h1>
            <br>
            <img src="../../../img/advertenciaClientes.png">

        </div>
    </ul>
</div>


<script>
    inputHabitacionSearch = $("#numHabitacion");
    divHabitaciones = $("#habitacionesSuite");
    liHabitaciones = divHabitaciones.find("li");


    inputHabitacionSearch.on("change", function() {

        liHabitaciones.each(function() {


            var numHabitacion = $(this).data("habitacion").toString();
            if (numHabitacion.indexOf(inputHabitacionSearch.val()) != -1) {

                $(this).show();

            } else {

                $(this).hide();

            }

        });


        var liHidden = liHabitaciones.filter(":hidden");

        if (liHidden.length == liHabitaciones.length) {

            $("#sinDatosHabitaciones").css("display", "block");

        } else {

            $("#sinDatosHabitaciones").css("display", "none");
        }

    });





    $(".iconoCalendar").on("click", function() {


        var habitacion = $(this).parent();

        var numeroHabitacion = habitacion.data("habitacion");

        $("#modal").css("display", "inline");
        $("#modal").css("cursor", "none");

        $("#divOpcion").addClass("reservaMasCercana");
        $("#divOpcion").load("editarHabitaciones/calendarioHabitacion.php?habitacion=" +
            encodeURIComponent(numeroHabitacion));
        $("#modal").css("display", "block");



    });


    $(".btnOcupar").on("click", function() {

        var habitacion = $(this).parent();

        var numeroHabitacion = habitacion.data("habitacion");

        $("#modal").css("display", "inline");
        $("#modal").css("cursor", "none");

        $("#divOpcion").addClass("panelHabitacionAsignar");
        $("#divOpcion").load("editarHabitaciones/asignarHabitacion.php?habitacion=" +
            encodeURIComponent(numeroHabitacion) + "&categoria=Suite");
        $("#modal").css("display", "block");



    });


    $(".btnDetalles").on("click", function() {


        var habitacion = $(this).parent();

        var numeroHabitacion = habitacion.data("habitacion");


        $("#modal").css("display", "inline");
        $("#modal").css("cursor", "none");

        $("#divOpcion").addClass("panelHabitacionDetalles");
        $("#divOpcion").load("editarHabitaciones/detallesHabitacion.php?habitacion=" +
            encodeURIComponent(numeroHabitacion) + "&categoria=Deluxe");
        $("#modal").css("display", "block");



    });
</script>