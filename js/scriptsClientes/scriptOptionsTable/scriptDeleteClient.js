import { displayTable } from "../scriptClientsTable.js";
import { loading } from "../scriptAddClient.js";
import BACK_URL_LOCALHOST from "../../urlLocalhost.js";
import { invalidAuthentication } from "../../scriptsAdmin/userData.js";

const configDeleteClient = async () => {
  let containDelete = document.querySelector(".containDelete");
  let idClient = containDelete.id;

  let dataClient = await getDataClient(idClient);

  if (dataClient) {
    containDelete.querySelector(".body").innerHTML += `
    <h3>¿Desea eliminar al cliente ${dataClient.nombre} ${dataClient.apellido}?</h3>

    <div class="buttons">
        <button class="btnAccept">Aceptar</button>
        <button class="btnCancel">Cancelar</button>
    </div>
    <div class="error">

        <img src="../../../img/advertenciaDelete.png">
        <span>Ups, no se pudo eliminar el cliente</span>
    </div>`;

    eventsDelete(idClient);
  } else {
    noData();
  }
};

export const getDataClient = async (id) => {
  let data = null;

  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/clientRoutes.php?params=` +
    JSON.stringify({ option: "dataClient", idClient: id });

  loading(true);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    return data;
  }
};

const eventsDelete = (idClient) => {
  let btnAccept = document.querySelector(".btnAccept");
  let btnCancel = document.querySelector(".btnCancel");

  btnCancel.addEventListener("click", () => {
    closeModal();
  });

  btnAccept.addEventListener("click", async () => {
    const result = await fetchDelete(idClient);
    if (result) {
      closeModal();
      displayTable();
    } else {
      errorDelete();
    }
  });
};

const fetchDelete = async (idClient) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/clientRoutes.php?params= ` +
    JSON.stringify({ idClient: idClient });
  let data;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (result.response == true) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

export const closeModal = () => {
  let modalMainClient = document.querySelector(".modalMainClient");
  modalMainClient.style.display = "none";
  modalMainClient.innerHTML = ``;
};

const noData = () => {
  let noData = document.querySelector(".noData");

  noData.innerHTML = `
  <div class="content">
  <img src="../../../img/sinDatos.png">
  <span>Ups, no se pudo encontrar al cliente</span>
</div>
<button class="btnClose">Cerrar</button>
`;

  let btnClose = noData.querySelector(".btnClose");
  btnClose.addEventListener("click", () => {
    closeModal();
  });
};

const errorDelete = () => {
  let errorMsj = document.querySelector(".error");
  errorMsj.style.display = "flex";
};

export default configDeleteClient;
