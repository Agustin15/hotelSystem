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
    <script src="../../../controller/admin/scriptsAdmin/funcionesAdmin.js"> </script>
    <script src="../../../controller/admin/scriptsCliente/funcionesCliente.js"> </script>

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


    <nav id="menuCliente">

        <br>
        <h1>Clientes</h1>
        <img src="../../../img/clientesBanner.jpg">

        <ul>

            <li class="liGrafica">

                <img class="imgClientes" src="../../../img/grafica.png">
                <br>
                <a href="grafica.php">Gráfica</a>

            </li>
            <li class="liLista">
                <img class="imgClientes" src="../../../img/listaClientes.png">
                <br>
                <a href="lista.php">Gestion</a>

            </li>
            <li class="liAgregar">

                <img class="imgClientes" src="../../../img/agregarCliente.png">
                <br>
                <a>Agregar</a>

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

    <br>
    <div id="alertaAgregar">

        <br>
        <img src="">
        <h2></h2>

    </div>
    <form id="formAgregar">

        <img class="imgAgregar" src="../../../img/agregarCliente.png">
        <br>
        <h1>Agregar Cliente</h1>


        <label class="lblNombre">Nombre</label>
        <input type="text" id="inputNombre" name="nombre" autocomplete="off">
        <img src="../../../img/imgNombre.png" class="imgNombre">


        <br>

        <label class="lblApellido">Apellido</label>
        <input id="inputApellido" type="text" autocomplete="off" name="apellido">
        <img src="../../../img/imgApellido.png" class="imgApellido">

        <br>

        <label class="lblCorreo">Correo</label>
        <input id="inputCorreo" type="correo" autocomplete="off" name="correo">
        <img src="../../../img/imgCorreo.png" class="imgCorreo">

        <br>
        <label class="lblTelefono">Telefono</label>
        <input id="inputTelefono" maxlength="9" onkeypress="if 
            (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" type="text" autocomplete="off">
        <img src="../../../img/imgTelefono.png" class="imgTelefono">

        <br>
        <input type="submit" value="Guardar">



    </form>
    <br>


</body>

</html>

<script>
    window.onload = function() {

        $("#tableClientes").load("../../../controller/admin/cliente/cargarTabla.php");
    }


    liBorderBottom("agregar");

    openSubMenu("../../../img/btnFlechaAbajo.png", "../../../img/btnFlecha.png");


    $("#buscador").on("keydown", function() {

        buscadorCliente();

    });



    var inputs = $("#formAgregar").find("input");


    inputs.each(function() {

        $(this).on("click", function() {

            var lbl = $(this).prev('label');

            lblInputsLoginActive(lbl, "lblInputEfect", "lblInputEfectRemove")


        });

        $(this).on("mouseleave", function() {

            var lbl = $(this).prev('label');
            if ($(this).val() == "") {

                lblInputsLoginDesactive(lbl, $(this), "lblInputEfectRemove")

            }

        });


    });


    $("#formAgregar").on("submit", function(event) {

        event.preventDefault();

        var img = $("#alertaAgregar").find("img");
        var h2 = $("#alertaAgregar").find("h2");

        if ($("#inputNombre").val() === "" || $("#inputApellido").val() === "" ||
            $("#inputCorreo").val() === "" || $("#inputTelefono").val() === "") {

            alertaSetsError(h2, "Complete todos los campos", img, "alertaAgregarActive", "formAgregarActive");
            borrarAlerta();


        } else {


            var correo = $("#inputCorreo").val().trim();
            var nombre = $("#inputNombre").val().trim();
            var apellido = $("#inputApellido").val().trim();
            var telefono = $("#inputTelefono").val().trim();


            if (correo.includes("@gmail.com") == false && correo.includes("@hotmail.com") == false &&
                correo.includes("@outlook.com") == false) {

                alertaSetsError(h2, "Formato del correo no valido", img, "alertaAgregarActive", "formAgregarActive");
                borrarAlerta();

            } else {


                const cliente = {
                    'correo': correo,
                    'nombre': nombre,
                    'apellido': apellido,
                    'telefono': telefono
                };

                console.log(JSON.stringify(cliente));

                fetch("http://localhost/Sistema%20Hotel/controller/admin/cliente/opcionCliente.php", {

                        method: "POST",
                        body: JSON.stringify({
                            'cliente': cliente
                        }),
                        headers: {

                            "Content-Type": "application/json",
                        }


                    }).then(resp => resp.json())
                    .then(data_resp => {

                        if (data_resp.respuesta == true) {

                            img.attr("src", "../../../img/tickAgregar.png");
                            h2.text("Cliente agregado");

                            $("#alertaAgregar").removeClass("alertaAgregarDesactive");
                            $("#alertaAgregar").addClass("alertaAgregarActive");
                            $(this).removeClass("formAgregarDesactive");
                            $(this).addClass("formAgregarActive");

                            $correo = "";
                            $telefono = "";
                            $nombre = "";
                            $apellido = "";
                            borrarAlerta();

                        } else {

                            var msj = data_resp.respuesta;

                            alertaSetsError(h2, msj, img, "alertaAgregarActive", "formAgregarActive");
                            borrarAlerta();

                        }


                    }).catch(error => console.error('Error:', error));


            }
        }



    });


    function alertaSetsError(h2, msj, img, claseAviso, claseForm) {


        img.attr("src", "../../../img/cruzAgregar.png");
        h2.text(msj);

        $("#alertaAgregar").removeClass("alertaAgregarDesactive");
        $("#alertaAgregar").addClass(claseAviso);
        $("#formAgregar").removeClass("formAgregarDesactive");
        $("#formAgregar").addClass(claseForm);

    }

    function borrarAlerta() {

        setTimeout(function() {

            $("#alertaAgregar").addClass("alertaAgregarDesactive");
            $("#formAgregar").addClass("formAgregarDesactive");

        }, 2020)

    }
</script>