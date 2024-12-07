import { closeModal, getDataClient } from "./scriptDeleteClient.js";
import { drawForm } from "./scriptsEditClient/drawForm.js";
import { displayTable } from "../scriptClientsTable.js";

import {
  inputAlert,
  validations,
  alertForm,
  removeAlertForm,
  phoneConfig,
  removeAllMsjErrors,
} from "../scriptAddClient.js";

let dataClient;
let idClient;

export const configEditClient = async () => {
  let containEdit = document.querySelector(".containFormEdit");
  let btnClose = document.querySelector(".btnClose");
  let form = document.querySelector("form");
  idClient = containEdit.id;
  dataClient = await getDataClient(idClient);

  btnClose.addEventListener("click", () => {
    closeModal();
  });

  if (dataClient) {
    drawForm(dataClient);
    submitEditForm(form);
  } else {
    noData(containEdit);
  }
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
        let resultPOST = fetchPUT(clientUpdated);
        if (resultPOST) {
          alertForm(
            "../../../img/tickAdmin.png",
            "¡Cliente actualizado exitosamente!",
            "Exito"
          );
          displayTable();
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
};

const getIfExist = async (client) => {
  let url =
    "http://localhost/sistema%20Hotel/routes/clientRoutes.php?params=" +
    JSON.stringify({ option: "ifExistClient", client: client });

  let data = null;

  loadingForm(true);
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingForm(false);
    return data;
  }
};

const fetchPUT = async (client) => {
  let url =
    "http://localhost/sistema%20Hotel/routes/clientRoutes.php";

  let data = null;

  loadingForm(true);
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
    loadingForm(false);
    return data;
  }
};

const noData = (containEdit) => {
  let noData = containEdit.querySelector(".noData");
  noData.innerHTML = `
  <img src="../../../img/sinDatos.png">
  <span>Ups, no se pudo encontrar al cliente</span>
`;
};

const loadingForm = (state) => {
  let loading = document.querySelector(".loadingForm");

  if (state) {
    loading.style.display = "flex";
  } else {
    loading.style.display = "none";
  }
};
