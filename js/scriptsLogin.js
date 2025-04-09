import { FRONT_URL_LOCALHOST, BACK_URL_LOCALHOST } from "./urlLocalhost.js";

document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  let iconChangePassword = document.querySelector(".iconPassword");

  iconChangePassword.addEventListener("click", (event) => {
    passwordStatus(event);
  });

  form.addEventListener("submit", (event) => {
    setUser(event);
  });
});

function passwordStatus(event) {
  let password = document.querySelector("#passwordId");
  let img = event.target;

  if (password.type == "password") {
    password.type = "text";
    img.src = "../../img/ver.png";
  } else {
    password.type = "password";
    img.src = "../../img/ojo.png";
  }
}

function setUser(event) {
  event.preventDefault();
  removeAlertLoginAdmin();
  desactivateInputAlert();

  const form = event.target;

  const formUser = new FormData(form);
  let error = null;
  const userData = {};

  formUser.forEach((v, k) => {
    if (k == "user" && v.trim().length == 0) {
      error = "Ingrese usuario";
      inputAlert(k, error);
    }
    if (k == "password" && v.trim().length == 0) {
      error = "Ingrese contraseña";
      inputAlert(k, error);
    } else {
      userData[k] = v;
    }
  });

  if (!error) {
    login(userData);
  }
}

function loading(status) {
  if (status) {
    document.querySelector(".spinner").style.display = "block";
  } else {
    document.querySelector(".spinner").style.display = "none";
  }
}

async function login(userData) {
  loading(true);

  setTimeout(async () => {
    try {
      const response = await fetch(
        `${BACK_URL_LOCALHOST}routes/admin/loginRoutes.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include"
          },
          body: JSON.stringify({ userData: userData })
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw result.error;
      } else if (result.userLogin) {
        location.href = `${FRONT_URL_LOCALHOST}views/admin/index.php`;
      }
    } catch (error) {
      console.log(error);
      alertLoginAdmin("../../img/advertenciaLogin.png", error, "Error");
    } finally {
      loading(false);
    }
  }, 200);
}

const alertLoginAdmin = (img, msj, title) => {
  let alertLogin = document.querySelector(".alertLogin");

  alertLogin.querySelector("span").textContent = title;
  alertLogin.querySelector("img").src = img;
  alertLogin.querySelector("p").textContent = msj;
  alertLogin.style.display = "flex";
};

const removeAlertLoginAdmin = () => {
  let alertLogin = document.querySelector(".alertLogin");
  alertLogin.style.display = "none";
};

function inputAlert(inputName, msjError) {
  let inputsName = [...document.getElementsByName(inputName)];
  let input = inputsName[0];
  input.classList.add("inputAlert");
  let containErrorInput =
    input.parentElement.parentElement.querySelector(".errorInput");
  containErrorInput.querySelector("p").textContent = msjError;
  containErrorInput.style.display = "flex";
}

function desactivateInputAlert() {
  [...document.getElementsByTagName("input")].forEach((input) => {
    input.addEventListener("click", function () {
      input.classList.remove("inputAlert");
    });
  });

  [...document.querySelectorAll(".errorInput")].forEach((error) => {
    error.style.display = "none";
    error.querySelector("p").textContent = "";
  });
}
