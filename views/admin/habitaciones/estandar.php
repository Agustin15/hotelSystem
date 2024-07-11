<div id="estandar">

    <br>

    <h1>Habitaciones Estandar</h1>
    <form id="formEstandar">
        <br>
        <label>Numero de habitacion</label>
        <input id="numHabitacion" min="1" type="number">
        <img id="iconSearch" src="../../../img/searchBooking.png">
    </form>


    <ul id="habitacionesEstandar">

        <?php

        date_default_timezone_set('America/Argentina/Buenos_Aires');

        $hoy = strtotime(date("Y-m-d"));

        require("../../../model/claseReservas.php");
        require("../../../model/claseHabitaciones.php");
        require("../../../model/claseCliente.php");

        $claseHabitacion = new habitaciones();
        $claseReservas = new reservas();
        $claseClientes = new cliente();

        $habitaciones =  $claseHabitacion->getAllHabitacionesCategoria("Estandar");

        foreach ($habitaciones as $habitacion) {

        ?>

            <li class="liHabitacion" data-habitacion="<?php echo $habitacion['numHabitacion'] ?>">

                <img class="iconoPlus" title="Opciones" src="../../../img/menuHabitacion.png">
                <img src="../../../img/bannerHab1.jpg">
                <h4>Habitacion <?php echo $habitacion['numHabitacion'] ?></h4>

                <?php

                $habitacionesReservadas =  $claseHabitacion->habitacionesReservadas($habitacion['numHabitacion']);
                if (empty($habitacionesReservadas)) {

                ?>
                    <label class="lblLibre">Libre</label>
                    <div class="sinReservaEnCurso">

                        <img src="../../../img/libreDeReservas.png">
                        <br>
                        <h4>Sin reserva en curso</h4>
                    </div>

                    <?php

                } else {

                    $habitacionMasCercana = $claseHabitacion->habitacionMasCercana($habitacion['numHabitacion']);


                    if (

                        strtotime($habitacionMasCercana['fechaLlegadaHabitacion']) <= $hoy &&
                        strtotime($habitacionMasCercana['fechaSalidaHabitacion']) >= $hoy
                    ) {

                        $cliente = $claseClientes->getClienteUpdate($habitacionMasCercana['idClienteHabitacion']);

                    ?>
                        <label class="lblOcupada">Ocupada</label>
                        <div class="infoReserva">
                            <label class="lblNumReserva">Reserva</label>
                            <label class="lblReserva"><a href="../reservas/lista.php?idReserva=<?php echo $habitacionMasCercana['idReservaHabitacion'] ?>">
                                    <?php echo $habitacionMasCercana['idReservaHabitacion'] ?></a>
                            </label>

                        </div>
                        <div class="infoHuesped">
                            <img src="../../../img/iconHuesped.png"> <label class="lblHuesped">Huesped</label>
                            <label class="lblCliente"><a href="../clientes/lista.php?cliente=<?php echo $cliente['correo'] ?>">
                                    <?php echo $cliente['correo'] ?></a></label>
                        </div>

                    <?php


                    } else {
                    ?>
                        <label class="lblLibre">Libre</label>
                        <div class="sinReservaEnCurso">

                            <img src="../../../img/libreDeReservas.png">
                            <br>
                            <h4>Sin reserva en curso</h4>
                        </div>

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
    var inputHabitacionSearch = $("#numHabitacion");
    var divHabitaciones = $("#habitacionesEstandar");
    var liHabitaciones = divHabitaciones.find("li");


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




    $(".iconoPlus").on("click", function() {

        let liHabitacion = $(this).parent();
        let numHabitacion = liHabitacion.data("habitacion");

        let menuRoom = $(".menuRoom");
        if (menuRoom.length > 0 && $(this).attr('src') == "../../../img/menuHabitacion.png") {

            let liFatherRoom = menuRoom.parent();
            let iconoPlusMenuClose = liFatherRoom.find(".iconoPlus");
            iconoPlusMenuClose.attr("src", "../../../img/menuHabitacion.png");
            menuRoom.remove();
        }

        if ($(this).attr('src') == "../../../img/menuHabitacion.png") {

            $(this).attr('src', "../../../img/menuOpen.png");
            openMenuRoom(liHabitacion);


        } else {

            closeMenuRoom(liHabitacion);
            $(this).attr('src', "../../../img/menuHabitacion.png");
        }

    });


    const openMenuRoom = (liHabitacion) => {

        let menuRoom = document.createElement("div");
        menuRoom.className = "menuRoom";
        menuRoom.innerHTML = `
        
        <nav id="menuHabitacion">
        <ul>
         <li class="liHistorial"><img src="../../../img/history.png"><a>Historial</a></li>
         <li class="liProximamente"><img src="../../../img/long-term.png"><a>Proximamente</a></li>
         <li class="liServicesRoom"><img src="../../../img/order-food.png"><a>Servicios</a></li>
         
        <ul>
        </nav>
        `;

        liHabitacion.append(menuRoom);


    }

    const closeMenuRoom = (liHabitacion) => {

        let menuRoomClose = liHabitacion.find(".menuRoom");
        menuRoomClose.remove();


    }

    $(document).on("click", ".liHistorial", function() {


        $("#modal").css("display", "block");
        $("#modal").css("cursor", "none");

        let habitacion = $(this).parent().parent().closest("li");
        let numHabitacion = habitacion.data("habitacion");

        $("#divOpcion").load("opcionesHabitacion/historial.php?numHabitacion=" + numHabitacion);
        $("#divOpcion").addClass("panelHistorial");



    });

    $(document).on("click", ".liProximamente", function() {


        $("#modal").css("display", "block");
        $("#modal").css("cursor", "none");

        let habitacion = $(this).parent().parent().closest("li");
        let numHabitacion = habitacion.data("habitacion");

        $("#divOpcion").load("opcionesHabitacion/proximamente.php?numHabitacion=" + numHabitacion);
        $("#divOpcion").addClass("panelProximamente");



    });

    $(document).on("click", ".liServicesRoom", function() {


        $("#modal").css("display", "block");
        $("#modal").css("cursor", "none");

        let habitacion = $(this).parent().parent().closest("li");
        let numHabitacion = habitacion.data("habitacion");

        $("#divOpcion").load("opcionesHabitacion/servicios.php?numHabitacion=" + numHabitacion);
        $("#divOpcion").addClass("panelServicesRoom");



    });
</script>