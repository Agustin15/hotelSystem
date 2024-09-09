<?php

$cliente = $_GET['cliente'];

$cliente = json_decode($cliente, true);

?>

<div class="modalEditar">
    <div class="alertaEditar">
        <img src="">
        <br>
        <p></p>
        <br>
        <button>Ok</button>
    </div>

</div>

<form id="formEditar" data-id-cliente="<?php echo $cliente['idCliente'] ?>">

    <img class="iconoFormEditar" src="http://localhost/Sistema%20Hotel/img/editar.png">

    <h1>Editar cliente <?php echo $cliente['correo'] ?></h1>

    <div class="name">
        <label>Nombre</label>
        <input type="text" id="inputName" name="name"
            value="<?php echo $cliente['nombre'] ?>" placeholder="Ingresa nuevo nombre" autocomplete="off">
    </div>

    <div class="lastName">
        <label>Apellido</label>
        <input id="inputLastName" type="text" name="lastName"
            value="<?php echo $cliente['apellido'] ?>" placeholder="Ingresa nuevo apellido" autocomplete="off">
    </div>

    <div class="mail">
        <label>Correo</label>
        <input id="inputMail" type="correo" name="mail"
            value="<?php echo $cliente['correo'] ?>" placeholder="Ingresa nuevo correo" autocomplete="off">
    </div>

    <div class="phone">
        <label>Telefono</label>
        <input id="inputPhone" maxlength="9" onpaste="return false" oninput="replaceCharacter(event)"
            placeholder="Ingresa nuevo telefono" name="phone" autocomplete="off"
            value="<?php echo $cliente['telefono'] ?>">
    </div>


    <div id="buttonsForm">
        <button type="submit">Guardar</button>
        <button id="btnCancelar" type="button" value="Cancelar">Cancelar</button>
    </div>

    <div class="alertFormClientUpdate">

        <div class="contain">
            <div class="header">
                <img src="../../../img/advertenciaLogin.png">
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