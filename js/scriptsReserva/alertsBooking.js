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

async function confirmAlertBookingExist(msj, icon) {
  return new Promise((resolve) => {
    let modalBooking = document.querySelector(".modalBooking");
    let alertBooking = document.querySelector(".alertBooking");

    alertBooking.querySelector("p").textContent = msj;
    alertBooking.querySelector("img").src = icon;
    alertBooking.style.display = "flex";
    if (modalBooking.style.display != "flex") {
      modalBooking.style.display = "flex";
      console.log("kkkk");
    }

    modalBooking.querySelector(".btnOK").addEventListener("click", function () {
      removeConfirmAlertBookingExist(modalBooking, alertBooking);
      resolve(true);
    });

    modalBooking
      .querySelector(".btnCancel")
      .addEventListener("click", function () {
        removeConfirmAlertBookingExist(modalBooking, alertBooking);
        resolve(false);
      });
  });
}

const removeConfirmAlertBookingExist = (modalBooking, alertBooking) => {
  modalBooking.style.display = "none";
  alertBooking.style.display = "none";
  alertBooking.querySelector("img").src = "";
  alertBooking.querySelector("p").textContent = "";
};

function alertErrorBooking(msj, icon) {
  let modalBooking = document.querySelector(".modalBooking");
  let alertBooking = document.querySelector(".alertBooking");

  alertBooking.querySelector("p").textContent = msj;
  alertBooking.querySelector("img").src = icon;
  alertBooking.querySelector(".btnCancel").style.display = "none";
  alertBooking.style.display = "flex";

  if (modalBooking.style.display != "flex") {
    modalBooking.style.display = "flex";
  }

  alertBooking.querySelector(".btnOK").addEventListener("click", function () {
    alertBooking.querySelector(".btnCancel").style.display = "block";
    removeConfirmAlertBookingExist(modalBooking, alertBooking);
  });
}
