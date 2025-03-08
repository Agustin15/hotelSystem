import { closeModal } from "../../scriptsUsers/optionsUsersTable/scriptDelete.js";

export const configEditService = (service) => {
  let modalServices = document.querySelector(".modalServices");
  let btnClose = document.querySelector(".btnCloseWindow");
  let form = document.querySelector("form");

  let titleService = document
    .querySelector(".titleEditService")
    .querySelector("h3");

  let titleImage = document
    .querySelector(".titleEditService")
    .querySelector("img");

  titleImage.src = `data:image/png;base64,${service.imagen}`;

  titleService.textContent = `Editar servicio ${service.nombreServicio.toLowerCase()}`;

  btnClose.addEventListener("click", () => {
    closeModal(modalServices);
  });

  if (form) {
    setForm(service);
  }
};

const setForm = (service) => {
  let iconService = document.querySelector("#iconService");
  let inputs = [...document.querySelectorAll("input")];
  inputs.push(document.querySelector("textarea"));

  Object.keys(service).forEach((key) => {
    console.log(key);
    let inputFound = inputs.find((input) => input.id == key);

    if (inputFound) {
      inputFound.value = service[key];
    }
  });

  iconService.src=`data:image/png;base64,${service.imagen}`
};
