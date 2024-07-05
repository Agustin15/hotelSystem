<?php


$servicios = json_decode($_GET['servicios'], true);

require("../../../../model/claseCliente.php");
$claseCliente = new cliente();


?>


<div class="detallesServicios">

    <img class="cerrarServicios" src="../../../img/cerrarVentana.png">
    <img src="../../../img/servicioInfo.png">
    <br>
    <h2>Servicios por habitacion</h2>
    <br>

    <div id="containerTable">

        <?php

        if (empty($servicios)) {

        ?>
             
             <div class="sinDatos">
            <img src="../../../img/sinDatos.png">
            <br>
            <label>Sin servicios a cuarto aun</label>

            </div>
            
        <?php


        } else {
        ?>

            <table>
                <tr>
                    <th>Servicio</th>
                    <th>Precio</th>
                    <th>Numero de habitacion</th>
                </tr>
                <div class="trsBody">
                    <?php


                    foreach ($servicios as $servicio) {

                    ?>
                        <tr>
                            <td><?php echo $servicio['nombreServicio'] ?></td>
                            <td><?php echo $servicio['precioServicio'] ?></td>
                            <td><?php echo $servicio['numHabitacionServicio'] ?></td>
                        </tr>

                    <?php

                    }
                    ?>
                </div>
            </table>
    </div>

<?php
        }
?>
</div>

<script>
    $(".cerrarServicios").on("click", function() {


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