import { configChart } from "./scriptChart.js";
import { configTable } from "./scriptTableBills.js";

let option = document.querySelector(".option");
let optionChartLi = document.querySelector(".chartLi");
let optionBillLi = document.querySelector(".billLi");
let actualOption = localStorage.getItem("actualOptionRevenues");

document.addEventListener("DOMContentLoaded", async () => {
  if (actualOption) {
    actualOptionRevenues(localStorage.getItem("actualOptionRevenues"));
  } else {
    localStorage.setItem("actualOptionRevenues", "chart.html");
    actualOptionRevenues("chart.html");
  }
});

export const actualOptionRevenues = async (optionActual) => {
  let optionDocument = await getDocument(optionActual);
  if (optionDocument) {
    drawDocument(optionDocument);
  }
};

optionBillLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionRevenues", "tableBills.html");
  actualOptionRevenues(localStorage.getItem("actualOptionRevenues"));
  deleteParamsUrl();
});

optionChartLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionRevenues", "chart.html");
  actualOptionRevenues(localStorage.getItem("actualOptionRevenues"));
});

const getDocument = async (url) => {
  let page;
  window.scrollTo(0,0);
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
    loadingPage(true, option);
    if (!page) {
      pageNotFound(option);
    }
    return page;
  }
};

const drawDocument = (result) => {
  option.innerHTML = result;

  let containChart = document.querySelector(".containChart");
  let containRooms = document.querySelector(".containTable");

  if (containChart) {
    markActualOption(optionChartLi);
    configChart();
  } else if (containRooms) {
    markActualOption(optionBillLi);
    configTable();
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
  <div class="headerPageNotFound">
  <button class="btnClose">X</button>
  </div>
  <img src="../../../img/pageNotFound.png">
  <h3>Ups, no se pudo cargar la página</h3>
  </div>
`;

  let btnClose = element.querySelector(".btnClose");
  if (btnClose) {
    btnClose.addEventListener("click", () => {
      element.innerHTML = ``;
      element.style.display = "none";
    });
  }
};

const deleteParamsUrl = () => {
  let searchParamsUrl = new URLSearchParams(window.location.search);

  if (searchParamsUrl.get("idBooking")) {
    location.href =
      "http://localhost/sistema%20Hotel/views/admin/ganancias/index.php";
  }
};
