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
            <div class="titleNav">
                <img class="iconoMenu" src="../../img/revision.png">
                <span>Sistema hotel</span>
            </div>

            <ul class="menu">
                <li id="liInicio">
                    <div class="item">
                        <div class="nameOption nameOptionHome">
                            <img src="../../img/inicio.png">
                            <a>Inicio</a>
                        </div>
                    </div>
                </li>

                <li id="liClientes" class="optionMenu">
                    <div class="item">
                        <div class="nameOption">
                            <img src="../../img/clientes.png">
                            <a>Clientes</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../img/btnFlecha.png">
                    </div>

                    <ul class="subMenu" id="subMenuClients" style="display: none;">

                        <li data-sub-url="grafica.html">

                            <div>
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
                <li id="liReserva" class="optionMenu">

                    <div class="item">
                        <div class="nameOption">
                            <img src="../../img/reserva.png">
                            <a>Reservas</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../img/btnFlecha.png">
                    </div>


                    <ul class="subMenu" id="subMenuBookings" style="display: none;">

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

                <li id="liHabitaciones" class="optionMenu">

                    <div class="item">
                        <div class="nameOption">
                            <img id="iconoHabitaciones" src="../../img/habitaciones.png">
                            <a id="textHabitaciones">Habitaciones</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../img/btnFlecha.png">
                    </div>

                    <ul class="subMenu" id="subMenuRooms" style="display: none;">

                        <li class="liGrafica" data-sub-url="grafica.html">

                            <img src="../../img/pieChart.png">
                            <a>Grafica</a>

                        </li>

                        <li class="liHabitacion" data-sub-url="rooms.html">

                            <img src="../../img/key-card.png">
                            <a>Lista</a>

                        </li>


                    </ul>
                </li>

                <li id="liGanancias" class="optionMenu">
                    <div class="item">
                        <div class="nameOption">
                            <img src="../../img/ganancias.png">
                            <a>Ganancias</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../img/btnFlecha.png">
                    </div>

                    <ul class="subMenu" id="subMenuRevenues" style="display: none;">

                        <li class="liGrafica" data-sub-url="chart.html">

                            <img src="../../img/areaChart.png">
                            <a>Grafica</a>

                        </li>

                        <li class="liFacturas" data-sub-url="tableBills.html">

                            <img src="../../img/electronicBill.png">
                            <a>Facturas</a>

                        </li>


                    </ul>

                </li>


            </ul>

            <div id="userAdmin">
                <ul class="subMenuProfile">
                    <li class="editProfile">
                        <img src="../../img/configuracion.png">
                        <span>Editar</span>
                    </li>
                    <li class="logoutOption">
                        <img src="../../img/apagar.png">
                        <span>Salir</span>
                    </li>
                </ul>
                <li class="profile"></li>
            </div>
        </nav>

    </header>

    <div id="dashboard">

        <div class="welcome">
            <div class="row">
                <div class="containIcon">
                    <img src="../../img/hello.png">
                </div>
                <h3 class="titleWelcome"></h3>
            </div>
            <div class="curve"></div>
        </div>
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
                <div id="chartRooms"></div>
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

                <div id="chartBookings"></div>

            </div>

            <div class="containGraphicRevenues">

                <h3>Ganancias de este año (<?php echo $actualYear ?>)</h3>
                <div class="loadingRevenues">
                    <img src="../../img/barCharSpinner.gif">
                    <span>Cargando datos</span>

                </div>

                <div class="noDataRevenues">

                    <img src="../../img/sinDatosGrafica.png">
                    <span>No hay datos aún</span>

                </div>

                <div id="chartRevenues"></div>

            </div>
        </div>


    </div>



</body>

</html>