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
    <link rel="stylesheet" href="../../../estilos/styleAdminHabitaciones.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"> </script>
    <script src="../../../controller/admin/scriptsAdmin/funcionesAdmin.js"> </script>
    <script src="../../../controller/admin/scriptsHabitaciones/funcionesHabitaciones.js"> </script>

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
                            <a href="../reservas/lista.php">Lista</a>

                        </li>
                        <li class="liCalendario">

                            <img src="../../../img/agregarReserva.png">
                            <a href="../reservas/agregar.php">Calendario</a>
                        </li>

                        <li class="liHabitacion">

                            <img src="../../../img/habitacionesReserva.png">
                            <a href="../reservas/habitaciones.php">Habitaciones</a>

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
                            <a>Lista</a>

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

    <nav id="menuHabitaciones">

        <br>
        <h1>Habitaciones </h1>

        <ul>

            <li class="liGrafica">

                <img src="../../../img/grafica.png">
                <br>
                <a href="grafica.php">Gráfica</a>
            </li>

            <li class="liEstandar">
                <img src="../../../img/standardIcon.png">
                <br>
                <a>Estandar</a>
            </li>
            <li class="liDeluxe">
                <img src="../../../img/deluxeIcon.png">
                <br>
                <a>Deluxe</a>
            </li>
            <li class="liSuite">
                <img src="../../../img/suiteIcon.png">
                <br>
                <a>Suite</a>
            </li>
        </ul>
    </nav>


    <br>

    <?php


    if ($genero == "M") {

    ?>


        <script>
            setImg("../../../img/adminBannerM.jpg", "../../../img/perfilM.png");
        </script>



    <?php
    } else {

    ?>

        <script>
            setImg("../../../img/adminBannerF.jpg", "../../../img/perfilF.png");
        </script>



    <?php
    }


    ?>
    <br>


    <div id="habitaciones">


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

            
    <div id="divMiniBar">

<div>
</body>

</html>

<script>
    window.onload = function() {

        $(".cargarHabitaciones").empty();

        let viewHabitaciones = localStorage.getItem("opcionHabitacionesHotel");

        switch (viewHabitaciones) {

            case "Estandar":
            default:


                $(".cargarHabitaciones").load("estandar.php");
                liBorderBottom("Estandar");
                break;


            case "Deluxe":

                $(".cargarHabitaciones").load("deluxe.php");
                liBorderBottom("Deluxe");
                break;

            case "Suite":

                $(".cargarHabitaciones").load("suite.php");
                liBorderBottom("Suite");
                break;



        }

    }


    $(".liEstandar").on("click", function() {


        localStorage.setItem("viewHabitaciones", "Estandar");
        $(".cargarHabitaciones").empty();
        $(".cargarHabitaciones").load("estandar.php");

    });

    $(".liDeluxe").on("click", function() {

        localStorage.setItem("viewHabitaciones", "Deluxe");
        $(".cargarHabitaciones").empty();
        $(".cargarHabitaciones").load("deluxe.php");

    });



    $(".liSuite").on("click", function() {

        localStorage.setItem("viewHabitaciones", "Suite");
        $(".cargarHabitaciones").empty();
        $(".cargarHabitaciones").load("suite.php");

    });

    

    openSubMenu("http://localhost/sistema%20Hotel/img/btnFlechaAbajo.png", "http://localhost/sistema%20Hotel/img/btnFlecha.png");
    
</script>