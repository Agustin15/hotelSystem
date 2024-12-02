<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../estilos/styleReservar.css">
    <script defer src="../../js/alertas.js"></script>
    <script defer type="module" src="../../js/scriptsReserva/personalData.js"></script>


    <title>Reserva-Datos</title>
</head>

<body>
    <header>

        <div id="logo">
            <img src="../../img/revision.png" width="50px">
            <h1>Sistema Hotel</h1>
        </div>


        <ul>

            <li><a href="../../views/index.html">Inicio</a></li>
            <li><a href="../../views/habitaciones.html">Habitaciones</a></li>
            <li><a href="../../views/index.html #sobreNosotros">Sobre nosotros</a></li>
            <li><a href="../../views/index.html #contacto">Contacto</a></li>


        </ul>


        <ul class="redes">
            <li><img src="../../img/instagram.png"></li>
            <li><img src="../../img/facebook.png"></li>
            <li><img src="../../img/whatsapp.png"></li>

        </ul>
    </header>



    <div id="contain">

        <div class="modalBooking">

            <div class="loading">

                <span></span>
                <img src="../../img/spinnerBooking.gif">
            </div>

        </div>

        <div class="barStageAdvance"></div>


        <div class="dateBooking">

            <div class="arrival">
                <h4>Fecha de llegada:</h4>
                <span class="startBooking"></span>

            </div>

            <div class="containNights">
                <img src="../../img/moonBooking.png">
                <span class="nights"></span>

            </div>

            <div class="exit">
                <h4>Fecha de salida:</h4>
                <span class="endBooking"></span>

            </div>
        </div>

        <div class="containClientAndBooking">


            <div class="bodyClientAndBooking">
                <div class="client">

                    <div class="iconTitle">
                        <img src="../../img/formClientBooking.png">
                    </div>
                    <form>
                        <h4>Complete sus datos</h4>
                        <div class="nameAndLast">

                            <div class="name">
                                <div>

                                    <label for="name">Nombre</label>
                                </div>
                                <input type="text" id="name" placeholder="Ingrese nombre" name="name" autocomplete="off">

                                <span class="alertErrorInput"></span>
                            </div>


                            <div class="lastName">

                                <div>

                                    <label for="lastName">Apellido</label>
                                </div>
                                <input type="text" id="lastName" placeholder="Ingrese apellido" name="lastName" autocomplete="off">
                                <span class="alertErrorInput"></span>

                            </div>
                        </div>

                        <div class="phoneAndMail">
                            <div class="phone">

                                <div>

                                    <label for="phone">Telefono</label>
                                </div>

                                <input maxlength="9" type="text"
                                    id="phone" placeholder="Ingrese telefono" onpaste="return false"

                                    name="phone" autocomplete="off">
                                <span class="alertErrorInput"></span>


                            </div>

                            <div class="mail">

                                <div>

                                    <label for="mail">Correo</label>
                                </div>
                                <input type="mail" placeholder="Ingrese correo" name="mail" autocomplete="off">

                                <span class="alertErrorInput"></span>
                            </div>
                        </div>


                        <div id="alertClient">

                            <img src="../../img/advertenciaLogin.png">
                            <div class="body">
                                <span>Error</span>

                                <p></p>
                            </div>

                        </div>
                    </form>
                </div>

                <div class="bookingData">

                    <div class="title">
                        <span>Habitaciones</span>
                    </div>
                    <ul class="bookingRooms">

                        <li>


                        </li>
                    </ul>
                    <div class="controls">

                        <img class="btnPrev" src="../../img/prevRoom.png">
                        <span class="indexRoom"></span>
                        <img class="btnNext" src="../../img/nextRoom.png">
                    </div>


                    <div class="containTotalBooking">
                        <span></span>
                    </div>
                </div>

            </div>

        </div>

        <div class="containButtonsForm">

            <div>

                <button onclick="location.href='../reserva/consultaHabitaciones.php'">Volver</button>
            </div>
            <div>
                <button class="btnNextStage">Realizar reserva</button>
            </div>
        </div>


    </div>
</body>

</html>