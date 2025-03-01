import { PUTuser } from "../scriptsUsers/methodsFetch.js";
import { displayForm } from "./userData.js";

export const submitForm = async (form, avatarFormProfile, dataUser) => {
  cleanInputsMsjAlert(form);
  cleanInputAlert(form);

  const formData = new FormData(form);
  const user = {};
  let errorForm = false;

  formData.forEach((value, key) => {
    let validationInput = validationsInput(key, value);
    if (!validationInput.validation) {
      inputAlert(key, validationInput.msj);
      errorForm = true;
    } else {
      if (key == "name" || key == "lastname") {
        value = firstLetterUpper(value);
      }
      user[key] = value;
    }
  });

  if (!errorForm) {
    user.image = avatarFormProfile.src;
    user.rol = document.querySelector("#rol").value;
    user.idUser = dataUser.idUsuario;
    user.password = dataUser.contrasenia;

    let resultUpdated = await updateUser(user);
    if (resultUpdated) {
      alert(
        "¡Exito!",
        "../../../img/tickAdmin.png",
        "¡Perfil actualizado!",
        true
      );
    }
  }
};

const validationsInput = (key, value) => {
  let regexEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

  let validations = [
    {
      name: "name",
      validation: value.length > 0,
      msj: "Complete el campo nombre"
    },

    {
      name: "lastname",
      validation: value.length > 0,
      msj: "Complete el campo apellido"
    },
    {
      name: "username",
      validation: value.length > 5,
      msj: "El usuario debe tener mas de 5 caracteres"
    },
    {
      name: "email",
      validation: value.match(regexEmail),
      msj: "Ingrese un correo valido"
    }
  ];

  return validations.find((validation) => validation.name == key);
};
const inputAlert = (key, msj) => {
  let input = [...document.getElementsByName(key)][0];
  input.classList.add("inputToAlert");

  let containMsjError = input.parentElement.querySelector(".errorInput");
  containMsjError.style.display = "flex";
  containMsjError.querySelector("p").textContent = msj;
};

export const cleanInputsMsjAlert = (fatherElement) => {
  let errorInputs = fatherElement.querySelectorAll(".errorInput");
  errorInputs.forEach((errorInput) => (errorInput.style.display = "none"));
};

export const cleanInputAlert = (fatherElement) => {
  let inputs = fatherElement.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      input.classList.remove("inputToAlert");
    });
  });
};

export const loadingSave = (state, loadingElement) => {
  let loading = document.querySelector(loadingElement);

  if (state) {
    loading.style.display = "flex";
  } else {
    loading.style.display = "none";
  }
};

const updateUser = async (user) => {
  let resultUpdated;
  loadingSave(true, ".loadingSave");
  try {
    let result = await PUTuser(user);

    if (result.errorMessage) {
      throw result;
    }

    if (result) {
      resultUpdated = result;
    }
  } catch (error) {
    if (error.errorMessage.indexOf("Correo") > -1) {
      inputAlert("email", error.errorMessage);
    }
    if (error.errorMessage.indexOf("usuario") > -1) {
      inputAlert("username", error.errorMessage);
    }
  } finally {
    loadingSave(false, ".loadingSave");
    return resultUpdated;
  }
};

const alert = (title, icon, msj, state) => {
  let alert = document.querySelector(".alertSave");
  alert.querySelector("span").textContent = title;
  alert.querySelector("p").textContent = msj;
  alert.querySelector("img").src = icon;

  if (state) {
    alert.classList.add("alertSaveCorrect");
  }

  setTimeout(() => {
    if (state) {
      alert.classList.remove("alertSaveCorrect");
      displayForm();
    }
  }, 3000);
};

const firstLetterUpper = (value) => {
  let valueArray = [...value];
  return valueArray
    .map((char, index) => {
      if (index == 0) {
        return char.toUpperCase();
      }
      return char.toLowerCase();
    })
    .join("");
};
