<?php

$idBooking = $_GET['idBooking'];

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>


    <div class="containDelete" id="<?php echo $idBooking ?> ">
        <img src="../../../img/deleteBooking.png">

        <div class="body">
            <h3>¿Desea eliminar la reserva numero <?php echo $idBooking ?>?</h3>

            <div class="buttons">

                <button class="btnAccept">Aceptar</button>
                <button class="btnCancel">Cancelar</button>
            </div>
            <div class="error"> </div>
        </div>

    </div>

</body>

</html>