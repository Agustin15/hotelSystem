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
                            <a href="../habitaciones/habitaciones.php">Lista</a>

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
    <div id="viewGrafica">


        <div id="graficaClientes">


            <div class="sinDatos">

                <img src="../../../img/sinDatosGrafica.png">
                <br>
                <h2>No hay datos aun</h2>

            </div>
        </div>

    </div>


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
    //traer clientes
    $mesesConsulta = array(
        "1", "2", "3", "4", "5", "6", "7",
        "8", "9", "10", "11", "12"
    );
    $mesesClientes = [];

    foreach ($mesesConsulta as $mes) {

        $cantClientes = $clientes = $claseReservas->getClientesReservas($mes);

        $mesCliente = array("mes" => $mes, "cantClientes" => $cantClientes);
        array_push($mesesClientes, $mesCliente);
    }

    ?>
</body>

</html>

<script>
    liBorderBottom("grafica");


    openSubMenu("http://localhost/sistema%20Hotel/img/btnFlechaAbajo.png", "http://localhost/sistema%20Hotel/img/btnFlecha.png");


    var mesesClientes = JSON.parse('<?php echo json_encode($mesesClientes) ?>');

    var mes = 0;
    var cantClientes = 0
    dataPointsClientes = [];


    for (var f = 0; f < mesesClientes.length; f++) {

        var mes = mesesClientes[f].mes;

        var cantClientes = mesesClientes[f].cantClientes;

        var mesPalabra = getMes(mes);

        dataPointsClientes.push({
            "label": mesPalabra,
            "y": cantClientes
        });
    }


    window.onload = function() {

        let sumClientes = dataPointsClientes.reduce((ac, element) => {

            return ac + element.y + element.y

        }, 0);

        if (sumClientes > 0) {
            graficar(dataPointsClientes, "graficaClientes", "Clientes por mes", "light2");
        } else {

            $(".sinDatos").css("display", "block");
        }
    }
</script>