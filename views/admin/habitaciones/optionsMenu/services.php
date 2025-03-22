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
    <link rel="preload" as="style" onload="this.rel='stylesheet'"
        href="../../../estilos/styleRoomsAdmin/styleServices.css">

</head>

<body>


    <div class="containServices" id=<?php echo $numRoom ?>>
        <div class="headerWindowContainServices">
            <ul>
                <li data-url="optionsMenu/optionServices/history.html">
                    <img src="../../../img/historyServices.png">
                    Historial
                </li>
                <li data-url="optionsMenu/optionServices/addService.html">
                    <img src="../../../img/addService.png">
                    Agregar
                </li>
                <li data-url="optionsMenu/optionServices/deleteService.html">
                    <img src="../../../img/deleteService.png">
                    Eliminar
                </li>
            </ul>

            <button class="btnClose">X</button>
        </div>

        <div class="optionService"></div>
    </div>
</body>

</html>