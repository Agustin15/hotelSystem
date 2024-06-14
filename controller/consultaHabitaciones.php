<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../estilos/styleHabitaciones.css">


    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>


    <script src="../alertas/alertas.js"></script>


    <title>Reserva</title>


</head>

<body>


    <header>

        <div id="logo">
            <img src="../img/revision.png" width="50px">
            <h1>Sistema Hotel</h1>
        </div>


        <ul>

            <li><a href="../views/index.html">Inicio</a></li>
            <li><a href="../views/habitaciones.html">Habitaciones</a></li>
            <li><a href="../views/index.html #sobreNosotros">Sobre nosotros</a></li>
            <li><a href="../views/index.html #contacto">Contacto</a></li>


        </ul>


        <ul class="redes">
            <li><img src="../img/instagram.png"></li>
            <li><img src="../img/facebook.png"></li>
            <li><img src="../img/whatsapp.png"></li>

        </ul>
    </header>


    <div class="avisoCompleteDatos">

        <img class="imgAvisoMsj" src="../img/avisoHuespedes.png">

        <label></label>

    </div>

    <form id="checkIn" method="POST">

        <br>


        <h1>Check-in</h1>


        <div class="containerInputs">

            <div class="lblLlegada">
                <label>Llegada</label>
            </div>

            <div class="lblHuespedes">
                <label>Salida</label>
            </div>


            <input id="llegada" min="<?php echo date("Y-m-d") ?>" type="date" name="llegada">


            <input id="salida" min="<?php echo date("Y-m-d") ?>" type="date" name="salida">


            <input type="submit" value="Buscar">


        </div>
    </form>


    <form id="formDatosReserva" method="POST" action="../views/reserva.php">

        <h1>Reserva</h1>
        <br>

        <div id="fechaReserva">
            <label id="lblFechaLlegada"></label>
            <label>hasta</label><label id="lblFechaSalida"></label>
            <br>
            <label id="cantNoches"></label>

        </div>

        <div id="habitacionesElegidas">

        </div>

        <div id="containerDeposito">

            <br>
            <h3 id="h3Total">Total</h3>

            <div class="deposito">

                <label id="lblDeposito">Deposito:</label><input readonly name="deposito" id="inputDeposito">

                <input name="fechaLlegada" value="<?php echo $llegada ?>" hidden>
                <input name="fechaSalida" value="<?php echo $salida ?>" hidden>

                <div class="avisoPago">

                    <img src="../img/avisoDeposito.png">

                    <label>Pague despues de la reserva</label>

                </div>

            </div>

            <input type="submit" id="btnSiguiente" value="Siguiente">
        </div>

    </form>
    <br>



    <?php



    if ($_SERVER['REQUEST_METHOD'] == 'POST') {


        if (empty($_POST['llegada']) || empty($_POST['salida'])) {


    ?>

            <script>
                alerta("Ingresa la fecha de ingreso y de salida");
            </script>
            <?php

        } else {



            $llegada = new DateTime($_POST['llegada']);
            $salida = new DateTime($_POST['salida']);


            $diferenciaDias = $llegada->diff($salida);

            $diferenciaNoches = $diferenciaDias->days;

            if ($diferenciaNoches < 1) {

            ?>
                <script>

                   alerta("Ingresa una fecha valida");
                </script>
            <?php
            }else{


            require "../model/claseHabitaciones.php";
            $claseHabitacion = new habitaciones();
            $habitacionesLibres = [];
            $habitaciones = [];
            $estandarDisponibles = $claseHabitacion->cantidadHabitacionesCategoria("Estandar");
            $deluxeDisponibles =  $claseHabitacion->cantidadHabitacionesCategoria("Deluxe");
            $suiteDisponibles =  $claseHabitacion->cantidadHabitacionesCategoria("Suite");


            $habitacionesLibres = $claseHabitacion->getReservasOcupadas($llegada->format("Y-m-d"));

            if ($habitacionesLibres != null) {

                foreach ($habitacionesLibres->fetch_all(MYSQLI_ASSOC) as $habitacionLibre) {


                    $habitaciones = $claseHabitacion->buscarCategoriaPorNumero($habitacionLibre['numHabitacionReservada']);


                    foreach ($habitaciones->fetch_all(MYSQLI_ASSOC) as $habitacion) {


                        switch ($habitacion['tipoHabitacion']) {

                            case "Estandar":

                                $estandarDisponibles--;
                                break;

                            case "Deluxe":

                                $deluxeDisponibles--;
                                break;

                            case "Suite":

                                $suiteDisponibles--;
                                break;
                        }
                    }
                }
            }

            ?>


            <script>
                document.getElementById("lblFechaLlegada").textContent =
                    "<?php echo $llegada->format("d M"); ?>";
                document.getElementById("lblFechaSalida").textContent =
                    "<?php echo $salida->format("d M"); ?>";

                document.getElementById("cantNoches").textContent =
                    "<?php echo $diferenciaNoches ?>";

                    if(document.getElementById("cantNoches").textContent==1){

                        document.getElementById("cantNoches").textContent+=" noche"
                    }else{
                        document.getElementById("cantNoches").textContent+=" noches"

                    }
                document.getElementById("fechaReserva").style.visibility = "visible";
            </script>



    <?php

        }
    }

}
    ?>


    <div id="habitaciones">
        <label id="diferenciasNoches"><?php echo $diferenciaNoches ?></label>


        <div class="containerEstandar">

            <br>
            <div class="sliderEstandar">

                <div id="carouselExampleIndicatorsDeluxe" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicatorsDeluxe" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicatorsDeluxe" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicatorsDeluxe" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../img/bannerHab1.jpg" class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                            <img src="../img/bannerHab2.jpg" class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                            <img src="../img/bannerHab3.jpg" class="d-block w-100">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicatorsDeluxe" data-bs-slide="prev">

                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicatorsDeluxe" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>


            <section>

                <h2>ESTANDAR</h2>

                <br>
                <ul class="ulLeft">

                    <li class="lblCapacidad">Capacidad</li>

                    <li><img class="imgPersonas" src="../img/persona.png">5 personas</li>
                    <br>

                    <li class="lblEspacio">Superficie</li>
                    <li>42m2</li>
                </ul>

                <ul class="ulRight">

                    <li class="lblNocheMinima">Estadia minima</li>
                    <li> <img class="imgNoches" src="../img/luna.png"> 1 Noche</li>
                    <br>
                    <li class="lblPrecioHab">Precio</li>
                    <li>$120</li>
                </ul>

                <div id="formEstandar" class="formHabitacion" data-categoria="Estandar" data-precio="120" data-icono="../img/bannerHab1.jpg">

                    <div class="selects">
                        <label class="lblAdultos">Adultos</label><label class="lblNinos">Niños</label>

                        <br>

                        <select id="selectAdulto" class="selectAdultoEstandar">

                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>


                        </select>

                        <select id="selectNino" class="selectNinoEstandar">

                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>

                        </select>


                    </div>
                    <br>
                    <button class="btnAgregar">Agregar</button>
                </div>
            </section>

            <div id="alertaHuesped">

                <img src="../img/avisoHuespedes.png">

                <label>Eliga algun huesped</label>

            </div>
        </div>

        <div class="containerDeluxe">

            <br>
            <div class="sliderDeluxe">

                <div id="carouselExampleIndicatorsDeluxe" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicatorsDeluxe" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicatorsDeluxe" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicatorsDeluxe" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../img/bannerHab1Deluxe.jpg" class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                            <img src="../img/bannerHab2Deluxe.jpg" class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                            <img src="../img/bannerHab3Deluxe.jpg" class="d-block w-100">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicatorsDeluxe" data-bs-slide="prev">

                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicatorsDeluxe" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>


            <section>

                <h2>DELUXE</h2>

                <br>
                <ul class="ulLeft">

                    <li class="lblCapacidad">Capacidad</li>

                    <li><img class="imgPersonas" src="../img/persona.png">5 personas</li>
                    <br>

                    <li class="lblEspacio">Superficie</li>
                    <li>42m2</li>
                </ul>

                <ul class="ulRight">

                    <li class="lblNocheMinima">Estadia minima</li>
                    <li> <img class="imgNoches" src="../img/luna.png"> 1 Noche</li>
                    <br>
                    <li class="lblPrecioHab">Precio</li>
                    <li>$300</li>
                </ul>

                <div id="formDeluxe" class="formHabitacion" data-categoria="Deluxe" data-precio="300" data-icono="../img/bannerHab1Deluxe.jpg">

                    <div class="selects">
                        <label class="lblAdultos">Adultos</label><label class="lblNinos">Niños</label>

                        <br>

                        <select id="selectAdulto" class="selectAdultoDeluxe">

                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>


                        </select>

                        <select id="selectNino" class="selectNinoDeluxe">

                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>

                        </select>


                    </div>
                    <br>
                    <button class="btnAgregar">Agregar</button>
                </div>
            </section>


            <div id="alertaHuesped">

                <img src="../img/avisoHuespedes.png">

                <label>Eliga algun huesped</label>

            </div>

        </div>


        <div class="containerSuite">


            <br>
            <div class="sliderSuite">

                <div id="carouselExampleIndicatorsSuite" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicatorsSuite" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicatorsSuite" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicatorsSuite" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../img/bannerHab1Suite.jpg" class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                            <img src="../img/bannerHab2Suite.jpg" class="d-block w-100">
                        </div>
                        <div class="carousel-item">
                            <img src="../img/bannerHab3Suite.jpg" class="d-block w-100">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicatorsSuite" data-bs-slide="prev">

                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicatorsSuite" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>


            <section>

                <h2>SUITE</h2>

                <br>
                <ul class="ulLeft">

                    <li class="lblCapacidad">Capacidad</li>

                    <li><img class="imgPersonas" src="../img/persona.png">6 personas</li>
                    <br>

                    <li class="lblEspacio">Superficie</li>
                    <li>65m2</li>
                </ul>

                <ul class="ulRight">

                    <li class="lblNocheMinima">Estadia minima</li>
                    <li> <img class="imgNoches" src="../img/luna.png"> 1 Noche</li>
                    <br>
                    <li class="lblPrecioHab">Precio</li>
                    <li>$500</li>
                </ul>

                <div id="formSuite" class="formHabitacion" data-categoria="Suite" data-precio="500" data-icono="../img/bannerHab1Suite.jpg">

                    <div class="selects">
                        <label class="lblAdultos">Adultos</label><label class="lblNinos">Niños</label>

                        <br>

                        <select id="selectAdulto" class="selectAdultoSuite">

                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>


                        </select>

                        <select id="selectNino" class="selectNinoSuite">

                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>

                        </select>


                    </div>
                    <br>
                    <button class="btnAgregar">Agregar</button>
                </div>
            </section>

            <div id="alertaHuesped">

                <img src="../img/avisoHuespedes.png">

                <label>Eliga algun huesped</label>

            </div>

        </div>

    </div>


    <script type="module" src="seleccionHabitaciones.js"></script>
    <script type="module" src="comprobarSelects.js"></script>

    <script src="seleccionHabitaciones.js"></script>

    <?php

    if (isset($estandarDisponibles)) {
    ?>
        <script>
            document.getElementById("formEstandar").dataset.disponibles = <?php echo $estandarDisponibles ?>;
            document.getElementById("formDeluxe").dataset.disponibles = <?php echo $deluxeDisponibles ?>;
            document.getElementById("formSuite").dataset.disponibles = <?php echo $suiteDisponibles ?>;

            const divHabitaciones = document.getElementById("habitaciones");
            const formHabitaciones = divHabitaciones.querySelectorAll('.formHabitacion');

            formHabitaciones.forEach(function(formHabitacion) {

                var disponibles = formHabitacion.dataset.disponibles;


                stocks(formHabitacion, disponibles);
            });
        </script>

    <?php
    }
    ?>
</body>

</html>