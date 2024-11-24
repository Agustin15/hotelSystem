import { closeModal, getDataClient } from "./scriptDeleteClient.js";

import {
  inputAlert,
  validations,
  alertForm,
  phoneConfig,
  removeAllMsjErrors,
  loading,
} from "../scriptAddClient.js";

let dataClient;
let idClient;

export const configEditClient = async () => {
  let containEdit = document.querySelector(".containFormEdit");
  idClient = containEdit.id;
  dataClient = await getDataClient(idClient);

  eventsButtons();

  if (dataClient) {
    inputsActualValues();
    submitEditForm(dataClient);
  } else {
    noData();
  }
};

const cleanInputs = (form) => {
  form.querySelectorAll("input", (input) => {
    input.value = "";
  });
};

const eventsButtons = () => {
  let btnClean = document.querySelector(".btnClean");
  let btnClose = document.querySelector(".btnClose");
  let form = document.querySelector("form");

  btnClean.addEventListener("click", () => {
    cleanInputs(form);
  });

  btnClose.addEventListener("click", () => {
    closeModal();
  });
};

const inputsActualValues = () => {
  let form = document.querySelector("form");
  let inputs = form.querySelectorAll("input");

   
  inputs.forEach((input) => {
    input.value = dataClient[input.dataset.ref];
  });
};

const submitEditForm = () => {
  let form = document.querySelector("form");

  phoneConfig();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const clientUpdated = {};
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
        clientUpdated[inputCorrect.key] = inputCorrect.value;
      });

      clientUpdated.id = idClient;
      let exist = await getIfExist(clientUpdated);
      if (exist) {
        alertForm("../../../img/advertenciaLogin.png", exist.warning, "Error");
      } else {
        let resultPOST = fetchPOST(clientUpdated);
        if (resultPOST) {
          alertForm(
            "../../../img/tickAdmin.png",
            "¡Cliente actualizado exitosamente!",
            "Exito"
          );
        } else {
          alertForm(
            "../../../img/advertenciaLogin.png",
            "Ups, no se pudo actualizar el cliente",
            "Error"
          );
        }
      }
    }
  });

  cleanInputs(form);
};

const getIfExist = async (client) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/client/clientController.php?option=ifExistClient&&client=" +
    JSON.stringify(client);

  let data = null;

  loading(true);
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    return data;
  }
};

const fetchPOST = async (client) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/client/clientController.php";

  let data = null;

  loading(true);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    return data;
  }
};

const noData = () => {
  let contentForm = document
    .querySelector("form")
    .querySelector(".contentForm");
  let noData = document.querySelector(".noData");

  contentForm.style.display = "none";
  noData.style.display = "flex";
};
