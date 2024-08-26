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

        <div class="title">
            <div>
                <img src="../img/iconBookingClient.jpg">
            </div>

            <div>
                <h1>Realizar Reserva</h1>
            </div>
        </div>

        <div class="modalBooking">

            <div class="alertBookingExists">

                <div>
                    <img src="../img/advertencia.gif">
                </div>

                <div class="msj">
                    <p></p>
                </div>

                <div class="containButtons">
                    <button class="btnOK">Ok</button>
                    <button class="btnCancel">Cancelar</button>
                </div>

            </div>

        </div>

        <div class="containClientAndBooking">
            <div class="client">

                <div class="iconTitle">
                    <img src="../img/formClientBooking.png">
                </div>
                <form onsubmit="clientData(event)">
                    <h4>Complete sus datos</h4>
                    <div class="nameAndLast">

                        <div class="name">
                            <div>

                                <label for="name">Nombre</label>
                            </div>
                            <div>
                                <input onclick="removeInputAlert(event)" type="text" id="name" placeholder="Ingrese nombre" name="name" autocomplete="off">

                            </div>
                        </div>


                        <div class="lastName">

                            <div>

                                <label for="lastName">Apellido</label>
                            </div>
                            <div>
                                <input onclick="removeInputAlert(event)" type="text" id="lastName" placeholder="Ingrese apellido" name="lastName" autocomplete="off">

                            </div>
                        </div>
                    </div>

                    <div class="phoneAndMail">
                        <div class="phone">

                            <div>

                                <label for="phone">Telefono</label>
                            </div>

                            <div>
                                <input onclick="removeInputAlert(event)" maxlength="9" type="text" id="phone" placeholder="Ingrese telefono" onkeypress="
            return event.charCode>= 48 && event.charCode <= 57" name="phone" autocomplete="off">
                            </div>

                        </div>

                        <div class="mail">

                            <div>

                                <label for="mail">Correo</label>
                            </div>

                            <input type="mail" onclick="removeInputAlert(event)" placeholder="Ingrese correo" name="mail" autocomplete="off">

                        </div>
                    </div>


                    <div class="containButtons">

                        <div>
                            <button type="reset" onclick="location.href='../views/consultaHabitaciones.php'">Volver</button>
                        </div>
                        <div>
                            <button type="submit">Reservar</button>
                        </div>
                    </div>

                    <div id="alertClient">

                    <div class="bodyAlert">
                        <div class="icon">
                            <img src="../img/advertenciaService.png">
                        </div>
                        <div class="msj">
                            <div class="advertencia">
                                <span>Advertencia</span>
                            </div>
                            <div>
                            <p>Complete todos los campos</p>
                            </div>
                        </div>
                        </div>
                        <div class="progresBar">
                            <div class="progres">

                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="bookingData">

                <h1>Datos de la reserva</h1>

                <div class="dateBooking">

                    <div class="start">

                        <div>
                            <img src="../img/arrival.png">
                        </div>
                        <div class="date">
                            <span>Llegada</span>
                            <span class="startBooking"></span>
                        </div>
                    </div>

                    <div class="end">

                        <div>
                            <img src="../img/exit.png">
                        </div>
                        <div class="date">
                            <span>Salida</span>
                            <span class="endBooking"></span>
                        </div>
                    </div>

                </div>

                <div class="nights">

                    <div>
                        <img src="../img/moonBooking.png">
                    </div>
                    <div>
                        <span>Noches</span>
                    </div>
                </div>
                <ul class="bookingRooms">



                </ul>


                <div class="containTotalBooking">
                    <span></span>
                </div>
            </div>




        </div>
    </div>

</body>

</html>