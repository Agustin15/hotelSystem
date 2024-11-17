import getDataClientsTOGraphic from "./scriptGraficaCliente.js";

let option = document.querySelector(".option");
let optionChartLi = document.querySelector(".chartLi");
let optionAddLi = document.querySelector(".addLi");
let optionListLi = document.querySelector(".listLi");

document.addEventListener("DOMContentLoaded", async () => {
  let chartDocument = await getDocument("grafica.html");
  drawDocument(chartDocument);
});

optionListLi.addEventListener("click", async () => {
  let tableClientDocument = await getDocument("clientsTable.html");
  drawDocument(tableClientDocument);
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

  if (containChart) {
    markActualOption(optionChartLi);
    getDataClientsTOGraphic();
  } else if (clientsTable) {
    markActualOption(optionListLi);
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
