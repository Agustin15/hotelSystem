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

<form id="formEditar" data-id-cliente="<?php echo $cliente['idCliente']?>">

    <img class="iconoFormEditar" src="http://localhost/Sistema%20Hotel/img/editar.png">

    <br>
    <h1>Editar cliente <?php echo $cliente['correo'] ?></h1>

    <br>

    <label class="lblNombre">Nombre</label>
    <input type="text" id="inputNombre" value="<?php echo $cliente['nombre'] ?> " autocomplete="off">

    <br>

    <label class="lblApellido">Apellido</label>
    <input id="inputApellido" type="text" value="<?php echo $cliente['apellido'] ?>" autocomplete="off">

    <br>

    <label class="lblCorreo">Correo</label>
    <input id="inputCorreo" type="correo" value="<?php echo $cliente['correo'] ?>" autocomplete="off">

    <br>

    <label class="lblTelefono">Telefono</label>
    <input id="inputTelefono" maxlength="9" onkeypress="if 
            (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" 
            type="text" value="<?php echo $cliente['telefono'] ?>" autocomplete="off">

    <br>
    <div id="buttonsForm">
    <button id="btnSubmitEdit">Guardar</button>
    <button id="btnCancelar" value="Cancelar">Cancelar</button>
    </div>


</form>
