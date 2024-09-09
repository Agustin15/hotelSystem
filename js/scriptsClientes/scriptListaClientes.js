let tableClientes = document.getElementById("tableClientes");

document.addEventListener("DOMContentLoaded", function () {
  liBorderBottom("listaClientes");
  if (tableClientes) {
    let clientsData = null;
    getDataClientsToTable();
  }
});

async function getDataClientsToTable() {
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/admin/cliente/opcionCliente.php?option=clientsTable",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    clientsData = result;
    loadTableClients();
  } catch (error) {
    console.log(error);
  }
}

async function loadTableClients() {
  let tableClientes = document.getElementById("tableClientes");
  let tBody = tableClientes.querySelector("tbody");

  if (clientsData) {
    document.querySelector("#buscador").style.display = "block";
    document.querySelector(".clientesVacio").style.display = "none";
    document.querySelector(
      ".titleTableClients"
    ).textContent = `Clientes`;

    let rowsClients = clientsData.map((clientData) => {
      return `
        <tr class="trBody">
        <td class="tdNombre">
  
        <div class="containName">
            <img src="../../../img/usuarioTable.png">
            <a>${clientData.nombre}</a>
  
            </div>
        </td>
        <td>${clientData.apellido}</td>
  
        <td data-correo-cliente="${clientData.correo}" class="tdCorreo">${clientData.correo}</td>
  
        <td>${clientData.telefono}</td>
  
        <td>
  
            <button onclick="chooseOption(${clientData.idCliente}),'eliminar')" class="btnEliminar"
            >
  
  
                <img src="../../../img/borrar.png">
            </button>
  
            <button onclick="chooseOption(${clientData.idCliente},'editar')" class="btnEditar">
  
                <img src="../../../img/editar.png">
  
            </button>
            <button onclick="chooseOption(${clientData.idCliente},'info')" class="btnInfo">
  
                <img src="../../../img/detalles.png">
  
            </button>
        </td>
  
  
    </tr>
     `;
    });

    tBody.innerHTML = rowsClients.join("");

  } else {
    document.querySelector(".clientesVacio").style.display = "block";
    document.querySelector("#buscador").style.display = "none";
  }
  // var cliente = $(this).data("idClienteSearch");

  // if (cliente !== "") {
  //   buscadorParametroCliente(cliente, ".tdCorreo", "correo-cliente");
  // }
}
$("#buscador").on("keydown", function () {
  buscadorCliente();
});


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

