import { displayTable, displayControlsIndex } from "../scriptTable.js";
import { POSTuser } from "../methodsFetch.js";
import { getRols } from "../methodsFetch.js";
import { modal } from "../scriptTable.js";
import { closeModal } from "./scriptDelete.js";

let containRols;
let rolSelected;
let imgAvatar;

export const configAdd = async () => {
  let formAddUser = document.querySelector("form");
  containRols = document.querySelector(".containRols");
  let btnClose = document.querySelector(".btnClose");

  btnClose.addEventListener("click", () => {
    closeModal(modal);
  });

  if (formAddUser) {
    let rols = await allRols(containRols);

    if (rols) {
      let rolOptions = displayRols(rols, containRols);
      if (rolOptions) {
        verifyRolSelected(containRols);
      }
    }

    clickViewPassword();
    displayAvatarSelected();

    formAddUser.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const newUser = {};
      let errorForm = false;
      let valuePassword = "";
      cleanErrorInputs();

      if (!rolSelected) {
        errorForm = true;
        inputError("rol", "Seleccione un rol");
      }

      formData.forEach((value, key) => {
        if (key == "password") {
          valuePassword = value;
        }
        let validationInput = validationsInputs(key, value, valuePassword);
        if (!validationInput.validation) {
          inputError(validationInput.name, validationInput.msj);
          errorForm = true;
        } else {
          newUser[key] = value;
        }
      });
      if (!errorForm) {
        newUser.rol = rolSelected;
        newUser.avatar = imgAvatar.src;
        submitForm(newUser);
      }
    });
  }
};

const submitForm = async (newUser) => {
  let resultAdd;
  loading(true);
  try {
    const result = await POSTuser(newUser);

    if (result.error) {
      throw result.error;
    } else {
      resultAdd = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("usuario") > -1) {
      inputError("username", error);
    }
    if (error.indexOf("Correo") > -1) {
      inputError("email", error);
    }
  } finally {
    loading(false);

    if (resultAdd) {
      alertForm(true);
      cleanInputs();
      await displayControlsIndex();
      displayTable();
    } else {
      alertForm(false);
    }
  }
};

export const validationsInputs = (key, value, valuePassword) => {
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
      validation: value.length > 0 && value.match(regexEmail),
      msj: "Ingrese un correo valido"
    },
    {
      name: "password",
      validation: value.length > 8,
      msj: "La contraseña debe tener mas de 8 caracteres"
    },
    {
      name: "repeatPassword",
      validation: value == valuePassword,
      msj: "Las contraseñas no coinciden"
    },
    {
      name: "avatar",
      validation: value.size != 0,
      msj: "Ingresa una imagen como avatar"
    }
  ];

  let validationInput = validations.find(
    (validation) => validation.name == key
  );
  return validationInput;
};

export const allRols = async (containRols) => {
  const rols = await getRols();

  if (!rols) {
    containRols.innerHTML = `
      <p>Ups, no se pudieron cargar los roles</p>
    `;
  }

  return rols;
};

export const displayRols = (rols, containRols) => {
  let rolOptions = rols.map((rol) => {
    return `
      <li id='${JSON.stringify(rol)}'>
      ${rol.rol}
      </li>
    `;
  });

  containRols.innerHTML = rolOptions.join("");
  return rolOptions;
};

export const verifyRolSelected = (containRols) => {
  let optionsRol = [...containRols.querySelectorAll("li")];
  optionsRol.forEach((option) => {
    option.addEventListener("click", () => {
      let optionRolFound = optionsRol.find(
        (optionRol) =>
          optionRol.className == "rolSelected" && optionRol.id != option.id
      );

      if (optionRolFound) {
        optionRolFound.classList.remove("rolSelected");
      }
      option.classList.add("rolSelected");
      let rolData = JSON.parse(option.id);
      rolSelected = rolData.idRol;
    });
  });
};

export const inputError = (key, msj) => {
  let containError;

  if (key == "rol") {
    containError = document.querySelector(".rol").querySelector(".errorInput");
  } else {
    let input = [...document.getElementsByName(key)][0];
    containError = input.parentElement.querySelector(".errorInput");

    if (key == "avatar" || key == "imagen") {
      containError =
        input.parentElement.parentElement.querySelector(".errorInput");
    }
  }

  containError.style.display = "flex";
  containError.querySelector("p").textContent = msj;
};

export const cleanErrorInputs = () => {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => input.classList.remove("errorInput"));

  let errorsInputs = document.querySelectorAll(".errorInput");

  errorsInputs.forEach((errorInput) => (errorInput.style.display = "none"));
};

export const displayAvatarSelected = () => {
  imgAvatar = document.querySelector(".imageAvatar").querySelector("img");
  let selectAvatar = document.querySelector(".selectAvatar");

  selectAvatar.addEventListener("change", async () => {
    let file = selectAvatar.files[0];
    imgAvatar.src = await convertFileToBase64(file);

    imgAvatar.classList.add("iconAvatar");
  });
};

export const loading = (state) => {
  let loader = document.querySelector(".loader");
  if (state) {
    loader.style.display = "flex";
  } else {
    loader.style.display = "none";
  }
};

export const alertForm = (state) => {
  let modalAlert = document.querySelector(".modalAlert");
  let alertError = document.querySelector(".alertError");
  let alertSuccesfully = document.querySelector(".alertSuccesfully");
  modalAlert.style.display = "flex";

  if (state) {
    alertSuccesfully.style.display = "flex";
    document
      .querySelector(".btnCloseAlertSuccesfully")
      .addEventListener("click", () => {
        closeAlert(modalAlert, alertSuccesfully);
      });
  } else {
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

const clickViewPassword = () => {
  document.querySelectorAll(".viewPassword").forEach((element) => {
    element.addEventListener("click", () => {
      changeTypeInput(element);
    });
  });
};

export const changeTypeInput = (eye) => {
  let input = eye.parentElement.querySelector("input");
  if (input.type == "password") {
    input.type = "text";
    eye.src = "../../../img/ver.png";
  } else {
    input.type = "password";
    eye.src = "../../../img/ojo.png";
  }
};

export const convertFileToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
  });
};

const cleanInputs = () => {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
};
