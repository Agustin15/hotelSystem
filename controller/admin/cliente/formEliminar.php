<?php

$cliente = $_GET['cliente'];

$cliente = json_decode($cliente, true);


?>

<br>
<img src="http://localhost/Sistema%20Hotel/img/borrarAlerta.png">
<br>
<h2>¿Desea eliminar al cliente <?php echo $cliente['correo'] ?></h2>
<br>

<button class="btnSi">Si</button>
<button class="btnNo">No</button>


<script>
    $(".btnSi").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");
        $(".divOpcion").remove();

        const datosCliente = {
            "idCliente": "<?php echo $cliente['idCliente'] ?>",
            "correo": "<?php echo $cliente['correo'] ?>",
            "nombre": "<?php echo $cliente['nombre'] ?>",
            "apellido": "<?php echo $cliente['apellido'] ?>",
            "telefono": "<?php echo $cliente['telefono'] ?>"
        };

        var datosClienteJson = [];


        datosClienteJson.push(encodeURIComponent(JSON.stringify(datosCliente)));

        var url = `http://localhost/Sistema%20Hotel/controller/admin/cliente/opcionCliente.php?cliente=
        ${datosClienteJson}`;
        fetch(url, {


                method: "DELETE"


            })
            .then(resp => resp.json())
            .then(data_resp => {
                if (data_resp) {


                    $('.divOpcion').removeClass('divConfirmacionDelete');
                    $('.divOpcion').empty();
                
                }
                aviso(data_resp, "Eliminar");
            })



    });


    $(".btnNo").on("click", function() {


        $("#modal").css("display", "none");
        $("#modal").css("cursor", "auto");

        $('.divOpcion').removeClass('divConfirmacionDelete');
        $('.divOpcion').empty();
        location.reload();

    })
</script>