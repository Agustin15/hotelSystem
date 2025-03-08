import { getDataUserByToken } from "../scriptsAdmin/userData.js";
import { changeAvatar } from "./changeAvatar.js";
import { submitForm } from "./formProfile.js";
import { configEditPassword } from "./editPassword.js";

let form, avatarFormProfile;
document.addEventListener("DOMContentLoaded", async () => {
  form = document.querySelector("form");
  displayForm();
});

export const displayForm = async () => {
  let dataUser = await getDataUser();
  if (dataUser) {
    setFormProfile(dataUser);
  }
};

export const setFormProfile = (dataUser) => {
  form.style.display = "flex";
  avatarFormProfile = document.querySelector(".icon").querySelector("img");
  let btnChangeAvatar = document.querySelector(".changeAvatar");
  let editPassword = document.querySelector(".editPassword");
  let inputs = [...document.querySelectorAll("input")];

  let keysDataUser = Object.keys(dataUser);
  avatarFormProfile.src = "data:image/png;base64," + dataUser.imagen;

  form.querySelector("#idRol").textContent = dataUser.rol;
  form.querySelector("#idRol").dataset.idRol = dataUser.idRol;

  inputs.forEach((input) => {
    let keyFound = keysDataUser.find((key) => key == input.id);
    if (keyFound)
      if (keyFound) {
        input.value = dataUser[keyFound];
      }
  });

  btnChangeAvatar.addEventListener("click", () => {

    window.scrollTo(0,0);
    changeAvatar(dataUser);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm(form, avatarFormProfile, dataUser);
  });

  editPassword.addEventListener("click", () => {
    configEditPassword(dataUser.idUsuario);
  });
};

const loadingUser = (state) => {
  let loading = document.querySelector(".loadingUser");

  if (state) {
    loading.style.display = "flex";
  } else {
    loading.style.display = "none";
  }
};

const noDataUser = (state) => {
  let noData = document.querySelector(".noDataUser");

  if (state) {
    noData.style.display = "flex";
  } else {
    noData.style.display = "none";
  }
};

const getDataUser = async () => {
  let data;
  loadingUser(true);
  try {
    const result = await getDataUserByToken();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingUser(false);
    if (!data) {
      noDataUser(statusbar);
    }
    return data;
  }
};
