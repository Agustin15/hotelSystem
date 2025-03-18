import { closeModal } from "../../../scriptsUsers/optionsUsersTable/scriptDelete.js";
import { displayTable, displayControlsIndex } from "../editProducts.js";
import { PUTHotelService } from "../../../../scriptsServices/scriptServices.js";
import { convertFileToBase64 } from "../../../scriptsUsers/optionsUsersTable/scriptAdd.js";
import { eventKeyDownInputPrice } from "../editService.js";
import { alertForm } from "../editService.js";

let form, iconProduct, serviceName, productToEdit;

export const configEditProduct = (nameService, product, modal) => {
  serviceName = nameService;
  productToEdit = product;
  let btnCloseWindow = document.querySelector(".btnCloseWindow");
  form = document.querySelector("form");
  iconProduct = document.querySelector(".iconProduct");

  btnCloseWindow.addEventListener("click", async () => {
    closeModal(modal);
  });

  if (!product) {
    noService();
  } else if (product && form) {
    setForm(product);
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

  let validImage = validationImage();
  if (inputsQuantiy == Object.values(product).length && validImage) {
    product.image = iconProduct.src;
    product.name = serviceName;
    product.idService = productToEdit.idServicio;

    let productUpdated = await updateProduct(product);
    if (productUpdated) {
      alertForm(
        true,
        `Producto ${productToEdit.descripcionServicio} actualizado el exitosamente`
      );

      displayTable();
    }
  }
};

const setForm = (product) => {
  form.style.display = "flex";
  let inputs = [...form.querySelectorAll("input")];

  let keys = Object.keys(product);
  keys.forEach((key) => {
    let inputFound = inputs.find((input) => input.id == key);
    if (inputFound) {
      inputFound.value = product[key];
    }
  });

  changeQuantity(product);
  let image = document.querySelector(".containImage").querySelector("img");
  image.src = `data:image/png;base64,${product.imagen}`;
  uploadIconProduct();
  eventKeyDownInputPrice();
};

const changeQuantity = (product) => {
  let btnMinus = document.querySelector(".btnMinus");
  let btnPlus = document.querySelector(".btnPlus");
  let maxStockInput = document.getElementById("maxStock");

  btnPlus.addEventListener("click", () => {
    product.maxStock = product.maxStock + 1;
    maxStockInput.value = product.maxStock;
  });

  btnMinus.addEventListener("click", () => {
    if (maxStockInput.value > 0) {
      product.maxStock = product.maxStock - 1;
      maxStockInput.value = product.maxStock;
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

const validationImage = () => {
  let validation = false;
  if (iconProduct.src.indexOf("base64") > -1) {
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

const updateProduct = async (productToEdit) => {
  let data;
  loading(true);
  try {
    const result = await PUTHotelService(productToEdit);

    if (result.error) {
      throw result.error;
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    let msjError = `Ups, no se pudo actualizar el producto ${productToEdit.descripcionServicio}`;

    if (error.indexOf("existente") > -1) {
      msjError = error;
    }

    alertForm(false, msjError);
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

const noService = () => {
  let noService = document.querySelector(".noService");
  noService.style.display = "flex";
};
