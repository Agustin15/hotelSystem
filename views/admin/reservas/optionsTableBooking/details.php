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

    <div class="modalOptionsBookingDetails"></div>

    <div class="containDetailsBooking" id="<?php echo $idBooking ?>">

        <div class="header">

            <div class="closeDetails">

                <button class="btnCloseDetails">x</button>
            </div>
            <div class="title">
                <h3 class="name">Detalles de la reserva <?php echo $idBooking ?></h3>
                <img src="../../../img/detailsBooking.png">
            </div>
        </div>

        <div class="bookingDetailsItem">

            <div class="client">

                <div class="headerItem">

                    <img src="../../../img/client.png">
                    <p>Detalles sobre el cliente que realizo la reserva,como su nombre,apellido,correo,
                        telefono e identificador unico</p>
                </div>
                <div data-item="client" data-id=<?php echo $idBooking ?> class="footer">

                    <span>Cliente</span>
                    <img class="viewClient item" src="../../../img/ver.png">
                </div>

            </div>

            <div class="guests">

                <div class="headerItem">

                    <img src="../../../img/guestInfo.png">
                    <p>Puede ver la cantidad de huespedes de la reserva y la cantidad que estan hospedados por
                        cada habitacion reservada</p>
                </div>
                <div data-item="guests" data-id=<?php echo $idBooking ?> class="footer">

                    <span>Huespedes</span>
                    <img class="viewGuests item"  src="../../../img/ver.png">
                </div>

            </div>
            <div class="rooms">

                <div class="headerItem">

                    <img src="../../../img/roomInfoIcon.png">
                    <p>Detalles de las habitaciones reservadas por el cliente , como numero de habitacion y categoria</p>
                </div>
                <div data-item="rooms" data-id=<?php echo $idBooking ?> class="footer">

                    <span>Habitaciones</span>
                    <img class="viewRooms item"  src="../../../img/ver.png">
                </div>

            </div>
            <div class="services">

                <div class="headerItem">

                    <img src="../../../img/minibarInfo.png">
                    <p>
                        Detalles sobre los productos consumidos en la habitaciones como el minibar y la cantina del hotel durante la estadia</p>
                </div>
                <div data-item="services" data-id=<?php echo $idBooking ?> class="footer">

                    <span>Servicios</span>
                    <img class="viewServices item" src="../../../img/ver.png">
                </div>

            </div>
            <div class="bill">

                <div class="headerItem">

                    <img src="../../../img/bill.png">
                    <p>Podra ver la factura sobre la reserva, el precio total y detalles de los precios de cada habitacion
                         y de los servicios a estas</p>
                </div>
                <div data-item="bill" data-id=<?php echo $idBooking ?> class="footer">

                    <span>Factura</span>
                    <img class="viewBill item" src="../../../img/ver.png">
                </div>

            </div>
        </div>
    </div>
</body>

</html>