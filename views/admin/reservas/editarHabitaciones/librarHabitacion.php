<?php

$numHabitacion = $_GET['habitacion'];
$idReserva = $_GET['idReserva'];


require("../../../../model/claseHabitaciones.php");
$claseHabitaciones = new habitaciones();

$habitacion = $claseHabitaciones->getHabitacionReservadaIdAndNum($numHabitacion, $idReserva);
$llegada = new DateTime($habitacion['fechaLlegadaHabitacion']);
$salida = new DateTime($habitacion['fechaSalidaHabitacion']);

?>


<img src="../../../img/cerrarVentana.png" id="cerrar">

<div id="formLibrar">

    <br>

    <img src="../../../img/habitacionLibrar.png">
    <br>
    <h1>Modificar habitacion <?php echo $numHabitacion ?></h1>
    <br>

    <label id="fechaLlegada">Fecha llegada:</label>
    <br><br>
    <label><?php echo $llegada->format("d-m-Y")  ?></label>
    <br><br>
    <label id="fechaSalida">Fecha salida:</label>
    <br><br>
    <label><?php echo $salida->format("d-m-Y") ?></label>

    <br><br>
    <label id="lblFechaLiberada">Cambiar fecha de salida:</label>

    <br>
    <input type="date" id="inputFechaLiberada" min="<?php echo $habitacion['fechaLlegadaHabitacion'] ?>"
      max="<?php echo $habitacion['fechaSalidaHabitacion']?>">
    <br>
    <input type="submit" value="Guardar" id="btnLiberar">



    <div id="alertaLibrar">

        <br>
        <img src="../../../img/cruzAgregar.png">
        <label></label>
    </div>
</div>


<script>
    $("#cerrar").on("click", function() {


        $("#opcionHabitacion").removeClass("panelHabitacionLibrar");
        $("#opcionHabitacion").empty();

    });

    $("#btnLiberar").on("click", function(event) {

        event.preventDefault();

        if ($("#inputFechaLiberada").val() == "") {

            const lbl = $("#alertaLibrar").find("label");
            lbl.text("Complete la fecha");
            $("#alertaLibrar").addClass("alertaAsignarActive");

        } else {

            var idReserva = "<?php echo $idReserva ?>";
            var habitacion = "<?php echo $numHabitacion ?>";
            var fechaLiberada = $("#inputFechaLiberada").val().trim();


            const reserva = {
                "idReserva": idReserva,
                "habitacion": habitacion,
                "fechaLiberada": fechaLiberada,
                "opcion": "liberar"

            };

            console.log(reserva);


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

                    const lbl = $("#alertaLibrar").find("label");
                    const img = $("#alertaLibrar").find("img");
                    lbl.text(data_resp.respuesta);

                    if (data_resp.respuesta == "Fecha de salida de la habitacion cambiada") {
                        img.attr("src", "../../../img/tickAgregar");
                    }

                    $("#alertaLibrar").addClass("alertaAsignarActive");



                })

        }
    });
</script>