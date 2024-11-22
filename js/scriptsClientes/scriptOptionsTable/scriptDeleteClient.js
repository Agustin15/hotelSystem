import { displayTable } from "../scriptClientsTable.js";

const configDeleteClient = async () => {
  let containDelete = document.querySelector(".containDelete");
  let idClient = containDelete.id;

  let dataClient = await getDataClient(idClient);

  if (dataClient) {
    containDelete.querySelector(
      "h3"
    ).innerHTML += ` ${dataClient.nombre} ${dataClient.apellido}`;

    eventsDelete(idClient);
  } else {
    noData();
  }
};

const getDataClient = async (id) => {
  let data = null;

  let url =
    "http://localhost/sistema%20Hotel/controller/admin/cliente/opcionCliente.php?option=dataClient&&idClient=" +
    id;
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
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
    "http://localhost/sistema%20Hotel/controller/admin/cliente/opcionCliente.php?idClient=" +
    idClient;

  let data = null;
  try {
    const response = await fetch(url, {
      method: "DELETE"
    });

    const result = await response.json();
  
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

const closeModal = () => {
  let modalMainClient = document.querySelector(".modalMainClient");
  modalMainClient.style.display = "none";
  modalMainClient.innerHTML = ``;
};

const noData = () => {
  let containDeleteBody = document.querySelector(".body");
  let btnClose = document.querySelector(".btnClose");
  let noData = document.querySelector(".noData");
  containDeleteBody.style.display = "none";
  noData.style.display = "flex";

  btnClose.addEventListener("click", () => {
    closeModal();
  });
};

const errorDelete = () => {
  let errorMsj = document.querySelector(".error");
  errorMsj.style.display = "flex";
};

export default configDeleteClient;
