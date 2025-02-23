import { getDataUserByToken } from "../scriptsAdmin/userData.js";
import { changeAvatar } from "./editProfile.js";

let form;
document.addEventListener("DOMContentLoaded", async () => {
  form = document.querySelector("form");
  let dataUser = await getDataUser();
  if (dataUser) {
    setFormProfile(dataUser);
  }
});

const setFormProfile = (dataUser) => {
  form.style.display = "flex";
  form.querySelector("#rol").readOnly = true;

  let inputs = [...document.querySelectorAll("input")];

  let keysDataUser = Object.keys(dataUser);

  inputs.forEach((input) => {
    let keyFound = keysDataUser.find((key) => key == input.id);
    if (keyFound) {
      input.value = dataUser[keyFound];
    }
  });


  document.querySelector(".changeAvatar").addEventListener("click", () => {
    changeAvatar();
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
