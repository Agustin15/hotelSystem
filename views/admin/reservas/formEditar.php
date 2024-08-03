<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);

require("../../../model/claseReservas.php");
require("../../../model/claseHabitaciones.php");
require("../../../model/claseCliente.php");
$claseReserva = new reservas();
$claseHabitacion = new habitaciones();
$claseCliente = new cliente();

$cliente = $claseCliente->getClienteUpdate($reserva['idCliente']);
$totalHabitacionesHotel = $claseHabitacion->getCantidadHabitaciones();

?>


<ul id="menuOpcionEditar">
    <li class="editarReserva">
        <a>Editar Reserva</a> <img class="imgAgregar" src="../../../img/reserva2.png">

    </li>
    <li class="editarHabitacion">

        <a>Editar habitaciones</a> <img class="imgRemplazar" src="../../../img/habitacionesDetalle.png">

    </li>
</ul>

<br>
<form id="formEditar" data-id-reserva="<?php echo $reserva['idReserva']?>">

    <img class="iconoFormEditar" src="http://localhost/Sistema%20Hotel/img/editar.png">

    <br>
    <h1>Editar reserva <?php echo $reserva['idReserva'] ?></h1>

    <br>

    <label class="lblCliente">Cliente</label>
    <select id="cliente">

        <option value="<?php echo $reserva['idCliente'] ?>">
            <?php echo $reserva['idCliente'] . " (" . $cliente['correo'] . ")" ?>
        </option>

        <?php

        $clientes = $claseCliente->getClientesDistintos($reserva['idCliente']);
        foreach ($clientes->fetch_all(MYSQLI_ASSOC) as $cliente) {

        ?>


            <option value="<?php echo $cliente['idCliente'] ?>"><?php echo $cliente['idCliente'] .
                                                                    " (" . $cliente['correo'] . ")" ?></option>
        <?php

        }
        ?>
    </select>

    <br>

    <label class="lblLlegada">Fecha Llegada</label>
    <input id="fechaLlegada" value="<?php echo $reserva['llegada'] ?>" type="date" min="<?php echo $reserva['llegada'] ?>">

    <br>

    <label class="lblSalida">Fecha Salida</label>
    <input id="fechaSalida" value="<?php echo $reserva['salida'] ?>" type="date" min="<?php echo $reserva['llegada'] ?>">

    <br>

    <label class="lblCantidadHabitaciones">Cantidad habitaciones</label>
    <input id="cantidadHabitaciones" value="<?php echo $reserva['cantidadHabitaciones'] ?>" type="number" max="<?php echo $totalHabitacionesHotel ?>" min="1">

    <br>
    <input type="submit" value="Guardar"></input>
    <button id="btnCancelar" value="Cancelar">Cancelar</button>

    <div id="alertaEditar">

        <br>
        <img src="../../../img/cruzEditar.png">
        <label></label>

    </div>

</form>

<?php

?>


<script>

    
</script>