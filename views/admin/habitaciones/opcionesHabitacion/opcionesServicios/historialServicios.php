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



    <ul id="serviciosHabitacionEnCurso">


    </ul>

    


<script>
    var numHabitacion = <?php echo $numHabitacion; ?>;

    var containServicios = document.getElementById("serviciosHabitacionEnCurso");
    $(document).ready(function() {

        fetch("http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php?numHabitacion=" +
                numHabitacion, {

                    method: "GET",

                    headers: {

                        "Content-Type": "application/json"
                    }



                }).then(resp => resp.json())
            .then(respuesta => {

                if (respuesta.length > 0) {

                    printServicesRoomBookingInCurse(respuesta);
                 
                } else {

                    $("#sinServiciosHabitacionHistorial").css("display", "block");
                }

            });


    });



    var printServicesRoomBookingInCurse = (servicesRoom) => {

  
        servicesRoom.forEach(function(serviceRoom) {

        
            var titleProductService;
            var quantityProduct = serviceRoom.cantidad;
            var imgService;
            var imgProduct;

            if(serviceRoom.nombreServicio=="Minibar" ||serviceRoom.nombreServicio =="Cantina"){

                titleProductService=serviceRoom.nombreServicio+":"+serviceRoom.descripcionServicio;

            }else{

                titleProductService=serviceRoom.nombreServicio;
            }
          
            switch (serviceRoom.nombreServicio) {

                case "Telefono":

                    imgService = "../../../img/telephone.png";
                    quantityProduct = serviceRoom.cantidad;

                    if(quantityProduct>1){

                        quantityProduct+=" minutos";
                    }else{


                        quantityProduct+=" minuto";
                    }
                    break;
                case "Masajes":

                    imgService = "../../../img/massage.png";

                    break;

                case "Minibar":

                    imgService = "../../../img/minibar.png";
                    imgProduct = serviceRoom.imagen;
                    break;

                case "Cantina":

                    imgService = "../../../img/bar-counter.png";
                    imgProduct = serviceRoom.imagen;
                    break;
            }

            containServicios.innerHTML += `
    
    <li>
    
    
<div class="titleService">

<div>
<img src=${imgService}>
</div>
<div>
 <span>${titleProductService}</span>
 </div>

</div>
<div class="containQuantityAndPrice">

<div class="quantity">

<div class="iconQuant">
<img src="../../../img/cantidadService.png">
</div>
<div class="spanQuant">
<span>Cantidad:${quantityProduct}</span>
</div>
</div>

<div class="price">

<div class="iconPrice">

 <img src="../../../img/dollar.png">
</div>

<div class="spanPrice">
<span>Precio:$${serviceRoom.precio}</span>
</div>
</div>
</div>

<div class="totalPrice">

<span>Total:$${serviceRoom.precio*serviceRoom.cantidad}</span>

</div>


    </li>



    `

        });


    }
</script>