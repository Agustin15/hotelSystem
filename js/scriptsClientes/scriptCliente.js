import getDataClientsTOGraphic from "./scriptGraficaCliente.js";
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

const actualOptionClient = async (optionActual) => {
  let optionDocument = await getDocument(optionActual);
  drawDocument(optionDocument);
};

optionListLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionClient", "clientsTable.html");
  actualOptionClient(localStorage.getItem("actualOptionClient"));
});

optionChartLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionClient", "grafica.html");
  actualOptionClient(localStorage.getItem("actualOptionClient"));
});

optionAddLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionClient", "addClient.html");
  actualOptionClient(localStorage.getItem("actualOptionClient"));
});

const getDocument = async (url) => {
  const response = await fetch(url);

  const result = await response.text();

  return result;
};

const drawDocument = (result) => {
  option.innerHTML = result;

  let containChart = document.querySelector(".containChart");
  let clientsTable = document.querySelector(".tableClients");
  let containFormAdd = document.querySelector(".containFormAdd");

  if (containChart) {
    markActualOption(optionChartLi);
    getDataClientsTOGraphic();
  } else if (clientsTable) {
    markActualOption(optionListLi);
    displayTable();
  }else if(containFormAdd){
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
