<?php

require("../../../.././../../model/claseServicios.php");
require("../../../.././../../model/claseHabitaciones.php");
$claseServicio = new servicio();
$claseHabitacion = new habitaciones();
$numHabitacion = $_GET['numHabitacion'];

$minibar = $claseServicio->getServicio("minibar");

$hoy = date("Y-m-d");
$habitacion = $claseHabitacion->getHabitacionReservadaFechaAndNum($hoy, $numHabitacion);
$idReserva = $habitacion['idReservaHabitacion'];


?>


<img id="cerrarMinibar" src="../../../img/cerrarVentana.png">

<div id="title">
    <img src="../../../img/minibar.png">
    <br>
    <h1>Servicio Minibar</h1>
    <br>

</div>

<div id="modalService">

</div>

<div id="msjServiceAdd">

</div>

<div id="container">
    <div id="market">
        <ul>
            <?php
            foreach ($minibar as $product) {


            ?>
                <li>

                    <div class="nombreProducto">
                        <span><?php echo $product['descripcionServicio'] ?></span>
                    </div>


                    <div class="imagenProducto">


                        <img src="data:image/jpg; base64,<?php echo base64_encode($product['imagen']) ?>">
                    </div>


                    <div class="supCantidadBtnAgregar">
                        <div class="cantidad">

                            <input type="number" value="0" min="0" max="<?php echo $product['maxStock'] ?>">

                        </div>

                        <div class="btnAgregar">

                            <button class="agregar" data-product="<?php echo $product['descripcionServicio']; ?>" data-price="<?php echo $product['precio'] ?>" data-image="data:image/jpg; base64,<?php echo base64_encode($product['imagen']) ?>">Agregar</button>

                        </div>

                    </div>

                </li>


            <?php
            }

            ?>

        </ul>
    </div>


    <div id="cart">

        <div id="title">

            <span>Carrito de productos</span>

        </div>

        <div id="listaProductos"></div>


        <div id="deposito">

            <span>Total:</span>

        </div>

    </div>


</div>

<div id="aviso">

    <div id="imgAviso">
        <img src="../../../img/advertenciaService.png">
    </div>
    <div id="textAviso">

        <span></span>
    </div>

    <div id="buttonOk">

        <button id="buttonAviso">Ok</button>
    </div>

</div>
<br>



<script>
    $("#cerrar").on("click", function() {

        $("#modalServices").css("display", "none");
        $("#modalServices").css("cursor", "auto");

        $("#optionAddService").empty();
        $("#optionAddService").removeClass("panelMinibar");

    });


    let buttonsAdds = document.querySelectorAll(".agregar");
    var aviso = document.getElementById("aviso");
    let price;
    let cant;
    let nameProduct;
    let image;
    let products = [];

    buttonsAdds.forEach(function(button) {


        button.addEventListener("click", function() {


            let sup = this.closest(".supCantidadBtnAgregar");
            let input = sup.querySelector("input");

            price = this.dataset.price;
            nameProduct = this.dataset.product;
            cant = input.value;
            image = this.dataset.image;


            if (cant == 0) {


                aviso.querySelector("span").textContent = "Ingresa una cantidad valida";
                aviso.style.display = "block";
                $("#modalService").css("display", "block");
                $("#modalService").css("cursor", "none");


            } else {
                const product = {

                    "name": nameProduct,
                    "price": price,
                    "cant": cant,
                    "image": image

                };



                products.push(product);
                printProductsAdded(products);

            }


        });


    });


    const printProductsAdded = (products) => {

        products.forEach(function(product) {

            const productDetails = document.createElement("div");
            productDetails.classList.add("productDetails");

            productDetails.innerHTML = ` 
            
          
<div class="containerDetailsProduct">

<div class="imageAndCant">
<div class="imageProduct">
<img src="${product.image}">
</div>

<div class="cantProduct">

<div class="minus">

<img src="../../../img/minus.png">
</div>
<div class="cant">

<span>${product.cant}</span>
</div>

<div class="plus">

<img src="../../../img/add.png">
</div>
</div>
</div>

<div class="nameProduct">

<span>${product.name}</span>

</div>

            `;

            const divListaProductos = document.getElementById("listaProductos");

            divListaProductos.appendChild(productDetails);


        });


    }




    $("#buttonAviso").on("click", function() {


        aviso.style.display = "none";
        aviso.querySelector("span").textContent = "";
        $("#modalService").css("display", "none");
        $("#modalService").css("cursor", "auto");

    });







    // $("#cantPersonas").on("change", function() {

    //     if ($(this).val() != "") {

    //         dataService = {

    //             "precio": 500,
    //             "cantidad": $(this).val()

    //         };

    //         fetch("http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php?dataService=" +
    //                 JSON.stringify(dataService), {

    //                     method: "GET",
    //                     headers: {

    //                         "Content-Type": "application/json",
    //                     }

    //                 }).then(respuesta => respuesta.json())
    //             .then(data_resp => {

    //                 let total = JSON.parse(data_resp.total);
    //                 $("#totalService").text("Total:$" + total);

    //             });

    //     }
    // });
</script>