import { closeModal } from "../../scriptsUsers/optionsUsersTable/scriptDelete.js";
import { configTableServices } from "../services.js";
import {
  inputError,
  cleanInputError,
  cleanErrorInputs,
  loading
} from "../../scriptsRooms/editRoom/editRoom.js";

import { convertFileToBase64 } from "../../scriptsUsers/optionsUsersTable/scriptAdd.js";
import { PUTHotelService } from "../../../scriptsServices/scriptServices.js";

let iconService;
let serviceData;

export const configEditService = (service) => {
  serviceData = service;
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
    setForm(form);
  }
};

const setForm = (form) => {
  iconService = document.querySelector("#iconService");
  let inputs = [...document.querySelectorAll("input")];
  inputs.push(document.querySelector("textarea"));

  Object.keys(serviceData).forEach((key) => {
    let inputFound = inputs.find((input) => input.id == key);

    if (inputFound) {
      inputFound.value = serviceData[key];
    }
  });

  iconService.src = `data:image/png;base64,${serviceData.imagen}`;
  uploadIconService();
  eventKeyDownInputPrice();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    cleanErrorInputs();

    const formData = new FormData(event.target);

    submitForm(formData);
  });
};

const uploadIconService = () => {
  let inputFile = document.getElementById("#src-file");

  inputFile.addEventListener("change", async () => {
    let file = inputFile.files[0];
    let urlIcon = await convertFileToBase64(file);
    iconService.src = urlIcon;
  });
};

const submitForm = async (formData) => {
  cleanInputError();
  cleanErrorIcon();
  const serviceToUpdate = {};

  formData.forEach((value, key) => {
    let validationInput = validationsInputs(key, value);

    if (validationInput) {
      if (key == "price") {
        value = validationInput.methodToParse(value);
      }
      if (!validationInput.validation) {
        inputError(key, validationInput.msj);
      } else {
        serviceToUpdate[key] = value;
      }
    }
  });

  let quantityInputsForm = document.querySelectorAll(".inputToFormData").length;
  let validationIcon = validationIconService();

  if (
    quantityInputsForm == Object.keys(serviceToUpdate).length &&
    validationIcon
  ) {
    serviceToUpdate.name = serviceData.nombreServicio;
    serviceToUpdate.image = iconService.src;

    let serviceUpdated = await updateServiceHotel(serviceToUpdate);

    if (serviceUpdated) {
      alertForm(true);
      configTableServices();
    }
  }
};

const validationsInputs = (key, value) => {
  let validations = [
    {
      key: "price",
      validation: value.length > 0 && value > 0,
      msj: "Ingresa un precio valido",
      methodToParse: function (value) {
        return parseFloat(value);
      }
    },
    {
      key: "description",
      validation: value.length > 0,
      msj: "Completa la descripcion"
    }
  ];

  let validationFound = validations.find((validation) => validation.key == key);

  return validationFound;
};

const validationIconService = () => {
  let stateIconServiceUpload = false;
  if (iconService.src.indexOf("base64") > -1) {
    stateIconServiceUpload = true;
  } else {
    let containError = document
      .querySelector("#containInputIcon")
      .querySelector(".errorIcon");

    containError.style.display = "flex";
    containError.querySelector("p").textContent = "Ingresa una imagen";
  }
  return stateIconServiceUpload;
};

const cleanErrorIcon = () => {
  let containError = document
    .querySelector("#containInputIcon")
    .querySelector(".errorIcon");

  containError.style.display = "none";
};

const updateServiceHotel = async (serviceToUpdate) => {
  let data;
  loading(true);
  try {
    let result = await PUTHotelService(serviceToUpdate);
    if (result.error) {
      throw result.error;
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    alertForm(false);
  } finally {
    loading(false);
    return data;
  }
};

const eventKeyDownInputPrice = () => {
  let priceInput = document.getElementById("precio");

  priceInput.addEventListener("input", (event) => {
    replaceCharacter(event.target);
  });
};

function replaceCharacter(input) {
  let valid = /\d/;

  let ultimateCharacter = input.value
    .trim()
    .charAt(input.value.trim().length - 1);

  if (!ultimateCharacter.match(valid)) {
    let newValue = input.value.replace(ultimateCharacter, "");
    input.value = newValue;
  }
}

export const alertForm = (state) => {
  let modalAlert = document.querySelector(".modalAlert");
  let alertError = document.querySelector(".alertError");
  let alertSuccesfully = document.querySelector(".alertSuccesfully");
  modalAlert.style.display = "flex";

  if (state) {
    alertSuccesfully.querySelector(
      "p"
    ).textContent = `Servicio ${serviceData.nombreServicio} actualizado exitosamente`;
    alertSuccesfully.style.display = "flex";
    document
      .querySelector(".btnCloseAlertSuccesfully")
      .addEventListener("click", () => {
        closeAlert(modalAlert, alertSuccesfully);
      });
  } else {
    alertError.querySelector(
      "p"
    ).textContent = `Ups, no se pudo actualizar el servicio ${serviceData.nombreServicio}`;
    alertError.style.display = "flex";
    document
      .querySelector(".btnCloseAlertError")
      .addEventListener("click", () => {
        closeAlert(modalAlert, alertError);
      });
  }
};

const closeAlert = (modal, alert) => {
  modal.style.display = "none";
  alert.style.display = "none";
};
