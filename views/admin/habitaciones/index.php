<?php

session_id("login");
session_start();
$usuario = $_SESSION['usuario'];

if (empty($usuario)) {

    header("location:../../loginAdmin");
} else {

    require("../../../model/claseUsuario.php");
    require("../../../model/claseCliente.php");
    $admin = new usuario();
    $claseCliente = new cliente();



    $adminUser = $admin->getAdminGenero($usuario);

    $datoAdminUser = $adminUser->fetch_array(MYSQLI_ASSOC);

    $genero = $datoAdminUser['genero'];
    $_SESSION['genero'] = $genero;
    $actualYear = date("Y");
}




?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../../estilos/styleRoomsAdmin/styleMain.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"> </script>
    <script type="module" src="../../../js/scriptsAdmin/scriptsAdmin.js" defer> </script>
    <script type="module" src="../../../js/scriptsRooms/dashboardScript.js" defer> </script>




    <title>Habitaciones</title>

<body>

    <div class="modalMainRooms">
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
                    <a href="../index.php">Inicio</a>
                </li>

                <li id="liClientes">
                    <img src="../../../img/clientes.png">
                    <a>Clientes</a>
                    <img class="btnFlecha" src="../../../img/btnFlecha.png">

                    <ul class="subMenu">

                        <li data-sub-url="grafica.html">

                            <img src="../../../img/grafica.png">
                            <a>Grafica</a>

                        </li>
                        <li data-sub-url="clientsTable.html">

                            <img src="../../../img/tablaClientes.png">
                            <a>Lista</a>

                        </li>
                        <li data-sub-url="addClient.html">

                            <img src="../../../img/agregarCliente.png">
                            <a>Agregar</a>
                        </li>

                    </ul>
                </li>
                <li id="liReserva">

                    <img src="../../../img/reserva.png">
                    <a>Reservas</a>
                    <img class="btnFlecha" src="../../../img/btnFlecha.png">


                    <ul class="subMenu">

                        <li data-sub-url="bookingsTable.html">

                            <img src="../../../img/reservas.png">
                            <a>Lista</a>

                        </li>
                        <li data-sub-url="addBooking.html" class="liCalendario">

                            <img src="../../../img/agregarReserva.png">
                            <a>Calendario</a>
                        </li>

                    </ul>


                </li>

                <li id="liHabitaciones">

                    <img id="iconoHabitaciones" src="../../../img/habitaciones.png">
                    <a id="textHabitaciones">Habitaciones</a>
                    <img class="btnFlecha" src="../../../img/btnFlecha.png">

                    <ul class="subMenu">

                        <li class="liGrafica">

                            <img src="../../../img/grafica.png">
                            <a>Grafica</a>

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

                <img class="iconoAdmin" data-genre="<?php echo $genero ?>">
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


    <div class="bodyRooms">


        <div class="menuBar">
            <div class="title">
                <h3>Habitaciones</h3>
                <img src="../../../img/keyCardTitle.png">
            </div>
            <nav>
                <ul>
                    <li class="chartLi">
                        <img src="../../../img/grafica.png">
                        <a>Grafica</a>
                    </li>
                    <li class="listLi">
                        <img src="../../../img/key-card.png">
                        <a>Lista</a>
                    </li>

                </ul>
            </nav>

        </div>

        <div class="option"></div>

    </div>


</body>

</html>