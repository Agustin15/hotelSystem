<?php
$idCliente = $_GET['client'];

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>

<body>

    <div class="containDetailsClientBooking" id="<?php echo $idCliente ?>">

        <div class="header">

            <h3 class="name">Detalles del cliente <!-- nameClient--></h3>
            <img src="../../../img/clienteInfo.png">
        </div>

        <div class="bookingsClient">

            <div class="title">
                <h4>Historial de reservas</h4>
                <img src="../../../img/historyBookings.png">
            </div>

            <div class="loading">

                <span>Cargando datos</span>
                <img src="../../../img/spinnerMain.gif">

            </div>

            <div class="bookings">

              
            
                    <div class="noBookings">

                        <img src="../../../img/noBookings.png">
                        <h4></h4>
                    </div>
                </div>

            </div>
        </div>

</body>


</html>