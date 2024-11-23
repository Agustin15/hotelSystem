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
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/admin/client/clientController.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      }
    );

    const result = await response.json();
    console.log(result);
    if (result.advertencia) {
      throw result.advertencia;
    } else if (result.respuesta) {
      alertForm(
        "../../../img/tickAdmin.png",
        "¡Cliente agregado exitosamente! ",
        "Exito"
      );
    } else {
      throw "Ups, no se pudo agregar el cliente";
    }
  } catch (error) {
    console.log(error);
    alertForm("../../../img/advertenciaLogin.png", error, "Error");
  } finally {
    loading(false);
  }
};

export const alertForm = (img, msj, title) => {
  let alertForm = document.querySelector(".alertForm");

  alertForm.querySelector("span").textContent = title;
  alertForm.querySelector("img").src = img;
  alertForm.querySelector("p").textContent = msj;
  alertForm.style.display = "flex";

  if (title == "Exito") {
    setTimeout(() => {
      alertForm.style.display = "none";
    }, 3500);
  }
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
