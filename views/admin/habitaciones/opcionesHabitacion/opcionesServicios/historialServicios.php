<?php

require("../../../.././../model/claseServicios.php");
$claseServicio = new servicio();
$numHabitacion = $_GET['numHabitacion'];

?>

<h2>Historial servicios</h2>

<br>



<div id="sinServiciosHabitacionHistorial">

    <img src="../../../img/sinServicios.png">
    <br>
    <h3>Sin servicios aun</h3>

</div>

<div id="containHistorialServiciosHabitacion">

    <ul id="serviciosHabitacionEnCurso">


    </ul>

</div>

<script>
    var serviceInfo = {

        "numHabitacion": <?php echo $numHabitacion ?>

    };



    $(document).ready(function() {

        fetch("http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php?serviceInfo=" +
                JSON.stringify(serviceInfo), {

                    method: "GET",

                    headers: {

                        "Content-Type": "application/json"
                    }



                }).then(resp => resp.json())
            .then(respuesta => {


                if (respuesta.servicesRoom.length > 0) {

                  printServicesRoomBookingInCurse(respuesta.servicesRoom);
                } else {

                    $("#sinServiciosHabitacionHistorial").css("display", "block");
                }

            });


    });



    var printServicesRoomBookingInCurse = (servicesRoom) => {

        var containServicios = document.getElementById("serviciosHabitacionEnCurso");
        servicesRoom.forEach(function(serviceRoom) {

            var nameService;
            var imgService;
            var imgProduct;

            if (serviceRoom.nombreServicio != "Minibar" &&
                serviceRoom.nombreServicio != "Cantina") {

                nameService = serviceRoom.nombreServicio;

            } else {

                nameService = serviceRoom.descripcionServicio;

            }

            switch (nameService) {

                case "Telefono":

                    imgService = "../../../img/telephone.png";
                    break;
                case "Masajes":

                    imgService = "../../../img/massage.png";
                    break;

                case "Minibar":

                    imgService = "../../../img/miniBar.png";
                    imgProduct = serviceRoom.imagen;
                    break;

                case "Cantina":

                    imgService = "../../../img/bar-counter.png";
                    imgProduct = serviceRoom.imagen;
                    break;
            }

            containServicios.innerHTML = `
    
    <li>
    
    <div class="titleService">

    <img src=${imgService}>
     <span>${nameService}</span>

    </div>

    <div class="quantity">

    <div class="iconQuant">
    <img src="../../../img/cantidadService.png">
    <div>
    <div class="spanQuant">
    <span>${serviceRoom.cantidad}</span>
    </div>
    </div>



    </li>



    `

        });


    }
</script>