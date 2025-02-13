import { refreshMinibar } from "./displayCart.js";

const drawAlert = (icon, title, msj, classToAdd, state) => {
  let modal = document.querySelector(".modalMainMinibar");

  modal.innerHTML = `
       <div class="alert">
        <div class="title">
        <img src=${icon}>
        <h3>${title}</h3>
        </div>
        <p>${msj}</p>
        <button data-state=${state} class="btnCloseAlert">Aceptar</button>
       </div>
    `;

  modal.style.display = "flex";
  modal.querySelector(".alert").classList.add(classToAdd);
  closeAlert(modal);
};

export const displayAlert = (state, numRoom, msj) => {
  if (!state) {
    let warning;
    if (!msj) {
      warning = `Ups, no se pudo agregar los productos a 
        la habitacion ${numRoom}`;
    } else {
      warning = msj;
    }

    drawAlert(
      "../../../img/advertenciaDelete.png",
      "¡Advertencia!",
      warning,
      "alertError",
      state
    );
  } else {
    drawAlert(
      "../../../img/tickAlertQueryForm.png",
      "¡Exito!",
      `Productos a agregados exitosamente a la habitacion ${numRoom}`,
      "alertCorrect",
      state
    );
  }
};

const closeAlert = (modal) => {
  let btnClose = modal.querySelector(".btnCloseAlert");

  btnClose.addEventListener("click", () => {
    let state = btnClose.dataset.state;
    modal.innerHTML = ``;
    modal.style.display = "none";
    if (state == false) {
      refreshMinibar();
    }
  });
};
