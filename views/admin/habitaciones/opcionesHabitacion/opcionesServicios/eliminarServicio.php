<?php

require("../../../.././../model/claseServicios.php");
$claseServicio = new servicio();
$numHabitacion = $_GET['numHabitacion'];

$hoy = date("Y-m-d");

$serviciosHabitacionReservada = $claseServicio->getServiciosReservaHabitacion($numHabitacion);
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
                            <span>Cantidad:<?php echo $servicio['cantidad'] ?></span>
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

                <div class="containButtonDelete"
                data-nombre-servicio="<?php echo $servicio['nombreServicio']?>" data-id-servicio-habitacion="<?php echo $servicio['idServicioHabitacion'] ?>" data-num-habitacion=<?php echo $servicio['numHabitacionReservada'] ?> data-id-reserva=<?php echo $servicio['idReservaHabitacion'] ?> data-precio="<?php echo $servicio['precio'] ?>" data-cantidad="<?php echo $servicio['cantidad'] ?>">

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

<script>
    var buttonsDeletes = document.querySelectorAll(".buttonDelete");

    buttonsDeletes = Array.from(buttonsDeletes);

    buttonsDeletes.forEach(function(buttonDelete) {

        buttonDelete.addEventListener("click", function() {

            var divSupButton = this.parentNode;
            var nombreServicio=divSupButton.dataset.nombreServicio;
            var idServicioHabitacion = divSupButton.dataset.idServicioHabitacion;
            var idReserva = divSupButton.dataset.idReserva;
            var totalService = divSupButton.dataset.precio * divSupButton.dataset.cantidad;

            var serviceDelete = {

                "idServicioHabitacion": idServicioHabitacion,
                "idReserva": idReserva,
                "totalService": totalService


            };

            fetch("http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php?serviceDelete=" +
                    JSON.stringify(serviceDelete), {

                        method: "DELETE",
                        headers: {

                            "Content-Type": "application/json"
                        }


                    }).then(resp => resp.json())
                .then(respuesta => {

                    console.log(respuesta.resultado);
                    if (respuesta.resultado == true) {


                        $("#avisoServiceDelete").css("display", "block");
                        $("#avisoSpan").text(`Servicio de ${nombreServicio} eliminado`);
                        $("#modalService").css("display", "block");

                    }

                });



        });
    });



    $("#btnClose").on("click", function() {


        $("#avisoServiceDelete").css("display", "none");
        $("#avisoSpan").text("");
        $("#modalService").css("display", "none");

        $("#panelOptionService").empty();
        $("#panelOptionService").load("opcionesHabitacion/opcionesServicios/eliminarServicio.php?numHabitacion="
        + <?php echo $numHabitacion?>);


    });
</script>