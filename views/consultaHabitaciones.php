
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../estilos/styleHabitaciones.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script defer src="../js/alertas.js"></script>
    

    <script defer src="../js/selectRooms.js"></script>


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


    <div class="avisoCompleteDatos">

        <img class="imgAvisoMsj" src="../img/avisoHuespedes.png">

        <label></label>

    </div>

    <form id="checkIn">

        <br>


        <h1>Check-in</h1>


        <div class="containerInputs">

            <div class="lblLlegada">
                <label>Llegada</label>
            </div>

            <div class="lblHuespedes">
                <label>Salida</label>
            </div>


            <input id="llegada" min="<?php echo date("Y-m-d") ?>" type="date" name="llegada">


            <input id="salida" min="<?php echo date("Y-m-d") ?>" type="date" name="salida">


            <input type="submit" value="Buscar">


        </div>
    </form>


    <div id="containRoomsAndCart">


    <div id="containRooms">

    </div>
    </div>

</body>