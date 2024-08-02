<?php


$cliente = json_decode($_GET['cliente'], true);

require("../../../../model/claseCliente.php");
require("../../../../model/claseReserva.php");
require("../../../../model/claseHabitaciones.php");
require("../../../../model/clasePago.php");
require("../../../../model/claseServicios.php");

$claseReserva = new reserva();
$claseCliente = new cliente();
$claseHabitaciones = new habitaciones();
$clasePago= new pago();
$claseServicio = new servicio();

$reservasCliente = $claseReserva->getReservaIdCliente($cliente['idCliente']);

?>

<div class="subVentanas">

</div>


<div id="modalInfo">


</div>

<div class="cerrar">
    <img src="../../../img/cerrarInfo.png">

</div>


<br>

<img class="imgTitulo" src="../../../img/infoCliente.png">
<br>
<h2><?php echo $cliente['nombre'] . " " . $cliente['apellido'] ?></h2>
<br>

<img class="imgBuscar" src="../../../img/buscarInfo.png">
<input type="text" placeholder="Buscar..." id="buscadorEstadia">

<?php

if ($reservasCliente->num_rows == 0) {

?>

    <div class="sinDatos">

        <img src="../../../img/sinDatos.png">
        <br>
        <h2>No hay datos aun</h2>
    </div>
<?php


} else {
?>

    <div class="containerTable">

        <table id="tableEstadias">


            <div class="sinResultados">


                <img src="../../../img/advertenciaClientes.png">
                <br>
                <h3>No hay resultados</h3>

            </div>

            <?php

            foreach ($reservasCliente->fetch_all(MYSQLI_ASSOC) as $reservaCliente) {

                $fechaLlegada = new DateTime($reservaCliente['fechaLlegada']);
                $fechaSalida = new DateTime($reservaCliente['fechaSalida']);
                $diferencia = $fechaLlegada->diff($fechaSalida);


            ?>

                <tr>
                    <td>
                        <div class="fechaEstadia">
                            <img src="../../../img/alojamiento.png">
                            <br>
                            <label><?php echo $fechaLlegada->format("d-m-Y") . " hasta " . $fechaSalida->format("d-m-Y") ?></label>
                            <br>
                        </div>



                        <div class="noches" data-noches="<?php echo $diferencia->days ?>">

                            <img src="../../../img/nochesInfo.png">
                            <br>
                            <h3>Noches</h3>


                        </div>

                        <?php

                        $habitacionesReservas = $claseHabitaciones->getHabitaciones($reservaCliente['idReserva']);

                        $cantAdultos = 0;
                        $cantNinos = 0;
                        foreach ($habitacionesReservas->fetch_all(MYSQLI_ASSOC) as $habitacionReserva) {

                            $cantAdultos += $habitacionReserva['adultos'];
                            $cantNinos += $habitacionReserva['ninos'];
                        }

                        ?>

                        <div class="huespedes" data-adultos="<?php echo $cantAdultos ?>" 
                        data-ninos="<?php echo $cantNinos ?>">

                            <img src="../../../img/huespedesInfo.png">
                            <br>
                            <h3>Huespedes</h3>


                        </div>


                        <?php
                        $habitacionesReservas = $claseHabitaciones->getHabitaciones($reservaCliente['idReserva']);
                        ?>
                        <div class="habitaciones" data-habitaciones="<?php echo  htmlentities(json_encode($habitacionesReservas->fetch_all(MYSQLI_ASSOC))) ?>">

                            <img src="../../../img/habitacionesInfo.png">
                            <br>
                            <h3>Habitaciones</h3>

                        </div>

                        <?php

                        $serviciosCliente = $claseServicio->getServiciosReserva($reservaCliente['idReserva']);

                        ?>
                        <div class="servicios" data-servicios="<?php echo  htmlentities(json_encode($serviciosCliente->fetch_all(MYSQLI_ASSOC))) ?>">

                            <img src="../../../img/servicioInfo.png">
                            <br>
                            <h3>Servicios</h3>

                        </div>

                        <?php
                        $habitacionesReservas = $claseHabitaciones->getHabitaciones($reservaCliente['idReserva']);
                        $pago =  $clasePago->getPago($reservaCliente['idReserva']);
        
                        $factura = array(
                            "llegada" => $reservaCliente['fechaLlegada'],
                            "salida" => $reservaCliente['fechaSalida'],
                            "habitaciones" => $habitacionesReservas->fetch_all(MYSQLI_ASSOC),
                            "servicios" => $serviciosCliente->fetch_all(MYSQLI_ASSOC),
                            "deposito" => $pago
                        );


                        ?>


                        <div class="pago" data-pago="<?php echo htmlentities(json_encode($factura)) ?>">

                            <img src="../../../img/pagoInfo.png">
                            <br>
                            <h3>Deposito</h3>

                        </div>


                    </td>
                </tr>


            <?php
            }
            ?>
        </table>
    </div>

<?php

}
?>
