<?php

session_id("login");
session_start();
$usuario = $_SESSION['usuario'];

if (empty($usuario)) {

    header("location:loginAdmin.php");
} else {

    require("../../model/claseUsuario.php");
    require("../../model/claseHabitaciones.php");
    require("../../model/clasePago.php");
    require("../../model/claseReservas.php");
    require("../../model/claseCliente.php");

    $admin = new usuario();
    $claseHabitaciones = new habitaciones;
    $clasePago = new pago();
    $claseReservas = new reservas();
    $claseCliente = new cliente();

    

    $adminUser = $admin->getAdminGenero($usuario);

    $datoAdminUser = $adminUser->fetch_array(MYSQLI_ASSOC);
    
    $genero = $datoAdminUser['genero'];
    $_SESSION['genero'] = $genero;
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
    <script src="../../js/scriptsAdmin.js" defer> </script>
    <script src="../../js/alertas.js" defer></script>

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

                            <img src="../../img/key-card.png">
                            <a href="../../views/admin/habitaciones/habitacionesEstandar.php">Lista</a>

                        </li>


                    </ul>
                </li>



                <li id="liGanancias" class="optionGanancias">
                    <img src="../../img/ganancias.png">
                    <a>Ganancias</a>

                </li>
            </ul>

            <div id="userAdmin">

                <img class="iconoAdmin" data-genre="<?php echo $genero ?>">
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

    $mesActual = date("m");
    $anioActual = date("Y");
    $hoy = date("Y-m-d");

    //datos para graficas

    //traer clientes
    $mesesConsulta = array(
        "1", "2", "3", "4", "5", "6", "7",
        "8", "9", "10", "11", "12"
    );
    $mesesClientes = [];

    $mesesClientes =  array_map(function ($mes) use ($claseCliente, $anioActual) {

        $cantClientes =  $claseCliente->getClientesReservas($mes, $anioActual);

        $mesCliente = array("mes" => $mes, "cantClientes" => $cantClientes);

        return $mesCliente;
    }, $mesesConsulta);





    //traer habitaciones


    $habitacionesReservadas = $claseHabitaciones->getAllHabitacionesReservadas();
    $totalHabitaciones = $habitacionesReservadas->num_rows;

    $cantEstandar = 0;
    $cantDeluxe = 0;
    $cantSuite = 0;
    $porcentajeEstandar = null;
    $porcentajeDeluxe = null;
    $porcentajeSuite = null;

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


    //traer ganancias por mes

    $gananciasPorMes = [];
    $gananciasPorMes = array_map(function ($mes) use ($clasePago, $anioActual) {


        $totalIngresosMes = $clasePago->calculateTotalIngresosMes($mes, $anioActual);

        $totalGananciasMes = array("mes" => $mes, "ganancias" => $totalIngresosMes);

        return $totalGananciasMes;
    }, $mesesConsulta);


    //datos para los panels de informacion 

    //habitaciones

    $totalEstandarHotel = count($claseHabitaciones->getAllHabitacionesCategoria("Estandar"));
    $totalDeluxeHotel = count($claseHabitaciones->getAllHabitacionesCategoria("Deluxe"));
    $totalSuiteHotel = count($claseHabitaciones->getAllHabitacionesCategoria("Suite"));

    $cantidadHabitacionesHotel = $claseHabitaciones->getCantidadHabitaciones();

    //ingresos

    $totalIngresos = $clasePago->calculateTotalIngresos();

    $ingresosDelUlimoMes = $clasePago->calculateTotalIngresosMes(intval($mesActual), $anioActual);

    //reservas


    $cantReservasFinalizadas =  $claseReservas->getCantReservasFinalizadas($hoy);
    $cantReservasPendientes =  $claseReservas->getCantReservasPendientes($hoy);
    $cantReservasEnCurso =  $claseReservas->getCantReservasEnCurso($hoy);


    ?>



    <div id="containClienteAndGeneral">

        <div id="viewClientes" data-meses-clientes='<?php echo json_encode($mesesClientes) ?>'>

            <div class="titleGraphic">
                <h3>Clientes <?php echo $anioActual ?></h3>
            </div>
            <br>

            <br>
            <div id="graficaClientes"></div>

            <div id="containButtonClientes">

                <a href="clientes/grafica.php"> <button>Ver</button></a>
            </div>

            <div id="sinDatosGraficaClientes">

                <h1>Sin datos aun</h1>
                <br>
                <img src="../../img/sinDatosGrafica.png">
            </div>
        </div>

        <div id="dataGeneral">

            <div id="dataHabitaciones">

                <div id="title">

                    <span>Habitaciones</span>
                </div>
                <div id="total">

                    <span>Totales:<?php echo $cantidadHabitacionesHotel ?></span>
                </div>


                <div id="stateRooms">

                    <div id="libres">

                        <span>Libres</span>

                        <div id="cantHabitaciones">

                            <div id="estandar">

                                <span>Estandar:<?php echo ($totalEstandarHotel - $cantEstandar) ?></span>
                            </div>

                            <div id="deluxe">

                                <span>Deluxe:<?php echo ($totalDeluxeHotel - $cantDeluxe) ?></span>
                            </div>

                            <div id="suite">

                                <span>Suite:<?php echo ($totalSuiteHotel - $cantSuite) ?></span>
                            </div>
                        </div>
                    </div>

                    <div id="ocupadas">

                        <span>Ocupadas</span>

                        <div id="cantHabitaciones">

                            <div id="estandar">

                                <span>Estandar:<?php echo $cantEstandar ?></span>
                            </div>

                            <div id="deluxe">

                                <span>Deluxe:<?php echo $cantDeluxe ?></span>
                            </div>

                            <div id="suite">

                                <span>Suite:<?php echo $cantSuite ?></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div id="panelReservaAndGanancias">
                <div id="reservas">

                    <div id="title">

                        <span>Reservas</span>

                    </div>


                    <div id="antiguas">


                        <span>Finalizadas:<?php echo $cantReservasFinalizadas ?></span>
                    </div>
                    <div id="enCurso">


                        <span>En curso:<?php echo $cantReservasEnCurso ?></span>
                    </div>

                    <div id="pendientes">


                        <span>Pendientes:<?php echo $cantReservasPendientes ?></span>
                    </div>


                </div>

                <div id="ganancias">

                    <div id="title">

                        <span>Ganancias</span>
                    </div>

                    <div id="total">

                        <span>Totales:$<?php echo $totalIngresos ?></span>
                    </div>

                    <div id="ultimoMes">

                        <span>Del ultimo mes</span>
                    </div>

                    <div id="ingresosUltimoMes">

                        <span>$<?php echo $ingresosDelUlimoMes ?></span>
                    </div>

                </div>
            </div>


        </div>
    </div>

    </div>

    <div id="containViewHabitacionAndGananacias">
        <div id="viewHabitaciones" data-porcentaje-estandar=<?php echo $porcentajeEstandar ?> data-porcentaje-deluxe=<?php echo $porcentajeDeluxe ?> data-porcentaje-suite=<?php echo $porcentajeSuite ?>>

            <div class="titleGraphic">
                <h3>Categorias de habitaciones mas reservadas</h3>
            </div>
            <br>
            <div id="graficaHabitaciones"></div>

            <div id="containButtonHabitaciones">

                <a href="../admin/habitaciones/grafica.php"><button id="btnViewHabitaciones">Ver</button></a>
            </div>


            <div id="sinDatosGraficaHabitaciones">

                <h1>Sin datos aun</h1>
                <br>
                <img src="../../img/sinDatosGrafica.png">
            </div>
        </div>

        <div id="viewGanancias" data-ganancias-mes='<?php echo json_encode($gananciasPorMes)?>'>

            <div class="titleGraphic"">

      <h3>Ganancias <?php echo $anioActual ?></h3>
      </div>

      <div id="graficaGanancias"></div>

            <div id="containButtonGanancias">

                <button>Ver</button>
            </div>


            <div id="sinDatosGraficaGanancias">

                <h1>Sin datos aun</h1>
                <br>
                <img src="../../img/sinDatosGrafica.png">
            </div>
        </div>
    </div>

    <br>


</body>

</html>