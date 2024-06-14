<?php

session_id("login");
session_start();
$usuario = $_SESSION['usuario'];
$genero = $_SESSION['genero'];

if (empty($usuario)) {

    header("location:../../views/loginAdmin.php");
} else {


    require("../../../model/claseHabitaciones.php");
    require("../../../model/claseReservas.php");
    $claseHabitaciones = new habitaciones();
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
    <title>Admin-Habitaciones</title>
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


    <nav id="menuHabitaciones">

        <br>
        <h1>Clientes</h1>
        <br>
        <img src="../../../img/clientesBanner.jpg">

        <ul>

            <li class="liGrafica">
                <a>Gráfica</a>
                <img src="../../../img/grafica.png">
            </li>

            <li>
                <a href="">Habitaciones</a>
                <img class="imgHabitaciones" src="../../../img/habitacionesInfo.png">

            </li>
        </ul>
    </nav>

    </div>

    <br>
    <div id="viewGrafica">

     <h1></h1>
        <div id="graficaHabitaciones">


            <div class="sinDatos">

                <img src="../../../img/sinDatos.png">
                <br>
                <h2>No hay datos aun</h2>

            </div>
        </div>

    </div>

    <?php

    $habitacionesReservadas = $claseHabitaciones->getAllHabitacionesReservadas();
    $totalHabitaciones = $habitacionesReservadas->num_rows;

    if ($totalHabitaciones > 0) {

        $habitacionesReservadas = $claseHabitaciones->getAllHabitacionesReservadas();
        $habitacionesReservadas = $habitacionesReservadas->fetch_all(MYSQLI_ASSOC);

        $cantEstandar = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Estandar");
        $cantDeluxe = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Deluxe");
        $cantSuite = $claseHabitaciones->totalHabitacionesCategoriaReservadas($habitacionesReservadas, "Suite");

        $porcentajeEstandar = ($cantEstandar * 100) / $totalHabitaciones;
        $porcentajeDeluxe = ($cantDeluxe * 100) / $totalHabitaciones;
        $porcentajeSuite = ($cantSuite * 100) / $totalHabitaciones;
    }

    ?>

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
</body>

</html>

<script>
    liBorderBottom("grafica");


    openSubMenu("../../../img/btnFlechaAbajo.png", "../../../img/btnFlecha.png");

    dataPointsHabitacionesReservadas = [];

    <?php

    if (isset($porcentajeEstandar)) {
    ?>

        $("#sinDatos").css("display", "none");

        dataPointsHabitacionesReservadas.push({
                "y": "<?php echo $porcentajeEstandar ?>",
                "label": "Estandar"
            }, {
                "y": "<?php echo $porcentajeDeluxe ?>",
                "label": "Deluxe"

            }, {
                "y": "<?php echo  $porcentajeSuite ?>",
                "label": "Suite"

            }

        );
    <?php
    }

    ?>

    window.onload = function() {


        if(dataPointsHabitacionesReservadas.length>0){
      
            graficarHabitaciones(dataPointsHabitacionesReservadas, "graficaHabitaciones");

    }


    };
</script>