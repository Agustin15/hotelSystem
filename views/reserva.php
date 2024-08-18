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
            <div class="client">
                <form>
                    <h4>Complete sus datos</h4>
                    <div class="nameAndLast">

                        <div class="name">
                            <div>

                                <label for="name">Nombre</label>
                            </div>
                            <div>
                                <input type="text" id="name" placeholder="Ingrese nombre" name="name" autocomplete="off">

                            </div>
                        </div>


                        <div class="lastName">

                            <div>

                                <label for="lastName">Apellido</label>
                            </div>
                            <div>
                                <input type="text" id="lastName" placeholder="Ingrese apellido" name="lastName" autocomplete="off">

                            </div>
                        </div>
                    </div>

                    <div class="phoneAndMail">
                        <div class="phone">

                            <div>

                                <label for="phone">Telefono</label>
                            </div>

                            <div>
                                <input type="text" id="phone" placeholder="Ingrese telefono" onkeypress="
            return event.charCode>= 48 && event.charCode <= 57" name="phone" autocomplete="off">
                            </div>

                        </div>

                        <div class="mail">

                            <div>

                                <label for="mail">Correo</label>
                            </div>

                            <input type="mail" placeholder="Ingrese correo" name="mail" autocomplete="off">

                        </div>
                    </div>



                </form>
            </div>

            <div class="bookingData">

                <h1>Datos de la reserva</h1>

                <div class="dateBooking">

                    <div class="start">

                        <span>Llegada</span>
                        <span class="startBooking"></span>
                    </div>

                    <div class="end">
                        <span>Salida</span>
                        <span class="endBooking"></span>
                    </div>

                </div>

                <div class="nights">
                    <span>Noches</span>
                </div>
                <ul class="bookingRooms">


                  
                </ul>

            </div>




        </div>
    </div>

</body>

</html>