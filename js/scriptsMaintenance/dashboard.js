import { configTableUsers } from "./scriptsUsers/scriptTable.js";

let option = document.querySelector(".option");
let optionUsers = document.querySelector(".usersLi");
let optionServices = document.querySelector(".servicesLi");
let optionRooms = document.querySelector(".roomsLi");
let actualOption = localStorage.getItem("actualOptionMaintenance");

document.addEventListener("DOMContentLoaded", async () => {
  if (actualOption) {
    actualOptionMaintenance(localStorage.getItem("actualOptionMaintenance"));
  } else {
    localStorage.setItem("actualOptionMaintenance", "users.html");
    actualOptionMaintenance("users.html");
  }
});

export const actualOptionMaintenance = async (optionActual) => {
  let optionDocument = await getDocument(optionActual);
  if (optionDocument) {
    drawDocument(optionDocument);
  }
};

optionUsers.addEventListener("click", async () => {
  localStorage.setItem("actualOptionMaintenance", "users.html");
  actualOptionMaintenance(localStorage.getItem("actualOptionMaintenance"));
});

optionRooms.addEventListener("click", async () => {
  localStorage.setItem("actualOptionMaintenance", "rooms.html");
  actualOptionMaintenance(localStorage.getItem("actualOptionMaintenance"));
});

optionServices.addEventListener("click", async () => {
  localStorage.setItem("actualOptionMaintenance", "services.html");
  actualOptionMaintenance(localStorage.getItem("actualOptionMaintenance"));
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

  let containUsers = document.querySelector(".containUsers");

  if (containUsers) {
    markActualOption(optionUsers);
    configTableUsers();
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
