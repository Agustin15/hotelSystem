<?php

$habitacion = $_GET['habitacion'];

$idReserva = $_GET['idReserva'];

?>

<br>
<img src="http://localhost/Sistema%20Hotel/img/borrarAlerta.png">
<br>
<h2>¿Desea eliminar la habitacion <?php echo $habitacion ?> de la reserva
    <?php echo $idReserva ?>?</h2>
<br>

<button class="btnSi">Si</button>
<button class="btnNo">No</button>


<script>
    $(".btnSi").on("click", function() {


        const eliminarHabitacion = {
            "idReserva": "<?php echo $idReserva ?>",
            "habitacion": "<?php echo $habitacion ?>"
        };

        console.log(eliminarHabitacion);
        datosHabitacion = [];

        datosHabitacion.push(encodeURIComponent(JSON.stringify(eliminarHabitacion)));

        console.log(datosHabitacion);

        var url = `http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionHabitacion.php?datosHabitacion=
        ${datosHabitacion}`;
        fetch(url, {


                method: "DELETE"


            })
            .then(resp => resp.json())
            .then(data_resp => {


                if (data_resp.respuesta == true) {

                    $("#opcionHabitacion").empty();
                    $("#opcionHabitacion").load("habitacionEliminada.html", function() {

                        $(".bodyHabitacionEliminada").addClass("bodyHabitacionEliminadaShow");
                    });


                }

            })



    });


    $(".btnNo").on("click", function() {

        $("#opcionHabitacion").empty();
        $("#opcionHabitacion").removeClass("panelHabitacionEliminar");
        
        $(".divOpcion").empty();
        $(".divOpcion").load("../formHabitaciones.php?idReserva=" +
            "<?php echo $idReserva?>");

    })
</script>