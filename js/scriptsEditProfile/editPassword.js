import {
  cleanInputAlert,
  cleanInputsMsjAlert,
  loadingSave
} from "./formProfile.js";
import { PATCHUserPassword } from "../scriptsMaintenance/scriptsUsers/methodsFetch.js";
import { displayForm } from "./userData.js";

let modal, form;

export const configEditPassword = (idUser) => {
  modal = document.querySelector(".modal");
  modal.style.display = "flex";

  modal.innerHTML = `
 
<div class="containEditPassword">
    <div class="closeMain">
        <button class="btnCloseMain">X</button>
    </div>
    <div class="title">
        <h3>Actualizar contraseña</h3>
        <img src="../../../img/editPassword.png">
    </div>

    <form id="formEditPassword">
        <div class="inputs">

            <div class="currentPassword">
                <label>Ingresa contraseña actual</label>
                <input type="password" name="currentPassword">
                <img class="iconEye" src="../../../img/ojo.png">
                <div class="errorInput">
                    <img src="../../../img/warningInput.png">
                    <p></p>
                </div>
            </div>
            <div class="newPassword">
                <label>Ingresa tu nueva contraseña </label>
                <input type="password" name="newPassword">
                <img class="iconEye" src="../../../img/ojo.png">
                <div class="errorInput">
                    <img src="../../../img/warningInput.png">
                    <p></p>
                </div>
            </div>

            <div class="repeatPassword">
                <label>Repita su nueva contraseña</label>
                <input type="password" name="repeatPassword">
                <img class="iconEye" src="../../../img/ojo.png">
                <div class="errorInput">
                    <img class src="../../../img/warningInput.png">
                    <p></p>
                </div>
            </div>
        </div>

        <button class="btnUpdatePassword">
        Actualizar
        <img class="loadingSavePassword" src="../../../img/spinnerBooking.gif">
        </button>
    
          <div class="alertSavePassword"">
                <img>
                <div class="body">
                    <span></span>
                    <p></p>
                </div>
            </div>
    </form>

</div> 
 

  `;

  form = document.querySelector("#formEditPassword");
  let btnCloseMain = document.querySelector(".btnCloseMain");

  document.querySelectorAll(".iconEye").forEach((eye) => {
    eye.addEventListener("click", () => {
      changeTypeInput(eye);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    cleanInputAlert(form);
    cleanInputsMsjAlert(form);
    submitFormPassword(idUser);
  });

  btnCloseMain.addEventListener("click", () => {
    modal.style.display = "none";
    modal.innerHTML= ``;
  });
};

const changeTypeInput = (eye) => {
  let input = eye.parentElement.querySelector("input");
  if (input.type == "password") {
    input.type = "text";
    eye.src = "../../../img/ver.png";
  } else {
    input.type = "password";
    eye.src = "../../../img/ojo.png";
  }
};

const submitFormPassword = async (idUser) => {
  let formData = new FormData(form);
  const dataPassword = {};
  let errorForm = false;
  let valueNewPassword = "";

  formData.forEach((value, key) => {
    if (key == "newPassword") {
      valueNewPassword = value;
      console.log(valueNewPassword);
    }

    let validationInput = validationsInput(key, value, valueNewPassword);
    if (!validationInput.validation) {
      inputAlert(key, validationInput.msj);
      errorForm = true;
    } else {
      dataPassword[key] = value;
    }
  });

  if (!errorForm) {
    let resultUpdated = await updatePasswordUser(dataPassword, idUser);
    if (resultUpdated) {
      cleanInputs();
      alert(
        "¡Exito!",
        "../../../img/tickAdmin.png",
        "¡Contraseña actualizada!",
        true
      );
    }
  }
};

const validationsInput = (key, value, valueNewPassword) => {
  let validations = [
    {
      name: "currentPassword",
      validation: value.length > 0,
      msj: "Complete el campo contraseña actual"
    },

    {
      name: "newPassword",
      validation: value.length > 8,
      msj: "La contraseña debe tener mas de 8 caracteres "
    },
    {
      name: "repeatPassword",
      validation: value.trim() == valueNewPassword.trim(),
      msj: "La contraseña no coincide"
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

const updatePasswordUser = async (dataPassword, idUser) => {
  let resultUpdated;
  const userPasswordToUpdate = {
    idUser: idUser,
    currentPassword: dataPassword.currentPassword,
    newPassword: dataPassword.newPassword
  };

  loadingSave(true, ".loadingSavePassword");
  try {
    let result = await PATCHUserPassword(userPasswordToUpdate);

    if (result.errorMessage) {
      throw result.errorMessage;
    }
    if (result) {
      resultUpdated = result;
    }
  } catch (error) {
    if (error.indexOf("incorrecta") > -1) {
      inputAlert("currentPassword", error);
    }
  } finally {
    loadingSave(false, ".loadingSavePassword");
    return resultUpdated;
  }
};

const alert = (title, icon, msj, state) => {
  let alert = document.querySelector(".alertSavePassword");
  alert.querySelector("span").textContent = title;
  alert.querySelector("p").textContent = msj;
  alert.querySelector("img").src = icon;

  if (state) {
    alert.classList.add("alertSavePasswordCorrect");
  }

  setTimeout(() => {
    if (state) {
      alert.classList.remove("alertSavePasswordCorrect");
      displayForm();
    }
  }, 3000);
};

const cleanInputs = () => {
  form.querySelectorAll("input").forEach((input) => (input.value = ""));
};
