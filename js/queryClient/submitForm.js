import { BACK_URL_LOCALHOST } from "../urlLocalhost.js";

let formQuery = document.querySelector(".formQuery");
let loader = document.querySelector(".loader");
let alertFormQuery = document.querySelector(".alertFormQuery");
let openContactUs = document.querySelector(".openContact");
let infoContact = document.querySelector(".infoContact");

openContactUs.addEventListener("click", () => {
  if (infoContact.style.display == "none") {
    infoContact.style.display = "flex";
  } else {
    infoContact.style.display = "none";
  }
});

formQuery.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formQuery);
  let errorForm = false;
  const dataQuery = {};
  cleanAlertInputs();

  formData.forEach((value, key) => {
    let validationInput = validationsInputs(key, value);

    if (!validationInput.validation) {
      inputAlert(key, validationInput.msj);
      errorForm = true;
    } else {
      if (key == "name") {
        value = firstLetterUpper(value);
      }
      dataQuery[key] = value;
    }
  });

  if (!errorForm) {
    sendQuery(dataQuery);
  }
});

const validationsInputs = (key, value) => {
  let regexMail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
  const validations = [
    {
      key: "name",
      validation: value.length > 0,
      msj: "Ingrese un nombre valido"
    },
    {
      key: "mail",
      validation: value.length > 0 && value.match(regexMail),
      msj: "Ingrese un correo valido"
    },
    {
      key: "query",
      validation: value.length > 0,
      msj: "Complete la consulta"
    }
  ];

  let validationFind = validations.find((validation) => validation.key == key);

  return validationFind;
};

const inputAlert = (key, msjError) => {
  let inputToAlert = [...document.getElementsByName(key)][0];
  inputToAlert.classList.add("alertInput");
  let containMsjError = inputToAlert.parentElement.querySelector(".inputError");
  let msjLbl = containMsjError.querySelector("label");
  msjLbl.textContent = msjError;
  containMsjError.style.display = "flex";
};

const cleanAlertInputs = () => {
  let inputsError = document.querySelectorAll(".inputError");

  inputsError.forEach((input) => {
    input.style.display = "none";
  });
};

const sendQuery = async (dataQuery) => {
  const emailData = {
    name: dataQuery.name,
    destinary: "systemFiveHotel@gmail.com",
    subject: `Consulta cliente ${dataQuery.name}(${dataQuery.mail})`,
    body: dataQuery.query
  };

  let resultEmail;
  loading(true);
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/emailRoutes.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(emailData)
      }
    );
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      throw result.error;
    }

    if (result) {
      resultEmail = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (resultEmail==true) {
      alertForm("error");
    } else {
      cleanInputs();
      alertForm("succesfully");
    }
  }
};

const loading = (state) => {
  if (state) {
    loader.style.display = "flex";
  } else {
    loader.style.display = "none";
  }
};

const alertForm = (result) => {
  if (result == "error") {
    setComponentsAlert(
      "img/warningInput.png",
      "Ups, no se pudo enviar la consulta",
      "alertFormQueryError"
    );
  } else {
    setComponentsAlert(
      "img/tickAlertQueryForm.png",
      "¡Consulta enviada exitosamente!",
      "alertFormQueryCorrect"
    );
  }
};

const setComponentsAlert = (icon, msj, classToAdd) => {
  alertFormQuery.querySelector("img").src = icon;
  alertFormQuery.querySelector("p").textContent = msj;
  alertFormQuery.style.display = "flex";
  alertFormQuery.classList.add(classToAdd);

  setTimeout(function () {
    alertFormQuery.style.display = "none";
    alertFormQuery.classList.remove(classToAdd);
  }, 4000);
};

const cleanInputs = () => {
  formQuery.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  document.querySelector("textarea").value = "";
};

const firstLetterUpper = (value) => {
  let valueArray = [...value];
  return valueArray
    .map((char, index) => {
      if (index == 0) {
        return char.toUpperCase();
      }
      return char.toLowerCase();
    })
    .join("");
};
