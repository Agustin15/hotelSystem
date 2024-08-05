<?php


require("../../../model/claseReservas.php");
require("../../../model/claseCliente.php");
$claseReservas = new reservas();
$claseCliente = new cliente();

$reservasEstado = $claseReservas->getAllReservas();


if(empty($reservasEstado->fetch_all(MYSQLI_ASSOC))){

?>

<script>

$(document).ready(function(){

    showHideBuscador("none");

});

</script>
    <div class="reservasVacio">

        <img src="../../../img/sinDatos.png">
        <br>
        <h3>No hay datos aun</h3>
    </div>

    <?php
}else{

?>


<tr class="headerTable">

    <th>Reserva</th>
    <th>Cliente</th>
    <th>Llegada</th>
    <th>Salida</th>
    <th>Cantidad de habitaciones</th>
    <th>Opciones</th>
</tr>

<?php

$reservas = $claseReservas->getAllReservas();
foreach ($reservas->fetch_all(MYSQLI_ASSOC) as $reserva) {


    $salida = new DateTime($reserva['fechaSalida']);
    $llegada = new DateTime($reserva['fechaLlegada']);

    $cliente = $claseCliente->getClienteUpdate($reserva['idClienteReserva']);
?>
    <tr class="trBody">

        <td class="tdIdReserva" data-id-reserva="<?php echo $reserva['idReserva'] ?>">

            <img src="../../../img/reservaId.png">
            <a><?php echo $reserva['idReserva'] ?></a>

        </td>

        <td><?php echo $cliente['correo'] ?></td>
        <td><?php echo $llegada->format("d-m-Y") ?></td>
        <td><?php echo $salida->format("d-m-Y") ?></td>
        <td class="tdCantidadHabitaciones"><?php echo $reserva['cantidadHabitaciones'] ?></td>

        <td class="tdOpciones">

            <button class="btnEliminar" data-opcion="eliminar" data-id="<?php echo $reserva['idReserva'] ?>" data-cliente="<?php echo $reserva['idClienteReserva'] ?>" data-llegada="<?php echo $reserva['fechaLlegada'] ?>" data-salida="<?php echo $reserva['fechaSalida']  ?>" data-cantidad="<?php echo $reserva['cantidadHabitaciones']  ?>">


                <img src="../../../img/borrar.png">
            </button>

            <button class="btnEditar" data-opcion="editar" data-id="<?php echo $reserva['idReserva'] ?>" data-cliente="<?php echo $reserva['idClienteReserva'] ?>" data-llegada="<?php echo $reserva['fechaLlegada'] ?>" data-salida="<?php echo $reserva['fechaSalida']  ?>" data-cantidad="<?php echo $reserva['cantidadHabitaciones']  ?>">

                <img src="../../../img/editar.png">

            </button>

            <?php

            date_default_timezone_set('America/Argentina/Buenos_Aires');
            $hoy = strtotime(date("Y-m-d"));
            $salida =strtotime($reserva['fechaSalida']);

            if ($salida <= $hoy) {

                $idReserva = $reserva['idReserva'];
        
            ?>

                <script>
                    $(document).ready(function(){

                    btnEditDisabled(<?php echo $idReserva ?>);

                    });
                </script>
            <?php

            }
            ?>
            <button class="btnInfo" data-opcion="info" data-id="<?php echo $reserva['idReserva'] ?>" 
            data-cliente="<?php echo $reserva['idClienteReserva'] ?>" 
            data-llegada="<?php echo $reserva['fechaLlegada'] ?>" 
            data-salida="<?php echo $reserva['fechaSalida']  ?>"data-cantidad="<?php echo $reserva['cantidadHabitaciones']  ?>">

                <img src="../../../img/detalles.png">

            </button>
        </td>


    </tr>

<?php

        }
}


?>