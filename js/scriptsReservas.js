function buscadorReserva() {
  const texto = $("#buscador").val();

  var trBody = $(".trBody");

  var cont = 0;
  trBody.each(function () {
    cont++;

    if ($(this).text().indexOf(texto) === -1) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });

  var trHidden = trBody.filter(":hidden");
  if (trHidden.length === cont) {
    $("#sinDatosTblReservas").css("display", "block");
  } else {
    $("#sinDatosTblReservas").css("display", "none");
  }
}

function buscadorParametroReserva(valueFind, tdClass, dataSet) {
  var tds = $(tdClass);

  tds.each(function () {
    var tr = $(this).parent();

    var tdValue = $(this).data(dataSet);

    if (tdValue == valueFind) {
      tr.show();
    } else {
      tr.hide();
    }
  });
}

function opcionReserva(datosReserva, opcion) {
  var reserva = datosReserva[0];

  $("#modal").css("display", "block");
  $("#modal").css("cursor", "none");

  switch (opcion) {
    case "eliminar":
      $(".divOpcion").addClass("divConfirmacionDelete");
      $(".divOpcion").load(
        "formEliminar.php?reserva=" +
          encodeURIComponent(JSON.stringify(reserva)),
        function () {
          optionDelete();
        }
      );

      break;
    case "editar":
      $(".divOpcion").addClass("divEditar");
      $(".divOpcion").load(
        "formEditar.php?reserva=" + encodeURIComponent(JSON.stringify(reserva)),
        function () {
          submitUpdate();
          optionUpdate();
          updateCancel();
        }
      );

      break;

    case "info":
      $(".divOpcion").addClass("divInfo");
      $(".divOpcion").load(
        "infoReserva.php?reserva=" +
          encodeURIComponent(JSON.stringify(reserva)),
        function () {
          optionInfo();
        }
      );

      break;
  }
}

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

let tableReservas = document.getElementById("tableReservas");

if (tableReservas) {
  liBorderBottom("listaReservas");

  $("#tableReservas").load("cargarTabla.php", function () {
    var idReserva = $(this).data("idReservaSearch");

    if (idReserva !== "") {
      buscadorParametroReserva(idReserva, ".tdIdReserva", "id-reserva");
    }

    chooseOption();
  });

  $("#buscador").on("keydown", function () {
    buscadorReserva();
  });
}

const showHideBuscador = (estado) => {
  $("#buscador").css("display", estado);
  $(".lupa").css("display", estado);
};

function btnEditDisabled(idReserva) {
  const buttonsEditar = $(".btnEditar");

  buttonsEditar.each(function () {
    var btnIdReserva = $(this).data("id");

    if (idReserva == btnIdReserva) {
      let img = $(this).find("img");
      $(this).prop("title", "No se puede editar una reserva ya finalizada ");
      $(this).prop("disabled", true);
      img.attr("src", "../../../img/editDisabled.png");
      img.css("opacity", "50%");
      $(this).css("backgroundColor", "#025F7D");
    }
  });
}

function chooseOption() {
  let datosReserva = [];

  const btns = $(".trBody").find("button");

  btns.each(function () {
    const opcion = $(this).data("opcion");

    $(this).on("click", function () {
      const reserva = {
        idReserva: $(this).data("id"),
        idCliente: $(this).data("cliente"),
        llegada: $(this).data("llegada"),
        salida: $(this).data("salida"),
        cantidadHabitaciones: $(this).data("cantidad"),
      };
      datosReserva.push(reserva);

      switch (opcion) {
        case "eliminar":
          opcionReserva(datosReserva, "eliminar");

          break;

        case "editar":
          opcionReserva(datosReserva, "editar");
          break;

        case "info":
          opcionReserva(datosReserva, "info");
          break;
      }
    });
  });
}

//opcion editar

