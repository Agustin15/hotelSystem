var password = document.getElementById("password");
var iconoPass = document.querySelector(".iconoPass");

iconoPass.addEventListener("click", function () {
  if (password.type == "password") {
    password.type = "text";
    iconoPass.src = "../../img/ver.png";
  } else {
    password.type = "password";
    iconoPass.src = "../../img/ojo.png";
  }
});

$("#password").on("click", function () {
  lblInputsLoginActive($(".lblPass"), "lblInputEfect", "lblInputEfectRemove");
});

$("#password").on("mouseleave", function () {
  lblInputsLoginDesactive($(".lblPass"), $(this), "lblInputEfectRemove");
});

$("#usuario").on("click", function () {
  lblInputsLoginActive(
    $(".lblUsuario"),
    "lblInputEfect",
    "lblInputEfectRemove"
  );
});

$("#usuario").on("mouseleave", function () {
  lblInputsLoginDesactive($(".lblUsuario"), $(this), "lblInputEfectRemove");
});

function lblInputsLoginActive(label, clase, claseRemove) {
  label.removeClass(claseRemove);
  label.addClass(clase);
}

function lblInputsLoginDesactive(label, input, claseAdd) {
  if (input.val() == "") {
    label.addClass(claseAdd);
  }
}

let formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  let user = document.getElementById("usuario");
  let password = document.getElementById("password");

  login(user, password);
});

const login = (user, password) => {
  if (user.value == "" || password.value == "") {
    alertaCompleteDatos("Complete todos los campos");
  } else {
    let dataUser = {
      user: user.value,
      password: password.value,
    };

    fetch(
      "http://localhost/sistema%20Hotel/controller/admin/autenticacionLogin.php",
      {
        method: "POST",
        body: JSON.stringify(dataUser),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((respuesta) => {
        console.log(respuesta);
        if (respuesta.resultado == true) {
          

          location.href="http://localhost/sistema%20Hotel/views/admin/panelAdmin.php";
        }else{

          alertaCompleteDatos(respuesta.resultado);
        }
      });
  }
};
