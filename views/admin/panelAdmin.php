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


    function getRoomsCategoryStatus($claseHabitaciones, $quantityCategoryRoom, $hoy, $status)
    {


        $roomsCategoryHotel = $claseHabitaciones->getAllHabitacionesCategoria($quantityCategoryRoom['categoryRoom']);

        $totalCategoryRoomsStatus= array_reduce($roomsCategoryHotel, function ($ac, $roomCategoryHotel)
        use ($claseHabitaciones, $hoy, $status) {

            $bookingsRoomStatus =[];
            $bookingsRoom = $claseHabitaciones->habitacionesReservadas($roomCategoryHotel['numHabitacion']);

            if ($status == "libre") {
                $bookingsRoomStatus = $claseHabitaciones->reservasHabitacionDisponible(
                    $roomCategoryHotel['numHabitacion'],
                    $hoy
                );

                if (empty($bookingsRoom) || count($bookingsRoomStatus) == count($bookingsRoom)) {

                    $ac++;
                }
            } else {

                $bookingsRoomStatus = $claseHabitaciones->reservasHabitacionOcupada(
                    $roomCategoryHotel['numHabitacion'],
                    $hoy
                );

                if (count($bookingsRoomStatus)>1) {

                    $ac++;
                }
            }
        

            return $ac;
        }, 0);


        return $totalCategoryRoomsStatus;
    }
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


    //datos para los panels de informacion 

    //habitaciones


    $quantityCategoryRooms = array_map(function ($categoryRoom) use ($claseHabitaciones) {

        $quantityCategory = count($claseHabitaciones->getAllHabitacionesCategoria($categoryRoom['categoria']));

        return array("categoryRoom" => $categoryRoom['categoria'], "quantity" => $quantityCategory);
    }, $claseHabitaciones->getAllCategoryRooms());

    $cantidadHabitacionesHotel = $claseHabitaciones->getCantidadHabitaciones();

    //ingresos

    $totalIngresos = $clasePago->calculateTotalIngresosAnio();

    $ingresosDelUlimoMes = $clasePago->calculateTotalIngresosMes(intval($mesActual), $anioActual);

    //reservas

    $cantReservasFinalizadas =  $claseReservas->getCantReservasFinalizadas($hoy);
    $cantReservasPendientes =  $claseReservas->getCantReservasPendientes($hoy);
    $cantReservasEnCurso =  $claseReservas->getCantReservasEnCurso($hoy);


    ?>



    <div id="containClienteAndGeneral">

        <div id="viewClientesDashboard">

            <div class="titleGraphic">
                <h3>Clientes <?php echo $anioActual ?></h3>
            </div>
            <br>

            <br>
            <div id="graficaClientesDashboard"></div>

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

                            <?php


                            foreach ($quantityCategoryRooms as $quantityCategoryRoom) {

                                $totalCategoryRoomsFrees = getRoomsCategoryStatus($claseHabitaciones, $quantityCategoryRoom, $hoy, "libre");

                            ?>
                                <div id="category">

                                    <span><?php echo $quantityCategoryRoom['categoryRoom'] . ":" . $totalCategoryRoomsFrees;
                                            ?></span>
                                </div>

                            <?php

                            }
                            ?>

                        </div>
                    </div>

                    <div id="ocupadas">

                        <span>Ocupadas</span>

                        <div id="cantHabitaciones">

                            <?php

                            foreach ($quantityCategoryRooms as $quantityCategoryRoom) {

                                $totalCategoryRoomsBusy = getRoomsCategoryStatus($claseHabitaciones, $quantityCategoryRoom, $hoy, "ocupada");

                            ?>
                                <div id="category">

                                    <span><?php echo $quantityCategoryRoom['categoryRoom'] . ":" . $totalCategoryRoomsBusy;
                                            ?></span>
                                </div>

                            <?php

                            }
                            ?>


                        </div>
                    </div>
                </div>

            </div>

            <div id="panelReservaAndGanancias">
                <div id="reservas">

                    <div id="title">

                        <span>Reservas <?php echo $anioActual ?></span>

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

                        <span>Ganancias <?php echo $anioActual ?></span>
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
        <div id="viewHabitacionesDashboard">

            <div class="titleGraphic">
                <h3>Categorias de habitaciones mas reservadas <?php echo $anioActual ?></h3>
            </div>
            <br>
            <div id="graficaHabitacionesDashboard"></div>

            <div id="containButtonHabitaciones">

                <a href="../admin/habitaciones/grafica.php"><button id="btnViewHabitaciones">Ver</button></a>
            </div>


            <div id="sinDatosGraficaHabitaciones">

                <h1>Sin datos aun</h1>
                <br>
                <img src="../../img/sinDatosGrafica.png">
            </div>
        </div>

        <div id="viewGananciasDashboard">

            <div class="titleGraphic"">

      <h3>Ganancias <?php echo $anioActual ?></h3>
      </div>

      <div id="graficaGananciasDashboard"></div>

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