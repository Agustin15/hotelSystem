export function alertClientFormBooking(msj) {
  let alertClientForm = document.querySelector("#alertClient");
  alertClientForm.style.display = "flex";
  alertClientForm.querySelector("p").textContent = msj;
  setTimeout(() => {
    removeAlertClientFormBooking();
  }, 4000);
}

export function removeAlertClientFormBooking() {
  let alertClientForm = document.querySelector("#alertClient");
  alertClientForm.querySelector("p").textContent = "";
  alertClientForm.style.display = "none";
}

export const alertBooking = (title, msj) => {
  modalOption("flex");
  let alert = document.querySelector(".alertBooking");
  let msjParragraph = alert.querySelector("p");
  let titleSpan = alert.querySelector("span");
  let btnAccept = alert.querySelector(".btnAccept");
  let btnCancel = alert.querySelector(".btnCancel");

  alert.style.display = "flex";

  if (title == "Error") {
    btnCancel.style.display = "none";
    btnAccept.textContent = "OK";
    msjParragraph.textContent = msj;
    titleSpan.textContent = "Ups, algo ha salido mal";
    btnAccept.addEventListener("click", () => {
      modalOption("none");
      removeAlertBooking(alert, msjParragraph, titleSpan, btnAccept, btnCancel);
    });
  } else {
    bodyConfirmAddRoomsToBookingPast(
      alert,
      msjParragraph,
      msj,
      titleSpan,
      btnAccept,
      btnCancel
    );
  }
};

const removeAlertBooking = (
  alert,
  msjParragraph,
  titleSpan,
  btnAccept,
  btnCancel
) => {
  alert.style.display = "none";
  msjParragraph.textContent = "";
  titleSpan.textContent = "";
  btnAccept.textContent = "";
  btnCancel.textContent = "";
  btnCancel.style.display = "none";
};

const bodyConfirmAddRoomsToBookingPast = async (
  alert,
  msjParragraph,
  msj,
  titleSpan,
  btnAccept,
  btnCancel
) => {
  btnCancel.style.display = "block";
  btnAccept.textContent = "Si";
  btnCancel.textContent = "No";
  titleSpan.textContent = "Advertencia";
  msjParragraph.textContent = msj;
};

export const confirmUpdateBooking = async (alert) => {
  let msjParragraph = alert.querySelector("p");
  let titleSpan = alert.querySelector("span");
  let btnAccept = alert.querySelector(".btnAccept");
  let btnCancel = alert.querySelector(".btnCancel");

  let confirm = false;

  return new Promise((resolve) => {
    btnCancel.addEventListener("click", () => {
      modalOption("none");
      removeAlertBooking(alert, msjParragraph, titleSpan, btnAccept, btnCancel);
      resolve(confirm);
    });

    btnAccept.addEventListener("click", () => {
      modalOption("none");
      removeAlertBooking(alert, msjParragraph, titleSpan, btnAccept, btnCancel);
      confirm = true;
      resolve(confirm);
    });
  });
};

export const modalOption = (state) => {
  let modal = document.querySelector(".modalBooking");
  modal.style.display = state;
};
