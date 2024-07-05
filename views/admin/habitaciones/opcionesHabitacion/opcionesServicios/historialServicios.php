<?php

require("../../../.././../model/claseServicios.php");
$claseServicio = new servicio();
$numHabitacion = $_GET['numHabitacion'];

?>

<h2>Historial servicios</h2>

<br>

<?php

$serviciosHabitacion = $claseServicio->getServiciosHabitacion($numHabitacion);

if (empty($serviciosHabitacion->fetch_all(MYSQLI_ASSOC))) {

?>

    <div id="sinServiciosHabitacion">

        <img src="../../../img/sinServicios.png">
        <br>
        <h3>Sin servicios aun</h3>

    </div>
<?php

} else {
?>

    <table>


    </table>

<?php
}
?>