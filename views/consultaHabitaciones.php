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


        <ul class="options">

            <li><a href="../views/index.html">Inicio</a></li>
            <li><a href="../views/habitaciones.html">Habitaciones</a></li>
            <li><a href="../views/index.html #sobreNosotros">Sobre nosotros</a></li>
            <li><a href="../views/index.html #contacto">Contacto</a></li>


        </ul>


        <ul class="networks">
            <li><img src="../img/instagram.png"></li>
            <li><img src="../img/facebook.png"></li>
            <li><img src="../img/whatsapp.png"></li>

        </ul>
    </header>


    <div class="avisoCompleteDatos">

        <div class="contain">
            <div class="header">
                <img src="../img/advertenciaLogin.png">
                <span>Advertencia</span>
            </div>
            <p>Ingresa una fecha válida</p>
            <div class="progressBar">
                <div class="bar">
                </div>
            </div>
        </div>
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

    <div id="modal">

        <div class="bodyModal">
            <div class="icon">
                <img src="../img/advertencia.gif">
            </div>
            <div class="title">

                <p>Excede el limite de habitaciones disponibles</p>

            </div>
            <div>
                <button>OK</button>
            </div>
        </div>
    </div>



    <div id="containRoomsAndCart">

        <div id="alertGuests">

            <div class="contain">
                <div class="header">
                    <img src="../img/advertenciaLogin.png">
                    <span>Advertencia</span>
                </div>
                <p>Ingresa algun huesped</p>
                <div class="progressBar">
                    <div class="bar">
                    </div>
                </div>
            </div>
        </div>

        <div id="containRooms"></div>

        <div id="cart">

            <div id="title">
                <h6>Reserva</h6>
            </div>

            <div id="dateBooking">

                <div>
                    <div>
                        <label>Desde</label>
                    </div>
                    <div>

                        <span class="startBooking"></span>
                    </div>
                </div>

                <div>
                    <div>
                        <label>Hasta</label>
                    </div>
                    <div>
                        <span class="endBooking"></span>
                    </div>
                </div>
            </div>

            <div class="containNight">

                <div>
                    <span class="quantityNights"></span>
                </div>
                <div>
                    <img src="../img/moonBooking.png">
                </div>

            </div>

            <ul id="roomsBooking"></ul>

            <div id="containDeposit">

                <div class="span">
                    <span>Deposito:</span>
                </div>

                <div class="containNotice">
                    <div class="icon">
                        <img src="../img/avisoDeposito.png">
                    </div>
                    <div class="phrase">
                        <span>Reserve ahora, pague despues</span>
                    </div>
                </div>
                <div class="containTotal">
                    <span class="total"></span>
                </div>

                <div class="containButton">
                    <button id="buttonNext">Siguiente</button>
                </div>


            </div>

        </div>
    </div>


</body>