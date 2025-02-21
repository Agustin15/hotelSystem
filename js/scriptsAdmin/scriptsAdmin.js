import {
  getClientsByMonthActualYear,
  getRevenueActualYear,
  getCategoryRoomsMostReserved
} from "./chart.js";
import {
  displayItemsDataCategoryRooms,
  displayItemDataRevenuesActual,
  displayWelcome
} from "./itemsData.js";
import BACK_URL_LOCALHOST from "../urlLocalhost.js";

import { optionsMenuAdmin } from "./menuAdminOptions.js";

export let userData;
let profileOption;

document.addEventListener("DOMContentLoaded", async () => {
  let actualDate = new Date();
  let actualYear = actualDate.getFullYear();
  let logoutOption = document.querySelector(".logoutOption");
  let dashboard = document.getElementById("dashboard");

  if (dashboard) {
    getClientsByMonthActualYear(actualYear);
    getCategoryRoomsMostReserved();
    getRevenueActualYear();
    displayItemsDataCategoryRooms();
    displayItemDataRevenuesActual();
  }

  userData = await getDataToken();
  if (userData) {
    displayOptionProfile();

    if (dashboard) {
      displayWelcome();
    }
  }
  optionsMenuAdmin();
  openSubMenu();
  showOpenMenu();
  openSubMenuProfile();

  logoutOption.addEventListener("click", () => {
    localStorage.clear();
    logout();
  });
});

function openSubMenu() {
  let buttonsOpenSubMenu = document.querySelectorAll(".btnDisplaySubMenu");

  buttonsOpenSubMenu.forEach(function (buttonOpen) {
    buttonOpen.addEventListener("click", () => {
      let subMenu =
        buttonOpen.parentElement.parentElement.querySelector(".subMenu");

      if (
        buttonOpen.src == "http://localhost/sistema%20Hotel/img/btnFlecha.png"
      ) {
        checkSubMenuOpen(subMenu);
        buttonOpen.src =
          "http://localhost/sistema%20Hotel/img/btnFlechaAbajo.png";
        subMenu.style.display = "flex";
      } else {
        buttonOpen.src = "http://localhost/sistema%20Hotel/img/btnFlecha.png";
        subMenu.style.display = "none";
      }
    });
  });
}

const showOpenMenu = () => {
  let options = document.querySelector(".menu").querySelectorAll(".optionMenu");

  options.forEach((option) => {

    option.addEventListener("mouseover", () => {
      option.querySelector(".btnDisplaySubMenu").style.display = "flex";
    });

    option.addEventListener("mouseout", () => {
      option.querySelector(".btnDisplaySubMenu").style.display = "none";
    });
  });
};

const openSubMenuProfile = () => {
  let btnDisplayMenu = document.querySelector(".btnDisplayMenu");
  let subMenuProfile = document.querySelector(".subMenuProfile");
  let containProfile = document.querySelector("#userAdmin");

  containProfile.addEventListener("mouseover", () => {
    btnDisplayMenu.style.visibility = "visible";
  });
  containProfile.addEventListener("mouseout", () => {
    btnDisplayMenu.style.visibility = "hidden";
  });

  btnDisplayMenu.addEventListener("click", () => {
    if (
      btnDisplayMenu.src == "http://localhost/sistema%20Hotel/img/btnFlecha.png"
    ) {
      btnDisplayMenu.src =
        "http://localhost/sistema%20Hotel/img/btnFlechaArriba.png";
      subMenuProfile.style.display = "flex";
    } else {
      btnDisplayMenu.src = "http://localhost/sistema%20Hotel/img/btnFlecha.png";
      subMenuProfile.style.display = "none";
    }
  });
};

const logout = async () => {
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/logoutRoutes.php`
    );
    const result = await response.json();

    if (result.expired) {
      location.href = "http://localhost/sistema%20Hotel/views/loginAdmin/";
    }
  } catch (error) {
    console.log(error);
  }
};

const getDataToken = async () => {
  loadingUser(true);
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/userRoutes.php?params=` +
        JSON.stringify({ option: "getDataToken" }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const tokenUserData = await response.json();
    if (!response.ok) {
      throw tokenUserData.error;
    } else {
      return tokenUserData.resultVerify;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    loadingUser(false);
  }
};

const loadingUser = (state) => {
  profileOption = document.querySelector(".profile");
  if (state) {
    profileOption.innerHTML = `
      <div class="loadingUser">
      <span>Cargando usuario</span>
      <img src="http://localhost/sistema%20Hotel/img/spinnerBooking.gif">
      </div>
    `;
  } else {
    profileOption.innerHTML = ``;
  }
};

export const invalidAuthentication = async () => {
  localStorage.setItem("alertInvalidToken", true);
  logout();
};

const displayOptionProfile = () => {
  profileOption.innerHTML = `<img src=${
    userData.genre == "M"
      ? "http://localhost/sistema%20Hotel/img/perfilM.png"
      : "http://localhost/sistema%20Hotel/img/perfilF.png"
  }>
  <span>${userData.user}</span>
  <img class="btnDisplayMenu" src="http://localhost/sistema%20Hotel/img/btnFlecha.png">`;
};

const checkSubMenuOpen = (id) => {
  let subMenuProfile = document.querySelector(".subMenuProfile");
  let subMenus = [...document.querySelectorAll(".subMenu")];
  let subMenuFind = subMenus.find(
    (subMenu) => subMenu.style.display == "flex" && subMenu.id != id
  );

  if (subMenuProfile.style.display == "flex") {
    subMenuProfile.style.display = "none";
    retunToOriginBtnDisplaySubMenu(subMenuProfile, ".btnDisplayMenu");
  }

  if (subMenuFind) {
    subMenuFind.style.display = "none";
    retunToOriginBtnDisplaySubMenu(subMenuFind, ".btnDisplaySubMenu");
  }
};

const retunToOriginBtnDisplaySubMenu = (subMenu, element) => {
  let iconOpenSubMenu = subMenu.parentElement.querySelector(element);
  iconOpenSubMenu.src = "http://localhost/sistema%20Hotel/img/btnFlecha.png";
};
