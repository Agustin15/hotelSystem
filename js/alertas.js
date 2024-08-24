function alerta(msj) {
  $(document).ready(function () {
    const avisoCompleteDatos = $(".avisoCompleteDatos");
    const labelMsj = avisoCompleteDatos.find("label");

    labelMsj.text(msj);

    window.scroll(0, 0);
    avisoCompleteDatos.removeClass("desactivarCompleteDatos");
    avisoCompleteDatos.addClass("activarCompleteDatos");

    function borrarAlerta() {
      avisoCompleteDatos.removeClass("activarCompleteDatos");
      avisoCompleteDatos.addClass("desactivarCompleteDatos");
    }

    setTimeout(borrarAlerta, 5000);
  });
}

function alertaCompleteDatos(msj) {
  const avisoCompleteDatos = $(".avisoCompleteDatosFormulario");

  const labelMsj = avisoCompleteDatos.find("label");
  labelMsj.text(msj);

  window.scroll(0, 0);
  avisoCompleteDatos.removeClass("desactivarCompleteDatosFormulario");
  avisoCompleteDatos.addClass("activarCompleteDatosFormulario");

  function borrarAlerta() {
    avisoCompleteDatos.addClass("desactivarCompleteDatosFormulario");
  }

  setTimeout(borrarAlerta, 4000);
}

function alertGuests(msj, alert, roomToDisplay) {
  alert.style.top = roomToDisplay.offsetTop + "px";
  alert.querySelector("span").textContent = msj;
  alert.classList.remove("alertGuestsHide");
  alert.classList.add("alertGuestsShow");

  setTimeout(function () {
    alert.classList.add("alertGuestsHide");
    alert.classList.remove("alertGuestsShow");
  }, 4000);
}

function alertClientForm(msj) {
  let alertClient = document.getElementById("alertClient");

  alertClient.querySelector("span").textContent = msj;

  alertClient.classList.remove("alertClientHide");
  alertClient.classList.add("alertClientShow");

  setTimeout(function () {
    alertClient.classList.add("alertClientHide");
    alertClient.classList.remove("alertClientShow");
  }, 4000);
}

async function confirmAlertBookingExist(msj) {

  return new Promise((resolve)=>{

  let modalBooking = document.querySelector(".modalBooking");
  modalBooking.querySelector("p").textContent = msj;

  modalBooking.style.display = "block";

  modalBooking.querySelector(".btnOK").addEventListener("click", function () {
    resolve(true);
  });

  modalBooking.querySelector(".btnCancel")
    .addEventListener("click", function () {
      
    resolve(false);
    });

  });
   
}
