<?php

if (isset($_GET['idBooking'])) {

    $idBooking = $_GET['idBooking'];
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../../estilos/styleReservasAdmin/styleEditBooking.css">
</head>

<body>

    <div class="modalOptionEditBooking"></div>

    <div class="containEditOption" id="<?php echo $idBooking ?>">

        <div class="headerWindow">
            <ul class="menu">
                <li class="optionBooking">
                    <img src="../../../img/updateBooking.png">
                    Reserva
                </li>
                <li class="optionFreeRooms">
                    <img src="../../../img/key-card.png">
                    Habitaciones
                </li>
            </ul>
            <button class="btnClose">X</button>
        </div>

        <div class="body">

        </div>

    </div>
</body>

</html>