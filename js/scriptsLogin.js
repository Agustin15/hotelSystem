const alertLoginAdmin = (img, msj, title) => {
  let alertLogin = document.querySelector(".alertLogin");

  alertLogin.querySelector("span").textContent = title;
  alertLogin.querySelector("img").src = img;
  alertLogin.querySelector("p").textContent = msj;
  alertLogin.style.display = "flex";
};

function inputAlert(inputName) {
  let inputsName = [...document.getElementsByName(inputName)];

  inputsName[0].classList.add("inputAlert");
}

function desactivateInputAlert() {
  [...document.getElementsByTagName("input")].forEach((input) => {
    input.addEventListener("click", function () {
      input.classList.remove("inputAlert");
    });
  });
}

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
  const form = event.target;

  const formUser = new FormData(form);
  let validate = null;
  const user = {};

  formUser.forEach((v, k) => {
    if (v.trim() == "") {
      validate = "Complete todos los campos";
      inputAlert(k);
      return;
    } else {
      user[k] = v;
    }
  });

  if (validate) {
    alertLoginAdmin("../../img/advertenciaLogin.png", validate, "Advertencia");
  } else {
    comprobateUser(user);
  }
}

function loading(status) {
  if (status) {
    document.querySelector(".spinner").style.display = "block";
  } else {
    document.querySelector(".spinner").style.display = "none";
  }
}

async function comprobateUser(user) {
  loading(true);

  let userJson = JSON.stringify(user);

  setTimeout(async () => {
    try {
      const response = await fetch(
        "http://localhost/sistema%20Hotel/controller/admin/autenticacionLogin.php?user=" +
          userJson,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.advertencia) {
        throw result.advertencia;
      } else if (result.respuesta) {
        location.href =
          "http://localhost/sistema%20Hotel/views/admin/index.php";
      } else {
        throw "Ups,no se pudo iniciar sesion";
      }
    } catch (error) {
      alertLoginAdmin("../../img/advertenciaLogin.png", error, "Error");
    } finally {
      loading(false);
    }
  }, 200);
}

document.addEventListener("DOMContentLoaded", function () {
  desactivateInputAlert();
});
