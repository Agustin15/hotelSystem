import { loadYears, getDataClientsTOGraphic } from "./scriptGraficaCliente.js";
import { displayTable } from "./scriptClientsTable.js";
import submitAddForm from "./scriptAddClient.js";

let option = document.querySelector(".option");
let optionChartLi = document.querySelector(".chartLi");
let optionAddLi = document.querySelector(".addLi");
let optionListLi = document.querySelector(".listLi");
let actualOption = localStorage.getItem("actualOptionClient");

document.addEventListener("DOMContentLoaded", async () => {
  if (actualOption) {
    actualOptionClient(localStorage.getItem("actualOptionClient"));
  } else {
    localStorage.setItem("actualOptionClient", "grafica.html");
    actualOptionClient("grafica.html");
  }
});

export const actualOptionClient = async (optionActual) => {
  let optionDocument = await getDocument(optionActual);
  if (optionDocument) {
    drawDocument(optionDocument);
  }
};

optionListLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionClient", "clientsTable.html");
  actualOptionClient(localStorage.getItem("actualOptionClient"));
  deleteParamsUrl();
});

optionChartLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionClient", "grafica.html");
  actualOptionClient(localStorage.getItem("actualOptionClient"));
  deleteParamsUrl();
});

optionAddLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionClient", "addClient.html");
  actualOptionClient(localStorage.getItem("actualOptionClient"));
  deleteParamsUrl();
});

const getDocument = async (url) => {
  let page;
  loadingPage(true, option);
  try {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok && result) {
      page = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, option);
    if (!page) {
      pageNotFound(option);
    }
    return page;
  }
};

const drawDocument = (result) => {
  option.innerHTML = result;

  let containChart = document.querySelector(".containChart");
  let clientsTable = document.querySelector(".tableClients");
  let containFormAdd = document.querySelector(".containFormAdd");

  if (containChart) {
    markActualOption(optionChartLi);
    loadYears();
    getDataClientsTOGraphic();
  } else if (clientsTable) {
    markActualOption(optionListLi);
    displayTable();
  } else if (containFormAdd) {
    markActualOption(optionAddLi);
    submitAddForm();
  }
};

const markActualOption = (li) => {
  let itemsPrev = [...document.getElementsByClassName("optionMarkActual")];
  if (itemsPrev.length > 0) {
    itemsPrev.forEach((itemPrev) => {
      itemPrev.classList.remove("optionMarkActual");
    });
  }

  li.classList.add("optionMarkActual");
};

export const loadingPage = (state, element) => {
  if (state) {
    element.innerHTML = `
       <div class="loadingPage">

       <span>Cargando pagina</span>
       <img src="../../../img/spinnerMain.gif">
       </div>
    `;
  } else {
    element.innerHTML = ``;
  }
};

export const pageNotFound = (element) => {
  element.innerHTML = `
  <div class="pageNotFound">
  <div class="header">
  <button class="btnClose">X</button>
  </div>
  <img src="../../../img/pageNotFound.png">
  <h3>Ups, no se pudo cargar la página</h3>
  </div>
`;
};

const deleteParamsUrl = () => {
  let searchParamsUrl = new URLSearchParams(window.location.search);
  if (searchParamsUrl.get("idClient")) {
    location.href =
      "http://localhost/sistema%20Hotel/views/admin/clientes/index.php";
  }
};
