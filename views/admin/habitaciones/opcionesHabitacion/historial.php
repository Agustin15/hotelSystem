<?php

if (isset($_GET['numHabitacion'])) {

    $numHabitacion = $_GET['numHabitacion'];

    require("../../../../model/claseHabitaciones.php");
    require("../../../../model/claseCliente.php");

    $claseHabitacion = new habitaciones();

    $claseCliente = new cliente();
?>


    <img id="cerrarVentana" src="../../../img/cerrarVentana.png">
    
    <img src="../../../img/historyBookings.png">
    <br>
    <h1>Habitacion <?php echo $numHabitacion ?></h1>
    <br>
    <h2>Historial de hospedajes</h2>
    <br>

    <?php

    date_default_timezone_set('America/Montevideo');
    $hoy = date("Y-m-d");
    $reservasHabitacion = $claseHabitacion->habitacionesHospedajesAntiguos($numHabitacion, $hoy);

    if (empty($reservasHabitacion)) {

    ?>

        <div id="sinBookings">

            <img src="../../../img/withoutBooking.png">
            <br>
            <h3>Historial vacio</h3>

        </div>
    <?php

    } else {


    ?>

        <div id="searchBooking">
            <img id="iconSearch" src="../../../img/searchBooking.png">
            <input type="text" placeholder="Buscar...">
        </div>

        <nav id="navHistorial">

            <?php

            foreach ($reservasHabitacion as $reserva) {

                $llegada = new DateTime($reserva['fechaLlegadaHabitacion']);
                $salida = new DateTime($reserva['fechaSalidaHabitacion']);
                $cliente = $claseCliente->getClienteUpdate($reserva['idClienteHabitacion']);

            ?>
                <li>

                    <div id="fechaReserva">
                        <label id="lblLlegada">Llegada:<?php echo $llegada->format("d-m-Y") ?></label>
                        <label id="lblSalida">Salida:<?php echo $salida->format("d-m-Y") ?></label>
                    </div>
                    <hr>
                    <br>

                    <img src="../../../img/reservaId.png">

                    <label id="lblReserva"><a target="_blank" href="../../admin/reservas/lista.php?idReserva=<?php echo $reserva['idReservaHabitacion'] ?>">
                            Reserva <?php echo $reserva['idReservaHabitacion'] ?> </a></label>

                    <label id="lblCliente">Cliente: <a target="_blank" href="../../admin/clientes/lista.php?cliente=<?php echo $cliente['correo'] ?>"><?php echo $cliente['correo'] ?></a></label>
                    <br>

                </li>

            <?php

            }
            ?>

        </nav>


<?php

    }
}
?>

<script>

    $("#cerrarVentana").on("click",function(){

        $("#modal").css("display","none");
        $("#modal").css("cursor","auto");

        $("#divOpcion").empty();
        $("#divOpcion").removeClass("panelHistorial");
        

    });
</script>