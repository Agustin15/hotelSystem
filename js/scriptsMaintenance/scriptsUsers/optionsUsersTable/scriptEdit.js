import { closeModal } from "./scriptDelete.js";
import { modal, displayTable} from "../scriptTable.js";
import { PUTuser } from "../methodsFetch.js";

import {
  allRols,
  displayAvatarSelected,
  displayRols,
  changeTypeInput,
  inputError,
  cleanErrorInputs,
  alertForm,
  loading
} from "./scriptAdd.js";

let rolSelected;
let form, imageAvatar, containRols;

export const configEdit = async (user) => {
  let btnClose = document.querySelector(".btnClose");
  form = document.querySelector("form");
  containRols = document.querySelector(".containRols");
  imageAvatar = document.querySelector(".imageAvatar").querySelector("img");

  btnClose.addEventListener("click", () => {
    closeModal(modal);
  });

  if (!user) {
    noData();
  } else {
    if (form) {
      let rols = await allRols(containRols);
      if (rols) {
        let rolOptions = displayRols(rols, containRols);
        if (rolOptions) {
          verifyRolSelected(containRols);
        }
        setValuesForm(user);
      }

      displayAvatarSelected();
      let viewsPassword = document.querySelector(".viewPassword");
      viewsPassword.addEventListener("click", () => {
        changeTypeInput(viewsPassword);
      });

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userToUpdated = {};
        let errorForm = false;
        cleanErrorInputs();

        if (!rolSelected) {
          errorForm = true;
          inputError("rol", "Seleccione un rol");
        }

        formData.forEach((value, key) => {
          if (key == "password" && value.length == 0) {
            value = user.contrasenia;
          }
          let validationInput = validationsInputs(key, value);
          if (!validationInput.validation) {
            inputError(validationInput.name, validationInput.msj);
            errorForm = true;
          } else {
            userToUpdated[key] = value;
          }
        });
        if (!errorForm) {
          userToUpdated.rol = rolSelected;
          userToUpdated.image = imageAvatar.src;
          userToUpdated.idUser = user.idUsuario;
          userToUpdated.option = "updateUser";
          submitForm(userToUpdated);
        }
      });
    }
  }
};

const submitForm = async (userToUpdated) => {
  let resultUpdate;
  loading(true);
  try {
    const result = await PUTuser(userToUpdated);

    if (result.errorMessage) {
      throw result.errorMessage;
    } else {
      resultUpdate = result;
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

    if (resultUpdate) {
      alertForm(true);
      displayTable();
    } else {
      alertForm(false);
    }
  }
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

const setValuesForm = (user) => {
  let keysUser = Object.keys(user);
  let inputs = [...document.querySelectorAll("input")];

  keysUser.forEach((key) => {
    let inputFound = inputs.find((input) => input.id == key);

    if (key == "rol") {
      setRolOption(user.idRol);
    } else {
      if (inputFound) {
        if (key == "imagen") {
          imageAvatar.src = `data:image/png;base64,${user[key]}`;
          imageAvatar.classList.add("iconAvatar");
        } else {
          inputFound.value = user[key];
        }
      }
    }
  });
};

const setRolOption = (idRolUser) => {
  let optionsRol = [...containRols.querySelectorAll("li")];

  let optionRolFound = optionsRol.find((optionRol) => {
    let rol = JSON.parse(optionRol.id);
    if (rol.idRol == idRolUser) {
      return optionRol;
    }
  });
  optionRolFound.classList.add("rolSelected");
  rolSelected = idRolUser;
};

const noData = () => {
  let noData = document.querySelector("noData");

  form.style.display = "none";
  noData.style.display = "flex";
};

export const validationsInputs = (key, value) => {
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
      validation: value.length > 0 ? value.length > 8 : true,
      msj: "La contraseña debe tener mas de 8 caracteres"
    },
    {
      name: "imagen",
      validation: imageAvatar.src.length > 0,
      msj: "Ingresa una imagen como avatar"
    }
  ];
  let validationInput = validations.find(
    (validation) => validation.name == key
  );
  return validationInput;
};
