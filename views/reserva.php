<?php

session_id("datosReserva");
session_start();


$datosReservaJson = json_decode(file_get_contents('php://input'), true);


if (isset($datosReservaJson)) {

    $_SESSION["habitaciones"] = json_decode($datosReservaJson['habitaciones'], true);
    $_SESSION["fechas"] = json_decode($datosReservaJson['fechas'], true);
    


} else {


    $habitaciones = $_SESSION["habitaciones"];
    $fechas = $_SESSION["fechas"];
    
}

$diferencia=0;

foreach ($fechas as $fecha){ 

$llegada=new DateTime($fecha['FechaLlegada']);

$salida=new DateTime($fecha['FechaSalida']);


$diferencia= $llegada->diff($salida);
}


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilos/styleReservar.css">
    <script src="../alertas/alertas.js"></script>
    <title>Reserva</title>
</head>

<body>
    <header>

        <div id="logo">
            <img src="../img/revision.png" width="50px">
            <h1>Sistema Hotel</h1>
        </div>


        <ul>

            <li><a href="../views/index.html">Inicio</a></li>
            <li><a href="../views/habitaciones.html">Habitaciones</a></li>
            <li><a href="../views/index.html #sobreNosotros">Sobre nosotros</a></li>
            <li><a href="../views/index.html #contacto">Contacto</a></li>


        </ul>


        <ul class="redes">
            <li><img src="../img/instagram.png"></li>
            <li><img src="../img/facebook.png"></li>
            <li><img src="../img/whatsapp.png"></li>

        </ul>
    </header>





    <div class="avisoCompleteDatosFormulario">

        <img src="../img/avisoHuespedes.png">

        <label></label>

    </div>

    <form id="formConfirmarReserva" method="POST" action="../controller/datosReserva.php">

        <br>

        <img class="iconoForm" src="../img/revision2.png">
        <br>
        <h1>Complete los datos</h1>

        <div class="datosPersonales">

            <br>

            <img class="imgNombre" src="../img/imgNombre.png">
            <input autocomplete="off" type="text" id="nombre" placeholder="Nombre" class="inputCol1" name="nombre">

            <img class="imgApellido" src="../img/imgApellido.png">
            <input autocomplete="off" type="text" id="apellido" placeholder="Apellido" class="inputCol2" name="apellido">

            <br>

            <img class="imgTelefono" src="../img/imgTelefono.png">
            <input autocomplete="off" type="text" id="telefono" placeholder="Telefono" onkeypress="if 
            (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" class="inputCol1" maxlength="9" name="telefono">

            <img class="imgCorreo" src="../img/imgCorreo.png">
            <input autocomplete="off" type="correo" id="correo" placeholder="Correo" class="inputCol2" name="correo">

        </div>
        <br>


        <div class="datosHabitaciones">
            <br>

            <h2>Reserva</h2>

            <br>

            <?php

            foreach ($fechas as $fecha) {
            ?>

                <label>Llegada:<?php echo $fecha['FechaLlegada'] ?></label>
                <label>Salida:<?php echo $fecha['FechaSalida'] ?></label>

                <br>
            <?php

            }

            ?>
            <br>
            <div class="habitacion">
                <?php

                $depositoFinal = 0;
                foreach ($habitaciones as $habitacion) {

                ?>
                    <br>


                    <h6>Habitacion</h6>
                    <br>


                    <label class="lblCantidad"><?php echo $habitacion['CantHabitaciones'] ?></label>
                    <?php

                    if ($habitacion['CantHabitaciones'] > 1) {

                        echo "<label class='lblHabitacion'>Habitaciones</label>";
                    } else {

                        echo "<label class='lblHabitacion'>Habitacion</label>";
                    }
                    ?>

                    <label class="lblCategoria"><?php echo $habitacion['Categoria'] ?></label>


                    <img src=<?php echo $habitacion["Icono"] ?>>

                    <br><br>


                    <h5>Adultos</h5>
                    <h5>Niños</h5>
                    <br>

                    <label class="lblAdultos"><?php echo $habitacion['CantAdultos'] ?></label>

                    <label class="lblNinos"><?php echo $habitacion['CantNinos'] ?></label>

                    <br><br>


                    <h5>Noches</h5>
                    <h5>Total</h5>
                    <br>

                    <label class="lblNoches"><?php echo $diferencia->days; ?></label>

                    <label class="lblTotal"><?php echo $habitacion['TotalHabitacion'] ?></label>

                    <br><br>

                    <hr>



                <?php
                    $depositoFinal += $habitacion['TotalHabitacion'];
                }


                ?>

            </div>

            <br>
            <label class="lblDeposito">Deposito Final:$<?php echo $depositoFinal ?></label>
        </div>

        <br>
        <input type="submit" value="Enviar">


    </form>
    <br>
    <br>

</body>

</html>

<script>
    const formConfirmarReserva = document.getElementById("formConfirmarReserva");
    const fechas = <?php echo json_encode($fechas) ?>;
    const habitaciones = <?php echo json_encode($habitaciones) ?>;
    const depositoFinal  = <?php echo json_encode($depositoFinal) ?>;

    var persona = [];

    formConfirmarReserva.addEventListener("submit", function(event) {


        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;

        if (nombre == "" || apellido == "" || telefono == "" || correo == "") {

            event.preventDefault();
            alertaCompleteDatos("Complete todos los campos");
        } else {


            if (correo.includes("@gmail.com") == false && correo.includes("@hotmail.com") == false &&
                correo.includes("@outlook.com") == false) {

                event.preventDefault();
                alertaCompleteDatos("Ingresa un correo valido");

            } else {
                const datosPersona = {

                    "Nombre": nombre.trim(),
                    "Apellido": apellido.trim(),
                    "Telefono": telefono.trim(),
                    "Correo": correo.trim()

                };


                persona.push(datosPersona);

                console.log(habitaciones);

                fetch("http://localhost/Sistema%20Hotel/controller/datosReserva.php", {

                    method: "POST",
                    body: JSON.stringify({
                        'persona': JSON.stringify(persona),
                        'fechas': JSON.stringify(fechas),
                        'habitaciones': JSON.stringify(habitaciones),
                        'depositoFinal':JSON.stringify(depositoFinal)
                    }),
                    headers: {

                        "Content-Type": "application/json",
                    },

                  

                })

             
            }
        }
    });
</script>