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

    //traer clientes
    $mesesConsulta = array(
        "1", "2", "3", "4", "5", "6", "7",
        "8", "9", "10", "11", "12"
    );
    $mesesClientes = [];

    $mesesClientes = array_map(function ($mes) use ($claseReservas) {

        $cantClientes = $claseReservas->getClientesReservas($mes);

        $mesCliente = array("mes" => $mes, "cantClientes" => $cantClientes);

        return $mesCliente;
    }, $mesesConsulta);
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


    <nav id="menuCliente">

        <br>
        <h1>Clientes</h1>
        <img src="../../../img/clientesBanner.jpg">

        <ul>

            <li class="liGrafica">

                <img class="imgClientes" src="../../../img/grafica.png">
                <br>
                <a>Gráfica</a>

            </li>
            <li>

                <img class="imgClientes" src="../../../img/listaClientes.png">
                <br>
                <a href="lista.php">Gestion</a>

            </li>
            <li>

                <img class="imgClientes" src="../../../img/agregarCliente.png">
                <br>
                <a href="agregar.php">Agregar</a>


            </li>
        </ul>
    </nav>

    </div>

    <br>
    <div id="viewGrafica" data-meses-clientes='<?php echo json_encode($mesesClientes)?>'>


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