import BACK_URL_LOCALHOST from "../urlLocalhost.js";

export const inputAlert = (inputError) => {
  let namesInputs = [...document.getElementsByName(inputError.key)];
  let input = namesInputs[0];
  input.classList.add("inputAlert");

  let msjError = input.parentNode.querySelector(".msjError");
  msjError.querySelector("span").textContent = inputError.msj;
  msjError.classList.add("msjErrorShow");

  removeAlertInputs();
};

const cleanInputs = () => {
  document.querySelector(".btnClean").addEventListener("click", function () {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  });
};

const removeAlertInputs = () => {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("click", () => {
      input.classList.remove("inputAlert");
    });
  });
};

export const removeAllMsjErrors = () => {
  document.querySelectorAll(".msjError").forEach((msj) => {
    msj.classList.remove("msjErrorShow");
    msj.querySelector("span").textContent = "";
  });
};

const submitAddForm = () => {
  let form = document.querySelector("form");

  phoneConfig();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    removeAlertForm();

    const client = {};
    let inputsCorrects = [];
    let formData = new FormData(event.target);

    removeAllMsjErrors();

    formData.forEach((v, k) => {
      let inputToAlert = validations(v).find(
        (valid) => k == valid.key && !valid.validation
      );

      if (inputToAlert) {
        inputAlert(inputToAlert);
      } else {
        inputsCorrects.push({ key: k, value: v });
      }
    });

    if (inputsCorrects.length == 4) {
      inputsCorrects.forEach((inputCorrect) => {
        client[inputCorrect.key] = inputCorrect.value;
      });

      fetchPost(client);
    }
  });

  cleanInputs();
};

const fetchPost = async (client) => {
  loading(true);
  let data = null;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/clientRoutes.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin",
        },
        body: JSON.stringify(client),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (result.advertencia) {
      throw result.advertencia;
    } else if (result.respuesta) {
      data = result.respuesta;
      alertForm(
        "../../../img/tickAdmin.png",
        "¡Cliente agregado exitosamente! ",
        "Exito"
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      alertForm(
        "../../../img/advertenciaLogin.png",
        "Ups, no se pudo agregar el cliente",
        "Error"
      );
    }
  }
};

export const alertForm = (img, msj, title) => {
  let alertForm = document.querySelector(".alertForm");

  alertForm.querySelector("span").textContent = title;
  alertForm.querySelector("img").src = img;
  alertForm.querySelector("p").textContent = msj;

  alertForm.style.display = "flex";

  if (title == "Exito") {
    alertForm.classList.add("alertFormCorrect");
    setTimeout(() => {
      removeAlertForm();
    }, 3500);
  } else {
    alertForm.classList.add("alertFormError");
    console.log(alertForm);
  }
};

export const removeAlertForm = () => {
  let alertForm = document.querySelector(".alertForm");

  alertForm.querySelector("span").textContent = "";
  alertForm.querySelector("img").src = "";
  alertForm.querySelector("p").textContent = "";
  alertForm.style.display = "none";
  alertForm.classList.remove("alertFormError");
  alertForm.classList.remove("alertFormCorrect");
};

export const validations = (value) => {
  let validRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

  let validations = [
    {
      key: "name",
      validation: value.length > 0,
      msj: "Complete el campo nombre",
    },
    {
      key: "lastName",
      validation: value.length > 0,
      msj: "Complete el campo apellido",
    },
    {
      key: "phone",
      validation: value.length >= 8 && value.length <= 9,
      msj: "Ingresa un telefono válido",
    },
    {
      key: "mail",
      validation: value.match(validRegex),
      msj: "Ingresa un correo válido",
    },
  ];

  return validations;
};

export const phoneConfig = () => {
  let inputPhone = document.querySelector("#inputPhone");
  inputPhone.maxLength = 9;

  inputPhone.addEventListener("input", (event) => {
    replaceCharacter(event.target);
  });
};

export const replaceCharacter = (input) => {
  let valid = /\d/;

  let ultimateCharacter = input.value
    .trim()
    .charAt(input.value.trim().length - 1);

  if (!ultimateCharacter.match(valid)) {
    let newValue = input.value.replace(ultimateCharacter, "");
    input.value = newValue;
  }
};

export const loading = (state) => {
  let loading = document.querySelector(".loading");

  if (state) {
    loading.style.display = "flex";
  } else {
    loading.style.display = "none";
  }
};

export default submitAddForm;
