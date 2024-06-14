<?php

$reserva = $_GET['reserva'];

$reserva = json_decode($reserva, true);

$idReserva = $reserva['idReserva'];

require("../../../../model/claseHabitaciones.php");
$claseHabitaciones = new habitaciones();

$habitacionesReservadas = $claseHabitaciones->getHabitaciones($idReserva);

?>
  
  <div id="habitacionesReservadas">
  <img src="../../../img/habitacionesInfo.png">
  <br>
  <h4>Habitaciones reservadas</h4>

  <?php

if (count($habitacionesReservadas->fetch_all(MYSQLI_ASSOC)) > 0) {

?>
  
    <ul id="habitacionesReserva">

        <?php

        $habitacionesReservadas = $claseHabitaciones->getHabitaciones($idReserva);
        foreach ($habitacionesReservadas->fetch_all(MYSQLI_ASSOC) as $habitacion) {

            $habitacionCategoria = $claseHabitaciones->buscarCategoriaPorNumero($habitacion['numHabitacionReservada']);
            $habitacionCategoria = $habitacionCategoria->fetch_array(MYSQLI_ASSOC);
        ?>

            <li>
                <?php

                $categoria = $habitacionCategoria['tipoHabitacion'];
                switch ($categoria) {

                    case "Estandar":

                        echo "<img src='../../../img/bannerHab1.jpg'>";
                        break;

                    case "Deluxe":

                        echo "<img src='../../../img/bannerHab1Deluxe.jpg'>";
                        break;

                    case "Suite":

                        echo "<img src='../../../img/bannerHab1Suite.jpg'>";
                        break;
                }

                ?>

                <br>
                <h3>Habitacion <?php echo $categoria . " " . $habitacion['numHabitacionReservada'] ?></h3>

                <br>

                <img class="imgAdultos" src="../../../img/adultos.png">
                <label class="lblAdultos">Adultos:<?php echo $habitacion['adultos'] ?></label>

                <br>
                <img class="imgNinos" src="../../../img/ninos.png">
                <label class="lblNinos">Niños:<?php echo $habitacion['ninos'] ?></label>

            </li>
        <?php
        }

        ?>

    </ul>

<?php
} else {
?>
    <div id="sinDatosInfo">

        <h1>No hay datos aun</h1>
        <br>
        <img src="../../../img/sinDatos.png">

    </div>

    </div>
<?php
}

?>