<?php

$fechaLlegada = $_GET['fechaLlegada'];
$fechaSalida = $_GET['fechaSalida'];


require("../../../model/claseHabitaciones.php");
require("../../../model/claseCliente.php");

$claseCliente = new cliente();
$claseHabitacion = new habitaciones();

$totalHabitacionesHotel = $claseHabitacion->getCantidadHabitaciones();

?>


<form id="formAgregar">

    <img class="iconoFormAgregar" src="http://localhost/Sistema%20Hotel/img/nuevaReserva.png">

    <h1>Nueva reserva</h1>

    <br>

    <label class="lblCliente">Cliente</label>
    <select id="cliente">>

        <?php

        $clientes = $claseCliente->getAllClientes();
        foreach ($clientes->fetch_all(MYSQLI_ASSOC) as $cliente) {

        ?>


            <option value="<?php echo $cliente['idCliente'] ?>"><?php echo $cliente['idCliente'] .
                                                                    " (" . $cliente['correo'] . ")" ?></option>
        <?php

        }
        ?>
    </select>

    <br>

    <label class="lblLlegada">Fecha Llegada</label>
    <input id="fechaLlegada" readonly value="<?php echo $fechaLlegada ?>" type="date">

    <br>

    <label class="lblSalida">Fecha Salida</label>
    <input id="fechaSalida" readonly value="<?php echo $fechaSalida ?>" type="date">

    <br>

    <label class="lblCantidadHabitaciones">Cantidad habitaciones</label>
    <input id="cantidadHabitaciones" type="number" max="<?php echo $totalHabitacionesHotel ?>" min="1">

    <br>
    <input type="submit" value="Agregar"></input>
    <button id="btnCancelar" value="Cancelar">Cancelar</button>

    <div id="alertaAgregar">

        <br>
        <img src="../../../img/cruzAgregar.png">
        <label></label>

    </div>

</form>

<?php

?>


<script>
    $("#formAgregar").on("submit", function(event) {

        event.preventDefault();


        if ($("#cantidadHabitaciones").val().trim() == "") {

            const lbl = $("#alertaAgregar").find("label");
            lbl.text("Complete todos los campos");
            $("#alertaAgregar").addClass("alertaAgregarActive");


        }else{

        const datosReserva = {
            "idCliente": $("#cliente").val().trim(),
            "llegada": $("#fechaLlegada").val().trim(),
            "salida": $("#fechaSalida").val().trim(),
            "cantidadHabitaciones": $("#cantidadHabitaciones").val().trim()

        }



        fetch("http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionReserva.php", {

                method: "POST",
                body: JSON.stringify({
                    'reserva': datosReserva,

                }),
                headers: {

                    "Content-Type": "application/json",
                }

            }).then(resp => resp.json())
            .then(data_resp => {

                console.log(data_resp.respuesta);
                if (data_resp.respuesta == true) {


                    $('.divOpcion').removeClass('newReserve');
                    $('.divOpcion').empty();
                    $('.divOpcion').addClass('bookingAdd');
                    $('.divOpcion').load("reservaAgregada.html",function(){

                        $(".bodyReservaAgregada").addClass("bodyReservaAgregadaShow");
                    });
                    
                 
    
                } else {


                    const lbl = $("#alertaAgregar").find("label");
                    lbl.text(data_resp.respuesta);
                    $("#alertaAgregar").addClass("alertaAgregarActive");

                }

            })
        }
    });



    $("#btnCancelar").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");

        $('.divOpcion').removeClass('newReserve');
        $('.divOpcion').empty();
        location.reload();

    })
</script>