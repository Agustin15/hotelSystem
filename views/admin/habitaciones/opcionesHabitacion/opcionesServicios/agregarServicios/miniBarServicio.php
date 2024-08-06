<?php

require("../../../.././../../model/claseServicios.php");
require("../../../.././../../model/claseHabitaciones.php");
$claseServicio = new servicio();
$claseHabitacion = new habitaciones();
$numHabitacion = $_GET['numHabitacion'];

$minibar = $claseServicio->getServicio("minibar");

$hoy = date("Y-m-d");
$habitacion = $claseHabitacion->getHabitacionReservadaFechaAndNum($hoy, $numHabitacion);
$idReserva = $habitacion['idReservaHabitacion'];


?>


<img id="cerrarMinibar" src="../../../img/cerrarVentana.png">

<div id="title">
    <img src="../../../img/minibar.png">
    <br>
    <h1>Servicio Minibar</h1>
    <br>

</div>

<div id="modalService">

</div>



<div id="container">
    <div id="market">
        <ul>
            <?php
            foreach ($minibar as $product) {


            ?>
                <li>

                    <div class="nombreProducto">
                        <span><?php echo $product['descripcionServicio'] ?></span>
                    </div>


                    <div class="imagenProducto">


                        <img src="data:image/jpg; base64,<?php echo base64_encode($product['imagen']) ?>">
                    </div>


                    <div class="supCantidadBtnAgregar">
                        <div class="cantidad">

                            <input class="inputCant" type="number" value="0" min="0" max="<?php echo $product['maxStock'] ?>">

                        </div>

                        <div class="btnAgregar">

                            <button class="agregar" data-id-booking="<?php echo $idReserva?>" data-id-service="<?php echo $product['idServicio']; ?> " data-product="<?php echo $product['descripcionServicio']; ?>" data-price="<?php echo $product['precio'] ?>" data-image="data:image/jpg; base64,<?php echo base64_encode($product['imagen']) ?>" data-max-stock="<?php echo $product['maxStock'] ?>">Agregar</button>

                        </div>

                    </div>

                </li>


            <?php
            }

            ?>

        </ul>
    </div>


    <div id="cart">

        <div id="title">

            <span>Carrito de productos</span>

        </div>

        <div id="listaProductos"></div>


        <div id="deposito">

            <span id="spanTotal"></span>

        </div>

        <div id="buttonAgregarServicio">

            <button id="btnAgregarService">Agregar</button>

        </div>
    </div>


</div>






<div id="aviso">

    <div id="imgAviso">
        <img src="../../../img/advertenciaService.png">
    </div>
    <div id="textAviso">

        <span></span>
    </div>

    <div id="buttonOk">

        <button id="buttonAviso">Ok</button>
    </div>

</div>
<br>

