<?php

session_id("login");
session_start();
$usuario = $_SESSION['usuario'];
$genero = $_SESSION['genero'];

if (empty($usuario)) {

    header("location:../../views/loginAdmin.php");
} else {

    require("../../../model/claseReservas.php");
    $claseReservas = new reservas();
}


?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../../estilos/styleReservas.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"> </script>
    <script src="../../../js/scriptsAdmin.js" defer> </script>
    <script src="../../../js/scriptsReservas.js" defer> </script>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js' defer></script>

    <title>Admin-Reservas</title>
</head>

<body>

    <div id="modal">


    </div>

    <header>
        <nav id="navAdmin">
            <br>

            <img class="iconoMenu" src="../../../img/revision.png">
            <label class="lblTituloMenu">Sistema hotel</label>

            <br><br>

            <ul>
                <li id="liInicio">
                    <img src="../../../img/inicio.png">
                    <a href="../../admin/panelAdmin.php">Inicio</a>
                </li>

                <li id="liClientes">
                    <img src="../../../img/clientes.png">
                    <a>Clientes</a>
                    <img class="btnFlecha" src="../../../img/btnFlecha.png">

                    <ul class="subMenu">


                        <li>

                            <img src="../../../img/grafica.png">
                            <a href="../clientes/grafica.php">Grafica</a>

                        </li>

                        <li>

                            <img src="../../../img/tablaClientes.png">
                            <a href="../clientes/lista.php">Lista</a>

                        </li>
                        <li>

                            <img src="../../../img/agregarCliente.png">
                            <a href="../clientes/agregar.php">Agregar</a>
                        </li>
                    </ul>
                </li>
                <li id="liReserva">

                    <img src="../../../img/reserva.png">
                    <a>Reservas</a>
                    <img class="btnFlecha" src="../../../img/btnFlecha.png">

                    <ul class="subMenu">

                        <li>

                            <img src="../../../img/reservas.png">
                            <a href="lista.php">Lista</a>

                        </li>
                        <li class="liCalendario">

                            <img src="../../../img/agregarReserva.png">
                            <a href="agregar.php">Calendario</a>
                        </li>

                        <li class="liHabitacion">

                            <img src="../../../img/habitacionesReserva.png">
                            <a href="habitaciones.php">Habitaciones</a>


                        </li>

                    </ul>


                </li>

                <li id="liHabitaciones">

                    <img id="iconoHabitaciones" src="../../../img/habitaciones.png">
                    <a id="textHabitaciones">Habitaciones</a>
                    <img class="btnFlecha" src="../../../img/btnFlecha.png">

                    <ul class="subMenu">

                        <li class="liGraficaPie">

                            <img src="../../../img/grafica.png">
                            <a href="../habitaciones/grafica.php">Grafica</a>

                        </li>

                        <li class="liHabitacion">

                            <img src="../../../img/key-card.png">
                            <a href="../habitaciones/habitacionesEstandar.php">Lista</a>

                        </li>


                    </ul>
                </li>

                <li id="liGanancias" class="optionGanancias">
                    <img src="../../../img/ganancias.png">
                    <a>Ganancias</a>

                </li>
            </ul>

            <div id="userAdmin">

                <img class="iconoAdmin">
                <label><?php echo $usuario ?></label>
                <img class="btnFlecha" src="../../../img/btnFlecha.png">

                <ul class="subMenuAdmin">


                    <li>
                        <img src="../../../img/configuracion.png">
                        <a>Editar</a>

                    </li>

                    <a href="../../../controller/admin/cerrarSesion.php">
                        <li>

                            <img src="../../../img/apagar.png">
                            <a class="logout">Log out</a>
                        </li>
                    </a>
                </ul>
            </div>
        </nav>

    </header>


    <nav id="menuReservas">

        <br>
        <h1>Reservas</h1>
        <img src="../../../img/reservasBanner.png">

        <ul>

            <li class="liListaReservas">
                <img class="imgReservas" src="../../../img/reservas.png">
                <br>
                <a href="lista.php">Lista</a>


            </li>
            <li class="liAgregarReservas">

                <img class="imgAgregarReserva" src="../../../img/agregarReserva.png">
                <br>
                <a href="agregar.php">Calendario</a>


            </li>

            <li class="liHabitaciones">
                <img class="imgHabitacionReserva" src="../../../img/habitacionesReserva.png">
                <br>
                <a>Habitaciones</a>


            </li>
        </ul>
    </nav>

    </div>

    <br>

    <br>


    <div id="habitaciones">

        <ul>
            <li class="liEstandar">
                <img src="../../../img/bannerHab1.jpg">
                <br>
                Estandar
            </li>
            <li class="liDeluxe">
                <img src="../../../img/bannerHab1Deluxe.jpg">
                <br>
                Deluxe
            </li>
            <li class="liSuite">
                <img src="../../../img/bannerHab1Suite.jpg">
                <br>
                Suite
            </li>
        </ul>


        <div id="avisoHabitacion">

            <br>
            <img src="">
            <label></label>

        </div>


        <div class="cargarHabitaciones">


        </div>
    </div>


    <div id="divOpcion">

        <div>
</body>

</html>
