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

                    let statDate = new Date(info.startStr).getDate() + 1;
                    let monthDate = new Date(info.startStr).getMonth();
                    let yearDate = new Date(info.startStr).getFullYear();

                    if (statDate >= new Date().getDate() && monthDate + 1 >= new Date().getMonth() + 1 &&
                        yearDate >= new Date().getFullYear()) {
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
            <div class="titleNav">
                <img class="iconoMenu" src="../../../img/revision.png">
                <span>Sistema hotel</span>
            </div>

            <ul class="menu">
                <li id="liInicio">
                    <div class="item">
                        <div class="nameOption nameOptionHome">
                            <img src="../../../img/inicio.png">
                            <a>Inicio</a>
                        </div>
                    </div>
                </li>

                <li id="liClientes" class="optionMenu">
                    <div class="item">
                        <div class="nameOption">
                            <img src="../../../img/clientes.png">
                            <a>Clientes</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../../img/btnFlecha.png">
                    </div>

                    <ul class="subMenu" id="subMenuClients" style="display: none;">

                        <li data-sub-url="grafica.html">

                            <div>
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
                <li id="liReserva" class="optionMenu">

                    <div class="item">
                        <div class="nameOption">
                            <img src="../../../img/reserva.png">
                            <a>Reservas</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../../img/btnFlecha.png">
                    </div>


                    <ul class="subMenu" id="subMenuBookings" style="display: none;">

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

                <li id="liHabitaciones" class="optionMenu">

                    <div class="item">
                        <div class="nameOption">
                            <img id="iconoHabitaciones" src="../../../img/habitaciones.png">
                            <a id="textHabitaciones">Habitaciones</a>
                        </div>
                        <img class="btnDisplaySubMenu" src="../../../img/btnFlecha.png">
                    </div>

                    <ul class="subMenu" id="subMenuRooms" style="display: none;">

                        <li class="liGrafica" data-sub-url="grafica.html">

                            <img src="../../../img/pieChart.png">
                            <a>Grafica</a>

                        </li>

                        <li class="liHabitacion" data-sub-url="rooms.html">

                            <img src="../../../img/key-card.png">
                            <a>Lista</a>

                        </li>


                    </ul>
                </li>

                <li id="liGanancias" class="optionGanancias" class="optionMenu">
                    <div class="item">
                        <div class="nameOption">
                            <img src="../../../img/ganancias.png">
                            <a>Ganancias</a>
                        </div>
                    </div>

                </li>
            </ul>

            <div id="userAdmin">
                <ul class="subMenuProfile">
                    <li>
                        <img src="../../../img/configuracion.png">
                        <span>Editar</span>
                    </li>
                    <li class="logoutOption">
                        <img src="../../../img/apagar.png">
                        <span>Salir</span>
                    </li>
                </ul>
                <li class="profile"></li>
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