<?php
$numRoom;
if (isset($_GET["numRoom"])) {

    $numRoom = $_GET["numRoom"];
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preload" as="style" onload="this.rel='stylesheet'"
        href="../../../estilos/styleRoomsAdmin/styleNextBookings.css">
</head>

<body>

    <div class="modalNextBookings"></div>
    <div class="containNextBookings" id=<?php echo $numRoom ?>>

        <div class="headerWindow">
            <div class="title">
                <h3>Reservas mas cercanas habitacion <?php echo $numRoom ?></h3>
                <img src="../../../img/nextBookings.png">
            </div>
            <button class="btnClose">X</button>
        </div>
        <div class="bodyContainNextBookings"></div>
    </div>

</body>

</html>