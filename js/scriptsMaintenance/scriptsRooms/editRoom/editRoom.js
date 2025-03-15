import { convertFileToBase64 } from "../../scriptsUsers/optionsUsersTable/scriptAdd.js";
import { closeModal } from "../../scriptsUsers/optionsUsersTable/scriptDelete.js";
import { displayCategoryRooms, modalRooms } from "../listRooms.js";
import { PUTCategoryRoom } from "../methodsFetch.js";
import { alertForm } from "../../scriptsUsers/optionsUsersTable/scriptAdd.js";

let form;

export const configEditRoom = (categoryRoom) => {
  form = document.querySelector("#formEditRooms");
  let titleEdit = document.querySelector(".titleEdit").querySelector("h3");
  titleEdit.textContent = `Editar habitacion ${categoryRoom.categoria}`;

  eventCloseWindow();

  if (form) {
    setValuesForm(categoryRoom);
    submitForm();
  }
};

const submitForm = () => {
  const roomCategoryData = {};
  let quantityInputsForm = document.querySelectorAll(".inputMain").length;

  cleanInputError();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    cleanErrorInputs();
    let formData = new FormData(event.target);

    formData.forEach((value, key) => {
      let validationInput = validationsInputs(key, value);
      if (validationInput) {
        if (!validationInput.validation) {
          inputError(validationInput.name, validationInput.msj);
        } else {
          if (validationInput.methodParseValue) {
            value = validationInput.methodParseValue();
          }
          roomCategoryData[key] = value;
        }
      }
    });

    let imagesValidation = validationImages();
    if (
      quantityInputsForm == Object.keys(roomCategoryData).length &&
      imagesValidation
    ) {
      let resultUpdate = await updateCategoryRoom(roomCategoryData);
      if (resultUpdate) {
        alertForm(true);
        displayCategoryRooms();
      }
    }
  });
};
const setValuesForm = (categoryRoom) => {
  let inputs = [...form.querySelectorAll("input")];

  let keysObject = Object.keys(categoryRoom);

  keysObject.forEach((key) => {
    let inputFound = inputs.find((input) => input.id == key);

    if (inputFound) {
      inputFound.value = categoryRoom[key];
    } else {
      setImagesForm(categoryRoom, key);
    }
  });

  eventUploadImage();
};

const updateCategoryRoom = async (roomCategoryData) => {
  let containsImageRoom = [...document.querySelectorAll(".imageRoom")];

  let imgsRoom = containsImageRoom.map((contain) => {
    let imgRoom = contain.querySelector("img");
    return imgRoom;
  });

  imgsRoom.forEach((img) => {
    let key = img.className;
    roomCategoryData[key] = img.src;
  });

  let resultUpdate;

  loading(true);
  try {
    const result = await PUTCategoryRoom(roomCategoryData);
    if (result) {
      resultUpdate = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!resultUpdate) {
      alertForm(false);
    }

    return resultUpdate;
  }
};

export const loading = (state) => {
  let loader = document.querySelector(".loader");
  if (state) {
    loader.style.display = "flex";
  } else {
    loader.style.display = "none";
  }
};

const setImagesForm = (categoryRoom, key) => {
  let elementColumnImagesRoom = document.querySelector(".columnImagesRoom");
  let imgsRoom = [...elementColumnImagesRoom.querySelectorAll("img")];
  let imageRoomFound = imgsRoom.find((image) => image.id == key);

  if (imageRoomFound) {
    imageRoomFound.src = `data:image/png;base64,${categoryRoom[key]}`;
  }
};

const validationImages = () => {
  let validationImages = true;
  let containsImageRoom = document.querySelectorAll(".imageRoom");

  containsImageRoom.forEach((contain) => {
    let imgRoom = contain.querySelector("img");

    if (imgRoom.src.indexOf("base64") == -1) {
      let containError =
        imgRoom.parentElement.parentElement.querySelector(".errorInput");

      containError.style.display = "flex";
      containError.querySelector("p").textContent = "Carga una imagen";
      validationImages = false;
    }
  });

  return validationImages;
};

const validationsInputs = (key, value) => {
  const validations = [
    {
      name: "category",
      validation: value.length > 0,
      msj: "Completa la categoria"
    },
    {
      name: "terrace",
      validation: value.length > 0 && value > 0,
      msj: "Ingresa una cantidad valida",
      methodParseValue: function () {
        return parseInt(value);
      }
    },
    {
      name: "beds",
      validation: value.length > 0 && value > 0,
      msj: "Ingresa una cantidad valida",
      methodParseValue: function () {
        return parseInt(value);
      }
    },
    {
      name: "capacity",
      validation: value.length > 0 && value > 0,
      msj: "Ingresa una capacidad valida",
      methodParseValue: function () {
        return parseInt(value);
      }
    },
    {
      name: "price",
      validation: value.length > 0 && value > 0,
      msj: "Ingresa un precio valido",
      methodParseValue: function () {
        return parseFloat(value);
      }
    }
  ];

  let validationInput = validations.find(
    (validation) => validation.name == key
  );

  return validationInput;
};

export const inputError = (key, msj) => {
  let input = [...document.getElementsByName(key)][0];
  input.classList.add("inputError");
  let containError = input.parentElement.querySelector(".errorInput");
  containError.style.display = "flex";
  containError.querySelector("p").textContent = msj;
};

export const cleanErrorInputs = () => {
  let errorsInputs = document.querySelectorAll(".errorInput");
  errorsInputs.forEach((errorInput) => (errorInput.style.display = "none"));
};

export const cleanInputError = () => {
  let inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      input.classList.remove("inputError");
    });
  });
};

const eventUploadImage = () => {
  document.querySelectorAll(".selectImage").forEach((select) => {
    select.addEventListener("change", async () => {
      let file = select.files[0];
      let image =
        select.parentElement.parentElement.parentElement.querySelector("img");
      image.src = await convertFileToBase64(file);
    });
  });
};

const eventCloseWindow = () => {
  let btn = document.querySelector(".btnCloseEditRoom");

  btn.addEventListener("click", () => {
    closeModal(modalRooms);
  });
};
