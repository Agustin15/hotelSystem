<?php

require("../../../.././../../model/claseServicios.php");
require("../../../.././../../model/claseHabitaciones.php");
$claseServicio = new servicio();
$claseHabitacion = new habitaciones();
$numHabitacion = $_GET['numHabitacion'];

$servicePhone = $claseServicio->getServicio("telefono");
$idServicio = $servicePhone['idServicio'];

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

    <label id="tarifa">*Tarifa:<?php echo $servicePhone['precio'] ?> pesos por minuto</label>
    <br><br>
    <label id="lblPrecio">Cantidad de minutos de llamada:</label>
    <br>
    <input id="minutosLlamada" type="text" placeholder="Minutos">

    <img src="../../../img/reloj.png">
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

    $("#btnAgregar").on("click", function(event) {

        event.preventDefault();

        if ($("#minutosLlamada").val() == "") {

            $("#avisoErrorAddService").addClass("avisoErrorAddServiceShow");
            $("#lblAvisoError").text("Complete el campo de precio");
        } else {

            let numHabitacion = <?php echo $numHabitacion ?>;
            let idReserva = <?php echo $idReserva ?>;
            let idServicio = <?php echo $idServicio ?>;
            const servicio = {

                "idServicio": idServicio,
                "cantidad": parseInt($("#minutosLlamada").val()),
                "idReserva": idReserva,
                "numHabitacion": numHabitacion

            };

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
                        $("#msjServiceAdd").load("opcionesHabitacion/opcionesServicios/agregarServicios/telefonoServicioAgregado.php?numHabitacion=" +
                            numHabitacion + "&&idReserva=" + idReserva);

                    }

                });
        }

    });
</script>