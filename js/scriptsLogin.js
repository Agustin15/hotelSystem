let alertInvalidToken;

document.addEventListener("DOMContentLoaded", function () {
  alertInvalidToken = localStorage.getItem("alertInvalidToken");
  if (alertInvalidToken) {
    alertLoginAdmin(
      "../../img/advertenciaLogin.png",
      "Autenticacion fallida, token expirado",
      "Advertencia"
    );

    setTimeout(() => {
      removeAlertLoginAdmin();
      localStorage.removeItem("alertInvalidToken");
    }, 4000);
  }
  desactivateInputAlert();
});

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
  removeAlertLoginAdmin();
  if (alertInvalidToken) {
    localStorage.removeItem("alertInvalidToken");
  }
  const form = event.target;

  const formUser = new FormData(form);
  let validate = null;
  const userData = {};

  formUser.forEach((v, k) => {
    if (v.trim() == "") {
      validate = "Complete todos los campos";
      inputAlert(k);
      return;
    } else {
      userData[k] = v;
    }
  });

  if (validate) {
    alertLoginAdmin("../../img/advertenciaLogin.png", validate, "Advertencia");
  } else {
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
        "http://localhost/sistema%20Hotel/routes/admin/loginRoutes.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userData: userData }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw result.error;
      } else if (result.userLogin) {
        location.href =
          "http://localhost/sistema%20Hotel/views/admin/index.php";
      }
    } catch (error) {
      console.log(error);
      alertLoginAdmin("../../img/advertenciaLogin.png", error, "Error");
    } finally {
      loading(false);
    }
  }, 200);
}
