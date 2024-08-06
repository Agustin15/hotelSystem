function aviso(resultado, opcion) {
  console.log(resultado);

  var imgAvisoReserva = null;
  var lblReservaAviso = null;
  var imgAvisoHabitacion = null;
  var lblHabitacionAviso = null;

  switch (opcion) {
    case "Eliminar":
      var aviso = document.getElementById("avisoReserva");

      aviso.classList.remove("avisoReservaDesactive");
      aviso.classList.add("avisoReservaActive");

      aviso.style.background = "linear-gradient(red,rgb(226, 4, 4))";
      if (resultado) {
        imgAvisoReserva = "../../../img/tickEliminar.png";
        lblReservaAviso = "Reserva eliminada";
      } else {
        imgAvisoReserva = "../../../img/cruzEliminar.png";
        lblReservaAviso = "Error al eliminar la reserva";
      }

      aviso.innerHTML = `
    
    <img src="${imgAvisoReserva}">

    <label>${lblReservaAviso}</label>
    `;

      borrarAviso(aviso);
      break;

    case "Editar":
      var aviso = document.getElementById("avisoReserva");
      aviso.style.background = "rgb(0, 89, 255)";

      if (resultado) {
        imgAvisoReserva = "../../../img/tickEditar.png";
        lblReservaAviso = "Reserva actualizada";
      }

      aviso.innerHTML = `
    
    <img src="${imgAvisoReserva}">

    <label>${lblReservaAviso}</label>
    
    `;

      borrarAviso(aviso);

      break;

    case "Asignar habitacion":
      var avisoHabitacion = document.getElementById("avisoHabitacion");
      avisoHabitacion.style.background = "red";

      if (resultado) {
        imgAvisoHabitacion = "../../../img/tickEliminar.png";
        lblHabitacionAviso = "Habitacion asignada";
      }

      avisoHabitacion.innerHTML = `
    
            <img src="${imgAvisoHabitacion}">
        
            <label>${lblHabitacionAviso}</label>
            `;

      borrarAviso(avisoHabitacion);
      break;

    case "Remplazar habitacion":
      var avisoHabitacion = document.getElementById("avisoHabitacion");

      avisoHabitacion.classList.remove("avisoHabitacionDesactive");
      avisoHabitacion.classList.add("avisoHabitacionActive");
      avisoHabitacion.style.backgroundColor = "red";

      if (resultado) {
        imgAvisoHabitacion = "../../../img/tickEliminar.png";
        lblHabitacionAviso = "Habitacion remplazada";
      }

      avisoHabitacion.innerHTML = `
    
    <img src="${imgAvisoHabitacion}">

    <label>${lblHabitacionAviso}</label>
    `;

      borrarAviso(avisoHabitacion);

      break;

    case "Liberar habitacion":
      var avisoHabitacion = document.getElementById("avisoHabitacion");

      avisoHabitacion.classList.remove("avisoHabitacionDesactive");
      avisoHabitacion.classList.add("avisoHabitacionActive");
      avisoHabitacion.style.backgroundColor = green;

      if (resultado) {
        imgAvisoHabitacion = "../../../img/tickAgregar.png";
        lblHabitacionAviso = "Habitacion liberada";
      }

      avisoHabitacion.innerHTML = `
    
    <img src="${imgAvisoHabitacion}">

    <label>${lblHabitacionAviso}</label>
    `;

      borrarAviso(avisoHabitacion);

      break;
  }

  recargar();
}

function borrarAviso(aviso) {
  setTimeout(function () {
    if (aviso == "aviso") {
      aviso.classList.add("avisoReservaDesactive");
    } else {
      aviso.classList.add("avisoHabitacionDesactive");
    }
  }, 2000);
}

function recargar() {
  setTimeout(function () {
    location.reload();
  }, 2020);
}

function cargarCalendario(calendar, events) {
  var calendarEl = calendar;
  calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "es",
    initialView: "dayGridMonth",
    initialDate: events[0].start,
    events: events,
  });
  calendar.render();
}

let cargarHabitacionesEstandar = document.querySelector(
  ".cargarHabitacionesEstandar"
);
let cargarHabitacionesDeluxe = document.querySelector(
  ".cargarHabitacionesDeluxe"
);

