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

    <div class="containEditOption" id="<?php echo $idBooking ?>">
        <ul class="menu">
            <li>Editar</li>
            <li>Habitaciones</li>
        </ul>

        <div class="title">

            <h3>Editar Reserva <?php echo $idBooking ?> </h3>
        </div>
        <div class="body">

        </div>

    </div>
</body>

</html>
