<?php
if (!isset($_COOKIE["userToken"])) {
    header("location:../../loginAdmin/index.html");
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../../estilos/styleRevenuesAdmin/styleMain.css">
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"> </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script type="module" src="../../../js/scriptsAdmin/scriptsAdmin.js" defer> </script>
    <script type="module" src="../../../js/scriptsRevenues/dashboardScript.js" defer> </script>

    <title>Ganancias</title>

<body>


    <div class="modalMainRevenues">
    </div>


    <header>
        <nav id="navAdmin">
            <div class="titleNav">
                <img class="iconoMenu" src="../../../img/revision.png">
                <span>Sistema hotel</span>
            </div>

            <ul class="menu">
                <li id="liInicio">
                    <div class="item">
                        <div class="nameOption nameOptionHome">
                            <img src="../../../img/inicio.png">
                            <a>Inicio</a>
                        </div>
                    </div>
                </li>

                <li id="liClientes" class="optionMenu">
                    <div class="item">
                        <div class="nameOption">
                            <img src="../../../img/clientes.png">
                            <a>Clientes</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../../img/btnFlecha.png">
                    </div>

                    <ul class="subMenu" id="subMenuClients" style="display: none;">

                        <li data-sub-url="grafica.html">

                            <div>
                                <img src="../../../img/grafica.png">
                                <a>Grafica</a>

                        </li>
                        <li data-sub-url="clientsTable.html">

                            <img src="../../../img/tablaClientes.png">
                            <a>Lista</a>

                        </li>
                        <li data-sub-url="addClient.html">

                            <img src="../../../img/agregarCliente.png">
                            <a>Agregar</a>
                        </li>

                    </ul>
                </li>
                <li id="liReserva" class="optionMenu">

                    <div class="item">
                        <div class="nameOption">
                            <img src="../../../img/reserva.png">
                            <a>Reservas</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../../img/btnFlecha.png">
                    </div>


                    <ul class="subMenu" id="subMenuBookings" style="display: none;">

                        <li data-sub-url="bookingsTable.html">

                            <img src="../../../img/reservas.png">
                            <a>Lista</a>

                        </li>
                        <li data-sub-url="addBooking.html" class="liCalendario">

                            <img src="../../../img/agregarReserva.png">
                            <a>Calendario</a>
                        </li>

                    </ul>


                </li>

                <li id="liHabitaciones" class="optionMenu">

                    <div class="item">
                        <div class="nameOption">
                            <img id="iconoHabitaciones" src="../../../img/habitaciones.png">
                            <a id="textHabitaciones">Habitaciones</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../../img/btnFlecha.png">
                    </div>

                    <ul class="subMenu" id="subMenuRooms" style="display: none;">

                        <li class="liGrafica" data-sub-url="grafica.html">

                            <img src="../../../img/pieChart.png">
                            <a>Grafica</a>

                        </li>

                        <li class="liHabitacion" data-sub-url="rooms.html">

                            <img src="../../../img/key-card.png">
                            <a>Lista</a>

                        </li>


                    </ul>
                </li>

                <li id="liGanancias" class="optionMenu">
                    <div class="item">
                        <div class="nameOption">
                            <img src="../../../img/ganancias.png">
                            <a>Ganancias</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../../img/btnFlecha.png">
                    </div>

                    <ul class="subMenu" id="subMenuRevenues" style="display: none;">

                        <li class="liGrafica" data-sub-url="chart.html">

                            <img src="../../../img/areaChart.png">
                            <a>Grafica</a>

                        </li>

                        <li class="liFacturas" data-sub-url="tableBills.html">

                            <img src="../../../img/electronicBill.png">
                            <a>Facturas</a>

                        </li>


                    </ul>
                </li>

                <?php
                if ($_COOKIE["idRol"] == 1) {   ?>
                    <li id="liMantenimiento">
                        <div class="item">
                            <div class="nameOption">
                                <img src="../../../img/maintenance.png">
                                <a>Mantenimiento</a>
                            </div>
                        </div>
                    </li>
                <?php
                }
                ?>
            </ul>

            <div id="userAdmin">
                <ul class="subMenuProfile">
                    <li class="editProfile">
                        <img src="../../../img/configuracion.png">
                        <span>Editar</span>
                    </li>
                    <li class="logoutOption">
                        <img src="../../../img/apagar.png">
                        <span>Salir</span>
                    </li>
                </ul>
                <li class="profile"></li>
            </div>
        </nav>

    </header>


    <div class="bodyRevenues">


        <div class="menuBar">
            <div class="title">
                <h3>Ganancias</h3>
                <img src="../../../img/revenueTitle.png">
            </div>
            <nav>
                <ul>
                    <li class="chartLi">
                        <img src="../../../img/areaChart.png">
                        <a>Grafica</a>
                    </li>
                    <li class="billLi">
                        <img src="../../../img/electronicBill.png">
                        <a>Facturas</a>
                    </li>
                </ul>
            </nav>

        </div>

        <div class="option"></div>

    </div>


</body>

</html>