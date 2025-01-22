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

        <div class="header">
            <ul class="menu">
                <li id="itemEdit">Editar</li>
                <li id="itemRooms">Habitaciones</li>
            </ul>
            <div class="containClose">
                <button class="btnClose">X</button>
            </div>
        </div>
        <div class="body">

        </div>

    </div>
</body>

</html>