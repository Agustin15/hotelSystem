<?php


$habitaciones = json_decode($_GET['habitaciones'], true);

require("../../../../model/claseCliente.php");
require("../../../../model/claseHabitaciones.php");
$claseHabitaciones = new habitaciones();
$claseCliente = new cliente();

?>


<div class="detallesHabitaciones">

    <img class="cerrarHabitaciones" src="../../../img/cerrarVentana.png">
    <img src="../../../img/habitacionesInfo.png">
    <br>
    <h2>Habitaciones asignadas</h2>
    <br>

    <div id="containerTable">


        <?php

        if (empty($habitaciones)) {

        ?>

            <div class="sinDatos">
                <img src="../../../img/sinDatos.png">
                <br>
                <label>Sin habitaciones asignadas aun</label>

            </div>

        <?php



        } else {

        ?>

            <div class="containerDivHabitacion">
                <?php
                $img = null;
                foreach ($habitaciones as $habitacion) {

                    $categoria = $claseHabitaciones->getCategoria($habitacion['numHabitacionReservada']);
                    $adultos = $habitacion['adultos'];
                    $ninos = $habitacion['ninos'];

                    switch ($categoria) {

                        case "Estandar":

                            $img = "../../../img/bannerHab1.jpg";

                            break;

                        case "Deluxe":

                            $img = "../../../img/bannerHab1Deluxe.jpg";

                            break;

                        case "Suite":

                            $img = "../../../img/bannerHab1Suite.jpg";

                            break;
                    }

                ?>



                    <div class="divHabitacion">

                        <img class="imgHabitacion" src=<?php echo $img ?>>
                        <h3>Habitacion <?php echo $categoria." ".$habitacion['numHabitacionReservada'] ?></h3>
                        <br>
                        <img class="imgAdultos" src="../../../img/adultos.png">
                        <label>Adultos:<?php echo $adultos ?></label>
                        <img class="imgNinos" src="../../../img/ninos.png">
                        <label class="lblNinos">Niños:<?php echo $ninos ?></label>
                        <br>

                    </div>


                <?php
                }

                ?>
            </div>
        <?php
        }

        ?>

    </div>

</div>

<script>
    $(".cerrarHabitaciones").on("click", function() {


        $("#modalInfo").css("display", "none");
        $("#modalInfo").css("cursor", "auto");

        $(".subVentanas").empty();



    });


    var trs = $(".trsBody").find("tr");

    trs.each(function(index) {

        if ((index + 1) % 2 == 0) {

            $(this).css("backgroundColor", "rgb(174, 233, 255)");
        } else {

            $(this).css("backgroundColor", "grey");
        }

    })
</script>