<?php

session_id("login");
session_start();
$usuario = $_SESSION['usuario'];
$genero = $_SESSION['genero'];

if (empty($usuario)) {

    header("location:../../views/loginAdmin.php");
} else {

    require("../../../model/claseCliente.php");
    $claseCliente = new cliente();
}

$idReserva="";
if (isset($_GET['idReserva'])) {

    $idReserva = $_GET['idReserva'];
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

    <script src="../../../controller/admin/scriptsAdmin/funcionesAdmin.js"> </script>
    <script src="../../../controller/admin/scriptsReservas/funcionesReservas.js"> </script>


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
                            <a>Lista</a>

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

                    <img src="../../../img/habitaciones.png">
                    <a>Habitaciones</a>
                </li>


                <li id="liGanancias">
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
        <br>
        <img src="../../../img/reservasBanner.png">

        <ul>

            <li class="liListaReservas">
                <a href="lista.php">Lista</a>
                <img class="imgReservas" src="../../../img/reservas.png">

            </li>
            <li>
                <a href="agregar.php">Calendario</a>
                <img class="imgAgregarReserva" src="../../../img/agregarReserva.png">

            </li>

            <li>
                <a href="habitaciones.php">Habitaciones</a>
                <img class="imgHabitacionReserva" src="../../../img/habitacionesReserva.png">

            </li>
        </ul>
    </nav>

    </div>

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


    <div id="divTableReservas">


        <input id="buscador" placeholder="Buscador..."></input>
        <img class="lupa" src="../../../img/lupa.png">

        <div id="avisoReserva">

        </div>

        <div id="containerTable">
            <table id="tableReservas">



            </table>

            <div id="sinDatosTblReservas">

                <img src="../../../img/advertenciaClientes.png">
                <br>
                <h3>No hay resultados</h3>
            </div>



        </div>

    </div>
    <?php
    ?>

    <div class="divOpcion">

    </div>


</body>

</html>

<script>
    window.onload = function() {

        $("#tableReservas").load("../../../controller/admin/reservas/cargarTabla.php", function() {

            var idReserva = "<?php echo $idReserva ?>";
            if (idReserva !== "") {

                buscadorParametroReserva(idReserva,".tdIdReserva", "id-reserva");
            }

        });


    }


    openSubMenu("../../../img/btnFlechaAbajo.png", "../../../img/btnFlecha.png");

    liBorderBottom("listaReservas");


    $("#buscador").on("keydown", function() {

        buscadorReserva();

    });
</script>