function submitUpdate() {
  $("#formEditar").on("submit", function (event) {
    event.preventDefault();

    const datosReserva = {
      idReserva: $("#formEditar").data("idReserva"),
      idCliente: $("#cliente").val().trim(),
      llegada: $("#fechaLlegada").val().trim(),
      salida: $("#fechaSalida").val().trim(),
      cantidadHabitaciones: $("#cantidadHabitaciones").val().trim(),
    };

    console.log(datosReserva);
    fetch(
      "http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionReserva.php",
      {
        method: "PUT",
        body: JSON.stringify({
          reserva: datosReserva,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data_resp) => {
        console.log(data_resp.respuesta);
        if (data_resp.respuesta == true) {
          $("#modal").css("display", "none");
          $("#modal").css("cursor", "auto");

          $(".divOpcion").removeClass("divEditar");
          $(".divOpcion").empty();

          aviso(data_resp.respuesta, "Editar");
        } else {
          const lbl = $("#alertaEditar").find("label");
          lbl.text(data_resp.respuesta);
          $("#alertaEditar").addClass("alertaEditarActive");
        }
      });
  });
}

function optionUpdate() {
  let idReserva = $("#formEditar").data("idReserva");

  $(".editarHabitacion").on("click", function () {
    $(".divOpcion").empty();
    $(".divOpcion").load(
      "formHabitaciones.php?idReserva=" + idReserva,
      function () {
        editRooms();
      }
    );
    $(".divEditar").css("marginTop", "-40%");
  });
}

function editRooms() {
  $("#cerrarHabitaciones").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");

    $(".divOpcion").removeClass("divEditar");
    $(".divOpcion").empty();
    location.reload();
  });

  $(".editarReserva").on("click", function () {
    let formEditarHabitaciones = document.getElementById(
      "formEditarHabitaciones"
    );

    var reserva = {
      idReserva: formEditarHabitaciones.dataset.idReserva,
      idCliente: formEditarHabitaciones.dataset.idCliente,
      llegada: formEditarHabitaciones.dataset.llegada,
      salida: formEditarHabitaciones.dataset.salida,
      cantidadHabitaciones: formEditarHabitaciones.dataset.cantidadHabitaciones,
    };

    $(".divOpcion").empty();
    $(".divOpcion").load(
      "formEditar.php?reserva=" + encodeURIComponent(JSON.stringify(reserva)),
      function () {
        submitUpdate();
        optionUpdate();
        updateCancel();
      }
    );
    $(".divEditar").css("marginTop", "-46%");
  });

  $(".btnLibrar").on("click", function () {
    var habitacion = $(this).parent();

    var numeroHabitacion = habitacion.data("habitacion");
    var idReserva = formEditarHabitaciones.dataset.idReserva;

    $("#modalHabitaciones").css("display", "inline");
    $("#modal").css("cursor", "none");

    $("#opcionHabitacion").addClass("panelHabitacionLibrar");
    $("#opcionHabitacion").load(
      "editarHabitaciones/librarHabitacion.php?idReserva=" +
        idReserva +
        "&habitacion=" +
        numeroHabitacion,
      function () {
        freeRoom();
      }
    );
  });

  $(".btnEliminar").on("click", function () {
    var habitacion = $(this).parent();

    var numeroHabitacion = habitacion.data("habitacion");
    var idReserva = formEditarHabitaciones.dataset.idReserva;

    $("#modalHabitaciones").css("display", "inline");
    $("#modal").css("cursor", "none");

    $("#opcionHabitacion").addClass("panelHabitacionEliminar");
    $("#opcionHabitacion").load(
      "editarHabitaciones/eliminarHabitacion.php?idReserva=" +
        idReserva +
        "&habitacion=" +
        numeroHabitacion,
      function () {
        deleteRoomBooking(idReserva, numeroHabitacion);
      }
    );
  });
}

function updateCancel() {
  $("#btnCancelar").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");

    $(".divOpcion").removeClass("divEditar");
    $(".divOpcion").empty();
    location.reload();
  });
}

