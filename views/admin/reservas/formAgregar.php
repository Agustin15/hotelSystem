<?php

$fechaLlegada = $_GET['fechaLlegada'];
$fechaSalida = $_GET['fechaSalida'];


require("../../../model/claseHabitaciones.php");
require("../../../model/claseCliente.php");

$claseCliente = new cliente();
$claseHabitacion = new habitaciones();

$totalHabitacionesHotel = $claseHabitacion->getCantidadHabitaciones();

?>


<form id="formAgregar">

    <img class="iconoFormAgregar" src="http://localhost/Sistema%20Hotel/img/nuevaReserva.png">

    <h1>Nueva reserva</h1>

    <br>

    <label class="lblCliente">Cliente</label>
    <select id="cliente">>

        <?php

        $clientes = $claseCliente->getAllClientes();
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
    <input id="fechaLlegada" readonly value="<?php echo $fechaLlegada ?>" type="date">

    <br>

    <label class="lblSalida">Fecha Salida</label>
    <input id="fechaSalida" readonly value="<?php echo $fechaSalida ?>" type="date">

    <br>

    <label class="lblCantidadHabitaciones">Cantidad habitaciones</label>
    <input id="cantidadHabitaciones" type="number" max="<?php echo $totalHabitacionesHotel ?>" min="1">

    <br>
    <input type="submit" value="Agregar"></input>
    <button id="btnCancelar" value="Cancelar">Cancelar</button>

    <div id="alertaAgregar">

        <br>
        <img src="../../../img/cruzAgregar.png">
        <label></label>

    </div>

</form>


