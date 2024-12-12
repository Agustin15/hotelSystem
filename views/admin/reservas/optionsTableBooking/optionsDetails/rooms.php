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

    <div class="containRoomsDetails" id="<?php echo $idBooking ?>">

        <div class="header">

            <div class="close">
                <button class="btnCloseWindow">x</button>
            </div>
            <div class="title">
                <img src="../../../img/roomInfoIcon.png">
                <span>Habitaciones</span>
            </div>
        </div>


        <div class="body"></div>

    </div>

</body>

</html>