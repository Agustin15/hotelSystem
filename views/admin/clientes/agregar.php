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
    <script src="../../../js/scriptsClientes/scriptsAgregarCliente.js" defer> </script>

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
                            <a>Agregar</a>
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


    <div class="modalAdd">

        <div class="alertAddClient">

            <img src="">
            <p></p>

            <button>OK</button>

        </div>
    </div>

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
                    <a href="grafica.php">Gráfica</a>
                </div>

            </li>
            <li class="liLista">
                <div class="icon">
                    <img class="imgClientes" src="../../../img/listaClientes.png">
                </div>
                <div>
                    <a href="lista.php">Gestion</a>
                </div>

            </li>
            <li class="liAgregar">

                <div class="icon">
                    <img class="imgClientes" src="../../../img/agregarCliente.png">
                </div>
                <div>
                    <a>Agregar</a>
                </div>

            </li>
        </ul>
    </nav>

    </div>


    <form id="formAgregar">

        <img class="imgAgregar" src="../../../img/agregarCliente.png">
        <br>
        <h1>Agregar Cliente</h1>


        <div class="row1">
            <div class="name">
                <label for="inputName">Nombre</label>
                <input type="text" id="inputName" name="name" placeholder="Ingresa nombre" autocomplete="off">

            </div>

            <div class="lastName">
                <label for="inputLastName">Apellido</label>
                <input type="text" id="inputLastName" placeholder="Ingresa apellido" name="lastName" autocomplete="off">

            </div>

        </div>

        <div class="row2">
            <div class="mail">
                <label for="inputMail">Correo</label>
                <input type="mail" id="inputMail" name="mail" placeholder="Ingresa correo" autocomplete="off">

            </div>

            <div class="phone">
                <label for="inputPhone">Phone</label>
                <input type="text" id="inputPhone" maxlength="9" name="phone"
                    placeholder="Ingresa telefono" autocomplete="off" onpaste="return false"
                    oninput="replaceCharacter(event)">

            </div>

        </div>


        <br>

        <button type="submit">

            Agregar
            <img class="spinnerLoad" src="../../../img/spinner.gif">

        </button>

        <div class="alertFormClient">

            <div class="contain">
                <div class="header">
                    <img src="../../../img/advertencia.png">
                    <span>Advertencia</span>
                </div>
                <p></p>
                <div class="progressBar">
                    <div class="bar">
                    </div>
                </div>
            </div>
        </div>

    </form>
    <br>


</body>

</html>