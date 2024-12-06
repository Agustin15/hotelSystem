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
  if (optionActual == "addBooking.html") {
    return true;
  }
  let optionDocument = await getDocument(optionActual);
  drawDocument(optionDocument);
};

optionListLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionBooking", "bookingsTable.html");
  actualOptionBooking(localStorage.getItem("actualOptionBooking"));
});

optionAddLi.addEventListener("click", async () => {
  localStorage.setItem("actualOptionBooking", "addBooking.html");
});

const getDocument = async (url) => {
  const response = await fetch(url);

  const result = await response.text();

  return result;
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
