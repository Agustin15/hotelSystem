<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reserva</title>
</head>

<body>


    <?php

    if (isset($_POST['datosMsj'])) {

        $jsonMsj = $_POST['datosMsj'];

        $msj = json_decode($jsonMsj, true);
    }

    ?>



    <div class="confirmacion">
        <br>


        <?php


        if ($msj['mensaje'] == "Reserva Realizada") {

        ?>

            <img class="imgLogoConfirmacion" src="../img/tick.gif">

            <div class="bodyConfirmacion">
                <br>
                <h4>Reserva realizada</h4>
                <br>
                <p><?php echo $msj['nombre'] ?>, le hemos enviado la confirmacion</p>
                <p>de la reserva con los detalles a su correo <a><?php echo $msj['correo'] ?></a></p>
                <br>

                <a href="../views/index.html"><button class="ok">Inicio</button></a>

            </div>

        <?php

        } else {

        ?>
            <img class="imgLogoConfirmacion" src="../img/advertencia.gif">

            <div class="bodyConfirmacion">
                <br>
                <h4>Ups, algo salio mal</h4>
                <br>
                <p>Ya no hay habitaciones <?php echo $msj['categoria']?> disponibles</p>
                <br>
                <a href="../controller/consultaHabitaciones.php"><button class="error">Volver</button></a>
              

            </div>

        <?php
        }




        ?>

    </div>





    <h2></h2>

    </div>
</body>


<script>

window.onload=function(){
localStorage.clear();

}


</script>

</html>