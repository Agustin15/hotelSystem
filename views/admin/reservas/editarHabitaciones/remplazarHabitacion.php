<?php

$habitacion = $_GET['habitacion'];
$categoria = $_GET['categoria'];

require("../../../../model/claseReservas.php");
$claseReservas = new reservas();

?>

<ul id="menuOpcionHabitacion">
    <li class="asignarHabitacion">
        <a>Agregar</a> <img class="imgAgregar" src="../../../img/agregarHabitacion.png">

    </li>
    <li>

        <a>Remplazar</a> <img class="imgRemplazar" src="../../../img/intercambiarHabitacion.png">


    </li>
</ul>

<br>
<img src="../../../img/cerrarVentana.png" id="cerrar">

<form id="formRemplazar">

    <br>

    <img src="../../../img/habitacionOcupar.png">
    <br>
    <h1>Remplazar habitacion por la habitacion <?php echo $habitacion ?></h1>

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
    }else{
    ?>

    <div id="subFormBuscar">
        <label>id Reserva</label>
        <br>

        <select name="idReserva" id="selectReserva">

            <?php


            foreach ($reservas as  $reserva) {

            ?>

                <option value="<?php echo $reserva['idReserva'] ?>"><?php echo $reserva['idReserva'] ?></option>
            <?php
            }
            ?>

        </select>

        <br>

        <button type="button" id="btnBuscar">Buscar</button>

        <br>
        <label class="lblSinHabitaciones">No hay habitaciones en esta reserva aun</label>

    </div>

    <?php
    }
    ?>

    <div class="subForm">

        <br>
        <label class="lblHabitacion">Habitaciones a remplazar</label>
        <br>
        <select id="selectHabitaciones">


        </select>
        <br><br>
        <label id="lblFechaRemplazo">Fecha remplazo</label>
        <br>

        <input type="date" id="inputFechaRemplazo" min="" max="">

        <br>
        <input type="submit" id="btnRemplazar" value="Remplazar">
        <br>
    </div>

    <div id="alertaRemplazar">

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


    $(".asignarHabitacion").on("click", function() {

        $("#divOpcion").empty();
        $("#divOpcion").removeClass("panelHabitacionRemplazar");
        $("#divOpcion").addClass("panelHabitacionAsignar");
        $("#divOpcion").load("editarHabitaciones/asignarHabitacion.php?habitacion=" +
            "<?php echo $habitacion ?>" + "&categoria=" + "<?php echo $categoria ?>"
        );

    });

    $("#btnBuscar").on("click", function(event) {

        event.preventDefault();

        var idReserva = $("#selectReserva").val();



        fetch("http://localhost/Sistema%20Hotel/controller/admin/reservas/getHabitaciones.php?idReserva=" +
                idReserva + "&opcion=remplazar", {

                    method: "GET",

                }).then(resp => resp.json())
            .then(data_resp => {

                if (data_resp == "Sin habitaciones") {

                    $(".lblSinHabitaciones").css("display", "block");
                    $(".subForm").css("display", "none");

                } else {

                    $(".lblSinHabitaciones").css("display", "none");

                    $(".subForm").css("display", "block");


                    var llegada = data_resp.llegada;
                    var salida = data_resp.salida;
                    var formAsignar = document.getElementById("formRemplazar");
                    var select = document.getElementById("selectHabitaciones");
                    var inputFechaRemplazo = document.getElementById("inputFechaRemplazo");

                    inputFechaRemplazo.innerHTML = "";
                    select.innerHTML = "";

                    data_resp.habitaciones.forEach(function(habitacion) {

                        var option = document.createElement("option");
                        option.text = habitacion.numHabitacionReservada;
                        select.add(option);

                    });

                    inputFechaRemplazo.min = llegada;
                    inputFechaRemplazo.max = salida;




                }
            })


    });


    $("#formRemplazar").on("submit", function(event) {

        event.preventDefault();

        const reserva = {

            "idReserva": $("#selectReserva").val().trim(),
            "habitacionNueva": "<?php echo $habitacion ?>",
            "habitacionAnterior": $("#selectHabitaciones").val().trim(),
            "fechaRemplazo": $("#inputFechaRemplazo").val().trim(),
            "opcion": "remplazar"
        };


        console.log(reserva);

        var opcion = "remplazar"

        fetch("http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionHabitacion.php", {

                method: "PUT",
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

                    $('#divOpcion').removeClass('.panelHabitacionRemplazar');
                    $('#divOpcion').empty();

                    aviso(data_resp.respuesta, "Remplazar habitacion");
                } else {


                    const lbl = $("#alertaRemplazar").find("label");
                    lbl.text(data_resp.respuesta);
                    $("#alertaRemplazar").addClass("alertaAsignarActive");

                }

            })

    });
</script>