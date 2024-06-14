<?php

$cliente = $_GET['cliente'];

$cliente = json_decode($cliente, true);

?>
<form id="formEditar">

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
    <input type="submit" value="Guardar"></input>
    <button id="btnCancelar" value="Cancelar">Cancelar</button>

    <div id="alertaEditar">

        <br>
        <img src="../../../img/cruzEditar.png">
        <label></label>

    </div>

</form>

<?php

?>


<script>
    $("#formEditar").on("submit", function(event) {

        event.preventDefault();



        const datosCliente = {

            'idCliente': "<?php echo $cliente['idCliente'] ?>",
            'correo': $("#inputCorreo").val().trim(),
            'nombre': $("#inputNombre").val().trim(),
            'apellido': $("#inputApellido").val().trim(),
            'telefono': $("#inputTelefono").val().trim()
        };

        console.log(datosCliente);

        fetch("http://localhost/Sistema%20Hotel/controller/admin/cliente/opcionCliente.php", {

                method: "PUT",
                body: JSON.stringify({
                    'cliente': datosCliente,

                }),
                headers: {

                    "Content-Type": "application/json",
                }



            }).then(resp => resp.json())
            .then(data_resp => {

                if (data_resp.respuesta == true) {

                    $("#modal").css("display", "none");
                    $("#modal").css("cursor", "auto");

                    $('.divOpcion').removeClass('divEditar');
                    $('.divOpcion').empty();

                    aviso(data_resp.respuesta, "Editar");
                } else {


                    const lbl = $("#alertaEditar").find("label");
                    lbl.text(data_resp.respuesta);
                    $("#alertaEditar").addClass("alertaEditarActive");

                }


            }).catch(error => console.error('Error:', error));

    });



    $("#btnCancelar").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");

        $('.divOpcion').removeClass('divEditar');
        $('.divOpcion').empty();
        location.reload();

    })
</script>