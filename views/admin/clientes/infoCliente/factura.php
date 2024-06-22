<?php

$factura = json_decode($_GET['factura'], true);

$llegada = new DateTime($factura['llegada']);
$salida = new DateTime($factura['salida']);
$diferencia = $llegada->diff($salida);
$noches = $diferencia->days;


require("../../../../model/claseCliente.php");
require("../../../../model/claseHabitaciones.php");
$claseHabitaciones = new habitaciones();
$claseCliente = new cliente();


?>

<div class="detallesFactura">

    <img class="cerrarFactura" src="../../../img/cerrarVentana.png">
    <br>

    <img src="../../../img/pagoInfo.png">
    <br>
    <h2>Factura</h2>
    <br>

    <div class="containerDetalles">

        <label class="lblLlegada">Llegada:<?php echo $llegada->format("d-m-Y") ?> </label>
        <label class="lblSalida"> Salida:<?php echo $salida->format("d-m-Y") ?></label>

        <br>

        <img src="../../../img/luna.png">
        <br>
        <label class="lblNoches"><?php echo $noches ?> noches</label>

        <br>

        <li class="habitaciones">
            <img class="iconoHabitacion" src="../../../img/habitacionesDetalle.png">
            <br>
            <label class="lblHabitaciones">Habitaciones</label>

            <?php

            $detallesHabitaciones = [];


            $deposito = $factura['deposito']['deposito'];

            $habitacionesReservadas = $factura['habitaciones'];

            $cantHabitacionesReservadasEstandar = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Estandar");
            $cantHabitacionesReservadasDeluxe = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Deluxe");
            $cantHabitacionesReservadasSuite = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Suite");


            if ($cantHabitacionesReservadasEstandar > 0) {

                $precioHabitacion = $claseHabitaciones->getPrecioHabitacion("Estandar");
                $totalHabitacion = $claseHabitaciones->totalHabitacion($precioHabitacion['precio'], $cantHabitacionesReservadasEstandar);

            ?>
                <br>

                <ul class="ulHabitacion">
                    <li>habitacion estandar x <?php echo $cantHabitacionesReservadasEstandar .
                                                    " ($" . $totalHabitacion . ")" ?></li>
                <?php
            }

            if ($cantHabitacionesReservadasDeluxe > 0) {

                $precioHabitacion = $claseHabitaciones->getPrecioHabitacion("Deluxe");
                $totalHabitacion = $claseHabitaciones->totalHabitacion($precioHabitacion['precio'], $cantHabitacionesReservadasDeluxe);
                ?>
                    <br>
                    <li>habitacion deluxe x <?php echo $cantHabitacionesReservadasDeluxe .
                                                " ($" . $totalHabitacion . ")" ?></li>
                <?php
            }
            if ($cantHabitacionesReservadasSuite > 0) {

                $precioHabitacion = $claseHabitaciones->getPrecioHabitacion("Suite");
                $totalHabitacion = $claseHabitaciones->totalHabitacion($precioHabitacion['precio'], $cantHabitacionesReservadasSuite);
                ?>
                    <br>
                    <li>habitacion suite x <?php echo $cantHabitacionesReservadasSuite.
                                                " ($" . $totalHabitacion . ")" ?></li>
                <?php
            }
                ?>

        </li>

        </ul>
        <li class="servicios">
            <img class="iconoServicios" src="../../../img/serviciosDetalles.png">
            <br>
            <label class="lblServicios">Servicios</label>

            <?php
            if (empty($factura['servicios'])) {

            ?>
                <br><br>
                <label class="lblServiciosEstadia">No hay servicios ordenados aun</label>
            <?php
            }

            ?>
        </li>

        <hr>
        <br>
        <h3>Total:$<?php echo $deposito ?></h3>

    </div>

    <script>
        $(".cerrarFactura").on("click", function() {


            $("#modalInfo").css("display", "none");
            $("#modalInfo").css("cursor", "auto");
            $(".subVentanas").empty();

        });
    </script>