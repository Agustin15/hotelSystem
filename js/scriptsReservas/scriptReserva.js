let option = document.querySelector(".option");
let optionListLi = document.querySelector(".listLi");
export let optionAddLi = document.querySelector(".addLi");
export let actualOption = localStorage.getItem("actualOptionBooking");
import { displayTable } from "./scriptsTableBookings/scriptTableBookings.js";

document.addEventListener("DOMContentLoaded", async () => {
  if (actualOption == "bookingsTable.html") {
    actualOptionBooking(localStorage.getItem("actualOptionBooking"));
  }
});

export const actualOptionBooking = async (optionActual) => {
  let optionDocument = await getDocument(optionActual);
  if (optionDocument) {
    drawDocument(optionDocument);

    if (optionActual == "addBooking.html") {
      return true;
    }
  }
};

optionListLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionBooking", "bookingsTable.html");
  actualOptionBooking(localStorage.getItem("actualOptionBooking"));
});

optionAddLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionBooking", "addBooking.html");
});

const getDocument = async (url) => {
  let data = null;
  loadingPage(true, option);
  try {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok && result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, option);
    if (!data) {
      pageNotFound(option);
    }
    return data;
  }
};

const drawDocument = async (result) => {
  option.innerHTML = result;

  let bookingsTable = document.querySelector(".tableBookings");

  if (bookingsTable) {
    markActualOption(optionListLi);
    displayTable();
  }
};

export const markActualOption = (li) => {
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
