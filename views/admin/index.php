<?php

$actualYear = date("Y");

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../estilos/styleAdmin.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"> </script>
    <script type="module" src="../../js/scriptsAdmin/scriptsAdmin.js" defer> </script>
    <script src="../../js/alertas.js" defer></script>

    <title>Admin</title>

<body>

    <header>
        <nav id="navAdmin">
            <br>

            <img class="iconoMenu" src="../../img/revision.png">
            <label class="lblTituloMenu">Sistema hotel</label>

            <br><br>

            <ul>
                <li id="liInicio">
                    <img src="../../img/inicio.png">
                    <a>Inicio</a>
                </li>

                <li id="liClientes">
                    <img src="../../img/clientes.png">
                    <a>Clientes</a>
                    <img class="btnFlecha" src="../../img/btnFlecha.png">

                    <ul class="subMenu">

                        <li data-sub-url="grafica.html">

                            <img src="../../img/grafica.png">
                            <a>Grafica</a>

                        </li>
                        <li data-sub-url="clientsTable.html">

                            <img src="../../img/tablaClientes.png">
                            <a>Lista</a>

                        </li>
                        <li data-sub-url="addClient.html">

                            <img src="../../img/agregarCliente.png">
                            <a>Agregar</a>
                        </li>

                    </ul>
                </li>
                <li id="liReserva">

                    <img src="../../img/reserva.png">
                    <a>Reservas</a>
                    <img class="btnFlecha" src="../../img/btnFlecha.png">


                    <ul class="subMenu">

                        <li data-sub-url="bookingsTable.html">

                            <img src="../../img/reservas.png">
                            <a>Lista</a>

                        </li>
                        <li data-sub-url="addBooking.html" class="liCalendario">

                            <img src="../../img/agregarReserva.png">
                            <a>Calendario</a>
                        </li>

                    </ul>


                </li>

                <li id="liHabitaciones">

                    <img id="iconoHabitaciones" src="../../img/habitaciones.png">
                    <a id="textHabitaciones">Habitaciones</a>
                    <img class="btnFlecha" src="../../img/btnFlecha.png">

                    <ul class="subMenu">

                        <li class="liGrafica" data-sub-url="grafica.html">

                            <img src="../../img/grafica.png">
                            <a>Grafica</a>

                        </li>

                        <li class="liHabitacion" data-sub-url="rooms.html">

                            <img src="../../img/key-card.png">
                            <a>Lista</a>

                        </li>


                    </ul>
                </li>



                <li id="liGanancias" class="optionGanancias">
                    <img src="../../img/ganancias.png">
                    <a>Ganancias</a>

                </li>
            </ul>

            <div id="userAdmin">

                <img class="iconoAdmin" data-genre="<?php echo "M" ?>">
                <label><?php echo "Agustin" ?></label>
                <img class="btnFlecha" src="../../img/btnFlecha.png">

                <ul class="subMenuAdmin">


                    <li>
                        <img src="../../img/configuracion.png">
                        <a>Editar</a>

                    </li>

                    <a href="../../controller/admin/logout.php">
                        <li>

                            <img src="../../img/apagar.png">
                            <a class="logout">Log out</a>
                        </li>
                    </a>
                </ul>
            </div>
        </nav>

    </header>

    <div id="dashboard">

        <div class="rowOne">
            <div class="containItemsData">
                <ul class="itemsData"></ul>

            </div>

            <div class="containGraphicRooms">

                <h4>Categorias de habitacion mas reservadas en este año (<?php echo $actualYear ?>) </h4>
                <br>
                <div class="loadingRooms">
                    <img src="../../img/barCharSpinner.gif">
                    <span>Cargando datos</span>

                </div>
                <div class="noDataRooms">

                    <img src="../../img/sinDatosGrafica.png">
                    <span>No hay datos aún</span>

                </div>
                <div id="charRooms"></div>
            </div>
        </div>


        <div class="rowTwo">
            <div class="containGraphicBookings">

                <h3>Clientes de este año (<?php echo $actualYear ?>)</h3>
                <div class="loadingBookings">
                    <img src="../../img/barCharSpinner.gif">
                    <span>Cargando datos</span>

                </div>

                <div class="noDataBookings">

                    <img src="../../img/sinDatosGrafica.png">
                    <span>No hay datos aún</span>

                </div>

                <div id="charBookings"></div>

            </div>

            <div class="containGraphicRevenues">

                <h3>Ganancias de este año <?php echo $actualYear ?></h3>
                <div class="loadingRevenues">
                    <img src="../../img/barCharSpinner.gif">
                    <span>Cargando datos</span>

                </div>

                <div class="noDataRevenues">

                    <img src="../../img/sinDatosGrafica.png">
                    <span>No hay datos aún</span>

                </div>

                <div id="charRevenues"></div>

            </div>
        </div>


    </div>



</body>

</html>