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

    <div class="containFormEdit" id="<?php echo $idCliente ?>">
        <div class="close">
            <button class="btnClose">Cerrar </button>
        </div>
        <form>
            <div class="title">

                <h3>Editar cliente </h3>
                <img src="../../../img/editarUser.png">
            </div>

            <div class="contentForm">
                <div class="row1">
                    <div class="name">

                        <label for="inputName">Nombre</label>
                        <input type="text" id="inputName" data-ref="nombre"
                            autocomplete="off" name="name" placeholder="Ingrese nombre">
                        <div class="msjError">
                            <div class="arrow"></div>
                            <img src="../../../img/advertenciaLogin.png">
                            <span></span>
                        </div>
                    </div>

                    <div class="lastName">

                        <label for="inputLastName">Apellido</label>
                        <input type="text" id="inputLastName" autocomplete="off" data-ref="apellido" name="lastName" placeholder="Ingrese apellido">
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
                        <input type="text" id="inputPhone" autocomplete="off" onpaste="return false"
                            data-ref="telefono" name="phone" placeholder="Ingrese telefono">
                        <div class="msjError">
                            <div class="arrow"></div>
                            <img src="../../../img/advertenciaLogin.png">
                            <span></span>
                        </div>
                    </div>

                    <div class="mail">

                        <label for="inputMail">Correo</label>
                        <input type="text" autocomplete="off" id="inputMail" name="mail"
                            data-ref="correo" placeholder="Ingrese correo">

                        <div class="msjError">
                            <div class="arrow"></div>
                            <img src="../../../img/advertenciaLogin.png">
                            <span></span>
                        </div>
                    </div>
                </div>

                <div class="buttons">

                    <button class="btnAdd" type="submit">Actualizar
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
            </div>
            <div class="noData">

                <img src="../../../img/sinDatos.png">
                <span>Ups, no se encontro al cliente</span>

            </div>
        </form>

    </div>

</body>

</html>