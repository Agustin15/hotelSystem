<?php
if (isset($_GET["numRoom"])) {
    $numRoom = $_GET["numRoom"];
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  

</head>

<body>

    <div id=<?php echo $numRoom ?> class="mainContain">
        <div class="headerWindow">
            <div class="title">
                <h3>Historial habitacion <?php echo $numRoom ?></h3>
                <img src="../../../img/historyBookings.png">
            </div>
            <button class="btnClose">X</button>

        </div>


        <div class="containData"></div>
    </div>

</body>

</html>