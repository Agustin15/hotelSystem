import configDeleteClient from "./scriptOptionsTable/scriptDeleteClient.js";
import { configEditClient } from "./scriptOptionsTable/scriptEditClient.js";
import { configDetailsClient } from "./scriptOptionsTable/scriptDetailsClient.js";
import { drawRowsTable } from "./drawRowsTable.js";
import { loadingPage, pageNotFound } from "./scriptCliente.js";
import { BACK_URL_LOCALHOST } from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/userData.js";

let offset = 0;
let index = 1;
let limitPage;
let modalMainClient, controlsElement;

const displayTable = async () => {
  let table = document.querySelector(".tableClients");
  controlsElement = document.querySelector(".controls");

  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.get("idClient")) {
    let clientsRows = await getRowsClients();
    if (clientsRows) {
      limitPage = Math.ceil(clientsRows / 10);
      controls();
      drawRowsTable("clients", table);
    }
  } else {
    drawRowsTable("client", table, urlParams.get("idClient"));
    controlsElement.style.display = "none";
  }

  search();
};

const getRowsClients = async () => {
  let data = null;

  try {
    let url =
      `${BACK_URL_LOCALHOST}routes/admin/clientRoutes.php?params=` +
      JSON.stringify({ option: "clientsRows" });

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
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (!data) {
      noData();
    }
    return data;
  }
};

export const getClientById = async (idClient) => {
  let data = null;
  try {
    let url =
      `${BACK_URL_LOCALHOST}routes/admin/clientRoutes.php?params= ` +
      JSON.stringify({ option: "dataClient", idClient: idClient });

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
    if (!data) {
      noData();
    }
    return data;
  }
};

export const getDataLimitClients = async () => {
  let data = null;

  loading(true);

  try {
    let url =
      `${BACK_URL_LOCALHOST}routes/admin/clientRoutes.php?params= ` +
      JSON.stringify({ option: "clientsTable", index: offset });

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
    } else if (result.length > 0) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);

    if (!data) {
      noData();
    }
    return data;
  }
};

const loading = (state) => {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = ``;

  if (state) {
    document.querySelector("tfoot").innerHTML = ` 
    
       <td rowspan="6" colspan="6">
    <div class="loading">
      <span>Cargando datos</span>
      <img src="../../../img/spinnerMain.gif">
    </div>
    </td>
    `;
  } else {
    document.querySelector("tfoot").innerHTML = ``;
  }
};

const controls = () => {
  let pagesText = document.querySelector(".pageIndex");
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  pagesText.textContent = `${index}/${limitPage}`;

  next.addEventListener("click", function () {
    if (index < limitPage) {
      index++;
      offset += 10;
      pagesText.textContent = `${index}/${limitPage}`;
      displayTable();
    }
  });

  prev.addEventListener("click", function () {
    if (index > 1) {
      index--;
      offset -= 10;
      pagesText.textContent = `${index}/${limitPage}`;
      displayTable();
    }
  });
};

const search = () => {
  let btnInputSearch = document.querySelector(".btnSearchInput");
  let inputSearch = document.querySelector(".inputSearch");
  let tfoot = document.querySelector("tfoot");

  let rows = document.querySelector("tbody").querySelectorAll("tr");
  btnInputSearch.addEventListener("click", () => {
    let value = inputSearch.value.trim();

    rows.forEach((row) => {
      if (row.innerText.indexOf(value) == -1) {
        row.style.display = "none";
      } else {
        row.style.display = "table-row";
      }
    });

    let totalRowsHide = [...rows].reduce((ac, row) => {
      row.style.display == "none" ? ac++ : ac;
      return ac;
    }, 0);

    if (rows.length == totalRowsHide) {
      document.querySelector(".controls").style.display = "none";
      tfoot.innerHTML = `
   <td rowspan="6" colspan="6">
  <div class="noResults">
      <img src="../../../img/noFind.png">
      <span>Sin Resultados</span>
  </div>
  </td>
  
  `;
    } else {
      tfoot.innerHTML = ``;
      document.querySelector(".controls").style.display = "flex";
    }
  });
};

const noData = () => {
  document.querySelector("tbody").innerHTML = ``;
  document.querySelector("tfoot").innerHTML = `
      <td rowspan="6" colspan="6">
  <div class="noDataClients">

      <img src="../../../img/sinDatos.png">
      <span>No se encontraron clientes</span>
  </div>
  </td>
  `;
};

const getOptionClient = async (url) => {
  let optionPage;
  modalMainClient = document.querySelector(".modalMainClient");
  modalMainClient.style.display = "flex";
  window.scrollTo(0, 0);
  loadingPage(true, modalMainClient);
  try {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok && result) {
      optionPage = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, modalMainClient);
    if (!optionPage) {
      pageNotFound(modalMainClient);
      closePageNotFound(modalMainClient);
    }
    return optionPage;
  }
};

export const optionsClient = () => {
  let btnsDelete = [...document.querySelectorAll(".btnDelete")];
  let btnsEdit = [...document.querySelectorAll(".btnEdit")];
  let btnsDetails = [...document.querySelectorAll(".btnDetails")];

  btnsDelete.forEach((btnDelete) => {
    btnDelete.addEventListener("click", async () => {
      drawOption(
        btnDelete,
        "optionClient/delete.php?client=",
        configDeleteClient
      );
    });
  });

  btnsEdit.forEach((btnEdit) => {
    btnEdit.addEventListener("click", async () => {
      drawOption(btnEdit, "optionClient/edit.php?client=", configEditClient);
    });
  });

  btnsDetails.forEach((btnDetails) => {
    btnDetails.addEventListener("click", async () => {
      drawOption(
        btnDetails,
        "optionClient/details.php?client=",
        configDetailsClient
      );
    });
  });
};

const drawOption = async (btn, url, configOption) => {
  let id = btn.parentElement.id;
  let result = await getOptionClient(url + id);
  if (result) {
    openModal(result);
    configOption();
  }
};

const openModal = (result) => {
  modalMainClient.style.display = "flex";
  modalMainClient.innerHTML = result;
};

export const closePageNotFound = (modal) => {
  document.querySelector(".btnClose").addEventListener("click", () => {
    modal.innerHTML = ``;
    modal.style.display = "none";
  });
};

export { displayTable };
