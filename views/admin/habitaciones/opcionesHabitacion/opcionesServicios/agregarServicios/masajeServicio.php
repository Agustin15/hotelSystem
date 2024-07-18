<?php

require("../../../.././../../model/claseServicios.php");
require("../../../.././../../model/claseHabitaciones.php");
$claseServicio = new servicio();
$claseHabitacion = new habitaciones();
$numHabitacion = $_GET['numHabitacion'];

$service = $claseServicio->getServicio("masajes");
$idServicio = $service[0]['idServicio'];

$hoy = date("Y-m-d");
$habitacion = $claseHabitacion->getHabitacionReservadaFechaAndNum($hoy, $numHabitacion);
$idReserva = $habitacion['idReservaHabitacion'];

$cantHuespedes = $habitacion['ninos'] + $habitacion['adultos'];

?>

<br>
<img id="cerrar" src="../../../img/cerrarVentana.png">

<img src="../../../img/massage.png">
<br>
<h1>Agregar servicio de masaje</h1>
<br>


<div id="modalService">

</div>

<div id="msjServiceAdd">

</div>


<form id="formAddMassageService">

    <label id="tarifa">*Precio por huesped:$<?php echo $service[0]['precio'] ?></label>
    <br><br>
    <label id="lblPrecio">Cantidad de personas:</label>
    <br>
    <input id="cantPersonas" type="number" min="1" placeholder="Personas">

    <img src="../../../img/iconHuesped.png">
    <br>

    <label id="totalService"></label>
    <br>
    <button id="btnAgregar">Agregar</button>
</form>

<br>

<div id="avisoErrorAddService">

    <img src="../../../img/cruzEditar.png">

    <label id="lblAvisoError"></label>
</div>


<script>
    $("#cerrar").on("click", function() {

        $("#modalServices").css("display", "none");
        $("#modalServices").css("cursor", "auto");

        $("#optionAddService").empty();
        $("#optionAddService").removeClass("panelMassage");

    });

    var showNotice = (text, fontSize) => {

        $("#avisoErrorAddService").css("transform", "scale(1.0)");
        $("#avisoErrorAddService").css("font-size", fontSize);

        $("#lblAvisoError").text(text);
    }


    var cantHuespedes = <?php echo $cantHuespedes ?>;
    $("#cantPersonas").on("change", function() {

        if ($(this).val() != "") {

            var precio = <?php echo $service[0]['precio'] ?>;

            var cantidad = $(this).val();



            $("#totalService").text("Total:$" +precio * cantidad);

        }
    });

    $("#cantPersonas").keydown(function(e) {

        if (e.keyCode == 8) {
            $("#totalService").text("");

        }

    });


    $("#btnAgregar").on("click", function(event) {

        event.preventDefault();



        if ($("#cantPersonas").val() == "") {

            showNotice("Complete el campo de cantidad", 14);

            deleteNotice($("#avisoErrorAddService"));


        } else if (cantHuespedes != $("#cantPersonas").val().trim()) {


            showNotice("Cantidad no coincide con huespedes", 13);

            deleteNotice($("#avisoErrorAddService"));

        } else {

            var numHabitacion = <?php echo $numHabitacion ?>;
            var idReserva = <?php echo $idReserva ?>;
            var idServicio = <?php echo $idServicio ?>;
            var cantidad = parseInt($("#cantPersonas").val());
            var precio = <?php echo $service[0]['precio'] ?>

            var massage = {

                "idServicio": idServicio,
                "cantidad": cantidad,
                "precio": precio,
                "idReserva": idReserva,
                "numHabitacion": numHabitacion,
                "total": cantidad * precio

            };

            var servicio=[];
            servicio.push(massage);

            fetch("http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php", {

                    method: "POST",
                    body: JSON.stringify(servicio),
                    headers: {

                        "Content-Type": "application/json",
                    }
                }).then(respuesta => respuesta.json())
                .then(data_resp => {


                    console.log(data_resp);
                    if (data_resp.respuesta == true) {

                        $("#modalService").css("display", "block");
                        $("#modalService").css("cursor", "none");

                        $("#msjServiceAdd").addClass("serviceAdd");
                        $("#msjServiceAdd").load("opcionesHabitacion/opcionesServicios/agregarServicios/servicioAgregado.php?numHabitacion=" +
                            numHabitacion + "&&idReserva=" + idReserva + "&&servicio=masaje");
                            servicio=[];

                    }

                });
        }

    });

    function deleteNotice(alert) {

        setTimeout(function() {

            alert.css("transform", "scale(0.0)");
            var lbl = alert.find("label");
            lbl.text("");

        }, 4000);



    }
</script>