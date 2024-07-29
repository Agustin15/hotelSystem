<div id="estandar">

    <br>

    <h1>Habitaciones Estandar</h1>
    <form id="formEstandar">
        <br>
        <label>Numero de habitacion</label>
        <input id="numHabitacion" min="1" type="number">
        <img id="iconSearch" src="../../../img/searchBooking.png">
    </form>


    <div id="alert">

        <div id="bodyAlert">
            <div id="imgAlert">
                <img src="../../../img/advertenciaService.png">
            </div>
            <div id="spanAlert">
                <span>No puedes acceder a servicios de una habitacion que no tiene una reserva en curso</span>
            </div>
            <div id="containButton">
                <button id="closeAlertBtn">Ok</button>
            </div>

        </div>
    </div>






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



            $habitacionesReservadas =  $claseHabitacion->habitacionesReservadas($habitacion['numHabitacion']);
            $habitacionMasCercana = $claseHabitacion->habitacionMasCercana($habitacion['numHabitacion']);
            $llegadaReservadaMasCercana = null;
            $salidaReservadaMasCercana = null;

            if (!empty($habitacionMasCercana)) {
                $llegadaReservadaMasCercana = $habitacionMasCercana['fechaLlegadaHabitacion'];
                $salidaReservadaMasCercana = $habitacionMasCercana['fechaSalidaHabitacion'];
            }

        ?>

            <li class="liHabitacion" data-habitacion="<?php echo $habitacion['numHabitacion'] ?> " data-llegada-cercana="<?php echo strtotime($llegadaReservadaMasCercana); ?>" data-salida-cercana="<?php echo strtotime($salidaReservadaMasCercana) ?>">

                <div>
                    <img class="iconoPlus" title="Opciones" src="../../../img/menuHabitacion.png">

                </div>

                <div class="containIconRoomAndNumb">
                    <div>
                        <img src="../../../img/bannerHab1.jpg">

                    </div>

                    <div>
                        <h4>Habitacion <?php echo $habitacion['numHabitacion'] ?></h4>

                    </div>
                </div>
                <?php

                if (empty($habitacionesReservadas)) {

                ?>

                    <div class="containSinReserva">
                        <div class="lblLibre">
                            <label>Libre</label>

                        </div>
                        <div class="sinReservaEnCurso">

                            <div>
                                <img src="../../../img/libreDeReservas.png">
                            </div>
                            <div class="message">
                                <h4>Sin reserva en curso</h4>
                            </div>
                        </div>

                    </div>


                    <?php

                } else {

                    if (

                        strtotime($habitacionMasCercana['fechaLlegadaHabitacion']) <= $hoy &&
                        strtotime($habitacionMasCercana['fechaSalidaHabitacion']) >= $hoy
                    ) {

                        $cliente = $claseClientes->getClienteUpdate($habitacionMasCercana['idClienteHabitacion']);

                    ?>

                        <div class="dataBookingRoom">

                            <div class="containBooking">
                                <div class="lblOcupada">
                                    <label>Ocupada</label>
                                </div>
                                <div class="lblNumReserva">
                                    <label>Reserva</label>
                                </div>
                                <div class="lblReserva">

                                    <label><a href="../reservas/lista.php?idReserva=<?php echo $habitacionMasCercana['idReservaHabitacion'] ?>">
                                            <?php echo $habitacionMasCercana['idReservaHabitacion'] ?></a>
                                    </label>
                                </div>


                            </div>


                            <div class="infoHuesped">

                                <div class="containIconAndLbl">
                                    <div>
                                        <img src="../../../img/iconHuesped.png">

                                    </div>

                                    <div class="lblHuesped">
                                        <label>Huesped</label>
                                    </div>
                                </div>
                                <div class="lblCliente">
                                    <label><a href="../clientes/lista.php?cliente=<?php echo $cliente['correo'] ?>">
                                            <?php echo $cliente['correo'] ?></a></label>
                                </div>
                            </div>

                        </div>

                    <?php


                    } else {
                    ?>

                        <div class="containSinReserva">
                            <div class="lblLibre">
                                <label>Libre</label>

                            </div>
                            <div class="sinReservaEnCurso">

                                <div>
                                    <img src="../../../img/libreDeReservas.png">
                                </div>
                                <div class="message">
                                    <h4>Sin reserva en curso</h4>
                                </div>
                            </div>

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

        let menuRoom = $(".menuHabitacion");
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

        let menuRoom = document.createElement("ul");
        menuRoom.className = "menuHabitacion";
        menuRoom.innerHTML = `
        
        <li class="liHistorial">

            <div class="iconHistorial">
                <img src="../../../img/history.png">

            </div>
            <div>
                <a>Historial</a>
            </div>

        </li>
        <li class="liProximamente">

            <div>
                <img src="../../../img/long-term.png">
            </div>

            <div>
                <a>Proximamente</a>

            </div>
        </li>
        <li class="liServicesRoom">

            <div>
                <img src="../../../img/order-food.png">
            </div>
            <div>
                <a>Servicios</a>
            </div>
        </li>


     

        `;

        liHabitacion.append(menuRoom);

    }

    const closeMenuRoom = (liHabitacion) => {

        let menuRoomClose = liHabitacion.find(".menuHabitacion");
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



    const alertServiceOption = (option) => {


        if (option == "show") {
            $("#alert").css("display", "block");

        } else {

            $("#alert").css("display", "none")
            $("#modal").css("display", "none");

        }
    }

    $(document).on("click", ".liServicesRoom", function() {


        let habitacion = $(this).parent().parent().closest("li");
        let numHabitacion = habitacion.data("habitacion");
        let fechaSalidaHabitacionMasCercana = habitacion.data("salidaCercana");
        let fechaLlegadaHabitacionMasCercana = habitacion.data("llegadaCercana");
        let hoy = <?php echo $hoy; ?>


        $("#modal").css("display", "block");
        $("#modal").css("cursor", "none");

        if (fechaLlegadaHabitacionMasCercana == null || fechaSalidaHabitacionMasCercana == null) {

            alertServiceOption("show");

        } else {


            if (fechaLlegadaHabitacionMasCercana > hoy || fechaSalidaHabitacionMasCercana < hoy) {

                alertServiceOption("show");

            } else {

                $("#divOpcion").load("opcionesHabitacion/servicios.php?numHabitacion=" + numHabitacion);
                $("#divOpcion").addClass("panelServicesRoom");

            }

        }
    });

    $("#closeAlertBtn").on("click", function() {

        alertServiceOption("hide");

    });
</script>