function deleteRoomBooking(idReserva, numeroHabitacion) {
  $(".btnSi").on("click", function () {
    const eliminarHabitacion = {
      idReserva: idReserva,
      habitacion: numeroHabitacion,
    };

    datosHabitacion = [];

    datosHabitacion.push(
      encodeURIComponent(JSON.stringify(eliminarHabitacion))
    );

    var url = `http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionHabitacion.php?datosHabitacion=
        ${datosHabitacion}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data_resp) => {
        if (data_resp.respuesta == true) {
          $("#opcionHabitacion").empty();
          $("#opcionHabitacion").load("habitacionEliminada.html", function () {
            $(".bodyHabitacionEliminada").addClass(
              "bodyHabitacionEliminadaShow"
            );
          });
        }
      });
  });

  $(".btnNo").on("click", function () {
    $("#opcionHabitacion").empty();
    $("#opcionHabitacion").removeClass("panelHabitacionEliminar");

    $(".divOpcion").empty();
    $(".divOpcion").load(
      "formHabitaciones.php?idReserva=" + idReserva,
      function () {
        editRooms();
      }
    );
  });
}

function freeRoom() {
  $("#cerrar").on("click", function () {
    $("#opcionHabitacion").removeClass("panelHabitacionLibrar");
    $("#opcionHabitacion").empty();
  });

  $("#btnLiberar").on("click", function (event) {
    event.preventDefault();

    if ($("#inputFechaLiberada").val() == "") {
      const lbl = $("#alertaLibrar").find("label");
      lbl.text("Complete la fecha");
      $("#alertaLibrar").addClass("alertaAsignarActive");
    } else {
      var idReserva = "<?php echo $idReserva ?>";
      var habitacion = "<?php echo $numHabitacion ?>";
      var fechaLiberada = $("#inputFechaLiberada").val().trim();

      const reserva = {
        idReserva: idReserva,
        habitacion: habitacion,
        fechaLiberada: fechaLiberada,
        opcion: "liberar",
      };

      console.log(reserva);

      fetch(
        "http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionHabitacion.php",
        {
          method: "PUT",
          body: JSON.stringify({
            reserva: reserva,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((data_resp) => {
          const lbl = $("#alertaLibrar").find("label");
          const img = $("#alertaLibrar").find("img");
          lbl.text(data_resp.respuesta);

          if (
            data_resp.respuesta == "Fecha de salida de la habitacion cambiada"
          ) {
            img.attr("src", "../../../img/tickAgregar");
          }

          $("#alertaLibrar").addClass("alertaAsignarActive");
        });
    }
  });
}

//opcion informacion

function optionInfo() {
  let optionInfoBooking = document.getElementById("opcionInfoReserva");

  if (optionInfoBooking) {
    var reserva = {
      idReserva: optionInfoBooking.dataset.idReserva,
      llegada: optionInfoBooking.dataset.llegada,
      salida: optionInfoBooking.dataset.salida,
      idCliente: optionInfoBooking.dataset.idCliente,
    };

    $("#panelInfo").load(
      "opcionesInfoReserva/calendario.php?reserva=" + JSON.stringify(reserva),
      function () {
        optionBooking();
      }
    );

    $(".liCalendario").on("click", function () {
      $("#panelInfo").load(
        "opcionesInfoReserva/calendario.php?reserva=" + JSON.stringify(reserva),
        function () {
          optionBooking();
        }
      );
    });

    $(".liCliente").on("click", function () {
      $("#panelInfo").load(
        "opcionesInfoReserva/cliente.php?reserva=" + JSON.stringify(reserva)
      );
    });

    $(".liHabitaciones").on("click", function () {
      $("#panelInfo").load(
        "opcionesInfoReserva/habitaciones.php?reserva=" +
          JSON.stringify(reserva)
      );
    });

    $(".liHuespedes").on("click", function () {
      $("#panelInfo").load(
        "opcionesInfoReserva/huespedes.php?reserva=" + JSON.stringify(reserva)
      );
    });

    $(".liServicios").on("click", function () {
      $("#panelInfo").load(
        "opcionesInfoReserva/servicios.php?reserva=" + JSON.stringify(reserva),
        function () {
          optionService();
        }
      );
    });
    $(".liFactura").on("click", function () {
      $("#panelInfo").load(
        "opcionesInfoReserva/factura.php?reserva=" + JSON.stringify(reserva)
      );
    });

    $("#cerrar").on("click", function () {
      $(".divInfo").empty();
      $(".divOpcion").removeClass("divInfo");
      $("#modal").css("display", "none");
      location.reload();
    });
  }
}

function optionBooking() {
  let calendar = document.getElementById("calendarInfoReserva");

  let numReserva = calendar.dataset.idReserva;
  let inicioReserva = calendar.dataset.llegada;
  let finReserva = calendar.dataset.salida;

  const event = {
    title: "Reserva " + numReserva,
    start: inicioReserva,
    end: finReserva,
    url: "lista.php?idReserva=" + numReserva,
    backgroundColor: "#329DBF",
  };

  let events = [];

  events.push(event);

  cargarCalendario(calendar, events);
}

function optionService() {
  let divDetailsService = document.getElementById("detailsService");

  var modal = document.getElementById("modalServicesBooking");
  var buttonsDetails = document.querySelectorAll(".btnDetalles");

  buttonsDetails.forEach(function (button) {
    button.addEventListener("click", function () {
      divDetailsService.style.display = "block";
      modal.style.display = "block";

      var quantity = this.dataset.quantity;
      var price = this.dataset.price;
      var image = this.dataset.image;

      divDetailsService.innerHTML = `
            

            <img class="closeWindow" src="../../../img/cerrarVentana.png">
            

            <div class="titleDetails">

            <div class="icon">

            <img src="${image}">
            </div>

            <div>
            <span>Detalles</span>
            </div>
            </div>

            <div class="containDetails">
            <div class="quantity">

            <span>Cantidad:${quantity}</span>
            </div>

            <div class="price">

     <span>Precio:$${price}</span>
            </div>

            <div class="total">

            <span>Total:$${price * quantity}</span>
            </div>
            </div>

            `;

      var close = document.querySelector(".closeWindow");

      close.addEventListener("click", function () {
        divDetailsService.style.display = "none";
        divDetailsService.empty;
        modal.style.display = "none";
      });
    });
  });
}

function optionDelete() {
  $(".btnSi").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");
    $(".divOpcion").remove();

    const datosReserva = {
      idReserva: $(this).data("idReserva"),
      llegada: $(this).data("llegada"),
      salida: $(this).data("salida"),
      cantidadHabitaciones: $(this).data("cantidadHabitaciones"),
    };

    var datosReservaJson = [];

    datosReservaJson.push(encodeURIComponent(JSON.stringify(datosReserva)));
    console.log(datosReservaJson);

    var url = `http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionReserva.php?reserva=
    ${datosReservaJson}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data_resp) => {
        if (data_resp) {
          $(".divOpcion").removeClass("divConfirmacionDelete");
          $(".divOpcion").empty();
        }
        aviso(data_resp, "Eliminar");
      });
  });

  $(".btnNo").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");

    $(".divOpcion").removeClass("divConfirmacionDelete");
    $(".divOpcion").empty();
    location.reload();
  });
}

