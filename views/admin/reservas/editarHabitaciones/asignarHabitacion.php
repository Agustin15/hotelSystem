<?php

$habitacion = $_GET['habitacion'];
$categoria = $_GET['categoria'];

require("../../../../model/claseReservas.php");
$claseReservas = new reservas();

?>

<ul id="menuOpcionHabitacion">
    <li class="agregarHabitacion">
        <a>Agregar</a> <img class="imgAgregar" src="../../../img/agregarHabitacion.png">

    </li>
    <li class="remplazarHabitacion">

        <a>Remplazar</a> <img class="imgRemplazar" src="../../../img/intercambiarHabitacion.png">

    </li>
</ul>

<br>

<img src="../../../img/cerrarVentana.png" id="cerrar">

<form id="formAsignar">

    <br>

    <img src="../../../img/habitacionOcupar.png">
    <br>
    <h1>Agregar Habitacion <?php echo $habitacion ?></h1>

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
    } else {
    ?>

        <label>id Reserva</label>
        <br>
        <select id="idReserva">

            <?php
            foreach ($reservas as $reserva) {

            ?>

                <option value="<?php echo $reserva['idReserva'] ?>"><?php echo $reserva['idReserva'] ?></option>
            <?php
            }
            ?>

        </select>
        <button id="btnBuscar">Buscar</button>
    <?php
    }
    ?>
    <br><br>

    <div class="subForm">

        <label class="lblAdultos">Adultos</label> <label class="lblNinos">Niños</label>
        <br>
        <input type="number" min="0" value="0" id="cantAdultos">
        <input min="0" value="0" type="number" id="cantNinos">
        <br>
        <label>Fecha agregado</label>
        <br>
        <input type="date" id="fechaAgregado">
        <br>
        <input type="submit" value="Asignar">
        <br>
    </div>

    <div id="alertaAsignar">

        <br>
        <img src="../../../img/cruzEliminar.png">
        <label></label>
    </div>
</form>

