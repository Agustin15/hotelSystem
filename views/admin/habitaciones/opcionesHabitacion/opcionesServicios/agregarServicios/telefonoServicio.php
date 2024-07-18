<?php

require("../../../.././../../model/claseServicios.php");
require("../../../.././../../model/claseHabitaciones.php");
$claseServicio = new servicio();
$claseHabitacion = new habitaciones();
$numHabitacion = $_GET['numHabitacion'];

$servicePhone = $claseServicio->getServicio("telefono");
$idServicio = $servicePhone[0]['idServicio'];

$hoy = date("Y-m-d");
$habitacion = $claseHabitacion->getHabitacionReservadaFechaAndNum($hoy, $numHabitacion);
$idReserva = $habitacion['idReservaHabitacion'];




?>

<br>
<img id="cerrar" src="../../../img/cerrarVentana.png">

<img src="../../../img/telephone.png">
<br>
<h1>Agregar tarifa telefono</h1>
<br>


<div id="modalService">

</div>

<div id="msjServiceAdd">

</div>


<form id="formAddPhoneService">

    <label id="tarifa">*Tarifa:$<?php echo $servicePhone[0]['precio'] ?> por minuto</label>
    <br><br>
    <label id="lblPrecio">Cantidad de minutos de llamada:</label>
    <br>

    <input id="minutosLlamada" type="text" placeholder="Minutos">

    <img id="clock" title="Calcular tarifa" src="../../../img/reloj.png">
    <br>
    <label id="lblTotalPhone"></label>

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
        $("#optionAddService").removeClass("panelPhone");

    });


    $("#clock").on("click", function() {

        if ($("#minutosLlamada").val() != "") {

            var calculatePhone = {

                "precio": <?php echo $servicePhone[0]['precio'] ?>,
                "cantidad": $("#minutosLlamada").val().trim()

            };


            $("#lblTotalPhone").text("Total:$" + calculatePhone.precio * calculatePhone.cantidad);

        }
    });

    $("#minutosLlamada").keydown(function(e) {

        if (e.keyCode == 8) {
            $("#lblTotalPhone").text("");

        }

    });

    $("#btnAgregar").on("click", function(event) {

        event.preventDefault();

        if ($("#minutosLlamada").val() == "") {

            $("#avisoErrorAddService").css("transform", "scale(1.0)");

            $("#lblAvisoError").text("Complete el campo de precio");

            deleteNotice($("#avisoErrorAddService"));


        } else {

            var numHabitacion = <?php echo $numHabitacion ?>;
            var idReserva = <?php echo $idReserva ?>;
            var idServicio = <?php echo $idServicio ?>;
            var precio = <?php echo $servicePhone[0]['precio'] ?>;
            var cantidad = parseInt($("#minutosLlamada").val());


            var phone = {

                "idServicio": idServicio,
                "cantidad": cantidad,
                "precio": precio,
                "idReserva": idReserva,
                "numHabitacion": numHabitacion,
                "total": precio * cantidad

            };

            var servicio = [];
            servicio.push(phone);


            fetch("http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php", {

                    method: "POST",
                    body: JSON.stringify(servicio),
                    headers: {

                        "Content-Type": "application/json",
                    }
                }).then(respuesta => respuesta.json())
                .then(data_resp => {


                    if (data_resp.respuesta == true) {

                        $("#modalService").css("display", "block");
                        $("#modalService").css("cursor", "none");

                        $("#msjServiceAdd").addClass("serviceAdd");
                        $("#msjServiceAdd").load("opcionesHabitacion/opcionesServicios/agregarServicios/servicioAgregado.php?numHabitacion=" +
                            numHabitacion + "&&idReserva=" + idReserva + "&&servicio=telefono");

                        servicio = [];

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