// opcion agregar

const changeEventColor = (finReserva) => {
  let hoy = new Date();
  let salida = new Date(finReserva);

  if (salida > hoy) {
    //azul
    return "#329DBF";
  } else {
    //rojo
    return "#F04141";
  }
};

let containerCalendar = document.getElementById("containerCalendar");

if (containerCalendar) {
  loadDataBookingsCalendar();

  liBorderBottom("agregarReserva");
}

function loadDataBookingsCalendar() {
  window.onload = function () {
    let reservas = [];
    let events = [];
    let reserva,
      numReserva,
      llegada,
      salida,
      clienteNombre,
      clienteCorreo,
      clienteApellido;

    reservas = JSON.parse(containerCalendar.dataset.reserva);

    events = reservas.map((reserva) => {
      numReserva = reserva.idReserva;
      llegada = reserva.fechaLlegada;
      salida = reserva.fechaSalida;
      clienteNombre = reserva.nombreCliente;
      clienteCorreo = reserva.correoCliente;
      clienteApellido = reserva.apellidoCliente;

      reserva = {
        id: numReserva,
        title: `Reserva: ${numReserva}`,
        start: llegada,
        end: salida,
        extendedProps: {
          clienteCorreo: clienteCorreo,
          clienteNombre: clienteNombre,
          clienteApellido: clienteApellido,
        },
        backgroundColor: changeEventColor(salida),
        borderColor: changeEventColor(salida),
      };

      return reserva;
    });

    let calendarAdd = document.getElementById("calendarAdd");

    cargarCalendarioAddEvent(calendarAdd, events);
  };
}

function cargarCalendario(calendar, evento) {
  var calendarEl = calendar;
  calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "es",
    initialView: "dayGridMonth",
    initialDate: evento[0].start,
    events: evento,

    eventMouseEnter: function (info) {
      info.event.setProp("backgroundColor", "#2984A2");
    },

    eventMouseLeave: function (info) {
      info.event.setProp("backgroundColor", "#329DBF");
    },
  });
  calendar.render();
}

function cargarCalendarioAddEvent(calendar, evento) {
  var hoy = new Date();
  var calendarEl = calendar;
  calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "es",
    initialView: "dayGridMonth",
    selectable: true,
    initialDate: hoy,
    events: evento,
    eventClick: function (info) {
      descriptionEvent(info.jsEvent, info.event);
    },

    select: function (info) {
      modalNewReserve(info);
    },

    eventMouseEnter: function (info) {
      if (info.event.end < hoy) {
        info.event.setProp("backgroundColor", "#D03232");
      } else {
        info.event.setProp("backgroundColor", "#1A69A2");
      }
    },

    eventMouseLeave: function (info) {
      if (info.event.end < hoy) {
        info.event.setProp("backgroundColor", "#F04141");
      } else {
        info.event.setProp("backgroundColor", "#329DBF");
      }
    },
  });

  calendar.render();
}