let cargarHabitacionesSuite = document.querySelector(
  ".cargarHabitacionesSuite"
);

if (cargarHabitacionesEstandar) {
  listHabitaciones = $("#habitacionesEstandar");
  loadRoomCategory(listHabitaciones, "Estandar");
} else if (cargarHabitacionesDeluxe) {
  listHabitaciones = $("#habitacionesDeluxe");
  loadRoomCategory(listHabitaciones, "Deluxe");
} else {
  listHabitaciones = $("#habitacionesSuite");
  loadRoomCategory(listHabitaciones, "Suite");
}

function loadRoomCategory(listHabitaciones, page) {
  switch (page) {
    case "Estandar":
      liBorderBottom("Estandar");
      break;

    case "Deluxe":
      liBorderBottom("Deluxe");
      break;

    case "Suite":
      liBorderBottom("Suite");
      break;
  }
  var inputHabitacionSearch = $("#numHabitacion");
  var divHabitaciones = listHabitaciones;
  var liHabitaciones = divHabitaciones.find("li");

  inputHabitacionSearch.on("change", function () {
    liHabitaciones.each(function () {
      var numHabitacion = $(this).data("habitacion").toString();
      if (numHabitacion.indexOf(inputHabitacionSearch.val()) != -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });

    var liHidden = liHabitaciones.filter(":hidden");

    if (liHidden.length == liHabitaciones.length) {
      $("#sinDatosHabitaciones").css("display", "block");
    } else {
      $("#sinDatosHabitaciones").css("display", "none");
    }
  });

  $(".iconoPlus").on("click", function () {
    let liHabitacion = $(this).parent();
    let numHabitacion = liHabitacion.data("habitacion");

    let menuRoom = $(".menuHabitacion");
    if (
      menuRoom.length > 0 &&
      $(this).attr("src") == "../../../img/menuHabitacion.png"
    ) {
      let liFatherRoom = menuRoom.parent();
      let iconoPlusMenuClose = liFatherRoom.find(".iconoPlus");
      iconoPlusMenuClose.attr("src", "../../../img/menuHabitacion.png");
      menuRoom.remove();
    }

    if ($(this).attr("src") == "../../../img/menuHabitacion.png") {
      $(this).attr("src", "../../../img/menuOpen.png");
      openMenuRoom(liHabitacion);
    } else {
      closeMenuRoom(liHabitacion);
      $(this).attr("src", "../../../img/menuHabitacion.png");
    }
  });

  const openMenuRoom = (liHabitacion) => {
    let menuRoom = document.createElement("ul");
    menuRoom.className = "menuHabitacion";
    menuRoom.innerHTML = `
        
        <li class="liHistorial">

            <div class="iconHistorial">
                <img src="../../../img/history.png">

            </div>
            <div>
                <a>Historial</a>
            </div>

        </li>
        <li class="liProximamente">

            <div>
                <img src="../../../img/long-term.png">
            </div>

            <div>
                <a>Proximamente</a>

            </div>
        </li>
        <li class="liServicesRoom">

            <div>
                <img src="../../../img/order-food.png">
            </div>
            <div>
                <a>Servicios</a>
            </div>
        </li>


     

        `;

    liHabitacion.append(menuRoom);
  };

  const closeMenuRoom = (liHabitacion) => {
    let menuRoomClose = liHabitacion.find(".menuHabitacion");
    menuRoomClose.remove();
  };

  optionsMenuRoom();
}

function optionsMenuRoom() {
  $(document).on("click", ".liHistorial", function () {
    $("#modal").css("display", "block");
    $("#modal").css("cursor", "none");

    let habitacion = $(this).parent().parent().closest("li");
    let numHabitacion = habitacion.data("habitacion");

    $("#divOpcion").load(
      "opcionesHabitacion/historial.php?numHabitacion=" + numHabitacion,
      function () {
        optionRecordRoom();
      }
    );
    $("#divOpcion").addClass("panelHistorial");
  });

  $(document).on("click", ".liProximamente", function () {
    $("#modal").css("display", "block");
    $("#modal").css("cursor", "none");

    let habitacion = $(this).parent().parent().closest("li");
    let numHabitacion = habitacion.data("habitacion");

    $("#divOpcion").load(
      "opcionesHabitacion/proximamente.php?numHabitacion=" + numHabitacion,
      function () {
        optionNextBookings();
      }
    );
    $("#divOpcion").addClass("panelProximamente");
  });

  const alertServiceOption = (option) => {
    if (option == "show") {
      $("#alert").css("display", "block");
    } else {
      $("#alert").css("display", "none");
      $("#modal").css("display", "none");
    }
  };

  $(document).on("click", ".liServicesRoom", function () {
    let habitacion = $(this).parent().parent().closest("li");
    let numHabitacion = habitacion.data("habitacion");
    let fechaSalidaHabitacionMasCercana = habitacion.data("salidaCercana");
    let fechaLlegadaHabitacionMasCercana = habitacion.data("llegadaCercana");
    let hoy = habitacion.data("hoy");

    $("#modal").css("display", "block");
    $("#modal").css("cursor", "none");

    if (
      fechaLlegadaHabitacionMasCercana == null ||
      fechaSalidaHabitacionMasCercana == null
    ) {
      alertServiceOption("show");
    } else {
      if (
        fechaLlegadaHabitacionMasCercana > hoy ||
        fechaSalidaHabitacionMasCercana < hoy
      ) {
        alertServiceOption("show");
      } else {
        $("#divOpcion").load(
          "opcionesHabitacion/servicios.php?numHabitacion=" + numHabitacion,
          function () {
            optionServicesRoom(numHabitacion);
          }
        );
        $("#divOpcion").addClass("panelServicesRoom");
      }
    }
  });

  $("#closeAlertBtn").on("click", function () {
    alertServiceOption("hide");
  });
}

function optionRecordRoom() {
  $("#cerrarVentana").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");

    $("#divOpcion").empty();
    $("#divOpcion").removeClass("panelHistorial");
  });

  $("#inputSearchBooking").on("keypress", function () {
    let valueInput = $(this).val();
    let liReservas = $(".liReserva");

    liReservas.each(function () {
      if ($(this).text().indexOf(valueInput) == -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });

    liReservasHidden = liReservas.filter(":hidden");

    if (liReservasHidden.length == liReservas.length) {
      $("#sinResultadosBooking").css("display", "block");
    } else {
      $("#sinResultadosBooking").css("display", "hidden");
    }
  });
}

