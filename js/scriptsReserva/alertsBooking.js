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

export { alertClientFormBooking, confirmAlertBookingExist, alertErrorBooking };
