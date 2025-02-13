import { numRoom } from "../minibar.js";
const drawAlert = (icon, title, msj, classToAdd) => {
  let modal = document.querySelector(".modalMainMinibar");

  modal.innerHTML = `
       <div class=${classToAdd}>
        <div class="title">
        <img src=${icon}>
        <h3>${title}</h3>
        </div>
        <p>${msj}</p>
        <button>Aceptar</button>
       </div>
    `;

  modal.style.display = "flex";
};

export const displayAlert = (state) => {
  if (!state) {
    drawAlert(
      "../../../img/advertencia.png",
      "¡Advertencia!",
      `Ups, no se pudo agregar los productos a 
        la habitacion ${numRoom}`,
      "alertError"
    );
  } else {
    drawAlert(
      "../../../img/advertencia.png",
      "¡Exito!",
      `Productos a agregados exitosamente a la habitacion ${numRoom}`,
      "alertCorrect"
    );
  }
};
