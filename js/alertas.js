export function alerta(msj) {
  const containAvisoCompleteDatos = document.querySelector(
    ".containAvisoCompleteDatos"
  );

  const progresBar = containAvisoCompleteDatos.querySelector(".bar");
  const labelMsj = containAvisoCompleteDatos.querySelector("p");
  labelMsj.textContent = msj;
  window.scroll(0, 0);

  containAvisoCompleteDatos.querySelector(".avisoCompleteDatos").style.display =
    "flex";
  containAvisoCompleteDatos.classList.remove("desactivarCompleteDatos");
  containAvisoCompleteDatos.classList.add("activarCompleteDatos");
  progresBar.classList.add("barActive");

  setTimeout(() => {
    borrarAlerta();
  }, 5000);
}

export const borrarAlerta = () => {
  const containAvisoCompleteDatos = document.querySelector(
    ".containAvisoCompleteDatos"
  );
  const progresBar = containAvisoCompleteDatos.querySelector(".bar");

  containAvisoCompleteDatos.classList.remove("activarCompleteDatos");
  containAvisoCompleteDatos.classList.add("desactivarCompleteDatos");
  progresBar.classList.remove("barActive");
};

export function alertGuests(msj, alert, roomToDisplay) {
  alert.style.display = "flex";
  alert.style.top = roomToDisplay.offsetTop + "px";
  alert.querySelector("p").textContent = msj;
  alert.classList.remove("alertGuestsHide");
  alert.classList.add("alertGuestsShow");
  alert.querySelector(".bar").classList.add("barActive");

  setTimeout(() => {
    removeAlertGuests(alert);
  }, 5000);
}

export const removeAlertGuests = (alert) => {
  alert.classList.add("alertGuestsHide");
  alert.classList.remove("alertGuestsShow");
  alert.querySelector(".bar").classList.remove("barActive");
};

export const alertModal = (modal, option) => {
  if (option == "show") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
  buttonModalAlert(modal);
};

function buttonModalAlert(modal) {
  modal.querySelector("button").addEventListener("click", function () {
    alertModal(modal, "hide");
  });
}
