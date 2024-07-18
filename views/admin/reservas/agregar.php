<?php

session_id("login");
session_start();
$usuario = $_SESSION['usuario'];
$genero = $_SESSION['genero'];

if (empty($usuario)) {

    header("location:../../views/loginAdmin.php");
} else {

    require("../../../model/claseCliente.php");
    require("../../../model/claseHabitaciones.php");
    require("../../../model/claseReservas.php");
    $claseCliente = new cliente();
    $claseHabitaciones = new habitaciones();
    $claseReservas = new reservas();
}


?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../../estilos/styleReservas.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"> </script>

    <script src="../../../controller/admin/scriptsAdmin/funcionesAdmin.js"> </script>
    <script src="../../../controller/admin/scriptsReservas/funcionesReservas.js"> </script>


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
                            <a href="lista.php">Lista</a>

                        </li>
                        <li class="liCalendario">

                            <img src="../../../img/agregarReserva.png">
                            <a>Calendario</a>
                        </li>


                        <li class="liHabitacion">

                            <img src="../../../img/habitacionesReserva.png">
                            <a href="habitaciones.php">Habitaciones</a>

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


    <nav id="menuReservas">

        <br>
        <h1>Reservas</h1>
        <img id="iconoTitle" src="../../../img/reservasBanner.png">

        <ul>

            <li class="liListaReservas">
                <img class="imgReservas" src="../../../img/reservas.png">
                <br>
                <a href="lista.php">Lista</a>

            </li>
            <li class="liAgregarReserva">
                <img class="imgAgregarReserva" src="../../../img/agregarReserva.png">
                <br>
                <a href="agregar.php">Calendario</a>
            </li>

            <li>
                <img class="imgHabitacionReserva" src="../../../img/habitacionesReserva.png">
                <br>
                <a href="habitaciones.php">Habitaciones</a>

            </li>
        </ul>
    </nav>

    </div>

    <br>

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
    <br>

    <?php
    ?>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.13/index.global.min.js'></script>

    <div id="modal">


    </div>

    <div id="containerCalendar">

        <div id="calendarAdd"></div>


        <div id="referenceBookingEnd">

            <label>Reserva finalizada</label>
        </div>


        <div id="referenceBookingStart">

            <label>Reserva Pendiente</label>
        </div>

    </div>

    <div class="divOpcion">

    </div>


    <?php

    $reservas = $claseReservas->getAllReservas();

    $reservas = $reservas->fetch_all(MYSQLI_ASSOC);


    $bookingsInfo = array_map(function ($reserva) use ($claseCliente) {

        $cliente = $claseCliente->getClienteUpdate($reserva['idClienteReserva']);
        $clienteCorreo =  $cliente['correo'];
        $clienteNombre = $cliente['nombre'];
        $clienteApellido = $cliente['apellido'];



        return [
            "idReserva" => $reserva['idReserva'],
            "fechaLlegada" => $reserva['fechaLlegada'],
            "fechaSalida" => $reserva['fechaSalida'],
            "nombreCliente" => $clienteNombre,
            "apellidoCliente" => $clienteApellido,
            "correoCliente" => $clienteCorreo

        ];
    }, $reservas);

    ?>

</body>

</html>

<script>
  
  openSubMenu("http://localhost/sistema%20Hotel/img/btnFlechaAbajo.png", "http://localhost/sistema%20Hotel/img/btnFlecha.png");

    liBorderBottom("agregarReserva");

    const changeEventColor = (finReserva) => {


        let hoy = new Date();
        let salida = new Date(finReserva);

        if (salida > hoy) {

            //azul
            return "#329DBF";
        } else {

            //rojo
            return "#F04141";
        }


    }



    window.onload = function() {

        let reservas = [];
        let events = [];
        let reserva, numReserva, llegada, salida, clienteNombre, clienteCorreo, clienteApellido;

        reservas = <?php echo json_encode($bookingsInfo) ?>;

        events = reservas.map((reserva) => {


            numReserva = reserva.idReserva;
            llegada = reserva.fechaLlegada;
            salida = reserva.fechaSalida;
            clienteNombre = reserva.nombreCliente;
            clienteCorreo = reserva.correoCliente;
            clienteApellido = reserva.apellidoCliente;

            reserva = {
                id: numReserva,
                title: `Reserva: ${numReserva}`,
                start: llegada,
                end: salida,
                extendedProps: {
                    clienteCorreo: clienteCorreo,
                    clienteNombre: clienteNombre,
                    clienteApellido: clienteApellido
                },
                backgroundColor: changeEventColor(salida),
                borderColor: changeEventColor(salida),

            }



            return reserva;
        });

        let calendarAdd = document.getElementById("calendarAdd");

        cargarCalendarioAddEvent(calendarAdd, events);

    }
</script>