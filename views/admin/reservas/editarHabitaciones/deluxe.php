<div id="deluxe">

    <br>

    <h1>Habitaciones Deluxe</h1>
    <form id="formDeluxe">
        <br>
        <label>Numero de habitacion</label>
        <input id="numHabitacion" min="1" type="number">
        <img id="iconSearch" src="../../../img/searchBooking.png">

    </form>


    <ul id="habitacionesDeluxe">

        <?php

        date_default_timezone_set('America/Argentina/Buenos_Aires');

        $hoy = strtotime(date("Y-m-d"));

        require("../../../../model/claseReservas.php");
        require("../../../../model/claseHabitaciones.php");

        $claseHabitacion = new habitaciones();
        $claseReservas = new reservas();

        $habitaciones =  $claseHabitacion->getAllHabitacionesCategoria("Deluxe");

        foreach ($habitaciones as $habitacion) {

        ?>

            <li data-habitacion="<?php echo $habitacion['numHabitacion'] ?>">

                <img class="iconoCalendar" title="reservas cercanas" src="../../../img/reservaId.png">
                <img src="../../../img/bannerHab1.jpg">
                <h4>Habitacion <?php echo $habitacion['numHabitacion'] ?></h4>

                <?php

                $habitacionesReservadas =  $claseHabitacion->habitacionesReservadas($habitacion['numHabitacion']);
                if (empty($habitacionesReservadas)) {

                ?>
                    <label class="lblLibre">Libre</label>
                    <button class="btnOcupar">Ocupar</button>
                    <?php

                } else {

                    $habitacionMasCercana = $claseHabitacion->habitacionMasCercana($habitacion['numHabitacion']);


                    if (

                        strtotime($habitacionMasCercana['fechaLlegadaHabitacion']) <= $hoy &&
                        strtotime($habitacionMasCercana['fechaSalidaHabitacion']) >= $hoy
                    ) {

                    ?>
                        <label class="lblOcupada">Ocupada</label>
                        <button class="btnDetalles">Detalles</button>

                    <?php

                    } else {
                    ?>
                        <label class="lblLibre">Libre</label>
                        <button class="btnOcupar">Ocupar</button>
                <?php


                    }
                }
                ?>



            </li>


        <?php

        }


        ?>



        <div id="sinDatosHabitaciones">

            <h1>Habitacion no encontrada</h1>
            <br>
            <img src="../../../img/advertenciaClientes.png">

        </div>
    </ul>
</div>

