<?php

$habitacion = $_GET['habitacion'];
$categoria = $_GET['categoria'];

require("../../../../model/claseReservas.php");
$claseReservas = new reservas();

?>

<ul id="menuOpcionHabitacion">
    <li class="asignarHabitacion">
        <a>Agregar</a> <img class="imgAgregar" src="../../../img/agregarHabitacion.png">

    </li>
    <li>

        <a>Remplazar</a> <img class="imgRemplazar" src="../../../img/intercambiarHabitacion.png">


    </li>
</ul>

<br>
<img src="../../../img/cerrarVentana.png" id="cerrar">

<form id="formRemplazar">

    <br>

    <img src="../../../img/habitacionOcupar.png">
    <br>
    <h1>Remplazar habitacion por la habitacion <?php echo $habitacion ?></h1>

    <br>

    <?php

    date_default_timezone_set('America/Montevideo');
    $hoy = date("Y-m-d");
    $reservas = $claseReservas->getReservasHabilitadas($hoy);
    if (empty($reservas)) {

    ?>
        <h3>No hay reservas en curso</h3>
        <br>
        <img id="sinBookings" src="../../../img/withoutBooking.png">
    <?php
    }else{
    ?>

    <div id="subFormBuscar">
        <label>id Reserva</label>
        <br>

        <select name="idReserva" id="selectReserva">

            <?php


            foreach ($reservas as  $reserva) {

            ?>

                <option value="<?php echo $reserva['idReserva'] ?>"><?php echo $reserva['idReserva'] ?></option>
            <?php
            }
            ?>

        </select>

        <br>

        <button type="button" id="btnBuscar">Buscar</button>

        <br>
        <label class="lblSinHabitaciones">No hay habitaciones en esta reserva aun</label>

    </div>

    <?php
    }
    ?>

    <div class="subForm">

        <br>
        <label class="lblHabitacion">Habitaciones a remplazar</label>
        <br>
        <select id="selectHabitaciones">


        </select>
        <br><br>
        <label id="lblFechaRemplazo">Fecha remplazo</label>
        <br>

        <input type="date" id="inputFechaRemplazo" min="" max="">

        <br>
        <input type="submit" id="btnRemplazar" value="Remplazar">
        <br>
    </div>

    <div id="alertaRemplazar">

        <br>
        <img src="../../../img/cruzEliminar.png">
        <label></label>
    </div>
</form>

