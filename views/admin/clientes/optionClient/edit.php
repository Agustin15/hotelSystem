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
        <div class="title">

            <h3>Editar cliente </h3>
            <img src="../../../img/editarUser.png">
        </div>

        <div class="loading">

            <span>Cargando cliente</span>
            <img src="../../../img/spinnerMain.gif">
        </div>
        <form></form>
        <div class="noData"></div>

    </div>

</body>

</html>