var valueMouseEnterEvent = 0;
const descriptionEvent = (jsEvent, dataEvent) => {
  if (
    $("#descriptionEvent").length == 0 ||
    dataEvent.id != valueMouseEnterEvent
  ) {
    if ($("#descriptionEvent").length > 0) {
      $("#descriptionEvent").remove();
    }

    valueMouseEnterEvent = dataEvent.id;
    var idReserva = dataEvent.id;
    var llegada = dataEvent.start;
    var salida = dataEvent.end;
    var nombre = dataEvent.extendedProps.clienteNombre;
    var apellido = dataEvent.extendedProps.clienteApellido;
    var correo = dataEvent.extendedProps.clienteCorreo;
    llegada = llegada.toLocaleDateString();
    salida = salida.toLocaleDateString();

    var divDescriptionEvent = document.createElement("div");
    divDescriptionEvent.id = "descriptionEvent";
    divDescriptionEvent.style.left = jsEvent.pageX + "px";
    divDescriptionEvent.style.top = jsEvent.pageY + "px";
    divDescriptionEvent.innerHTML = `
        <img src="../../../img/detalles.png">
        <br>
        <h1><a target="_blank" class="linkReserva" href="lista.php?idReserva=${idReserva}">Reserva${idReserva}<a></h1>
    
     <li>Llegada:${llegada}</li>
     <li>salida:${salida}</li>
     <li>cliente:<a target="_blank" class="linkCliente" href="../../admin/clientes/lista.php?cliente=${correo}">
     ${nombre} ${apellido}(${correo})</a></li>

    `;

    calendarAdd.appendChild(divDescriptionEvent);
    divDescriptionEvent.classList.remove("descriptionEventHide");
    divDescriptionEvent.classList.add("descriptionEventShow");

    const btnCerrar = document.createElement("img");
    btnCerrar.id = "btnCerrar";
    btnCerrar.src = "../../../img/cerrarVentana.png";
    divDescriptionEvent.appendChild(btnCerrar);

    $("#btnCerrar").on("click", function () {
      $("#descriptionEvent").remove();
    });
  }
};

const modalNewReserve = (info) => {
  // alert('selected ' + info.startStr + ' to ' + info.endStr);

  const fechaLlegada = info.startStr;
  const fechaSalida = info.endStr;
  $("#modal").css("display", "block");
  $("#modal").css("cursor", "none");

  $(".divOpcion").addClass("newReserve");
  $(".divOpcion").load(
    "formAgregar.php?fechaLlegada=" + fechaLlegada,
    "&fechaSalida=" + fechaSalida,
    function () {
      optionAdd();
    }
  );
};

