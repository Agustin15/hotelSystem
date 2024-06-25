<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);

$idReserva = $reserva['idReserva'];

require("../../../../model/claseHabitaciones.php");
require("../../../../model/clasePago.php");
require("../../../../model/claseReservas.php");
$claseHabitaciones = new habitaciones();
$clasePago = new pago();
$claseReservas = new reservas();

?>

<div id="pago">

    <?php


    $pago = $clasePago->getPago($idReserva);

    if (!empty($pago)) {

        $deposito=$pago['deposito'];
        $habitacionesReservadas = $claseHabitaciones->getHabitaciones($idReserva);

        $habitacionesReservadas = $habitacionesReservadas->fetch_all(MYSQLI_ASSOC);

        $cantHabitacionesReservadasEstandar = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Estandar");
        $cantHabitacionesReservadasDeluxe = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Deluxe");
        $cantHabitacionesReservadasSuite = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Suite");
    


    ?>

        <img id="iconoFactura" src="../../../img/pagoInfo.png">
        <br>
        <h4>Factura</h4>
        <br>


        <?php

        $reserva = $claseReservas->getReservaPoridReserva($idReserva);
        $llegada = new DateTime($reserva['fechaLlegada']);
        $salida = new DateTime($reserva['fechaSalida']);
        $noches=$llegada->diff($salida)->days;
        ?>

        <h4 id="llegada">Llegada:<?php echo $llegada->format("d-m-Y") ?></h4>
        <h4 id="salida">Salida:<?php echo $salida->format("d-m-Y") ?></h4>
        <br>

        <img src="../../../img/luna.png">
        <br>
        <label><?php echo $noches?> noches</label>
        <br>

        <ul id="detallesFactura">

            <li id="habitacionesPrecios">

                <img src="../../../img/habitacionesDetalle.png">
                <br>
                <h4>Habitaciones</h4>

                <br>
                <ul id="ulHabitacion">
                <?php

                if ($cantHabitacionesReservadasEstandar > 0) {

                    $precioHabitacion = $claseHabitaciones->getPrecioHabitacion("Estandar");
                    $totalHabitacion = $claseHabitaciones->totalHabitacion($precioHabitacion['precio'], $cantHabitacionesReservadasEstandar);
                ?>

                  
                        <li>habitacion estandar x <?php echo $cantHabitacionesReservadasEstandar . " ($" . $totalHabitacion . ")" ?></li>

                    <?php
                }
                if ($cantHabitacionesReservadasDeluxe > 0) {

                    $precioHabitacion = $claseHabitaciones->getPrecioHabitacion("Deluxe");
                    $totalHabitacion = $claseHabitaciones->totalHabitacion($precioHabitacion['precio'], $cantHabitacionesReservadasDeluxe);
                    ?>

                        <li>habitacion deluxe x <?php echo $cantHabitacionesReservadasDeluxe . " ($" . $totalHabitacion . ")" ?></li>

                    <?php
                }

                if ($cantHabitacionesReservadasSuite > 0) {

                    $precioHabitacion = $claseHabitaciones->getPrecioHabitacion("Suite");
                    $totalHabitacion = $claseHabitaciones->totalHabitacion($precioHabitacion['precio'], $cantHabitacionesReservadasSuite);
                    ?>

                        <li>habitacion suite x <?php echo $cantHabitacionesReservadasSuite . " ($" . $totalHabitacion . ")" ?></li>

                    <?php
                }
                    ?>

                    </ul>
            </li>
            <li id="serviciosPrecios">

                <img src="../../../img/serviciosDetalles.png">
                <br><br>
                <h4>No hay servicios aun</h4>
            </li>
        </ul>
        <br><br>
        <hr>
        <br>

        <h3>Total:$<?php echo $deposito ?></h3>

    <?php
    } else {

    ?>

        <div id="sinDatosInfo">

            <h1>No hay datos aun</h1>
            <br>
            <img src="../../../img/sinDatos.png">

        </div>
    <?php
    }

    ?>

</div>