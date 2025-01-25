<?php

$actualYear = date("Y");

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../../estilos/styleReservasAdmin/styleMain.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script type="module" src="../../../js/scriptsAdmin/scriptsAdmin.js" defer> </script>
    <script type="module" src="../../../js/scriptsReservas/scriptReserva.js" defer> </script>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'></script>

    <script defer type="module">
        import {
            actualOptionBooking,
            actualOption,
            markActualOption,
            optionAddLi
        } from "../../../js/scriptsReservas/scriptReserva.js";

        import {
            createEventsCalendar,
            optionsAddBooking
        } from "../../../js/scriptsReservas/scriptOptionsCalendar.js";


        if (actualOption == "addBooking.html") {
            localStorage.setItem("actualOptionBooking", "addBooking.html");
            await actualOptionBooking(actualOption);
            let mainCalendar = document.querySelector("#mainCalendar");
            markActualOption(optionAddLi);
            let eventsBooking = await createEventsCalendar();

            let searchParamsUrl = new URLSearchParams(window.location.search);
            let bookingData;
            if (searchParamsUrl.get("booking")) {
                bookingData = JSON.parse(searchParamsUrl.get("booking"));

                eventsBooking = eventsBooking.map(event => {
                    if (event.idBooking == bookingData.idBooking) {
                        event.title = `Reserva ${event.idBooking} seleccionada`;
                    }
                    return event;
                });
            }

            let calendar = new FullCalendar.Calendar(mainCalendar, {
                initialView: 'dayGridMonth',
                selectable: true,
                events: eventsBooking || [],
                customButtons: {
                    buttonViewMonths: {
                        text: 'Vista meses',
                        click: function() {
                            calendar.changeView('multiMonthYear');
                        }
                    },
                    buttonViewOneMonth: {
                        text: "Vista mes",
                        click: () => {
                            calendar.changeView("dayGridMonth");
                        }
                    },
                    buttonToday: {
                        text: "Hoy",
                        click: () => {
                            calendar.today();
                        },

                    },

                },

                headerToolbar: {
                    left: 'title',
                    right: 'buttonViewMonths buttonViewOneMonth buttonToday prev,next',
                },
                select: (info) => {
                    if (new Date(info.startStr) >= new Date()) {
                        optionsAddBooking(info.startStr, info.endStr);

                    }
                },
                eventClick: function(info) {
                    let idBooking = info.event.extendedProps.idBooking;

                    localStorage.setItem("actualOptionBooking", "bookingsTable.html");
                    location.href = `http://localhost/sistema%20Hotel/views/admin/reservas/index.php?idBooking=${idBooking}`;
                }

            });

            calendar.setOption('locale', 'uy');
            calendar.render();

            if (bookingData) {
                calendar.gotoDate(bookingData.startBooking);
            }


        }
    </script>
    <title>Reservas</title>
</head>

<body>

    <div class="modalMainBookings">
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

                        <li class="liGrafica" data-sub-url="grafica.html">

                            <img src="../../../img/grafica.png">
                            <a>Grafica</a>

                        </li>

                        <li class="liHabitacion" data-sub-url="rooms.html">

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

                    <a>
                        <li class="logoutOption">

                            <img src="../../../img/apagar.png">
                            <a class="logout">Log out</a>
                        </li>
                    </a>
                </ul>
            </div>
        </nav>

    </header>


    <div class="bodyBookings">


        <div class="menuBar">
            <div class="title">
                <h3>Reservas</h3>
                <img src="../../../img/reservaId.png">
            </div>
            <nav>
                <ul>
                    <li class="listLi">
                        <img src="../../../img/reservas.png">
                        <a>Lista</a>
                    </li>
                    <li class="addLi">
                        <img src="../../../img/agregarReserva.png">
                        <a>Agregar</a>
                    </li>
                </ul>
            </nav>

        </div>

        <div class="option"></div>

    </div>


</body>

</html>