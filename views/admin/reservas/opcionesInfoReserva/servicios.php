<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);

$idReserva = $reserva['idReserva'];

require("../../../../model/claseHabitaciones.php");
require("../../../../model/claseServicios.php");

$claseHabitaciones = new habitaciones();
$claseServicio = new servicio();

?>

<div id="titleServicios">

    <div id="titleImg">
        <img src="../../../img/servicioInfo.png">
    </div>
    <div>

        <h4>Servicios</h4>
    </div>

</div>
<div id="modalServicesBooking">

</div>

<div id="detailsService">


</div>

<?php


$habitacionesReserva = $claseHabitaciones->getHabitaciones($idReserva);

foreach ($habitacionesReserva->fetch_all(MYSQLI_ASSOC) as $habitacionReserva) {

    $serviciosReservaHabitacion = $claseServicio->getServiciosReservaHabitacion(
        $idReserva,
        $habitacionReserva['numHabitacionReservada']
    );

    if (!empty($serviciosReservaHabitacion)) {

    ?>
        <div class="numHabitacionServicio">
            <h5>Habitacion <?php echo $habitacionReserva["numHabitacionReservada"] ?></h5>
        </div>

        <ul id="serviciosReserva">
            <?php
            foreach ($serviciosReservaHabitacion  as $servicioReservaHabitacion) {


                $imageService;
                $imageProduct = null;




                if (
                    $servicioReservaHabitacion['nombreServicio'] == "Telefono" ||
                    $servicioReservaHabitacion['nombreServicio'] == "Masajes"
                ) {

                    $blob = $servicioReservaHabitacion['imagen'];
                    $imageBase64 = base64_encode($blob);
                    $imageService = "data:image/jpg; base64,$imageBase64";
                } else {

                    if ($servicioReservaHabitacion['nombreServicio'] == "Cantina") {
                        $imageService = "../../../img/bar-counter.png";
                    } else {
                        $imageService = "../../../img/minibar.png";
                    }


                    $blob = $servicioReservaHabitacion['imagen'];
                    $imageBase64 = base64_encode($blob);
                    $imageProduct = "data:image/jpg; base64,$imageBase64";
                }


            ?>
                <li>

                    <div class="titleService">
                        <div>
                            <img src="<?php echo $imageService ?>">
                        </div>
                        <div>

                            <span><?php echo $servicioReservaHabitacion['nombreServicio'] ?></span>
                        </div>

                    </div>

                    <div class="serviceProduct">

                        <?php

                        if ($imageProduct != null) {

                        ?>

                            <div>
                                <img src="<?php echo $imageProduct ?>">
                            </div>
                        <?php
                        }
                        ?>

                        <div>

                            <span><?php echo $servicioReservaHabitacion['descripcionServicio']; ?></span>
                        </div>

                    </div>


                    <div class="containBtn">

                        <button data-price="<?php echo $servicioReservaHabitacion['precio'] ?>" data-image="<?php echo $imageService ?> " data-quantity="<?php echo $servicioReservaHabitacion['cantidad'] ?>" class="btnDetalles">Detalles</button>
                    </div>

                </li>
            <?php



            }

            ?>

        </ul>
    <?php
    } else {

    ?>

        <div id="sinDatosServicios">


            <div>
                <img src="../../../img/sinServicios.png">
            </div>

            <div>
                <span>Sin servicios aun</span>
            </div>

        </div>

<?php

    }
}


?>

