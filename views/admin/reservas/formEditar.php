<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);

require("../../../model/claseReservas.php");
require("../../../model/claseHabitaciones.php");
require("../../../model/claseCliente.php");
$claseReserva = new reservas();
$claseHabitacion = new habitaciones();
$claseCliente = new cliente();

$cliente = $claseCliente->getClienteUpdate($reserva['idCliente']);
$totalHabitacionesHotel = $claseHabitacion->getCantidadHabitaciones();

?>


<ul id="menuOpcionEditar">
    <li class="editarReserva">
        <a>Editar Reserva</a> <img class="imgAgregar" src="../../../img/reserva2.png">

    </li>
    <li class="editarHabitacion">

        <a>Editar habitaciones</a> <img class="imgRemplazar" src="../../../img/habitacionesDetalle.png">

    </li>
</ul>

<br>
<form id="formEditar">

    <img class="iconoFormEditar" src="http://localhost/Sistema%20Hotel/img/editar.png">

    <br>
    <h1>Editar reserva <?php echo $reserva['idReserva'] ?></h1>

    <br>

    <label class="lblCliente">Cliente</label>
    <select id="cliente">

        <option value="<?php echo $reserva['idCliente'] ?>">
            <?php echo $reserva['idCliente'] . " (" . $cliente['correo'] . ")" ?>
        </option>

        <?php

        $clientes = $claseCliente->getClientesDistintos($reserva['idCliente']);
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
    <input id="fechaLlegada" value="<?php echo $reserva['llegada'] ?>" type="date" min="<?php echo $reserva['llegada'] ?>">

    <br>

    <label class="lblSalida">Fecha Salida</label>
    <input id="fechaSalida" value="<?php echo $reserva['salida'] ?>" type="date" min="<?php echo $reserva['llegada'] ?>">

    <br>

    <label class="lblCantidadHabitaciones">Cantidad habitaciones</label>
    <input id="cantidadHabitaciones" value="<?php echo $reserva['cantidadHabitaciones'] ?>" type="number" max="<?php echo $totalHabitacionesHotel ?>" min="1">

    <br>
    <input type="submit" value="Guardar"></input>
    <button id="btnCancelar" value="Cancelar">Cancelar</button>

    <div id="alertaEditar">

        <br>
        <img src="../../../img/cruzEditar.png">
        <label></label>

    </div>

</form>

<?php

?>


<script>

    $(".editarHabitacion").on("click",function(){

       $(".divOpcion").empty();
       $(".divOpcion").load("formHabitaciones.php?idReserva=" +
                "<?php echo $reserva['idReserva']?>");
        $(".divEditar").css("marginTop","-40%")        


    });


    $("#formEditar").on("submit", function(event) {

        event.preventDefault();


        const datosReserva = {
            "idReserva": "<?php echo $reserva['idReserva'] ?>",
            "idCliente": $("#cliente").val().trim(),
            "llegada": $("#fechaLlegada").val().trim(),
            "salida": $("#fechaSalida").val().trim(),
            "cantidadHabitaciones": $("#cantidadHabitaciones").val().trim()
        }



        fetch("http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionReserva.php", {

                method: "PUT",
                body: JSON.stringify({
                    'reserva': datosReserva,

                }),
                headers: {

                    "Content-Type": "application/json",
                }

            }).then(resp => resp.text())
            .then(data_resp => {

                if (data_resp.respuesta == true) {

                    $("#modal").css("display", "none");
                    $("#modal").css("cursor", "auto");

                    $('.divOpcion').removeClass('divEditar');
                    $('.divOpcion').empty();

                    aviso(data_resp.respuesta, "Editar");
                } else {


                    const lbl = $("#alertaEditar").find("label");
                    lbl.text(data_resp.respuesta);
                    $("#alertaEditar").addClass("alertaEditarActive");

                }

            })
    });



    $("#btnCancelar").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");

        $('.divOpcion').removeClass('divEditar');
        $('.divOpcion').empty();
        location.reload();

    })
</script>