function buscadorParametroCliente(valueFind, tdClass, dataSet) {
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

$("#tableClientes").load("cargarTabla.php", function () {
  var cliente = $(this).data("idClienteSearch");

  if (cliente !== "") {
    buscadorParametroCliente(cliente, ".tdCorreo", "correo-cliente");
  }

  chooseOption();

  liBorderBottom("listaClientes");
});

$("#buscador").on("keydown", function () {
  buscadorCliente();
});

function buscadorEstadia() {
  const textoBuscador = $("#buscadorEstadia").val();

  const tableEstadias = $("#tableEstadias");

  var trs = tableEstadias.find("tr");

  var cont = 0;
  trs.each(function () {
    cont++;

    if ($(this).text().indexOf(textoBuscador) === -1) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });

  var trHidden = trs.filter(":hidden");
  if (trHidden.length === cont) {
    $(".sinResultados").css("display", "block");
  } else {
    $(".sinResultados").css("display", "none");
  }
}

function buscadorCliente() {
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
    $("#sinDatosTblClientes").css("display", "block");
  } else {
    $("#sinDatosTblClientes").css("display", "none");
  }
}

//cargar paneles

function opcionCliente(datosCliente, opcion) {
  var cliente = datosCliente[0];

  $("#modal").css("display", "block");
  $("#modal").css("cursor", "none");

  switch (opcion) {
    case "eliminar":
      $(".divOpcion").addClass("divConfirmacionDelete");
      $(".divOpcion").load(
        "formEliminar.php?cliente=" +
          encodeURIComponent(JSON.stringify(cliente)),
        function () {
          submitDelete();
        }
      );

      break;
    case "editar":
      $(".divOpcion").addClass("divEditar");
      $(".divOpcion").load(
        "formEditar.php?cliente=" + encodeURIComponent(JSON.stringify(cliente)),
        function () {
          submitUpdate();
        }
      );

      break;

    case "info":
      $(".divOpcion").addClass("divInfo");
      $(".divOpcion").load(
        "infoCliente/infoCliente.php?cliente=" +
          encodeURIComponent(JSON.stringify(cliente)),
        function () {
          infoClienteOptions();
        }
      );

      break;
  }
}

function aviso(resultado, opcion) {
  console.log(resultado);

  const aviso = document.getElementById("avisoCliente");
  var imgAvisoCliente = null;
  var lblClienteAviso = null;

  aviso.classList.remove("avisoClienteDesactive");
  aviso.classList.add("avisoClienteActive");

  switch (opcion) {
    case "Eliminar":
      aviso.style.background = "linear-gradient(red,rgb(226, 4, 4))";
      if (resultado) {
        imgAvisoCliente = "../../../img/tickEliminar.png";
        lblClienteAviso = "Cliente eliminado";
      } else {
        imgAvisoCliente = "../../../img/cruzEliminar.png";
        lblClienteAviso = "Error al eliminar el cliente";
      }
      break;

    case "Editar":
      aviso.style.background = "rgb(0, 89, 255)";

      if (resultado) {
        imgAvisoCliente = "../../../img/tickEditar.png";
        lblClienteAviso = "Cliente actualizado";
      }

      break;
  }

  aviso.innerHTML = `
    
    <img src="${imgAvisoCliente}">

    <label>${lblClienteAviso}</label>
    `;

  borrarAviso(aviso);

  recargar();
}

function borrarAviso(aviso) {
  setTimeout(function () {
    aviso.classList.add("avisoClienteDesactive");
  }, 2000);
}

function recargar() {
  setTimeout(function () {
    location.reload();
  }, 2020);
}

const showHideBuscador = (estado) => {
  $("#buscador").css("display", estado);
  $(".lupa").css("display", estado);
};

//elegir opcion cliente

