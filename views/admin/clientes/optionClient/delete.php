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
        <img src="../../../img/deleteClient.png">

        <div class="loading">
            <span>Cargando cliente</span>
            <img src="../../../img/spinnerMain.gif">
        </div>
        <div class="body">
        </div>
        <div class="noData"></div>

    </div>

</body>

</html>