<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilos/styleReservar.css">
    <script defer src="../js/alertas.js"></script>
    <script defer src="../js/reserva.js"></script>

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


    <div id="contain">

        <h1>Reserva</h1>


        <div class="containClientAndBooking">
        <div>
        <form>
        <h4>Complete sus datos</h4>
        <div class="nameAndLast">
        <div class="name">
            <input type="text" name="name" >

        </div>
        
        <div class="lastName">
            <input type="text" name="lastName" >

        </div>
        </div>

        <div class="phoneAndMail">
        <div class="phone">
            <input type="text" name="phone" >

        </div>
        
        <div class="mail">
            <input type="mail" name="mail" >

        </div>
        </div>



            </form>
        </div>

        <div class="bookingData">

        </div>


    </div>
    </div>

</body>

</html>