<?php

session_id("login");
session_start();
$usuario = $_SESSION['usuario'];

if (empty($usuario)) {

    header("location:loginAdmin.php");
} else {

    require("../../model/claseAdmin.php");
    require("../../model/claseHabitaciones.php");
    $admin = new admin();
    $claseHabitaciones = new habitaciones;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../estilos/styleAdmin.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"> </script>
    <script src="../../controller/admin/scriptsAdmin/funcionesAdmin.js"> </script>
    <script src="../../alertas/alertas.js"></script>

    <title>Admin</title>

<body>

    <header>
        <nav id="navAdmin">
            <br>

            <img class="iconoMenu" src="../../img/revision.png">
            <label class="lblTituloMenu">Sistema hotel</label>

            <br><br>

            <ul>
                <li id="liInicio">
                    <img src="../../img/inicio.png">
                    <a>Inicio</a>
                </li>

                <li id="liClientes">
                    <img src="../../img/clientes.png">
                    <a>Clientes</a>
                    <img class="btnFlecha" src="../../img/btnFlecha.png">

                    <ul class="subMenu">

                        <li>

                            <img src="../../img/grafica.png">
                            <a href="clientes/grafica.php">Grafica</a>

                        </li>
                        <li>

                            <img src="../../img/tablaClientes.png">
                            <a href="clientes/lista.php">Lista</a>

                        </li>
                        <li>

                            <img src="../../img/agregarCliente.png">
                            <a href="clientes/agregar.php">Agregar</a>
                        </li>

                    </ul>
                </li>
                <li id="liReserva">

                    <img src="../../img/reserva.png">
                    <a>Reservas</a>
                    <img class="btnFlecha" src="../../img/btnFlecha.png">


                    <ul class="subMenu">

                        <li>

                            <img src="../../img/reservas.png">
                            <a href="../../views/admin/reservas/lista.php">Lista</a>

                        </li>
                        <li class="liCalendario">

                            <img src="../../img/agregarReserva.png">
                            <a href="../../views/admin/reservas/agregar.php">Calendario</a>
                        </li>


                        <li class="liHabitacion">

                            <img src="../../img/habitacionesReserva.png">
                            <a href="../../views/admin/reservas/habitaciones.php">Habitaciones</a>

                        </li>


                    </ul>


                </li>

                <li id="liHabitaciones">

                    <img id="iconoHabitaciones" src="../../img/habitaciones.png">
                    <a id="textHabitaciones">Habitaciones</a>
                    <img class="btnFlecha" src="../../img/btnFlecha.png">

                    <ul class="subMenu">

                        <li class="liGrafica">

                            <img src="../../img/grafica.png">
                            <a href="../../views/admin/habitaciones/grafica.php">Grafica</a>

                        </li>

                        <li class="liHabitacion">

                            <img  src="../../img/key-card.png">
                            <a href="../../views/admin/habitaciones/habitaciones.php">Lista</a>

                        </li>


                    </ul>
                </li>



                <li id="liGanancias" class="optionGanancias">
                    <img src="../../img/ganancias.png">
                    <a>Ganancias</a>

                </li>
            </ul>

            <div id="userAdmin">

                <img class="iconoAdmin">
                <label><?php echo $usuario ?></label>
                <img class="btnFlecha" src="../../img/btnFlecha.png">

                <ul class="subMenuAdmin">


                    <li>
                        <img src="../../img/configuracion.png">
                        <a>Editar</a>

                    </li>

                    <a href="../../controller/admin/cerrarSesion.php">
                        <li>

                            <img src="../../img/apagar.png">
                            <a class="logout">Log out</a>
                        </li>
                    </a>
                </ul>
            </div>
        </nav>

    </header>


    <?php



    $adminUser = $admin->getAdminGenero($usuario);

    $datoAdminUser = $adminUser->fetch_array(MYSQLI_ASSOC);

    $genero = $datoAdminUser['genero'];
    $_SESSION['genero'] = $genero;

    if ($genero == "M") {

    ?>


        <script>
            setImg("../../img/adminBannerM.jpg", "../../img/perfilM.png");
        </script>



    <?php
    } else {

    ?>

        <script>
            setImg("../../img/adminBannerF.jpg", "../../img/perfilF.png");
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

        $cantClientes = $clientes = $admin->getClientesReservas($mes);

        $mesCliente = array("mes" => $mes, "cantClientes" => $cantClientes);
        array_push($mesesClientes, $mesCliente);
    }



    //traer habitaciones

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



    <div id="viewClientes">

        <div class="titleGraphic">
        <h3>Clientes por mes</h3>
        </div>
        <br>

        <br>
        <div id="graficaClientes"></div>
        <a href="clientes/grafica.php">
            <button id="btnViewClientes">View</button></a>

        <div id="sinDatosGraficaClientes">

            <h1>Sin datos aun</h1>
            <br>
            <img src="../../img/sinDatosGrafica.png">
        </div>
    </div>

    <div id="viewHabitaciones">

        <div class="titleGraphic">
        <h3>Categorias de habitaciones mas reservadas</h3>
        </div>
        <br>
        <div id="graficaHabitaciones"></div>
        <a href="../admin/habitaciones/grafica.php"><button id="btnViewHabitaciones">View</button></a>

        <div id="sinDatosGraficaHabitaciones">

            <h1>Sin datos aun</h1>
            <br>
            <img src="../../img/sinDatosGrafica.png">
        </div>
    </div>




</body>

</html>

<script>
    openSubMenu("http://localhost/sistema%20Hotel/img/btnFlechaAbajo.png", "http://localhost/sistema%20Hotel/img/btnFlecha.png");

    //Grafica clientes

    var mesesClientes = JSON.parse('<?php echo json_encode($mesesClientes) ?>');

    let sumaClientes = mesesClientes.reduce((ac, element) => {

        return ac + element.cantClientes + element.cantClientes;

    }, 0);

    dataPointsClientes = [];
    if (sumaClientes > 0) {

        $("#btnViewClientes").css("display", "block");
        $("#sinDatosGraficaClientes").css("display", "none");

        var mes = 0;
        var cantClientes = 0

        for (var f = 0; f < mesesClientes.length; f++) {

            var mes = mesesClientes[f].mes;

            var cantClientes = mesesClientes[f].cantClientes;

            var mesPalabra = getMes(mes);

            dataPointsClientes.push({
                "label": mesPalabra,
                "y": cantClientes
            });
        }
    }


    //grafica habitaciones

    dataPointsHabitacionesReservadas = [];

    <?php

    if (isset($porcentajeEstandar)) {
    ?>

        $("#btnViewHabitaciones").css("display", "block");
        $("#sinDatosGraficaHabitaciones").css("display", "none");

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


        if (dataPointsClientes.length > 0) {
            graficar(dataPointsClientes, "graficaClientes", "", "light2");
            $("#navAdmin").css("marginTop", "-22px");

        }



        if (dataPointsHabitacionesReservadas.length > 0) {

            graficarHabitaciones(dataPointsHabitacionesReservadas, "graficaHabitaciones","");

        }


    };
</script>