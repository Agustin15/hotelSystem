import { closeModal } from "../../../scriptsUsers/optionsUsersTable/scriptDelete.js";
import { displayControlsIndex, displayTable } from "../editProducts.js";
import { POSTHotelService } from "../../../../scriptsServices/scriptServices.js";
import { convertFileToBase64 } from "../../../scriptsUsers/optionsUsersTable/scriptAdd.js";
import { eventKeyDownInputPrice } from "../editService.js";
import { alertForm } from "../editService.js";

let form, iconProduct, serviceName;

export const configAddProduct = (nameService, elementNull, modal) => {
  serviceName = nameService;

  let btnCloseWindow = document.querySelector(".btnCloseWindow");
  form = document.querySelector("form");
  iconProduct = document.querySelector(".iconProduct");

  btnCloseWindow.addEventListener("click", async () => {
    closeModal(modal);
  });

  if (form) {
    uploadIconProduct();
    eventKeyDownInputPrice();
    changeQuantity();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      cleanErrorMsj();
      cleanInputError();

      const formData = new FormData(event.target);
      submitForm(formData);
    });
  }
};

const submitForm = async (formData) => {
  const product = {};

  formData.forEach((value, key) => {
    let validationInput = validationsInput(key, value);

    if (validationInput) {
      if (key == "price" || key == "stock") {
        value = validationInput.methodParse(value);
      }
      if (!validationInput.validation) {
        inputError(key, validationInput.msj);
      } else {
        product[key] = value;
      }
    }
  });

  let inputsQuantiy = document.querySelectorAll(".inputForm").length;

  let validationFile = validationInputFile();
  if (inputsQuantiy == Object.values(product).length && validationFile) {
    product.image = iconProduct.src;
    product.name = serviceName;

    let productAdded = await addProduct(product);
    if (productAdded) {
      cleanInputs();
      alertForm(true, "Producto agregado el exitosamente");
      await displayControlsIndex();
      displayTable();
    }
  }
};

const changeQuantity = () => {
  let btnMinus = document.querySelector(".btnMinus");
  let btnPlus = document.querySelector(".btnPlus");
  let maxStockInput = document.getElementById("maxStock");

  btnPlus.addEventListener("click", () => {
    maxStockInput.value = parseInt(maxStockInput.value) + 1;
  });

  btnMinus.addEventListener("click", () => {
    if (maxStockInput.value > 0) {
      maxStockInput.value = parseInt(maxStockInput.value) - 1;
    }
  });
};

const validationsInput = (key, value) => {
  const validations = [
    {
      key: "description",
      validation: value.length > 0,
      msj: "Completa el nombre"
    },
    {
      key: "price",
      validation: value.length > 0 && value > 0,
      msj: "Completa precio",
      methodParse: function (value) {
        return parseFloat(value);
      }
    },
    {
      key: "stock",
      validation: value.length > 0 && value > 0,
      msj: "Ingresa un stock valido",
      methodParse: function (value) {
        return parseInt(value);
      }
    }
  ];

  let validation = validations.find((validation) => validation.key == key);
  return validation;
};

const validationInputFile = () => {
  let inputFile = document.getElementById("inputFile");
  let validation = false;

  if (inputFile.files.length > 0) {
    validation = true;
  } else {
    let errorInput = document
      .querySelector(".containIconService")
      .querySelector(".errorInput");

    errorInput.querySelector("p").textContent = "Ingresa una imagen";
    errorInput.style.display = "flex";
  }

  return validation;
};

const inputError = (key, msj) => {
  let input = document.getElementsByName(key)[0];

  let containError = input.parentElement.querySelector(".errorInput");
  if (key == "stock") {
    containError =
      input.parentElement.parentElement.querySelector(".errorInput");
  } else {
    input.classList.add("inputError");
  }

  containError.querySelector("p").textContent = msj;
  containError.style.display = "flex";
};

const cleanErrorMsj = () => {
  let errorInput = document.querySelectorAll(".errorInput");

  errorInput.forEach((errorInput) => {
    errorInput.style.display = "none";
  });
};

const cleanInputError = () => {
  let inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      input.classList.remove("inputError");
    });
  });
};

const loading = (state) => {
  let loader = document.querySelector(".loader");

  if (state) {
    loader.style.display = "flex";
  } else {
    loader.style.display = "none";
  }
};

const addProduct = async (productToAdd) => {
  let data;
  loading(true);
  try {
    const result = await POSTHotelService(productToAdd);
    if (result.error) {
      throw result.error;
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    alertForm(false, "Ups, no se pudo agregar el producto");
  } finally {
    loading(false);
    return data;
  }
};

const uploadIconProduct = () => {
  let inputFile = document.getElementById("inputFile");

  inputFile.addEventListener("change", async () => {
    let file = inputFile.files[0];
    let urlIcon = await convertFileToBase64(file);
    iconProduct.src = urlIcon;
  });
};

const cleanInputs = () => {
  form.reset();
  iconProduct.src = "../../../img/uploadProduct.png";
};
