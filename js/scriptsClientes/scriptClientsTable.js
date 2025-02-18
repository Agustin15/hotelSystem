import configDeleteClient from "./scriptOptionsTable/scriptDeleteClient.js";
import { configEditClient } from "./scriptOptionsTable/scriptEditClient.js";
import { configDetailsClient } from "./scriptOptionsTable/scriptDetailsClient.js";
import { drawRowsTable } from "./drawRowsTable.js";
import { loadingPage, pageNotFound } from "./scriptCliente.js";
import BACK_URL_LOCALHOST from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/scriptsAdmin.js";

let indexRegister = 0;
let page = 1;
let limitPage;
let modalMainClient;

const getRowsClients = async () => {
  let data = null;

  try {
    let url =
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/clientRoutes.php?params=` +
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
      throw result.error;
    } else if (result.length > 0) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    if (!data) {
      noData();
    }
    return data;
  }
};

const getClientById = async (idClient) => {
  let data = null;
  try {
    let url =
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/clientRoutes.php?params= ` +
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
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    if (!data) {
      noData();
    }
    return data;
  }
};

const getDataLimitClients = async () => {
  let data = null;

  loading(true);

  try {
    let url =
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/clientRoutes.php?params= ` +
      JSON.stringify({ option: "clientsTable", index: indexRegister });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result.length > 0) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    loading(false);
    if (!data) {
      noData();
    }
    return data;
  }
};

const loading = (state) => {
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

const displayTable = async () => {
  let table = document.querySelector(".tableClients");
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.get("idClient")) {
    let pagesText = document.querySelector(".pageIndex");
    let clientsRows = await getRowsClients();
    let clients = await getDataLimitClients();

    if (clients) {
      if (clientsRows <= 10) {
        limitPage = 1;
      } else {
        limitPage = clientsRows / 10;
      }
      pagesText.textContent = `${page}/${limitPage.toFixed(0)}`;
      drawRowsTable(clients, table);
      controls(next, prev);
    }
  } else {
    prev.style.display = "none";
    next.style.display = "none";
    let clientFind = await getClientById(urlParams.get("idClient"));
    let clientsFind = [clientFind];
    drawRowsTable(clientsFind, table);
  }

  search();
  optionsClient();
};

const controls = (next, prev) => {
  next.addEventListener("click", function () {
    if (page < limitPage) {
      indexRegister += 10;
      page++;
      displayTable();
    }
  });

  prev.addEventListener("click", function () {
    if (page > 1) {
      indexRegister -= 10;
      page--;
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

  document.querySelector(".controls").style.display = "none";
  document.querySelector(".containSearch").style.display = "none";
  document.querySelector(".titleTable").classList.add("titleNoData");
};

const getOptionClient = async (url) => {
  let optionPage;
  modalMainClient = document.querySelector(".modalMainClient");
  modalMainClient.style.display = "flex";

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

const optionsClient = () => {
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
