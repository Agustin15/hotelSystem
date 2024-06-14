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


$cliente ="";
if (isset($_GET['cliente'])) {

    $cliente = $_GET['cliente'];
}


?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../../estilos/styleClientes.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"> </script>
    <script src="../../../controller/admin/scriptsAdmin/funcionesAdmin.js"> </script>
    <script src="../../../controller/admin/scriptsCliente/funcionesCliente.js"> </script>

    <title>Admin-Clientes</title>
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
                            <a href="grafica.php">Grafica</a>

                        </li>
                        <li>

                            <img src="../../../img/tablaClientes.png">
                            <a href="lista.php">Lista</a>

                        </li>
                        <li>

                            <img src="../../../img/agregarCliente.png">
                            <a href="agregar.php">Agregar</a>
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

                    <img src="../../../img/habitaciones.png">
                    <a href="../habitaciones/grafica.php">Habitaciones</a>
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


    <nav id="menuCliente">

        <br>
        <h1>Clientes</h1>
        <br>
        <img src="../../../img/clientesBanner.jpg">

        <ul>

            <li class="liGrafica">
                <a href="grafica.php">Gráfica</a>
                <img src="../../../img/grafica.png">
            </li>
            <li class="liLista">
                <a href="lista.php">Gestion</a>
                <img class="imgClientes" src="../../../img/listaClientes.png">

            </li>
            <li>
                <a href="agregar.php">Agregar</a>
                <img class="imgClientes" src="../../../img/agregarCliente.png">

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


    <div id="divTableClientes">


        <input id="buscador" placeholder="Buscador..."></input>
        <img class="lupa" src="../../../img/lupa.png">

        <div id="avisoCliente">

        </div>

        <div id="containerTable">
            <table id="tableClientes">


            </table>

            <div id="sinDatosTblClientes">

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

        $("#tableClientes").load("../../../controller/admin/cliente/cargarTabla.php", function() {

            var cliente = "<?php echo $cliente ?>";
            if (cliente !=="") {

                buscadorParametroCliente(cliente, ".tdCorreo", "correo-cliente");
            }
        });

    }

    liBorderBottom("listaClientes");

    openSubMenu("../../../img/btnFlechaAbajo.png", "../../../img/btnFlecha.png");


    $("#buscador").on("keydown", function() {

        buscadorCliente();

    });
</script>