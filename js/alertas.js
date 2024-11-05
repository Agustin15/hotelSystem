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