async function getClient(idClient) {

  try {
    const response = await fetch(
      "http://localhost/Sistema%20Hotel/controller/admin/cliente/opcionCliente.php?option=dataClient&idClient=" +
        idClient,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function chooseOption(idClient, option) {
  let client = await getClient(idClient);
  switch (option) {
    case "eliminar":
      opcionCliente(client, "eliminar");

      break;

    case "editar":
      opcionCliente(client, "editar");
      break;

    case "info":
      
      opcionCliente(client, "info");
      break;
  }
}

function opcionCliente(client, opcion) {
  $("#modal").css("display", "flex");

  switch (opcion) {
    case "eliminar":
      $(".divOpcion").addClass("divConfirmacionDelete");
      $(".divOpcion").load(
        "formEliminar.php?cliente=" +
          encodeURIComponent(JSON.stringify(client)),
        function () {
          submitDelete();
        }
      );

      break;
    case "editar":
      $(".divOpcion").addClass("divEditar");
      $(".divOpcion").load(
        "formEditar.php?cliente=" + encodeURIComponent(JSON.stringify(client)),
        function () {
          submitUpdate();
        }
      );

      break;

    case "info":
      
      $(".divOpcion").addClass("divInfo");
      $(".divOpcion").load(
        "infoCliente/infoCliente.php?cliente=" +
          encodeURIComponent(JSON.stringify(client)),
        function () {
          infoClienteOptions();
        }
      );

      break;
  }
}

function loading(status) {
  let spinner = document.querySelector(".spinnerLoad");

  if (status) {
    spinner.style.display = "block";
  } else {
    spinner.style.display = "none";
  }
}

async function submitUpdate() {
  let formEditar = document.getElementById("formEditar");

  if (formEditar) {
    formEditar.addEventListener("submit", function (event) {
      event.preventDefault();
      update(this);
    });
  }
  cancelUpdate();
}

async function update(form) {
  let idCliente = form.dataset.idCliente;
  let validate;
  const clientUpdate = { idClient: idCliente };

  const formDataUpdate = new FormData(form);
  let validRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

  formDataUpdate.forEach((v, k) => {
    if (v.trim() == "") {
      inputAlertClient(k);
      return (validate = "Complete todos los campos");
    } else if (k == "phone" && v.length < 8) {
      inputAlertClient(k);
      return (validate = "Ingresa un telefono valido");
    } else if (k == "mail" && !v.match(validRegex)) {
      inputAlertClient(k);
      return (validate = "Ingresa un correo valido");
    } else {
      clientUpdate[k] = v;
    }
  });

  if (validate) {
    alertFormClientUpdate(validate);
  } else {
    try {
      const response = await fetch(
        "http://localhost/Sistema%20Hotel/controller/admin/cliente/opcionCliente.php",
        {
          method: "PUT",
          body: JSON.stringify(clientUpdate),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (result.advertencia) {
        throw result.advertencia;
      } else if (result.respuesta == true) {
        $(".divOpcion").removeClass("divEditar");
        $(".divOpcion").empty();

        aviso("Editar");
      }
    } catch (error) {
      alertEdit(error);
    }
  }
}

function cancelUpdate() {
  let btnCancelUpdate = document.getElementById("btnCancelar");

  if (btnCancelUpdate) {
    $("#btnCancelar").on("click", function () {
      $("#modal").css("display", "none");
      $("#modal").css("cursor", "auto");

      $(".divOpcion").removeClass("divEditar");
      $(".divOpcion").empty();
    });
  }
}
//opcion eliminar cliente

function submitDelete() {
  let btnSiEliminar = document.querySelector(".btnSi");

  if (btnSiEliminar) {
    $(".btnSi").on("click", function () {
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

async function eliminar(datosCliente) {
  let datosClienteJson = [];

  datosClienteJson.push(encodeURIComponent(JSON.stringify(datosCliente)));

  let url = `http://localhost/Sistema%20Hotel/controller/admin/cliente/opcionCliente.php?cliente=
      ${datosClienteJson}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const result = await response.json();

    if (result) {
      aviso("Eliminar");
    } else {
      throw "¡Ups hubo un error al eliminar el cliente!";
    }
  } catch (error) {
    alertDelete(error);
  } finally {
    $(".divOpcion").empty();
    $(".divOpcion").removeClass("divConfirmacionDelete");
  }
}

function cancelEliminar() {
  let btnNoEliminar = document.querySelector(".btnNo");

  if (btnNoEliminar) {
    $(".btnNo").on("click", function () {
      $("#modal").css("display", "none");
      $("#modal").css("cursor", "auto");

      $(".divOpcion").removeClass("divConfirmacionDelete");
      $(".divOpcion").empty();
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
    });
  }
}

function searchBooking() {
  let buscarEstadia = document.getElementById("buscarEstadia");

  if (buscarEstadia) {
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
        $("#modalInfo").css("display", "flex");

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

function alertEdit(advertencia) {
  let modalEdit = document.querySelector(".modalEditar");
  let alertEditDiv = document.querySelector(".alertaEditar");

  modalEdit.style.display = "flex";
  alertEditDiv.style.display = "flex";

  alertEditDiv.querySelector("img").src = "../../../img/advertencia.gif";
  alertEditDiv.querySelector("p").textContent = advertencia;

  alertEditDiv.addEventListener("click", function () {
    alertEditDiv.querySelector("img").src = "";
    modalEdit.style.display = "none";
    alertEditDiv.style.display = "none";
  });
}

function alertDelete(advertencia) {
  let modal = document.querySelector("#modal");
  let alertDelete = document.querySelector(".alertaEliminar");

  alertDelete.style.display = "flex";

  alertDelete.querySelector("img").src = "../../img/advertencia.gif";
  alertDelete.querySelector("p").textContent = advertencia;

  alertDelete.addEventListener("click", function () {
    alertDelete.querySelector("img").src = "";
    modal.style.display = "none";
    alertDelete.style.display = "none";
  });
}

function inputAlertClient(input) {
  let inputAlert = [...document.getElementsByName(input)];

  inputAlert[0].classList.add("inputAlert");
}

function removeInputAlert(input) {
  input.classList.remove("inputAlert");
}

async function alertFormClientUpdate(validate) {
  let alertForm = document.querySelector(".alertFormClientUpdate");
  let barProgress = alertForm.querySelector(".bar");

  alertForm.classList.remove("alertFormClientDesactive");
  alertForm.classList.add("alertFormClientActive");
  alertForm.querySelector("p").textContent = validate;

  setTimeout(function () {
    alertForm.querySelector(".contain").style.display = "block";
    barProgress.classList.add("barActive");
  }, 500);

  setTimeout(() => {
    removeAlertFormClientUpdate();
  }, 10000);
}

function removeAlertFormClientUpdate() {
  let alertForm = document.querySelector(".alertFormClientUpdate");
  let barProgress = alertForm.querySelector(".bar");

  alertForm.querySelector("p").textContent = "";
  alertForm.querySelector(".contain").style.display = "none";
  alertForm.classList.add("alertFormClientDesactive");
  alertForm.classList.remove("alertFormClientActive");
  barProgress.classList.remove("barActive");
}

function aviso(opcion) {
  const modal = document.getElementById("modal");
  const aviso = document.getElementById("alertClient");

  switch (opcion) {
    case "Eliminar":
      aviso.querySelector("img").src = "../../../img/tickDelete.gif";
      aviso.querySelector("p").textContent = "Cliente eliminado exitosamente";
      aviso.querySelector("button").style.background = "red";

      break;

    case "Editar":
      aviso.querySelector("img").src = "../../../img/tickServices.gif";
      aviso.querySelector("p").textContent = "Cliente actualizado exitosamente";
      aviso.querySelector("button").style.background = "rgb(9, 72, 131)";

      break;
  }

  aviso.style.display = "flex";

  aviso.querySelector("button").addEventListener("click", function () {
    aviso.querySelector("img").src = "";
    aviso.style.display = "none";
    modal.style.display = "none";
    getDataClientsToTable();
  });
}

function replaceCharacter(event) {
  let valid = /\d/;

  let input = event.target;

  let ultimateCharacter = input.value
    .trim()
    .charAt(input.value.trim().length - 1);

  if (!ultimateCharacter.match(valid)) {
    let newValue = input.value.replace(ultimateCharacter, "");
    input.value = newValue;
  }
}