function optionAdd() {
  $("#formAgregar").on("submit", function (event) {
    event.preventDefault();

    if ($("#cantidadHabitaciones").val().trim() == "") {
      const lbl = $("#alertaAgregar").find("label");
      lbl.text("Complete todos los campos");
      $("#alertaAgregar").addClass("alertaAgregarActive");
    } else {
      const datosReserva = {
        idCliente: $("#cliente").val().trim(),
        llegada: $("#fechaLlegada").val().trim(),
        salida: $("#fechaSalida").val().trim(),
        cantidadHabitaciones: $("#cantidadHabitaciones").val().trim(),
      };

      fetch(
        "http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionReserva.php",
        {
          method: "POST",
          body: JSON.stringify({
            reserva: datosReserva,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((data_resp) => {
          console.log(data_resp.respuesta);
          if (data_resp.respuesta == true) {
            $(".divOpcion").removeClass("newReserve");
            $(".divOpcion").empty();
            $(".divOpcion").addClass("bookingAdd");
            $(".divOpcion").load("reservaAgregada.html", function () {
              $(".bodyReservaAgregada").addClass("bodyReservaAgregadaShow");
            });
          } else {
            const lbl = $("#alertaAgregar").find("label");
            lbl.text(data_resp.respuesta);
            $("#alertaAgregar").addClass("alertaAgregarActive");
          }
        });
    }
  });

  $("#btnCancelar").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");

    $(".divOpcion").removeClass("newReserve");
    $(".divOpcion").empty();
    location.reload();
  });
}

//habitaciones para agregar a la reserva

let cargarHabitaciones = document.querySelector(".cargarHabitaciones");

if (cargarHabitaciones) {
  loadRooms();
  liBorderBottom("habitaciones");
}

function loadRooms() {
  window.onload = function () {
    $(".cargarHabitaciones").empty();

    let pagina = localStorage.getItem("opcionHabitacion");

    switch (pagina) {
      case "Estandar":
      default:
        $(".cargarHabitaciones").load(
          "editarHabitaciones/estandar.php",
          function () {
            var listHabitaciones = $("#habitacionesEstandar");
            optionsRoom("Estandar", listHabitaciones);
          }
        );
        break;

      case "Deluxe":
        $(".cargarHabitaciones").load(
          "editarHabitaciones/deluxe.php",
          function () {
            var listHabitaciones = $("#habitacionesDeluxe");
            optionsRoom("Deluxe",listHabitaciones);
           
          }
        );
        break;

      case "Suite":
        $(".cargarHabitaciones").load(
          "editarHabitaciones/suite.php",
          function () {
            var listHabitaciones = $("#habitacionesSuite");
            optionsRoom("Suite", listHabitaciones);
          }
        );
        break;
    }
  };

  $(".liEstandar").on("click", function () {
    localStorage.setItem("opcionHabitacion", "Estandar");
    $(".cargarHabitaciones").empty();
    $(".cargarHabitaciones").load(
      "editarHabitaciones/estandar.php",
      function () {
        var listHabitaciones = $("#habitacionesEstandar");
        optionsRoom("Estandar", listHabitaciones);
      }
    );
  });

  $(".liDeluxe").on("click", function () {
    localStorage.setItem("opcionHabitacion", "Deluxe");
    $(".cargarHabitaciones").empty();
    $(".cargarHabitaciones").load("editarHabitaciones/deluxe.php", function () {
      var listHabitaciones = $("#habitacionesDeluxe");
      optionsRoom("Deluxe", listHabitaciones);
    });
  });

  $(".liSuite").on("click", function () {
    localStorage.setItem("opcionHabitacion", "Suite");
    $(".cargarHabitaciones").empty();
    $(".cargarHabitaciones").load("editarHabitaciones/suite.php", function () {
      var listHabitaciones = $("#habitacionesSuite");
      optionsRoom("Suite", listHabitaciones);
    });
  });
}

function optionsRoom(category, listHabitaciones) {
  var inputHabitacionSearch = $("#numHabitacion");
  let divHabitaciones = listHabitaciones;
  let liHabitaciones = divHabitaciones.find("li");

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

  $(".iconoCalendar").on("click", function () {
    var habitacion = $(this).parent();

    var numeroHabitacion = habitacion.data("habitacion");

    $("#modal").css("display", "inline");
    $("#modal").css("cursor", "none");

    $("#divOpcion").addClass("reservaMasCercana");
    $("#divOpcion").load(
      "editarHabitaciones/calendarioHabitacion.php?habitacion=" +
        encodeURIComponent(numeroHabitacion),
      function () {
        loadFutureBookingsRoomCalendar();
      }
    );
    $("#modal").css("display", "block");
  });

  $(".btnOcupar").on("click", function () {
    var habitacion = $(this).parent();

    var numeroHabitacion = habitacion.data("habitacion");
    occupyRoom(category, numeroHabitacion);
  });

  $(".btnDetalles").on("click", function () {
    var habitacion = $(this).parent();

    var numeroHabitacion = habitacion.data("habitacion");
    detailRoomReserve(category, numeroHabitacion);
  });
}

function detailRoomReserve(category, numeroHabitacion) {
  $("#modal").css("display", "inline");
  $("#modal").css("cursor", "none");

  $("#divOpcion").addClass("panelHabitacionDetalles");
  $("#divOpcion").load(
    "editarHabitaciones/detallesHabitacion.php?habitacion=" +
      encodeURIComponent(numeroHabitacion) +
      "&categoria=" +
      category,
    function () {
      optionsDetailsRoom(numeroHabitacion);
    }
  );
  $("#modal").css("display", "block");
}

function optionsDetailsRoom(numeroHabitacion) {
  $("#opcion").load(
    "editarHabitaciones/detalles/reserva.php?habitacion=" + numeroHabitacion,
    function () {
      loadDataCalendarDetailRoom();
    }
  );

  $(".reserva").on("click", function () {
    $("#opcion").load(
      "editarHabitaciones/detalles/reserva.php?habitacion=" + numeroHabitacion,
      function () {
        loadDataCalendarDetailRoom();
      }
    );

    widthDivDetalles();
  });

  $(".cliente").on("click", function () {
    $("#opcion").empty();
    $("#opcion").load(
      "editarHabitaciones/detalles/cliente.php?habitacion=" + numeroHabitacion
    );

    widthDivDetalles();
  });

  $(".huespedes").on("click", function () {
    $("#opcion").empty();
    $("#opcion").load(
      "editarHabitaciones/detalles/huespedes.php?habitacion=" + numeroHabitacion
    );

    widthDivDetalles();
  });

  $("#cerrar").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");
    $("#divOpcion").removeClass("panelHabitacionRemplazar");
    $("#divOpcion").removeClass("panelHabitacionAsignar");
    $("#divOpcion").empty();
    widthDivDetalles();
  });

  function widthDivDetalles() {
    $("#divDetalles").css("width", "400px");
    $("#divDetalles").css("marginLeft", "40%");
    $(".logoDetalles").css("marginLeft", "170px");
  }
}