function chooseOption() {
  datosCliente = [];
  const btns = $(".trBody").find("button");

  btns.each(function (index, btn) {
    const opcion = $(btn).data("opcion");

    $(btn).on("click", function () {
      const cliente = {
        idCliente: $(btn).data("id"),
        correo: $(btn).data("correo"),
        nombre: $(btn).data("nombre"),
        apellido: $(btn).data("apellido"),
        telefono: $(btn).data("telefono"),
      };
      datosCliente.push(cliente);

      switch (opcion) {
        case "eliminar":
          opcionCliente(datosCliente, "eliminar");

          break;

        case "editar":
          opcionCliente(datosCliente, "editar");
          break;

        case "info":
          opcionCliente(datosCliente, "info");
          break;
      }
    });
  });
}

function submitUpdate() {
  let formEditar = document.getElementById("formEditar");

  if (formEditar) {
    formEditar.addEventListener("submit", function (event) {
      event.preventDefault();

      let idCliente = this.dataset.idCliente;
      const datosCliente = {
        idCliente: idCliente,
        correo: $("#inputCorreo").val().trim(),
        nombre: $("#inputNombre").val().trim(),
        apellido: $("#inputApellido").val().trim(),
        telefono: $("#inputTelefono").val().trim(),
      };

      fetch(
        "http://localhost/Sistema%20Hotel/controller/admin/cliente/opcionCliente.php",
        {
          method: "PUT",
          body: JSON.stringify({
            cliente: datosCliente,
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
  cancelUpdate();
}

//opcion editar cliente

function cancelUpdate() {
  let btnCancelUpdate = document.getElementById("btnCancelar");

  if (btnCancelUpdate) {
    $("#btnCancelar").on("click", function () {
      $("#modal").css("display", "none");
      $("#modal").css("cursor", "auto");

      $(".divOpcion").removeClass("divEditar");
      $(".divOpcion").empty();
      location.reload();
    });
  }
}
//opcion eliminar cliente

function submitDelete() {
  let btnSiEliminar = document.querySelector(".btnSi");

  if (btnSiEliminar) {
    $(".btnSi").on("click", function () {
      $("#modal").css("display", "none");
      $("#modal").css("cursor", "auto");
      $(".divOpcion").remove();

      const datosCliente = {
        idCliente: $(this).data("idCliente"),
        correo: $(this).data("correo"),
        nombre: $(this).data("nombre"),
        apellido: $(this).data("apellido"),
        telefono: $(this).data("telefono"),
      };

      eliminar(datosCliente);
    });
  }

  cancelEliminar();
}

function eliminar(datosCliente) {
  var datosClienteJson = [];

  datosClienteJson.push(encodeURIComponent(JSON.stringify(datosCliente)));

  var url = `http://localhost/Sistema%20Hotel/controller/admin/cliente/opcionCliente.php?cliente=
    ${datosClienteJson}`;
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
}

function cancelEliminar() {
  let btnNoEliminar = document.querySelector(".btnNo");

  if (btnNoEliminar) {
    $(".btnNo").on("click", function () {
      $("#modal").css("display", "none");
      $("#modal").css("cursor", "auto");

      $(".divOpcion").removeClass("divConfirmacionDelete");
      $(".divOpcion").empty();
      location.reload();
    });
  }
}

//opcion informacion cliente

function closeInfoCliente() {
  let cerrar = document.querySelector(".cerrar");

  if (cerrar) {
    $(".cerrar").on("click", function () {
      $("#modal").css("display", "none");
      $("#modal").css("cursor", "auto");

      $(".divOpcion").removeClass("divInfo");
      $(".divOpcion").empty();
      location.reload();
    });
  }
}

function searchBooking() {
  let buscarEstadia = document.getElementById("buscarEstadia");

  if (buscadorEstadia) {
    $("#buscadorEstadia").on("keydown", function () {
      buscadorEstadia();
    });
  }
}

function infoClienteOptions() {
  closeInfoCliente();
  searchBooking();

  let tableEstadias = document.getElementById("tableEstadias");
  if (tableEstadias) {
    const divButtons = $("#tableEstadias").find("div");

    divButtons.each(function () {
      $(this).on("click", function () {
        $("#modalInfo").css("display", "block");
        $("#modalInfo").css("cursor", "none");

        switch ($(this).attr("class")) {
          case "noches":
            var noches = $(this).data("noches");

            $(".subVentanas").addClass(".noches");
            $(".subVentanas").load(
              "infoCliente/noches.php?noches=" + encodeURIComponent(noches),
              function () {
                closeNoches();
              }
            );
            break;

          case "huespedes":
            var adultos = $(this).data("adultos");
            var ninos = $(this).data("ninos");

            $(".subVentanas").load(
              "infoCliente/huespedes.php?adultos=" +
                encodeURIComponent(adultos) +
                "&ninos=" +
                encodeURIComponent(ninos),
              function () {
                closeHuespedes();
              }
            );
            break;

          case "habitaciones":
            var habitaciones = $(this).data("habitaciones");

            $(".subVentanas").load(
              "infoCliente/habitaciones.php?habitaciones=" +
                encodeURIComponent(JSON.stringify(habitaciones))
            );
            break;

          case "servicios":
            var servicios = $(this).data("servicios");

            $(".subVentanas").load(
              "infoCliente/servicios.php?servicios=" +
                encodeURIComponent(JSON.stringify(servicios))
            );
            break;

          case "pago":
            var factura = $(this).data("pago");

            $(".subVentanas").load(
              "infoCliente/factura.php?factura=" +
                encodeURIComponent(JSON.stringify(factura))
            );
            console.log(factura);
            break;
        }
      });
    });
  }
}
function closeNoches() {
  let cerrarNoches = document.querySelector(".cerrarNoches");
  if (cerrarNoches) {
    $(".cerrarNoches").on("click", function () {
      $("#modalInfo").css("display", "none");
      $("#modalInfo").css("cursor", "auto");

      $(".subVentanas").empty();
    });
  }
}

function closeHuespedes() {
  let cerrarHuespedes = document.querySelector(".cerrarHuespedes");
  if (cerrarHuespedes) {
    $(".cerrarHuespedes").on("click", function () {
      $("#modalInfo").css("display", "none");
      $("#modalInfo").css("cursor", "auto");

      $(".subVentanas").empty();
    });
  }
}

//opcion agregar
function lblInputsLoginActive(label, clase, claseRemove) {
  label.removeClass(claseRemove);
  label.addClass(clase);
}

function lblInputsLoginDesactive(label, input, claseAdd) {
  if (input.val() == "") {
    label.addClass(claseAdd);
  }
}

let formAgregar = document.getElementById("formAgregar");

if (formAgregar) {
  liBorderBottom("agregar");
  var inputs = $("#formAgregar").find("input");

  inputs.each(function () {
    $(this).on("click", function () {
      var lbl = $(this).prev("label");

      lblInputsLoginActive(lbl, "lblInputEfect", "lblInputEfectRemove");
    });

    $(this).on("mouseleave", function () {
      var lbl = $(this).prev("label");
      if ($(this).val() == "") {
        lblInputsLoginDesactive(lbl, $(this), "lblInputEfectRemove");
      }
    });
  });

  submitAdd();
}

let alertaAgregar = document.getElementById("alertaAgregar");

if (alertaAgregar) {
  function alertaSetsError(h2, msj, img, claseAviso, claseForm) {
    img.attr("src", "../../../img/cruzAgregar.png");
    h2.text(msj);

    $("#alertaAgregar").removeClass("alertaAgregarDesactive");
    $("#alertaAgregar").addClass(claseAviso);
    $("#formAgregar").removeClass("formAgregarDesactive");
    $("#formAgregar").addClass(claseForm);
  }

  function borrarAlerta() {
    setTimeout(function () {
      $("#alertaAgregar").addClass("alertaAgregarDesactive");
      $("#formAgregar").addClass("formAgregarDesactive");
    }, 2020);
  }
}

function submitAdd() {
  formAgregar.addEventListener("submit", function (event) {
    event.preventDefault();

    var img = $("#alertaAgregar").find("img");
    var h2 = $("#alertaAgregar").find("h2");

    if (
      $("#inputNombre").val() === "" ||
      $("#inputApellido").val() === "" ||
      $("#inputCorreo").val() === "" ||
      $("#inputTelefono").val() === ""
    ) {
      alertaSetsError(
        h2,
        "Complete todos los campos",
        img,
        "alertaAgregarActive",
        "formAgregarActive"
      );
      borrarAlerta();
    } else {
      var correo = $("#inputCorreo").val().trim();
      var nombre = $("#inputNombre").val().trim();
      var apellido = $("#inputApellido").val().trim();
      var telefono = $("#inputTelefono").val().trim();

      if (
        correo.includes("@gmail.com") == false &&
        correo.includes("@hotmail.com") == false &&
        correo.includes("@outlook.com") == false
      ) {
        alertaSetsError(
          h2,
          "Formato del correo no valido",
          img,
          "alertaAgregarActive",
          "formAgregarActive"
        );
        borrarAlerta();
      } else {
        const cliente = {
          correo: correo,
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
        };

        add(cliente, h2, img);
      }
    }
  });
}

function cleanInputs() {
  let inputs = formAgregar.querySelectorAll("input");

  inputs.forEach(
    (input) =>
      function () {
        if (input.type !== "submit") {
          input.value = "";
        }
      }
  );
}
function add(cliente, h2, img) {
  fetch(
    "http://localhost/Sistema%20Hotel/controller/admin/cliente/opcionCliente.php",
    {
      method: "POST",
      body: JSON.stringify({
        cliente: cliente,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then((data_resp) => {
      if (data_resp.respuesta == true) {
        img.attr("src", "../../../img/tickAgregar.png");
        h2.text("Cliente agregado");

        $("#alertaAgregar").removeClass("alertaAgregarDesactive");
        $("#alertaAgregar").addClass("alertaAgregarActive");
        $("#formAgregar").removeClass("formAgregarDesactive");
        $("#formAgregar").addClass("formAgregarActive");

        borrarAlerta();

        cleanInputs();
      } else {
        var msj = data_resp.respuesta;

        alertaSetsError(
          h2,
          msj,
          img,
          "alertaAgregarActive",
          "formAgregarActive"
        );
        borrarAlerta();
      }
    })
    .catch((error) => console.error("Error:", error));
}

function diplaySelectYearGraphic() {
  let searchYear = document.querySelector(".searchYear");
  let selectYear = searchYear.querySelector("select");

  searchYear.style.display = "flex";
  let valueYear = selectYear.options[selectYear.selectedIndex].value;

  selectYear.addEventListener("change", function () {
    valueYear = selectYear.options[selectYear.selectedIndex].value;
  });


  document
    .querySelector(".btnGraphicClients")
    .addEventListener("click", function () {
      getDataClientsTOGraphic(valueYear);
    });
}

function graphicClients(dataPoints, grafica, titulo, theme) {
  var chart = new CanvasJS.Chart(grafica, {
    theme: "light2",
    animationEnabled: true,
    title: {
      text: titulo,
    },

    axisY: {
      title: "Personas",
      titleFontSize: 25,
      margin: 0,
      labelFontSize: 18,
    },

    axisX: {
      titleFontSize: 25,
      margin: 0,
      labelFontSize: 18,
    },

    data: [
      {
        type: "column",
        dataPoints: dataPoints,
      },
    ],
  });
  chart.render();

  diplaySelectYearGraphic();
}

function dataPointsToGraphicClients(monthsClients) {
  
  let dataPoints = monthsClients.map((monthClients) => {
    let monthString = getMes(monthClients.month);

    const dataPoint = {
      label: monthString,
      y: monthClients.quantity,
    };

    return dataPoint;
  });

  let totalMonthsClients = dataPoints.reduce((ac, dataPoint) => {
    return (ac += dataPoint.y);
  }, 0);

  if (totalMonthsClients > 0) {
    graphicClients(dataPoints, "graficaClientes", "", "light2");
  } else {
    $(".sinDatos").css("display", "block");
  }
}

async function getDataClientsTOGraphic(year) {
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/admin/cliente/opcionCliente.php?option=clientsGraphic&year=" +
        year,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    dataPointsToGraphicClients(result);
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let viewGrafica = document.getElementById("viewGrafica");

  if (viewGrafica) {
    liBorderBottom("grafica");
    let year = new Date().getFullYear();
    getDataClientsTOGraphic(year);
  }
});
