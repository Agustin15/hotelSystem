<?php

$idReserva = $_GET['idReserva'];

require("../../../model/claseReservas.php");
require("../../../model/claseHabitaciones.php");
require("../../../model/claseCliente.php");
$claseReserva = new reservas();
$claseHabitacion = new habitaciones();
$claseCliente = new cliente();

$reserva = $claseReserva->getReservaPoridReserva($idReserva);


?>



<div id="opcionHabitacion">


</div>

<ul id="menuOpcionEditar">
    <li class="editarReserva">
        <a>Editar Reserva</a> <img class="imgAgregar" src="../../../img/reserva2.png">

    </li>
    <li class="editarHabitacion">

        <a>Editar habitaciones </a> <img class="imgRemplazar" src="../../../img/habitacionesDetalle.png">

    </li>
</ul>


<img src="../../../img/cerrarVentana.png" id="cerrarHabitaciones">
<br>
<div id="formEditarHabitaciones">

    <img class="iconoFormEditar" src="http://localhost/Sistema%20Hotel/img/editar.png">

    <br>
    <h1>Editar habitaciones de reserva <?php echo $idReserva ?></h1>

    <ul id="habitacionesReserva">
        <?php

        $habitacionesReservadas = $claseHabitacion->getHabitaciones($idReserva);

        ?>
        <?php

        if (empty($habitacionesReservadas->fetch_all(MYSQLI_ASSOC))) {

        ?>
            <div class="sinHabitacionesReservadas">

                <h1>No hay habitaciones reservadas aun</h1>
                <br>
                <img src="../../../img/sinDatos.png">

            </div>

            <?php
        } else {

            $habitacionesReservadas = $claseHabitacion->getHabitaciones($idReserva);
            foreach ($habitacionesReservadas->fetch_all(MYSQLI_ASSOC) as $habitacionReservada) {

                $categoria = $claseHabitacion->getCategoria($habitacionReservada['numHabitacionReservada']);
            ?>

                <li data-habitacion="<?php echo $habitacionReservada['numHabitacionReservada'] ?>">
                    <?php

                    switch ($categoria) {

                        case "Estandar":

                            echo "<img src='../../../img/bannerHab1.jpg'>";
                            break;

                        case "Deluxe":

                            echo "<img src='../../../img/bannerHab1Deluxe.jpg'>";
                            break;

                        case "Suite":

                            echo "<img src='../../../img/bannerHab1Suite.jpg'>";
                            break;
                    }

                    ?>

                    <h4>Habitacion <?php echo $habitacionReservada['numHabitacionReservada'] ?></h4>

                    <br>
                    <button class="btnLibrar">Librar</button>
                    <button class="btnEliminar">Eliminar</button>

                </li>
        <?php

            }
        }

        ?>

    </ul>

    <div id="alertaEditar">

        <br>
        <img src="../../../img/cruzEditar.png">
        <label></label>

    </div>

</div>

<?php

?>


<script>
    $("#cerrarHabitaciones").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");

        $('.divOpcion').removeClass('divEditar');
        $('.divOpcion').empty();
        location.reload();

    });



    $(".editarReserva").on("click", function() {

        var reserva = {

            "idReserva": "<?php echo $reserva['idReserva'] ?>",
            "idCliente": "<?php echo $reserva['idClienteReserva'] ?>",
            "llegada": "<?php echo $reserva['fechaLlegada'] ?>",
            "salida": "<?php echo $reserva['fechaSalida'] ?>",
            "cantidadHabitaciones": "<?php echo $reserva['cantidadHabitaciones'] ?>"

        };
        console.log(reserva);

        $(".divOpcion").empty();
        $(".divOpcion").load("formEditar.php?reserva=" +
            encodeURIComponent(JSON.stringify(reserva)));
        $(".divEditar").css("marginTop", "-47%");


    });



    $(".btnLibrar").on("click", function() {

        var habitacion = $(this).parent();

        var numeroHabitacion = habitacion.data("habitacion");
        var idReserva = "<?php echo $idReserva ?>";


        $("#modalHabitaciones").css("display", "inline");
        $("#modal").css("cursor", "none");

        $("#opcionHabitacion").addClass("panelHabitacionLibrar");
        $("#opcionHabitacion").load("editarHabitaciones/librarHabitacion.php?idReserva=" + idReserva + "&habitacion=" +
            numeroHabitacion);

    });



    $(".btnEliminar").on("click", function() {

        var habitacion = $(this).parent();

        var numeroHabitacion = habitacion.data("habitacion");
        var idReserva = "<?php echo $idReserva ?>";


        $("#modalHabitaciones").css("display", "inline");
        $("#modal").css("cursor", "none");

        $("#opcionHabitacion").addClass("panelHabitacionEliminar");
        $("#opcionHabitacion").load("editarHabitaciones/eliminarHabitacion.php?idReserva=" + idReserva + "&habitacion=" +
            numeroHabitacion);





    });
</script>