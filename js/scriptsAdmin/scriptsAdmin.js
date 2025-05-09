import {
  getClientsByMonthActualYear,
  getRevenueActualYear,
  getCategoryRoomsMostReserved
} from "./chart.js";
import {
  displayItemsDataCategoryRooms,
  displayItemDataRevenuesActual
} from "./itemsData.js";
import { getDataUserByToken, logout } from "./userData.js";
import { optionsMenuAdmin } from "./menuAdminOptions.js";
import { FRONT_URL_LOCALHOST } from "../urlLocalhost.js";

let profileOption;
export let userData;

document.addEventListener("DOMContentLoaded", async () => {
  let actualDate = new Date();
  let actualYear = actualDate.getFullYear();
  let logoutOption = document.querySelector(".logoutOption");
  let dashboard = document.getElementById("dashboard");
  profileOption = document.querySelector(".profile");

  userData = await getDataUser(profileOption);

  if (userData) {
    displayOptionProfile();
  }
  if (dashboard) {
    getClientsByMonthActualYear(actualYear);
    getCategoryRoomsMostReserved();
    getRevenueActualYear();
    displayItemsDataCategoryRooms();
    displayItemDataRevenuesActual();
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

const getDataUser = async () => {
  let data;
  loadingUser(true);
  try {
    const result = await getDataUserByToken();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingUser(false);
    return data;
  }
};

const loadingUser = (state) => {
  if (state) {
    profileOption.innerHTML = `
      <div class="loadingUser">
      <span>Cargando usuario</span>
      <img src=${FRONT_URL_LOCALHOST}img/spinnerBooking.gif>
      </div>
    `;
  } else {
    profileOption.innerHTML = ``;
  }
};

function openSubMenu() {
  let buttonsOpenSubMenu = document.querySelectorAll(".btnDisplaySubMenu");
  let liBooking = document.getElementById("liReserva");

  buttonsOpenSubMenu.forEach(function (buttonOpen) {
    buttonOpen.addEventListener("click", () => {
      let subMenu =
        buttonOpen.parentElement.parentElement.querySelector(".subMenu");

      if (buttonOpen.src == `${FRONT_URL_LOCALHOST}img/btnFlecha.png`) {
        if (buttonOpen.parentElement.parentElement.id == "liClientes") {
          liBooking.classList.add("liBookingMarginTop");
        } else {
          liBooking.classList.remove("liBookingMarginTop");
        }
        checkSubMenuOpen(subMenu);
        buttonOpen.src = `${FRONT_URL_LOCALHOST}img/btnFlechaAbajo.png`;
        subMenu.style.display = "flex";
      } else {
        liBooking.classList.remove("liBookingMarginTop");
        buttonOpen.src = `${FRONT_URL_LOCALHOST}img/btnFlecha.png`;
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
    if (btnDisplayMenu.src == `${FRONT_URL_LOCALHOST}img/btnFlecha.png`) {
      btnDisplayMenu.src = `${FRONT_URL_LOCALHOST}img/btnFlechaArriba.png`;
      subMenuProfile.style.display = "flex";
    } else {
      btnDisplayMenu.src = `${FRONT_URL_LOCALHOST}img/btnFlecha.png`;
      subMenuProfile.style.display = "none";
    }
  });
};

const displayOptionProfile = () => {
  profileOption.innerHTML = `<img class="iconProfile" src="data:image/png;base64,${userData.imagen}">
  <span>${userData.usuario}</span>
  <img class="btnDisplayMenu" src="${FRONT_URL_LOCALHOST}img/btnFlecha.png">`;

  let optionMaintenance = document.getElementById("liMantenimiento");

  if (userData.idRol == 1) {
    optionMaintenance.style.display = "flex";
  } else {
    optionMaintenance.style.display = "none";
  }
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
  iconOpenSubMenu.src = `${FRONT_URL_LOCALHOST}img/btnFlecha.png`;
};
