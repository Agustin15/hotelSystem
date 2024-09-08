let formAgregar = document.getElementById("formAgregar");

document.addEventListener("DOMContentLoaded", function () {
  liBorderBottom("agregar");
  if (formAgregar) {
   
    addClient(formAgregar);
  
  }

});

async function addClient(formAgregar) {
  formAgregar.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(formAgregar);
    let client = await validationClient(formData);

    if (client) {
      if (
        window
          .getComputedStyle(document.querySelector(".alertFormClient"), null)
          .getPropertyValue("width") == "300px"
      ) {
        removeAlertFormClient();
      }
      let result = await POSTClient(client);

      if (result) {
        alertClientAdded();
      }
    }
  });

  [...document.querySelectorAll("input")].forEach((input) => {
    input.addEventListener("click", function () {
      removeInputAlert(input);
    });
  });
}

function cleanInputs() {
  let inputs = formAgregar.querySelectorAll("input");

  inputs.forEach(
    (input) =>
      function () {
        input.value = "";
      }
  );
}


function loading(status) {
  let spinner = document.querySelector(".spinnerLoad");

  if (status) {
    spinner.style.display = "block";
  } else {
    spinner.style.display = "none";
  }
}

function inputAlertClient(input) {
  let inputAlert = [...document.getElementsByName(input)];

  inputAlert[0].classList.add("inputAlert");
}

function removeInputAlert(input) {
  input.classList.remove("inputAlert");
}

async function alertFormClient(validate) {
  let alertForm = document.querySelector(".alertFormClient");
  let barProgress = alertForm.querySelector(".bar");

  alertForm.classList.remove("alertFormClientDesactive");
  alertForm.classList.add("alertFormClientActive");
  alertForm.querySelector("p").textContent = validate;

  setTimeout(function () {
    alertForm.querySelector(".contain").style.display = "block";
    barProgress.classList.add("barActive");
  }, 500);

  setTimeout(() => {
    removeAlertFormClient();
  }, 10000);
}

function removeAlertFormClient() {
  let alertForm = document.querySelector(".alertFormClient");
  let barProgress = alertForm.querySelector(".bar");

  alertForm.querySelector("p").textContent = "";
  alertForm.querySelector(".contain").style.display = "none";
  alertForm.classList.add("alertFormClientDesactive");
  alertForm.classList.remove("alertFormClientActive");
  barProgress.classList.remove("barActive");
}

async function validationClient(formData) {
  let validate;
  let validRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

  const client = {};
  formData.forEach((v, k) => {
    if (v.trim() == "") {
      inputAlertClient(k);
      return (validate = "Complete todos los campos");
    } else if (k == "phone" && v.length < 8) {
      inputAlertClient(k);
      return (validate = "Ingresa un telefono valido");
    } else if (k == "mail" && !v.match(validRegex)) {
      inputAlertClient(k);
      return (validate = "Ingresa un correo valido");
    } else {
      client[k] = v;
    }
  });

  if (validate) {
    alertFormClient(validate);
  } else {
    return client;
  }
}

async function POSTClient(client) {
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/admin/cliente/opcionCliente.php",
      {
        method: "POST",
        body: JSON.stringify(client),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (result.advertencia) {
      throw result.advertencia;
    } else if (result.respuesta) {
      return result.respuesta;
    }
  } catch (error) {
    alertFormClient(error);
  } finally {
    loading(false);
  }
}

function alertClientAdded() {
  let modalAdd = document.querySelector(".modalAdd");
  let alertAddClient = modalAdd.querySelector(".alertAddClient");

  modalAdd.style.display = "flex";

  alertAddClient.querySelector("img").src = "../../../img/tick.gif";
  alertAddClient.querySelector("p").textContent =
    "Cliente agregado exitosamente";
  alertAddClient.style.display = "flex";

  alertAddClient.querySelector("button").addEventListener("click", function () {
    alertAddClient.querySelector("img").src = "";
    alertAddClient.querySelector("p").textContent = "";
    alertAddClient.style.display = "none";
    modalAdd.style.display = "none";

    cleanInputs();
  });
}


