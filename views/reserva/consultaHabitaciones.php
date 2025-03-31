<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../../estilos/styleHabitaciones.css">
    <link rel="stylesheet" href="../../estilos/responsive/styleResponsiveHabitaciones.css">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script defer type="module" src="../../js/scriptsSelectRooms/selectRooms.js"></script>



    <title>Reserva</title>


</head>

<body>


    <header>

        <div id="logo">
            <img src="../../img/revision.png" width="50px">
            <h1>Sistema Hotel</h1>
        </div>


        <ul class="options">

            <li><a href="../../index.html">Inicio</a></li>
            <li><a href="../../views/habitaciones.html">Habitaciones</a></li>
            <li><a href="../../index.html #sobreNosotros">Sobre nosotros</a></li>
            <li><a href="../../index.html #contacto">Contacto</a></li>


        </ul>


        <ul class="networks">
            <li><img src="../../img/instagram.png"></li>
            <li><img src="../../img/facebook.png"></li>
            <li><img src="../../img/whatsapp.png"></li>

        </ul>
    </header>


    <div class="containAvisoCompleteDatos">
        <div class="avisoCompleteDatos">

            <div class="contain">
                <div class="header">
                    <img src="../../img/advertenciaLogin.png">
                    <span>Advertencia</span>
                </div>
                <p>Ingresa una fecha válida</p>
                <div class="progressBar">
                    <div class="bar">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <form id="checkIn">


        <div class="containDateInputs">
            <div class="checkIn">
                <h3>Check In</h3>
                <input id="llegada" min="<?php echo date("Y-m-d") ?>" type="date" name="llegada">
            </div>

            <div class="checkOut">
                <h3>Check Out</h3>
                <input id="salida" min="<?php echo date("Y-m-d") ?>" type="date" name="salida">
            </div>
        </div>

        <button class="btnSearch" type="submit">
            Buscar
            <img src="../../img/search.png">
        </button>
    </form>


    <div id="modal">

        <div class="bodyModal">
            <div class="icon">
                <img src="../../img/advertenciaDelete.png">
            </div>
            <div class="title">

                <p></p>

            </div>
            <div>
                <button>OK</button>
            </div>
        </div>
    </div>

    <div class="loading">

        <span>Cargando habitaciones</span>
        <img src="../../img/spinnerMain.gif">
    </div>

    <div class="errorHotelRooms">

        <img src="../../img/noData.png">
        <span>¡Ups!, estamos teniendo problemas en estos momentos,
            inténtalo más tarde</span>
    </div>


    <div id="containRoomsAndCart">


        <div id="alertGuests">

            <div class="contain">
                <div class="header">
                    <img src="../../img/advertenciaLogin.png">
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

        <div class="containItemCart">
            <div class="itemCart">
                <div class="containNotificationRoom">
                    <span class="notificationRoom"></span>
                </div>
                <img src="../../img/closeCart.png">
            </div>
        </div>

        <div class="containCart">
            <div id="cart">

                <div id="title">
                    <h6>Reserva</h6>
                </div>

                <div id="dateBooking">

                    <div>
                        <div>
                            <label>Llegada</label>
                        </div>
                        <div>

                            <span class="startBooking"></span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>Salida</label>
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
                        <img src="../../img/moonBooking.png">
                    </div>

                </div>

                <ul id="roomsBooking"></ul>

                <div id="containDeposit">


                    <div class="containNotice">
                        <div class="icon">
                            <img src="../../img/avisoDeposito.png">
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
    </div>


</body>