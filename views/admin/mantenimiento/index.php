<?php

if (!isset($_COOKIE["userToken"]) && !isset($_COOKIE["userRefreshToken"])) {
    header("location:../../loginAdmin/index.html");
}

if (isset($_COOKIE["idRol"]) && $_COOKIE["idRol"] != 1) {
    http_response_code(401);
    header("location:../unauthorized.html");
}


?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../img/revision2.png">
    
    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleMain.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveMain.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleTableUsers.css"">
    <link rel=" stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveTableUsers.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleEdit.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveEdit.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleDelete.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveDelete.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleAdd.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveAdd.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleDetails.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveDetails.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleRooms.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveRooms.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleEditRoom.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveEditRoom.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleServices.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveServices.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleEditService.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveEditService.css">


    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleEditProducts.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveEditProducts.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleAddProduct.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveAddProduct.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleEditProduct.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveEditProduct.css">

    <link rel="stylesheet" href="../../../estilos/styleMaintenanceAdmin/styleDeleteProduct.css">
    <link rel="stylesheet" href="../../../estilos/responsive/styleMaintenanceAdmin/styleResponsiveDeleteProduct.css">


    <script type="module" src="../../../js/scriptsAdmin/scriptsAdmin.js" defer>
    </script>
    <script type="module" src="../../../js/scriptsMaintenance/dashboard.js" defer></script>
    <title>Mantenimiento</title>
</head>

<body>

    <div class="modalMaintenance"></div>

    <header>
        <nav id="navAdmin">
            <div class="closeMenu">
                <img src="../../../img/menuOpen.png">
            </div>

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

                <li id="liMantenimiento">
                    <div class="item">
                        <div class="nameOption">
                            <img src="../../../img/maintenance.png">
                            <a>Mantenimiento</a>
                        </div>
                    </div>
                </li>

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

    <div class="bodyMaintenance">
        <div class="menuBar">
            <div class="openMenu">
                <img src="../../../img/menuHabitacion.png">
            </div>
            <nav>
                <ul>
                    <li class="usersLi">
                        <img src="../../../img/usersMaintenance.png">
                        <a>Usuarios</a>

                    </li>
                    <li class="roomsLi">
                        <img src="../../../img/roomsMaintenance.png">
                        <a>Habitaciones</a>

                    </li>
                    <li class="servicesLi">
                        <img src="../../../img/servicesMaintenance.png">
                        <a>Servicios</a>

                    </li>
                </ul>
            </nav>

        </div>

        <div class="option"></div>
    </div>

</body>

</html>