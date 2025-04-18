import { configChartRooms } from "./scriptChartRooms.js";
import { configListRooms } from "./scriptListRooms.js";
import { linkRels } from "./scriptLinksRel.js";
import { linkRelsResponsive } from "./scriptLinksRelResponsive.js";

let option = document.querySelector(".option");
let optionChartLi = document.querySelector(".chartLi");
let optionListLi = document.querySelector(".listLi");
let actualOption = localStorage.getItem("actualOptionRooms");
let head = document.getElementsByTagName("head")[0];

document.addEventListener("DOMContentLoaded", async () => {
  if (head) {
    linkRels.map((link) => {
      head.innerHTML += link;
    });
    linkRelsResponsive.map((link) => {
      head.innerHTML += link;
    });
  }

  if (actualOption) {
    actualOptionClient(localStorage.getItem("actualOptionRooms"));
  } else {
    localStorage.setItem("actualOptionRooms", "grafica.html");
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
  localStorage.setItem("actualOptionRooms", "rooms.html");
  actualOptionClient(localStorage.getItem("actualOptionRooms"));
});

optionChartLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionRooms", "grafica.html");
  actualOptionClient(localStorage.getItem("actualOptionRooms"));
});

const getDocument = async (url) => {
  let page;
  loadingPage(true, option);
  window.scrollTo(0, 0);
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

  let containChart = document.querySelector(".containChartMain");
  let containRooms = document.querySelector(".containRooms");

  if (containChart) {
    markActualOption(optionChartLi);
    configChartRooms();
  } else if (containRooms) {
    markActualOption(optionListLi);
    configListRooms();
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
