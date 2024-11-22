<?php

$idCliente = $_GET['client'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>

<body>



    <div class="containFormEdit">
        <form>

            <div class="title">

                <h3>Editar cliente </h3>
                <img src="../../../img/editarUser.png">
            </div>

            <div class="row1">
                <div class="name">

                    <label for="inputName">Nombre</label>
                    <input type="text" id="inputName" name="name" placeholder="Ingrese nombre">
                    <div class="msjError">
                        <div class="arrow"></div>
                        <img src="../../../img/advertenciaLogin.png">
                        <span></span>
                    </div>
                </div>

                <div class="lastName">

                    <label for="inputLastName">Apellido</label>
                    <input type="text" id="inputLastName" name="lastName" placeholder="Ingrese apellido">
                    <div class="msjError">
                        <div class="arrow"></div>
                        <img src="../../../img/advertenciaLogin.png">
                        <span></span>
                    </div>
                </div>
            </div>


            <div class="row2">
                <div class="phone">

                    <label for="inputPhone">Telefono</label>
                    <input type="text" id="inputPhone" onpaste="return false" name="phone" placeholder="Ingrese telefono">
                    <div class="msjError">
                        <div class="arrow"></div>
                        <img src="../../../img/advertenciaLogin.png">
                        <span></span>
                    </div>
                </div>

                <div class="mail">

                    <label for="inputMail">Correo</label>
                    <input type="text" id="inputMail" name="mail" placeholder="Ingrese correo">

                    <div class="msjError">
                        <div class="arrow"></div>
                        <img src="../../../img/advertenciaLogin.png">
                        <span></span>
                    </div>
                </div>
            </div>

            <div class="buttons">

                <button class="btnAdd" type="submit">Agregar
                    <img class="loading" src="../../../img/spinnerBooking.gif"> </button>
                <button type="reset" class="btnClean">Limpiar</button>

            </div>

            <div class="alertForm">

                <img>
                <div class="body">
                    <span></span>

                    <p></p>
                </div>

            </div>
        </form>
    </div>

</body>

</html>