function loadDataCalendarDetailRoom() {
  $("#divDetalles").css("width", "550px");
  $("#divDetalles").css("marginLeft", "35%");
  $(".logoDetalles").css("marginLeft", "240px");

  let reserva = document.getElementById("reserva");

  var numReserva = reserva.dataset.idReserva;
  var inicioReserva = reserva.dataset.llegada;
  var finReserva = reserva.dataset.salida;

  var evento = {
    title: "Reserva " + numReserva,
    start: inicioReserva,
    end: finReserva,
    url: "lista.php?idReserva=" + numReserva,
    backgroundColor: "#329DBF",
  };

  let events = [];

  events.push(evento);

  var calendar = document.getElementById("calendar");

  cargarCalendario(calendar, events);
}

function occupyRoom(category, numeroHabitacion) {
  $("#modal").css("display", "inline");
  $("#modal").css("cursor", "none");

  $("#divOpcion").addClass("panelHabitacionAsignar");
  $("#divOpcion").load(
    "editarHabitaciones/asignarHabitacion.php?habitacion=" +
      encodeURIComponent(numeroHabitacion) +
      "&categoria=" +
      category,
    function () {
      optionOccupyRoom(numeroHabitacion, category);
    }
  );
  $("#modal").css("display", "block");
}

function optionOccupyRoom(numHabitacion, category) {
  $("#cerrar").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");
    $("#divOpcion").removeClass("panelHabitacionRemplazar");
    $("#divOpcion").removeClass("panelHabitacionAsignar");
    $("#divOpcion").empty();
  });

  $(".remplazarHabitacion").on("click", function () {
    $("#divOpcion").empty();
    $("#divOpcion").removeClass("panelHabitacionAsignar");
    $("#divOpcion").addClass("panelHabitacionRemplazar");
    $("#divOpcion").load(
      "editarHabitaciones/remplazarHabitacion.php?habitacion=" +
        numHabitacion +
        "&categoria=" +
        category,
      function () {
        replaceRoom(numHabitacion, category);
      }
    );
  });

  $("#btnBuscar").on("click", function (event) {
    event.preventDefault();

    var idReserva = $("#idReserva").val();

    fetch(
      "http://localhost/Sistema%20Hotel/controller/admin/reservas/getHabitaciones.php?idReserva=" +
        idReserva +
        "&opcion=agregar",
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data_resp) => {
        var subForm = $(".subForm");
        subForm.css("display", "block");

        var llegada = data_resp.llegada;
        var salida = data_resp.salida;

        var inputFechaAgregado = $("#fechaAgregado");
        inputFechaAgregado.attr("min", llegada);
        inputFechaAgregado.attr("max", salida);
      });
  });

  switch (category) {
    case "Estandar":
    case "Deluxe":
      $("#cantAdultos").attr("max", 5);
      $("#cantNinos").attr("max", 4);
      break;

    case "Suite":
      $("#cantAdultos").attr("max", 6);
      $("#cantNinos").attr("max", 5);
      break;
  }

  $("#formAsignar").on("submit", function (event) {
    event.preventDefault();

    if ($("#cantAdultos").val() == 0 || $("#cantAdultos").val() == "") {
      const lbl = $("#alertaAsignar").find("label");
      lbl.text("Debe haber al menos un adulto de huesped");
      $("#alertaAsignar").addClass("alertaAsignarActive");
    } else {
      var idReserva = $("#idReserva").val().trim();
      var habitacion = numHabitacion;
      var fechaAgregado = $("#fechaAgregado").val().trim();

      const reserva = {
        idReserva: idReserva,
        habitacion: habitacion,
        fechaAgregado: fechaAgregado,
        adultos: $("#cantAdultos").val().trim(),
        ninos: $("#cantNinos").val().trim(),
      };

      fetch(
        "http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionHabitacion.php",
        {
          method: "POST",
          body: JSON.stringify({
            reserva: reserva,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((data_resp) => {
          if (data_resp.respuesta == true) {
            $("#modal").css("display", "none");
            $("#modal").css("cursor", "auto");

            $("#divOpcion").removeClass(".panelHabitacionAsignar");
            $("#divOpcion").empty();

            aviso(data_resp.respuesta, "Asignar habitacion");
          } else {
            const lbl = $("#alertaAsignar").find("label");
            lbl.text(data_resp.respuesta);
            $("#alertaAsignar").addClass("alertaAsignarActive");
          }
        });
    }
  });
}

function replaceRoom(numeroHabitacion, category) {
  $("#cerrar").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");
    $("#divOpcion").removeClass("panelHabitacionRemplazar");
    $("#divOpcion").removeClass("panelHabitacionAsignar");
    $("#divOpcion").empty();
  });

  $(".asignarHabitacion").on("click", function () {
    $("#divOpcion").empty();
    $("#divOpcion").removeClass("panelHabitacionRemplazar");
    $("#divOpcion").addClass("panelHabitacionAsignar");
    $("#divOpcion").load(
      "editarHabitaciones/asignarHabitacion.php?habitacion=" +
        numeroHabitacion +
        "&categoria=" +
        category,
      function () {
        optionOccupyRoom(numeroHabitacion, category);
      }
    );
  });

  $("#btnBuscar").on("click", function (event) {
    event.preventDefault();

    var idReserva = $("#selectReserva").val();

    fetch(
      "http://localhost/Sistema%20Hotel/controller/admin/reservas/getHabitaciones.php?idReserva=" +
        idReserva +
        "&opcion=remplazar",
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data_resp) => {
        if (data_resp == "Sin habitaciones") {
          $(".lblSinHabitaciones").css("display", "block");
          $(".subForm").css("display", "none");
        } else {
          $(".lblSinHabitaciones").css("display", "none");

          $(".subForm").css("display", "block");

          var llegada = data_resp.llegada;
          var salida = data_resp.salida;
          var formAsignar = document.getElementById("formRemplazar");
          var select = document.getElementById("selectHabitaciones");
          var inputFechaRemplazo =
            document.getElementById("inputFechaRemplazo");

          inputFechaRemplazo.innerHTML = "";
          select.innerHTML = "";

          data_resp.habitaciones.forEach(function (habitacion) {
            var option = document.createElement("option");
            option.text = habitacion.numHabitacionReservada;
            select.add(option);
          });

          inputFechaRemplazo.min = llegada;
          inputFechaRemplazo.max = salida;
        }
      });
  });

  $("#formRemplazar").on("submit", function (event) {
    event.preventDefault();

    const reserva = {
      idReserva: $("#selectReserva").val().trim(),
      habitacionNueva: numeroHabitacion,
      habitacionAnterior: $("#selectHabitaciones").val().trim(),
      fechaRemplazo: $("#inputFechaRemplazo").val().trim(),
      opcion: "remplazar",
    };

    console.log(reserva);

    var opcion = "remplazar";

    fetch(
      "http://localhost/Sistema%20Hotel/controller/admin/reservas/opcionHabitacion.php",
      {
        method: "PUT",
        body: JSON.stringify({
          reserva: reserva,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data_resp) => {
        if (data_resp.respuesta == true) {
          $("#modal").css("display", "none");
          $("#modal").css("cursor", "auto");

          $("#divOpcion").removeClass(".panelHabitacionRemplazar");
          $("#divOpcion").empty();

          aviso(data_resp.respuesta, "Remplazar habitacion");
        } else {
          const lbl = $("#alertaRemplazar").find("label");
          lbl.text(data_resp.respuesta);
          $("#alertaRemplazar").addClass("alertaAsignarActive");
        }
      });
  });
}

function loadFutureBookingsRoomCalendar() {
  $("#cerrar").on("click", function () {
    $("#modal").css("display", "none");
    $("#modal").css("cursor", "auto");
    $("#divOpcion").removeClass("reservaMasCercana");
    $("#divOpcion").empty();
  });

  let calendar = document.getElementById("calendar");
  let reservaDeHabitacionesMasCercana = JSON.parse(
    calendar.dataset.reservaCercanaHabitacion
  );

  if (reservaDeHabitacionesMasCercana.length > 0) {
    $("#reservaMasCercana").css("width", "550px");
    $("#reservaMasCercana").css("marginLeft", "35%");

    let events = [];

    events = reservaDeHabitacionesMasCercana.map((reserva) => {
      let numReserva = reserva.idReservaHabitacion;
      let inicioReserva = reserva.fechaLlegadaHabitacion;
      let finReserva = reserva.fechaSalidaHabitacion;

      let evento = {
        title: "Reserva " + numReserva,
        start: inicioReserva,
        end: finReserva,
        url: "lista.php?idReserva=" + numReserva,
        backgroundColor: "#329DBF",
      };

      return evento;
    });
    cargarCalendario(calendar, events);
  }
}
