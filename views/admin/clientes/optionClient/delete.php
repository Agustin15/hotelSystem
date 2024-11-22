<?php

$idClient = $_GET['client'];

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>


    <div class="containDelete" id="<?php echo $idClient ?> ">

        <div class="body">
            <img src="../../../img/deleteClient.png">
            <h3>¿Desea borrar al cliente</h3>

            <div class="buttons">
                <button class="btnAccept">Aceptar</button>
                <button class="btnCancel">Cancelar</button>
            </div>
            <div class="error">

                <img src="../../../img/advertenciaDelete.png">
                <span>Ups, no se pudo eliminar el cliente</span>
            </div>
        </div>
        <div class="noData">

            <div class="content">
                <img src="../../../img/sinDatos.png">
                <span>Ups, no se encontro al cliente</span>
            </div>
            <button class="btnClose">Cerrar</button>

        </div>

    </div>

</body>

</html>