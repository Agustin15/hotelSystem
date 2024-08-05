<?php

session_id("login");
session_start();
$usuario = $_SESSION['usuario'];
$genero = $_SESSION['genero'];

if (empty($usuario)) {

    header("location:../../views/loginAdmin.php");
} else {

    require("../../../model/claseReservas.php");
    require("../../../model/claseHabitaciones.php");
    require("../../../model/claseCliente.php");
    $claseHabitacion = new habitaciones();
    $claseClientes = new cliente();
    $claseReservas = new reservas();
    date_default_timezone_set('America/Argentina/Buenos_Aires');

    $hoy = strtotime(date("Y-m-d"));

 
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
    <script src="../../../js/scriptsAdmin.js" defer> </script>
    <script src="../../../js/scriptsHabitaciones.js" defer> </script>

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
                <a href="habitacionesDeluxe.php">Deluxe</a>
            </li>
            <li class="liSuite">
                <img src="../../../img/suiteIcon.png">
                <br>
                <a href="habitacionesSuite.php">Suite</a>
            </li>
        </ul>
    </nav>


    <br>
    <br>


    <div id="habitaciones">


        <div id="avisoHabitacion">

            <br>
            <img src="">
            <label></label>

        </div>


        <div class="cargarHabitacionesEstandar">

            <div id="estandar">

                <br>

                <h1>Habitaciones Estandar</h1>
                <form id="formEstandar">
                    <br>
                    <label>Numero de habitacion</label>
                    <input id="numHabitacion" min="1" type="number">
                    <img id="iconSearch" src="../../../img/searchBooking.png">
                </form>


                <div id="alert">

                    <div id="bodyAlert">
                        <div id="imgAlert">
                            <img src="../../../img/advertenciaService.png">
                        </div>
                        <div id="spanAlert">
                            <span>No puedes acceder a servicios de una habitacion que no tiene una reserva en curso</span>
                        </div>
                        <div id="containButton">
                            <button id="closeAlertBtn">Ok</button>
                        </div>

                    </div>
                </div>



                <ul id="habitacionesEstandar">

                    <?php



                    $habitaciones =  $claseHabitacion->getAllHabitacionesCategoria("Estandar");

                    foreach ($habitaciones as $habitacion) {



                        $habitacionesReservadas =  $claseHabitacion->habitacionesReservadas($habitacion['numHabitacion']);
                        $habitacionMasCercana = $claseHabitacion->habitacionMasCercana($habitacion['numHabitacion']);
                        $llegadaReservadaMasCercana = null;
                        $salidaReservadaMasCercana = null;

                        if (!empty($habitacionMasCercana)) {
                            $llegadaReservadaMasCercana = $habitacionMasCercana['fechaLlegadaHabitacion'];
                            $salidaReservadaMasCercana = $habitacionMasCercana['fechaSalidaHabitacion'];
                        }

                    ?>

                        <li class="liHabitacion" data-hoy="<?php echo $hoy ?>" data-habitacion="<?php echo $habitacion['numHabitacion'] ?> " data-llegada-cercana="<?php echo strtotime($llegadaReservadaMasCercana); ?>" data-salida-cercana="<?php echo strtotime($salidaReservadaMasCercana) ?>">

                            <div>
                                <img class="iconoPlus" title="Opciones" src="../../../img/menuHabitacion.png">

                            </div>

                            <div class="containIconRoomAndNumb">
                                <div>
                                    <img src="../../../img/bannerHab1.jpg">

                                </div>

                                <div>
                                    <h4>Habitacion <?php echo $habitacion['numHabitacion'] ?></h4>

                                </div>
                            </div>
                            <?php

                            if (empty($habitacionesReservadas)) {

                            ?>

                                <div class="containSinReserva">
                                    <div class="lblLibre">
                                        <label>Libre</label>

                                    </div>
                                    <div class="sinReservaEnCurso">

                                        <div>
                                            <img src="../../../img/libreDeReservas.png">
                                        </div>
                                        <div class="message">
                                            <h4>Sin reserva en curso</h4>
                                        </div>
                                    </div>

                                </div>


                                <?php

                            } else {

                                if (

                                    strtotime($habitacionMasCercana['fechaLlegadaHabitacion']) <= $hoy &&
                                    strtotime($habitacionMasCercana['fechaSalidaHabitacion']) >= $hoy
                                ) {

                                    $cliente = $claseClientes->getClienteUpdate($habitacionMasCercana['idClienteHabitacion']);

                                ?>

                                    <div class="dataBookingRoom">

                                        <div class="containBooking">
                                            <div class="lblOcupada">
                                                <label>Ocupada</label>
                                            </div>
                                            <div class="lblNumReserva">
                                                <label>Reserva</label>
                                            </div>
                                            <div class="lblReserva">

                                                <label><a href="../reservas/lista.php?idReserva=<?php echo $habitacionMasCercana['idReservaHabitacion'] ?>">
                                                        <?php echo $habitacionMasCercana['idReservaHabitacion'] ?></a>
                                                </label>
                                            </div>


                                        </div>


                                        <div class="infoHuesped">

                                            <div class="containIconAndLbl">
                                                <div>
                                                    <img src="../../../img/iconHuesped.png">

                                                </div>

                                                <div class="lblHuesped">
                                                    <label>Huesped</label>
                                                </div>
                                            </div>
                                            <div class="lblCliente">
                                                <label><a href="../clientes/lista.php?cliente=<?php echo $cliente['correo'] ?>">
                                                        <?php echo $cliente['correo'] ?></a></label>
                                            </div>
                                        </div>

                                    </div>

                                <?php


                                } else {
                                ?>

                                    <div class="containSinReserva">
                                        <div class="lblLibre">
                                            <label>Libre</label>

                                        </div>
                                        <div class="sinReservaEnCurso">

                                            <div>
                                                <img src="../../../img/libreDeReservas.png">
                                            </div>
                                            <div class="message">
                                                <h4>Sin reserva en curso</h4>
                                            </div>
                                        </div>

                                    </div>

                            <?php


                                }
                            }
                            ?>



                        </li>


                    <?php

                    }


                    ?>



                    <div id="sinDatosHabitaciones">

                        <h1>Habitacion no encontrada</h1>
                        <br>
                        <img src="../../../img/advertenciaClientes.png">

                    </div>
                </ul>
            </div>





        </div>
    </div>


    <div id="divOpcion">

        <div>


            <div id="divMiniBar">

                <div>
</body>

</html>