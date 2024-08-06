<?php

require("../../../.././../model/claseServicios.php");
$claseServicio = new servicio();
$numHabitacion = $_GET['numHabitacion'];

$hoy = date("Y-m-d");

$serviciosHabitacionReservada = $claseServicio->getServiciosReservaHabitacionEnCurso($numHabitacion);
?>


<div id="modalService"></div>

<h2>Eliminar servicio</h2>



<?php
if (count($serviciosHabitacionReservada) == 0) {

?>
    <div id="sinServiciosHabitacion">

        <img src="../../../img/sinServicios.png">
        <br>
        <h3>Sin servicios aun</h3>

    </div>
<?php
} else {

?>
    <ul id="serviciosReservaHabitacion">
        <?php
        foreach ($serviciosHabitacionReservada as $servicio) {



            $iconService;

            switch ($servicio['nombreServicio']) {


                case "Masajes":

                    $iconService = "../../../img/massage.png";
                    break;

                case "Telefono":

                    $iconService = "../../../img/telephone.png";
                    break;
                case "Minibar":

                    $iconService = "../../../img/minibar.png";
                    break;

                case "Cantina":

                    $iconService = "../../../img/bar-counter.png";
                    break;
            }
        ?>

            <li class="servicioReservaHabitacion">

                <div class="titleService">

                    <div class="iconoService">

                        <img src=<?php echo $iconService ?>>
                    </div>
                    <div class="nameService">

                        <span>
                            <?php

                            if ($servicio['nombreServicio'] != "Minibar" && $servicio['nombreServicio'] != "Cantina") {

                                echo $servicio['nombreServicio'];
                            } else {

                                echo $servicio['nombreServicio'] . ":" . $servicio['descripcionServicio'];
                            }
                            ?>

                        </span>
                    </div>



                </div>

                <div class="precioAndCantidad">
                    <div class="cantidad">

                        <div class="iconoCantidad">

                            <img src="../../../img/cantidadService.png">
                        </div>

                        <div class="cantidadValor">
                            <span>
                                Cantidad:
                                <?php
                                if ($servicio['nombreServicio'] == "Telefono") {

                                    if ($servicio['cantidad'] > 1) {

                                       echo $servicio['cantidad'] . " minutos";
                                    }else{

                                         echo $servicio['cantidad'] . " minuto";
                                    }
                                } else {

                                    echo $servicio['cantidad'];
                                }

                                ?>

                            </span>
                        </div>
                    </div>

                    <div class="precio">

                        <div class="iconoPrecio">

                            <img src="../../../img/dollar.png">
                        </div>

                        <div class="precioValor">
                            <span>Precio:$<?php echo $servicio['precio'] ?></span>
                        </div>
                    </div>
                </div>

                <div class="containButtonDelete" data-nombre-servicio="<?php echo $servicio['nombreServicio'] ?>" data-id-servicio-habitacion="<?php echo $servicio['idServicioHabitacion'] ?>" data-num-habitacion=<?php echo $servicio['numHabitacionReservada'] ?> data-id-reserva=<?php echo $servicio['idReservaHabitacion'] ?> data-precio="<?php echo $servicio['precio'] ?>" data-cantidad="<?php echo $servicio['cantidad'] ?>">

                    <button class="buttonDelete">Eliminar</button>
                </div>

            </li>

        <?php

        }
        ?>
    </ul>
<?php
}

?>


<div id="avisoServiceDelete">

    <div id="iconAvisoDelete">
        <img src="../../../img/tickDelete.gif">
    </div>

    <div id="avisoSpan">
        <span></span>
    </div>

    <div id="containButton">

        <button id="btnClose">Ok</button>
    </div>



</div>
