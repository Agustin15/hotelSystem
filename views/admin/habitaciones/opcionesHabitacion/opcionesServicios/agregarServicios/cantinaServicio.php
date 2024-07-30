<?php

require("../../../.././../../model/claseServicios.php");
require("../../../.././../../model/claseHabitaciones.php");
$claseServicio = new servicio();
$claseHabitacion = new habitaciones();
$numHabitacion = $_GET['numHabitacion'];

$cantina = $claseServicio->getServicio("cantina");

$hoy = date("Y-m-d");
$habitacion = $claseHabitacion->getHabitacionReservadaFechaAndNum($hoy, $numHabitacion);
$idReserva = $habitacion['idReservaHabitacion'];


?>


<img id="cerrarCantina" src="../../../img/cerrarVentana.png">

<div id="title">
    <img src="../../../img/bar-counter.png">
    <br>
    <h1>Servicio Cantina</h1>
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
            foreach ($cantina as $product) {


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

                            <input class="inputCant" type="number" value="0" min="0">

                        </div>

                        <div class="btnAgregar">

                            <button class="agregar" data-id-service="<?php echo $product['idServicio']; ?> " data-product="<?php echo $product['descripcionServicio']; ?>" data-price="<?php echo $product['precio'] ?>" data-image="data:image/jpg; base64,<?php echo base64_encode($product['imagen']) ?>" data-max-stock="<?php echo $product['maxStock'] ?>">Agregar</button>

                        </div>

                    </div>

                </li>


            <?php
            }

            ?>

            <br>
        </ul>
    </div>


    <div id="cart">

        <div id="title">

            <span>Carrito de productos</span>

        </div>

        <div id="listaProductos"></div>


        <div id="deposito">

            <span id="spanTotal"></span>

        </div>

        <div id="buttonAgregarServicio">

            <button id="btnAgregarService">Agregar</button>

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
    var buttonsAdds = document.querySelectorAll(".agregar");
    var aviso = document.getElementById("aviso");
    var divListaProductos = document.getElementById("listaProductos");
    var spanTotal = document.getElementById("spanTotal");
    var divDeposito = document.getElementById("deposito");
    var btnAgregarServicio = document.getElementById("buttonAgregarServicio");


    var price;
    var cant;
    var nameProduct;
    var image;
    var idService;
    var products = [];
    var servicio = [];

    buttonsAdds.forEach(function(button) {


        button.addEventListener("click", function() {


            var sup = this.closest(".supCantidadBtnAgregar");
            var input = sup.querySelector("input");

            price = this.dataset.price;
            nameProduct = this.dataset.product;
            cant = input.value;
            image = this.dataset.image;
            maxStock = this.dataset.maxStock;
            idService = this.dataset.idService;




            if (cant == 0) {

                alert("Ingresa una cantidad valida");


            } else {


                var productIsset = additionProductCant(nameProduct, cant);

                if (productIsset == false) {


                    var product = {

                        "idService": parseInt(idService),
                        "name": nameProduct,
                        "price": price,
                        "cant": parseInt(cant),
                        "image": image,
                        "maxStock": maxStock,
                        "idBooking": <?php echo $idReserva ?>,
                        "numRoom": <?php echo $numHabitacion ?>,
                        "total": price * cant

                    };


                    products.push(product);
                    printProductsAdded(products);


                }



            }


        });


    });


    var createObjectServiceToBd = () => {


        servicio = products.map((product) => {

            var serviceToBd = {

                "idServicio": product.idService,
                "cantidad": product.cant,
                "idReserva": product.idBooking,
                "numHabitacion": product.numRoom,
                "total": product.total

            };

            return serviceToBd;

        });

    };

    var printProductsAdded = (products) => {


        btnAgregarServicio.style.display = "block"
        divDeposito.style.display = "block";

        cleanList();
        var totalCart = totalPriceCart(products);


        products.forEach(function(product) {

            var productDetails = document.createElement("div");
            productDetails.classList.add("productDetails");

            productDetails.innerHTML = ` 
            
         <div class="containerDetailsProduct">

<div class="imageAndCant">

<div class="imageProduct">
<img src="${product.image}">
</div>

<div class="cantProduct">

<div class="minus" data-minus="${product.name}">

<img class="substraction" src="../../../img/minus.png">
</div>
<div class="cant">

<span>${product.cant}</span>
</div>

<div class="plus" data-addition="${product.name}">

<img class="addition" src="../../../img/add.png">
</div>
</div>
</div>

<div class="nameProduct">

<h5>${product.name}</h5>

</div>

<div class="deleteSup">
<div class="deleteProduct" data-delete="${product.name}">

<img class="imgDeleteProduct"  src="../../../img/eliminar.png">
</div>
</div>

<div class="priceProduct">

<span>Precio:$${product.total}</span>
</div>


</div>       

            `;

            divListaProductos.appendChild(productDetails);
            spanTotal.innerHTML = `Total:$${totalCart} `;



        });


        var deletes = document.querySelectorAll(".imgDeleteProduct");

        deletes.forEach(function(deleteProduct) {

            deleteProduct.addEventListener("click", function() {

                var divFatherDelete = deleteProduct.parentNode;
                var productNameDelete = divFatherDelete.dataset.delete;

                deleteProductCart(productNameDelete);


            });


        });


        var substractions = document.querySelectorAll(".substraction");

        substractions.forEach(function(substraction) {

            substraction.addEventListener("click", function() {

                var divFatherMinus = this.parentNode;
                var productNameMinus = divFatherMinus.dataset.minus;


                substractionProduct(productNameMinus);

            });

        });

        var additions = document.querySelectorAll(".addition");

        additions.forEach(function(addition) {

            addition.addEventListener("click", function() {

                var divFatherAddition = this.parentNode;
                var productNameAddition = divFatherAddition.dataset.addition;


                additionProductCant(productNameAddition, 1);

            });

        });


    }


    var alert = (text) => {


        aviso.querySelector("span").textContent = text;
        aviso.style.display = "block";
        $("#modalService").css("display", "block");
        $("#modalService").css("cursor", "none");
    }


    var cleanList = () => {


        divListaProductos.innerHTML = "";
        spanTotal.innerHTML = "";
        if (products.length == 0) {

            divDeposito.style.display = "none";
            btnAgregarServicio.style.display = "none";

        }

    }

    var totalPriceCart = (products) => {

        var totalCart = products.reduce((total, product) => total + product.total, 0);

        return totalCart;

    }

    var deleteProductCart = (productName) => {

        products = products.filter((product) => product.name != productName);

        printProductsAdded(products);

    };

    var substractionProduct = (productName) => {

        var productSubstraction = products.find((product) => product.name === productName);

        if (productSubstraction.cant > 1) {

            productSubstraction.cant--;
            productSubstraction.total = productSubstraction.cant * productSubstraction.price;

            printProductsAdded(products);

        }

    }


    var additionProductCant = (productName, cantAdded) => {


        var productIsset = false;

        if (products.length > 0) {

            var productAdditionCant = null;
            productAdditionCant = products.find((product) => product.name === productName);


            if (productAdditionCant != null) {

                productIsset = true;


                productAdditionCant.cant = parseInt(productAdditionCant.cant) + parseInt(cantAdded);
                productAdditionCant.total = productAdditionCant.cant * productAdditionCant.price;

                printProductsAdded(products);


            }
        }


        return productIsset;
    }



    $("#buttonAviso").on("click", function() {


        aviso.style.display = "none";
        aviso.querySelector("span").textContent = "";
        $("#modalService").css("display", "none");
        $("#modalService").css("cursor", "auto");

    });

    $("#cerrarCantina").on("click", function() {

        $("#optionAddService").empty();

        $("#optionAddService").removeClass("panelCantina");

    });


    btnAgregarServicio.addEventListener("click", function() {


        createObjectServiceToBd();

        fetch("http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php", {

                method: "POST",
                body: JSON.stringify(servicio),

                headers: {

                    "Content-Type": "application/json",
                }

            }).then(resp => resp.json())
            .then(data_resp => {

                if (data_resp.respuesta == true) {

                    alert("Servicios de cantina agregados");
                    var img = $("#imgAviso").find("img");
                    img.attr("src", "../../../img/tickServices.gif");

                    document.querySelectorAll(".inputCant").forEach(function(input) {

                        input.value = 0;

                    });

                    products = [];
                    cleanList();
                }


            });

    });
</script>