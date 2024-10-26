const alertErrorPay = (msj) => {
  let alert = document.querySelector("#alert");
  let barProgress = alert.querySelector(".bar");
  alert.querySelector("p").textContent = msj;

  alert.classList.remove("alertDesactive");
  alert.style.display = "flex";
  alert.classList.add("alertActive");

  alert.querySelector("p").textContent = msj;

  setTimeout(function () {
    alert.querySelector(".contain").style.display = "block";
    barProgress.classList.add("barActive");
  }, 500);

  setTimeout(() => {
    removeAlertPay();
  }, 10000);
};

function removeAlertPay() {
  let alert = document.querySelector("#alert");
  let barProgress = alert.querySelector(".bar");

  alert.querySelector("p").textContent = "";
  alert.querySelector(".contain").style.display = "none";
  alert.classList.add("alertDesactive");
  alert.classList.remove("alertActive");
  barProgress.classList.remove("barActive");
  setTimeout(() => {
    alert.style.display = "none";
  }, 900);
}

const inputsAlert = (inputName, msjAlertInput) => {
  let inputsName = [...document.getElementsByName(inputName)];
  let nameInput = inputsName[0];

  nameInput.classList.add("inputAlert");
  let spanError = nameInput.parentNode.querySelector("span");

  spanError.classList.add("alertErrorInputShow");
  spanError.textContent = msjAlertInput;
};

export { alertErrorPay, inputsAlert };
