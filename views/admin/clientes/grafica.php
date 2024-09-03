<?php

session_id("login");
session_start();
$usuario = $_SESSION['usuario'];
$genero = $_SESSION['genero'];

if (empty($usuario)) {

    header("location:../../views/loginAdmin.php");
} else {


    require("../../../model/claseCliente.php");
    require("../../../model/claseReservas.php");
    $claseCliente = new cliente();
    $claseReservas = new reservas();


    $allYearsVisitClients = $claseCliente->getAllYearsVisitClients();
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
    <script src="../../../js/scriptsAdmin.js" defer> </script>
    <script src="../../../js/scriptsClientes.js" defer> </script>

    <title>Admin-Clientes</title>
</head>

<body>

    <header>
        <nav id="navAdmin">
            <br>

            <img class="iconoMenu" src="../../../img/revision.png">
            <label class="lblTituloMenu">Sistema hotel</label>

            <br><br>

            <ul>
                <li id="liInicio">
                    <img src="../../../img/inicio.png">
                    <a href="../../admin/loginAdmin.php">Inicio</a>
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


    <nav id="menuOptionPane">

        <div class="title">
            <div>
                <h1>Clientes</h1>
            </div>
            <div>
                <img src="../../../img/clientesBanner.jpg">

            </div>
        </div>

        <ul>

            <li class="liGrafica">

                <div class="icon">
                    <img class="imgClientes" src="../../../img/grafica.png">
                </div>
                <div>
                    <a>Gráfica</a>
                </div>

            </li>
            <li>

                <div class="icon">
                    <img class="imgClientes" src="../../../img/listaClientes.png">
                </div>
                <div>
                    <a href="lista.php">Gestion</a>
                </div>
            </li>
            <li>

                <div class="icon">
                    <img class="imgClientes" src="../../../img/agregarCliente.png">
                </div>
                <div>
                    <a href="agregar.php">Agregar</a>
                </div>

            </li>
        </ul>
    </nav>

    </div>

    <br>
    <div id="viewGrafica">


        <div class="titleGraphicClients">

            <h4>Grafica Clientes</h4>
        </div>
        <div class="searchYear">
            <select>
                <?php

                if ($allYearsVisitClients)
                    foreach ($allYearsVisitClients as $year) {

                        foreach ($year as $value) {

                ?>

                        <option><?php echo $value ?></option>


                <?php

                        }
                    }
                ?>

            </select>
            <button class="btnGraphicClients">Graficar</button>
        </div>
        <div id="graficaClientes">

            <div class="sinDatos">

                <img src="../../../img/sinDatosGrafica.png">
                <br>
                <h2>No hay datos aun</h2>

            </div>
        </div>

    </div>


</body>

</html>