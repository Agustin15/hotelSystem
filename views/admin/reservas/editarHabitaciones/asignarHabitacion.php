<?php

$habitacion = $_GET['habitacion'];
$categoria = $_GET['categoria'];

require("../../../../model/claseReservas.php");
$claseReservas = new reservas();

?>

<ul id="menuOpcionHabitacion">
    <li class="agregarHabitacion">
        <a>Agregar</a> <img class="imgAgregar" src="../../../img/agregarHabitacion.png">

    </li>
    <li class="remplazarHabitacion">

        <a>Remplazar</a> <img class="imgRemplazar" src="../../../img/intercambiarHabitacion.png">

    </li>
</ul>

<br>

<img src="../../../img/cerrarVentana.png" id="cerrar">

<form id="formAsignar">

    <br>

    <img src="../../../img/habitacionOcupar.png">
    <br>
    <h1>Agregar Habitacion <?php echo $habitacion ?></h1>

    <br>
    <?php

    date_default_timezone_set('America/Montevideo');
    $hoy = date("Y-m-d");
    $reservas = $claseReservas->getReservasHabilitadas($hoy);
    if (empty($reservas)) {

    ?>

        <h3>No hay reservas en curso</h3>
        <br>
        <img id="sinBookings" src="../../../img/withoutBooking.png">

    <?php
    } else {
    ?>

        <label>id Reserva</label>
        <br>
        <select id="idReserva">

            <?php
            foreach ($reservas as $reserva) {

            ?>

                <option value="<?php echo $reserva['idReserva'] ?>"><?php echo $reserva['idReserva'] ?></option>
            <?php
            }
            ?>

        </select>
        <button id="btnBuscar">Buscar</button>
    <?php
    }
    ?>
    <br><br>

    <div class="subForm">

        <label class="lblAdultos">Adultos</label> <label class="lblNinos">Niños</label>
        <br>
        <input type="number" min="0" value="0" id="cantAdultos">
        <input min="0" value="0" type="number" id="cantNinos">
        <br>
        <label>Fecha agregado</label>
        <br>
        <input type="date" id="fechaAgregado">
        <br>
        <input type="submit" value="Asignar">
        <br>
    </div>

    <div id="alertaAsignar">

        <br>
        <img src="../../../img/cruzEliminar.png">
        <label></label>
    </div>
</form>

<script>
    $("#cerrar").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");
        $("#divOpcion").removeClass("panelHabitacionRemplazar");
        $("#divOpcion").removeClass("panelHabitacionAsignar");
        $("#divOpcion").empty();

    });


    $(".remplazarHabitacion").on("click", function() {

        $("#divOpcion").empty();
        $("#divOpcion").removeClass("panelHabitacionAsignar");
        $("#divOpcion").addClass("panelHabitacionRemplazar");
        $("#divOpcion").load("editarHabitaciones/remplazarHabitacion.php?habitacion=" +
            "<?php echo $habitacion ?>" + "&categoria=" + "<?php echo $categoria ?>"
        );

    });

    $("#btnBuscar").on("click", function(event) {

        event.preventDefault();

        var idReserva = $("#idReserva").val();



        fetch("http://localhost/Sistema%20Hotel/controller/admin/reservas/getHabitaciones.php?idReserva=" +
                idReserva + "&opcion=agregar", {

                    method: "GET",

                }).then(resp => resp.json())
            .then(data_resp => {

                var subForm = $(".subForm");
                subForm.css("display", "block");

                var llegada = data_resp.llegada;
                var salida = data_resp.salida;

                var inputFechaAgregado = $("#fechaAgregado");
                inputFechaAgregado.attr("min", llegada);
                inputFechaAgregado.attr("max", salida);
            })

    });

    var categoria = "<?php echo $categoria ?>";

    switch (categoria) {

        case "Estandar":
        case "Deluxe":

            $("#cantAdultos").attr("max", 5);
            $("#cantNinos").attr("max", 4);
            break;

        case "Suite":

            $("#cantAdultos").attr("max", 6);
            $("#cantNinos").attr("max", 5);
            break;


    }


    $("#formAsignar").on("submit", function(event) {

        event.preventDefault();

        if ($("#cantAdultos").val() == 0 || $("#cantAdultos").val() == "") {

            const lbl = $("#alertaAsignar").find("label");
            lbl.text("Debe haber al menos un adulto de huesped");
            $("#alertaAsignar").addClass("alertaAsignarActive");

        } else {

            var idReserva = $("#idReserva").val().trim();
            var habitacion = "<?php echo $habitacion ?>";
            var fechaAgregado = $("#fechaAgregado").val().trim();


            const reserva = {
                "idReserva": idReserva,
                "habitacion": habitacion,
                "fechaAgregado": fechaAgregado,
                "adultos": $("#cantAdultos").val().trim(),
                "ninos": $("#cantNinos").val().trim()

            };

            console.log(reserva);

            fetch("http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionHabitacion.php", {

                    method: "POST",
                    body: JSON.stringify({
                        'reserva': reserva,
                    }),

                    headers: {

                        "Content-Type": "application/json",
                    }


                }).then(resp => resp.json())
                .then(data_resp => {

                    if (data_resp.respuesta == true) {

                        $("#modal").css("display", "none");
                        $("#modal").css("cursor", "auto");

                        $('#divOpcion').removeClass('.panelHabitacionAsignar');
                        $('#divOpcion').empty();

                        aviso(data_resp.respuesta, "Asignar habitacion");
                    } else {

                        const lbl = $("#alertaAsignar").find("label");
                        lbl.text(data_resp.respuesta);
                        $("#alertaAsignar").addClass("alertaAsignarActive");

                    }

                })

        }
    });
</script>