function optionNextBookings() {
  $("#cerrarVentana").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");

    $("#divOpcion").empty();
    $("#divOpcion").removeClass("panelProximamente");
  });

  let divProximasReservas = document.getElementById("proximasReservas");
  proximasReservasHabitacion = JSON.parse(
    divProximasReservas.dataset.proximasReservas
  );
  let events = [];

  events = proximasReservasHabitacion.map((reserva) => {
    let llegada = reserva.fechaLlegadaHabitacion;
    let salida = reserva.fechaSalidaHabitacion;
    let idReserva = reserva.idReservaHabitacion;

    reserva = {
      idReserva: idReserva,
      title: `Reserva: ${idReserva}`,
      start: llegada,
      end: salida,
      url: "../reservas/lista.php?idReserva=" + idReserva,
    };

    return reserva;
  });

  let calendar = document.getElementById("calendarProximamente");

  cargarCalendario(calendar, events);
}

function optionServicesRoom(numHabitacion) {
  $("#cerrarPanelService").on("click", function () {
    $("#divOpcion").empty();
    $("#divOpcion").removeClass("panelServicesRoom");
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");
  });

  $("#panelOptionService").load(
    "opcionesHabitacion/opcionesServicios/historialServicios.php?numHabitacion=" +
      numHabitacion,
    function () {
      recordServicesRoom(numHabitacion);
    }
  );

  $("#liHistoryService").on("click", function () {
    $("#panelOptionService").empty();
    $("#panelOptionService").load(
      "opcionesHabitacion/opcionesServicios/historialServicios.php?numHabitacion=" +
        numHabitacion,
      function () {
        recordServicesRoom(numHabitacion);
      }
    );
  });

  $("#liAddService").on("click", function () {
    $("#panelOptionService").empty();
    $("#panelOptionService").load(
      "opcionesHabitacion/opcionesServicios/agregarServicio.php?numHabitacion=" +
        numHabitacion,
      function () {
        addServicesToRoom(numHabitacion);
      }
    );
  });

  $("#liDeleteService").on("click", function () {
    $("#panelOptionService").empty();
    $("#panelOptionService").load(
      "opcionesHabitacion/opcionesServicios/eliminarServicio.php?numHabitacion=" +
        numHabitacion,
      function () {
        deleteService(numHabitacion);
      }
    );
  });
}

