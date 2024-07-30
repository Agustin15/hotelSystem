<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);

$idReserva = $reserva['idReserva'];

require("../../../../model/claseHabitaciones.php");
require("../../../../model/clasePago.php");
require("../../../../model/claseReservas.php");
require("../../../../model/claseServicios.php");
$claseHabitaciones = new habitaciones();
$clasePago = new pago();
$claseReservas = new reservas();
$claseServicio = new servicio();

?>

<div id="pago">

    <?php


    $pago = $clasePago->getPago($idReserva);

    if (!empty($pago)) {

        $deposito = $pago['deposito'];
        $habitacionesReservadas = $claseHabitaciones->getHabitaciones($idReserva);

        $habitacionesReservadas = $habitacionesReservadas->fetch_all(MYSQLI_ASSOC);

        $cantHabitacionesReservadasEstandar = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Estandar");
        $cantHabitacionesReservadasDeluxe = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Deluxe");
        $cantHabitacionesReservadasSuite = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Suite");


        $habitacionesCantidad = [
            array("categoria" => "estandar", "cantidad" => $cantHabitacionesReservadasEstandar),
            array("categoria" => "deluxe", "cantidad" => $cantHabitacionesReservadasDeluxe), array("categoria" => "suite", "cantidad" => $cantHabitacionesReservadasSuite)
        ];

    ?>

        <img id="iconoFactura" src="../../../img/pagoInfo.png">
        <br>
        <h4>Factura</h4>
        <br>


        <?php

        $reserva = $claseReservas->getReservaPoridReserva($idReserva);
        $llegada = new DateTime($reserva['fechaLlegada']);
        $salida = new DateTime($reserva['fechaSalida']);
        $noches = $llegada->diff($salida)->days;
        ?>

        <h4 id="llegada">Llegada:<?php echo $llegada->format("d-m-Y") ?></h4>
        <h4 id="salida">Salida:<?php echo $salida->format("d-m-Y") ?></h4>
        <br>

        <img src="../../../img/luna.png">
        <br>
        <label><?php echo $noches ?> noches</label>
        <br>

        <div id="detallesFactura">

            <ul id="habitacionesPrecios">

                <div id="titleRoom">

                    <div>
                        <img src="../../../img/habitacionesDetalle.png">
                    </div>

                    <div>
                        <h4>Habitaciones</h4>
                    </div>

                    <br>

                </div>


                <?php

                foreach ($habitacionesCantidad as $habitacionCantidad) {

                    if ($habitacionCantidad['cantidad'] > 0) {

                        $categoriaPrecio = $claseHabitaciones->getPrecioHabitacion(
                            $habitacionCantidad['categoria']
                        );

                        $totalHabitacion = $claseHabitaciones->totalHabitacion(
                            $categoriaPrecio['precio'],
                            $habitacionCantidad['cantidad']
                        );

                ?>

                        <li>

                            <span>Habitacion <?php echo $habitacionCantidad['categoria'] ?>
                                x<?php echo $habitacionCantidad['cantidad'] ?>
                                ($<?php echo $totalHabitacion ?>)

                            </span>
                        </li>

                <?php

                    }
                }

                ?>

            </ul>


            <ul id="serviciosPrecios">

                <div id="titleService">
                    <div>
                        <img src="../../../img/serviciosDetalles.png">
                    </div>

                    <div>
                        <h4>Servicios</h4>
                    </div>
                </div>


                <?php

                $serviciosReserva = $claseServicio->getServiciosReserva($idReserva);

                if (!empty($serviciosReserva->fetch_all(MYSQLI_ASSOC))) {


                    foreach ($habitacionesReservadas as $habitacionReservada) {

                        $serviciosHabitacion = $claseServicio->getServiciosReservaHabitacion(
                            $idReserva,
                            $habitacionReservada['numHabitacionReservada']
                        );

                        if (!empty($serviciosHabitacion)) {

                ?>

                            <div class="titleHabitacion">
                                <span>Habitacion <?php echo $habitacionReservada['numHabitacionReservada'] ?></span>

                            </div>
                            <?php
                            foreach ($serviciosHabitacion as $servicioHabitacion) {


                                $totalService = $servicioHabitacion['precio'] * $servicioHabitacion['cantidad'];


                                if (
                                    $servicioHabitacion['nombreServicio'] == "Telefono"  ||
                                    $servicioHabitacion['nombreServicio'] == "Masajes"
                                ) {

                                    $nombreServicio = $servicioHabitacion['nombreServicio'];
                                } else {


                                    $nombreServicio = $servicioHabitacion['nombreServicio'] . " (" . $servicioHabitacion['descripcionServicio'] . ")";
                                }

                                $cantidad = $servicioHabitacion['cantidad'];
                                if ($servicioHabitacion['nombreServicio'] == "Telefono") {

                                    $cantidad = $servicioHabitacion['cantidad'] . " min";
                                }
                            ?>

                                <li>

                                    <div class="nameService">
                                        <span><?php echo $nombreServicio ?> x<?php echo $cantidad ?>
                                            ($<?php echo $totalService ?>)</span>

                                    </div>

                                </li>
                        <?php


                            }
                        } else {
                        }

                        ?>

                    <?php
                    }
                } else {

                    ?>

                    <div id="sinServiciosFactura">

                        <div>
                            <span>No se han ordenado servicios</span>
                        </div>

                    </div>
                <?php
                }

                ?>


            </ul>
        </div>

        <div id="totalFactura">

            <span>Total:$<?php echo $pago['deposito'] ?></span>
        </div>


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