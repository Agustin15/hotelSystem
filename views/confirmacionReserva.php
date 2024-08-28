<?php

if(empty($_GET['option'])  || empty($_GET['mailClient'])){

    header("Location:consultaHabitaciones.php");
    
}else{
$option = $_GET['option'];
$mail = $_GET['mailClient'];
$title;
$mailCompany=strpos($mail,"@");
$mailCompany=substr($mail,$mailCompany);

if ($option == "bookingUpdated") {

    $title = "Reserva actualizada exitosamente";
} else {

    $title = "Reserva realizada exitosamente";
}

}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilos/styleReservar.css">
    <script src="../js/reserva.js" defer></script>
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


    <div id="confirmationBooking">

        <div class="icon">
            <img class="gif" src="../img/tickServices.gif">
        </div>

        <div class="body">
            <div class="title">

                <span><?php echo $title ?></span>
            </div>

            <div class="msj">

                <?php

                if ($option == "bookingUpdated") {

                ?>
                    <p>Revise su correo electronico <a href="https://<?php echo $mailCompany?> "><?php echo $mail ?></a> para ver los nuevos datos de su reserva</p>

                <?php
                } else {

                ?>
                    <p>Revise su correo electronico <a target="blank" href="https://<?php echo $mailCompany?> "><?php echo $mail ?></a> para ver los datos de su reserva</p>

                <?php
                }

                ?>


            </div>

            <div>
                <a href="index.html">
                <button>OK</button>
                </a>
            </div>

        </div>
    </div>

</body>

</html>