function recordServicesRoom(numHabitacion) {
  var containServicios = document.getElementById("serviciosHabitacionEnCurso");
  $(document).ready(function () {
    fetch(
      "http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php?numHabitacion=" +
        numHabitacion,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((respuesta) => {
        if (respuesta.length > 0) {
          printServicesRoomBookingInCurse(respuesta);
        } else {
          $("#sinServiciosHabitacionHistorial").css("display", "block");
        }
      });
  });

  var printServicesRoomBookingInCurse = (servicesRoom) => {
    servicesRoom.forEach(function (serviceRoom) {
      var titleProductService;
      var quantityProduct = serviceRoom.cantidad;
      var imgService;
      var imgProduct;

      if (
        serviceRoom.nombreServicio == "Minibar" ||
        serviceRoom.nombreServicio == "Cantina"
      ) {
        titleProductService =
          serviceRoom.nombreServicio + ":" + serviceRoom.descripcionServicio;
      } else {
        titleProductService = serviceRoom.nombreServicio;
      }

      switch (serviceRoom.nombreServicio) {
        case "Telefono":
          imgService = "../../../img/telephone.png";
          quantityProduct = serviceRoom.cantidad;

          if (quantityProduct > 1) {
            quantityProduct += " minutos";
          } else {
            quantityProduct += " minuto";
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

<span>Total:$${serviceRoom.precio * serviceRoom.cantidad}</span>

</div>


    </li>



    `;
    });
  };
}

function addServicesToRoom(numHabitacion) {
  $("#liPhone").on("click", function () {
    $("#modalServices").css("display", "block");
    $("#modalServices").css("cursor", "none");

    $("#optionAddService").empty();
    $("#optionAddService").addClass("panelPhone");

    $("#optionAddService").load(
      "opcionesHabitacion/opcionesServicios/agregarServicios/telefonoServicio.php?numHabitacion=" +
        numHabitacion,
      function () {
        servicePhone(numHabitacion);
      }
    );
  });

  $("#liMassages").on("click", function () {
    $("#modalServices").css("display", "block");
    $("#modalServices").css("cursor", "none");

    $("#optionAddService").empty();
    $("#optionAddService").addClass("panelMassage");

    $("#optionAddService").load(
      "opcionesHabitacion/opcionesServicios/agregarServicios/masajeServicio.php?numHabitacion=" +
        numHabitacion,
      function () {
        serviceMassage(numHabitacion);
      }
    );
  });

  $("#liMiniBar").on("click", function () {
    $("#optionAddService").empty();
    $("#optionAddService").addClass("panelMiniBar");

    $("#optionAddService").load(
      "opcionesHabitacion/opcionesServicios/agregarServicios/miniBarServicio.php?numHabitacion=" +
        numHabitacion,
      function () {
        serviceMiniBar(numHabitacion);
      }
    );
  });

  $("#liCantina").on("click", function () {
    $("#optionAddService").empty();
    $("#optionAddService").addClass("panelCantina");

    $("#optionAddService").load(
      "opcionesHabitacion/opcionesServicios/agregarServicios/cantinaServicio.php?numHabitacion=" +
        numHabitacion
    );
  });
}

function servicePhone(numHabitacion) {
  $("#cerrar").on("click", function () {
    $("#modalServices").css("display", "none");
    $("#modalServices").css("cursor", "auto");

    $("#optionAddService").empty();
    $("#optionAddService").removeClass("panelPhone");
  });

  $("#clock").on("click", function () {
    if ($("#minutosLlamada").val() != "") {
      let formAddPhoneService = document.getElementById("formAddPhoneService");
      var calculatePhone = {
        precio: formAddPhoneService.dataset.price,
        cantidad: $("#minutosLlamada").val().trim(),
      };

      $("#lblTotalPhone").text(
        "Total:$" + calculatePhone.precio * calculatePhone.cantidad
      );
    }
  });

  $("#minutosLlamada").keydown(function (e) {
    if (e.keyCode == 8) {
      $("#lblTotalPhone").text("");
    }
  });

  $("#btnAgregar").on("click", function (event) {
    event.preventDefault();

    if ($("#minutosLlamada").val() == "") {
      $("#avisoErrorAddService").css("transform", "scale(1.0)");

      $("#lblAvisoError").text("Complete el campo de precio");

      deleteNotice($("#avisoErrorAddService"));
    } else {
      var idReserva = formAddPhoneService.dataset.idReserva;
      var idServicio = formAddPhoneService.dataset.idServicio;
      var precio = formAddPhoneService.dataset.price;
      var cantidad = parseInt($("#minutosLlamada").val());

      var phone = {
        idServicio: idServicio,
        cantidad: cantidad,
        precio: precio,
        idReserva: idReserva,
        numHabitacion: numHabitacion,
        total: precio * cantidad,
      };

      var servicio = [];
      servicio.push(phone);

      fetch(
        "http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php",
        {
          method: "POST",
          body: JSON.stringify(servicio),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((respuesta) => respuesta.json())
        .then((data_resp) => {
          if (data_resp.respuesta == true) {
            $("#modalService").css("display", "block");
            $("#modalService").css("cursor", "none");

            $("#msjServiceAdd").css("display", "block");
            $("#minutosLlamada").val("");
            $("#lblTotalPhone").text("");

            servicio = [];
          }
        });
    }
  });

  $("#buttonOk").on("click", function () {
    $("#modalService").css("display", "none");
    $("#modalService").css("cursor", "auto");

    $("#msjServiceAdd").css("display", "none");
  });
}

function serviceMassage(numHabitacion) {
  $("#cerrar").on("click", function () {
    $("#modalServices").css("display", "none");
    $("#modalServices").css("cursor", "auto");

    $("#optionAddService").empty();
    $("#optionAddService").removeClass("panelMassage");
  });

  var showNotice = (text, fontSize) => {
    $("#avisoErrorAddService").css("transform", "scale(1.0)");
    $("#avisoErrorAddService").css("font-size", fontSize);

    $("#lblAvisoError").text(text);
  };

  let formAddMassageService = document.getElementById("formAddMassageService");

  var cantHuespedes = formAddMassageService.dataset.cantHuespedes;
  $("#cantPersonas").on("change", function () {
    if ($(this).val() != "") {
      var precio = formAddMassageService.dataset.price;

      var cantidad = $(this).val();

      $("#totalService").text("Total:$" + precio * cantidad);
    }
  });

  $("#cantPersonas").keydown(function (e) {
    if (e.keyCode == 8) {
      $("#totalService").text("");
    }
  });

  $("#btnAgregar").on("click", function (event) {
    event.preventDefault();

    if ($("#cantPersonas").val() == "") {
      showNotice("Complete el campo de cantidad", 14);

      deleteNotice($("#avisoErrorAddService"));
    } else if (cantHuespedes != $("#cantPersonas").val().trim()) {
      showNotice("Cantidad no coincide con huespedes", 13);

      deleteNotice($("#avisoErrorAddService"));
    } else {
      var idReserva = formAddMassageService.dataset.idReserva;
      var idServicio = formAddMassageService.dataset.idServicio;
      var cantidad = parseInt($("#cantPersonas").val());
      var precio = formAddMassageService.dataset.price;

      var massage = {
        idServicio: idServicio,
        cantidad: cantidad,
        precio: precio,
        idReserva: idReserva,
        numHabitacion: numHabitacion,
        total: cantidad * precio,
      };

      var servicio = [];
      servicio.push(massage);

      fetch(
        "http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php",
        {
          method: "POST",
          body: JSON.stringify(servicio),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((respuesta) => respuesta.json())
        .then((data_resp) => {
          console.log(data_resp);
          if (data_resp.respuesta == true) {
            $("#modalService").css("display", "block");
            $("#modalService").css("cursor", "none");

            $("#msjServiceAdd").css("display", "block");
            $("#cantPersonas").val("");
            $("#totalService").text("");

            servicio = [];
          }
        });
    }
  });

  $("#buttonOk").on("click", function () {
    $("#modalService").css("display", "none");
    $("#modalService").css("cursor", "auto");

    $("#msjServiceAdd").css("display", "none");
  });
}

function serviceMiniBar(numHabitacion) {
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

  buttonsAdds.forEach(function (button) {
    button.addEventListener("click", function () {
      var sup = this.closest(".supCantidadBtnAgregar");
      var input = sup.querySelector("input");

      price = this.dataset.price;
      nameProduct = this.dataset.product;
      cant = input.value;
      image = this.dataset.image;
      maxStock = this.dataset.maxStock;
      idService = this.dataset.idService;
      idBooking = this.dataset.idBooking;

      if (cant == 0) {
        alert("Ingresa una cantidad valida");
      } else {
        var productIsset = additionProductCant(nameProduct, cant);

        if (productIsset == false) {
          var product = {
            idService: parseInt(idService),
            name: nameProduct,
            price: price,
            cant: parseInt(cant),
            image: image,
            maxStock: maxStock,
            idBooking: idBooking,
            numRoom: numHabitacion,
            total: price * cant,
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
        idServicio: product.idService,
        cantidad: product.cant,
        idReserva: product.idBooking,
        numHabitacion: product.numRoom,
        total: product.total,
      };

      return serviceToBd;
    });
  };

  var printProductsAdded = (products) => {
    btnAgregarServicio.style.display = "block";
    divDeposito.style.display = "block";

    cleanList();
    var totalCart = totalPriceCart(products);

    products.forEach(function (product) {
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

    deletes.forEach(function (deleteProduct) {
      deleteProduct.addEventListener("click", function () {
        var divFatherDelete = deleteProduct.parentNode;
        var productNameDelete = divFatherDelete.dataset.delete;

        deleteProductCart(productNameDelete);
      });
    });

    var substractions = document.querySelectorAll(".substraction");

    substractions.forEach(function (substraction) {
      substraction.addEventListener("click", function () {
        var divFatherMinus = this.parentNode;
        var productNameMinus = divFatherMinus.dataset.minus;

        substractionProduct(productNameMinus);
      });
    });

    var additions = document.querySelectorAll(".addition");

    additions.forEach(function (addition) {
      addition.addEventListener("click", function () {
        var divFatherAddition = this.parentNode;
        var productNameAddition = divFatherAddition.dataset.addition;

        additionProductCant(productNameAddition, 1);
      });
    });
  };

  var alert = (text) => {
    aviso.querySelector("span").textContent = text;
    aviso.style.display = "block";
    $("#modalService").css("display", "block");
    $("#modalService").css("cursor", "none");
  };

  var cleanList = () => {
    divListaProductos.innerHTML = "";
    spanTotal.innerHTML = "";
    if (products.length == 0) {
      divDeposito.style.display = "none";
      btnAgregarServicio.style.display = "none";
    }
  };

  var totalPriceCart = (products) => {
    var totalCart = products.reduce(
      (total, product) => total + product.total,
      0
    );

    return totalCart;
  };

  var deleteProductCart = (productName) => {
    products = products.filter((product) => product.name != productName);

    printProductsAdded(products);
  };

  var substractionProduct = (productName) => {
    var productSubstraction = products.find(
      (product) => product.name === productName
    );

    if (productSubstraction.cant > 1) {
      productSubstraction.cant--;
      productSubstraction.total =
        productSubstraction.cant * productSubstraction.price;

      printProductsAdded(products);
    }
  };

  var additionProductCant = (productName, cantAdded) => {
    var productIsset = false;
    var limitStock = false;

    if (products.length > 0) {
      var productAdditionCant = null;
      productAdditionCant = products.find(
        (product) => product.name === productName
      );

      if (productAdditionCant != null) {
        productIsset = true;
        if (
          parseInt(productAdditionCant.cant) + parseInt(cantAdded) <=
          productAdditionCant.maxStock
        ) {
          productAdditionCant.cant =
            parseInt(productAdditionCant.cant) + parseInt(cantAdded);
          productAdditionCant.total =
            productAdditionCant.cant * productAdditionCant.price;

          printProductsAdded(products);
        } else {
          alert("Maxima cantidad alcanzada");
        }
      }
    }

    return productIsset;
  };

  $("#buttonAviso").on("click", function () {
    aviso.style.display = "none";
    aviso.querySelector("span").textContent = "";
    $("#modalService").css("display", "none");
    $("#modalService").css("cursor", "auto");
  });

  $("#cerrarMinibar").on("click", function () {
    $("#optionAddService").empty();

    $("#optionAddService").removeClass("panelMiniBar");
  });

  btnAgregarServicio.addEventListener("click", function () {
    createObjectServiceToBd();

    fetch(
      "http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php",
      {
        method: "POST",
        body: JSON.stringify(servicio),

        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data_resp) => {
        if (data_resp.respuesta == true) {
          alert("Servicios de minibar agregados");
          var img = $("#imgAviso").find("img");
          img.attr("src", "../../../img/tickServices.gif");

          document.querySelectorAll(".inputCant").forEach(function (input) {
            input.value = 0;
          });

          products = [];
          cleanList();
        }
      });
  });
}

function deleteNotice(alert) {
  setTimeout(function () {
    alert.css("transform", "scale(0.0)");
    var lbl = alert.find("label");
    lbl.text("");
  }, 4000);
}

function deleteService(numHabitacion) {
  var buttonsDeletes = document.querySelectorAll(".buttonDelete");

  buttonsDeletes = Array.from(buttonsDeletes);

  buttonsDeletes.forEach(function (buttonDelete) {
    buttonDelete.addEventListener("click", function () {
      var divSupButton = this.parentNode;
      var nombreServicio = divSupButton.dataset.nombreServicio;
      var idServicioHabitacion = divSupButton.dataset.idServicioHabitacion;
      var idReserva = divSupButton.dataset.idReserva;
      var totalService =
        divSupButton.dataset.precio * divSupButton.dataset.cantidad;

      var serviceDelete = {
        idServicioHabitacion: idServicioHabitacion,
        idReserva: idReserva,
        totalService: totalService,
      };

      fetch(
        "http://localhost/sistema%20Hotel/controller/admin/habitaciones/opcionServicio.php?serviceDelete=" +
          JSON.stringify(serviceDelete),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((respuesta) => {
          console.log(respuesta.resultado);
          if (respuesta.resultado == true) {
            $("#avisoServiceDelete").css("display", "block");
            $("#avisoSpan").text(`Servicio de ${nombreServicio} eliminado`);
            $("#modalService").css("display", "block");
          }
        });
    });
  });

  $("#btnClose").on("click", function () {
    $("#avisoServiceDelete").css("display", "none");
    $("#avisoSpan").text("");
    $("#modalService").css("display", "none");

    $("#panelOptionService").empty();
    $("#panelOptionService").load(
      "opcionesHabitacion/opcionesServicios/eliminarServicio.php?numHabitacion=" +
        numHabitacion
    );

    deleteService(numHabitacion);
  });
}


let viewGrafica=document.getElementById("viewGrafica");

if(viewGrafica){

  liBorderBottom("grafica");

  loadGraphicRooms(viewGrafica.dataset.porcentajeEstandar,viewGrafica.dataset.porcentajeDeluxe,
    viewGrafica.dataset.porcentajeSuite
  );
}

function loadGraphicRooms(porcentajeEstandar,porcentajeDeluxe,porcentajeSuite){

dataPointsHabitacionesReservadas = [];


if (porcentajeEstandar!==0 || porcentajeDeluxe!==0|| porcentajeSuite!==0) {

    $("#sinDatos").css("display", "none");

    dataPointsHabitacionesReservadas.push({
            "y":  porcentajeEstandar,
            "label": "Estandar"
        }, {
            "y": porcentajeDeluxe,
            "label": "Deluxe"

        }, {
            "y":porcentajeSuite,
            "label": "Suite"

        }

    );

}



window.onload = function() {


    if (dataPointsHabitacionesReservadas.length > 0) {

        graficarHabitaciones(dataPointsHabitacionesReservadas, "graficaHabitaciones",
            "Categoria de habitaciones mas reservadas");

    }


};

}