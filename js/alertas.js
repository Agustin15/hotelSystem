function alerta(msj) {
  const avisoCompleteDatos = document.querySelector(".avisoCompleteDatos");
  const progresBar = avisoCompleteDatos.querySelector(".bar");
  const labelMsj = avisoCompleteDatos.querySelector("p");
  labelMsj.textContent = msj;

  window.scroll(0, 0);

  avisoCompleteDatos.classList.remove("desactivarCompleteDatos");
  avisoCompleteDatos.classList.add("activarCompleteDatos");
  progresBar.classList.add("barActive");

  function borrarAlerta() {
    avisoCompleteDatos.classList.remove("activarCompleteDatos");
    avisoCompleteDatos.classList.add("desactivarCompleteDatos");
    progresBar.classList.remove("barActive");
  }

  setTimeout(borrarAlerta, 10000);
}

function alertaLoginAdmin(msj) {
  let alertForm = document.querySelector(".alertLogin");
  let barProgress = alertForm.querySelector(".bar");

  alertForm.classList.remove("alertLoginDesactive");
  alertForm.classList.add("alertLoginActive");
  alertForm.querySelector("p").textContent = msj;

  setTimeout(function () {
    alertForm.querySelector(".contain").style.display = "block";
    barProgress.classList.add("barActive");
  }, 500);

  setTimeout(() => {
    removeAlertLoginAdmin();
  }, 10000);
}

function removeAlertLoginAdmin() {
  let alertForm = document.querySelector(".alertLogin");
  let barProgress = alertForm.querySelector(".bar");

  alertForm.querySelector("p").textContent = "";
  alertForm.querySelector(".contain").style.display = "none";
  alertForm.classList.add("alertLoginDesactive");
  alertForm.classList.remove("alertLoginActive");
  barProgress.classList.remove("barActive");
}

function alertGuests(msj, alert, roomToDisplay) {
  alert.style.top = roomToDisplay.offsetTop + "px";
  alert.querySelector("p").textContent = msj;
  alert.classList.remove("alertGuestsHide");
  alert.classList.add("alertGuestsShow");
  alert.querySelector(".bar").classList.add("barActive");

  setTimeout(function () {
    alert.classList.add("alertGuestsHide");
    alert.classList.remove("alertGuestsShow");
    alert.querySelector(".bar").classList.remove("barActive");
  }, 10000);
}

function alertClientFormBooking(msj) {
  let alertClientForm = document.querySelector("#alertClient");
  let barProgress = alertClientForm.querySelector(".bar");

  alertClientForm.classList.remove("alertClientDesactive");
  alertClientForm.classList.add("alertClientActive");
  alertClientForm.querySelector("p").textContent = msj;

  setTimeout(function () {
    alertClientForm.querySelector(".contain").style.display = "block";
    barProgress.classList.add("barActive");
  }, 500);

  setTimeout(() => {
    removeAlertClientFormBooking();
  }, 10000);
}

function removeAlertClientFormBooking() {
  let alertClientForm = document.querySelector("#alertClient");
  let barProgress = alertClientForm.querySelector(".bar");

  alertClientForm.querySelector("p").textContent = "";
  alertClientForm.querySelector(".contain").style.display = "none";
  alertClientForm.classList.add("alertClientDesactive");
  alertClientForm.classList.remove("alertClientActive");
  barProgress.classList.remove("barActive");
}

async function confirmAlertBookingExist(msj) {
  return new Promise((resolve) => {
    let modalBooking = document.querySelector(".modalBooking");
    modalBooking.querySelector("p").textContent = msj;

    modalBooking.style.display = "block";

    modalBooking.querySelector(".btnOK").addEventListener("click", function () {
      resolve(true);
    });

    modalBooking
      .querySelector(".btnCancel")
      .addEventListener("click", function () {
        resolve(false);
      });
  });
}

function alertErrorBooking(msj) {
  let modalBooking = document.querySelector(".modalBooking");
  modalBooking.querySelector("p").textContent = msj;
  modalBooking.style.display = "block";
  modalBooking.querySelector(".btnCancel").style.display = "none";

  modalBooking.querySelector(".btnOK").addEventListener("click", function () {
    modalBooking.style.display = "none";
  });
}
