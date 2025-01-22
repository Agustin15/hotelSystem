import {
  getClientsByMonthActualYear,
  getRevenueActualYear,
  getCategoryRoomsMostReserved,
} from "./chart.js";
import {
  displayItemsDataCategoryRooms,
  displayItemDataRevenuesActual,
} from "./itemsData.js";
import BACK_URL_LOCALHOST from "../urlLocalhost.js";

import { optionsMenuAdmin } from "./menuAdminOptions.js";

export let userData;

function openSubMenu(linkBtnFlechaAbajo, linkBtnFlecha) {
  var buttonsOpenSubMenu = document.querySelectorAll(".btnFlecha");

  var menu, item, subMenu, itemNext;

  buttonsOpenSubMenu.forEach(function (buttonOpen) {
    buttonOpen.addEventListener("click", function () {
      if (this.src === linkBtnFlecha) {
        //verifica si existe un submenu desplegado
        menu = document.getElementById("navAdmin");
        var subMenus = menu.querySelectorAll(".subMenu");

        subMenus = Array.from(subMenus);

        var subMenusToNone = subMenus.filter(
          (sub) => sub.style.display == "block"
        );

        if (subMenusToNone.length > 0) {
          subMenusToNone.forEach(function (subMenuToNone) {
            var item = subMenuToNone.parentNode;
            item.querySelector(".btnFlecha").src = linkBtnFlecha;
            subMenuToNone.style.display = "none";
            var itemNext = item.nextElementSibling;
            itemNext.style.marginTop = "11px";
          });
        }

        //abrir submenu
        this.src = linkBtnFlechaAbajo;
        item = this.parentNode;
        subMenu = item.querySelector("ul");
        subMenu.style.display = "block";

        if (item.id == "userAdmin") {
          item.style.marginTop = "-86px";
        } else {
          itemNext = item.nextElementSibling;

          if (itemNext.id == "liGanancias" || itemNext.id == "liHabitaciones") {
            itemNext.style.marginTop = "110px";
          } else {
            itemNext.style.marginTop = "145px";
          }
        }
      } else {
        //cerrar submenu
        this.src = linkBtnFlecha;
        subMenu.style.display = "none";

        if (item.id == "userAdmin") {
          item.style.marginTop = "0px";
        } else {
          itemNext.style.marginTop = "11px";
        }
      }
    });
  });
}

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
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/userRoutes.php?params=` +
        JSON.stringify({ option: "getDataToken" }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin",
        },
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
  }
};

export const invalidAuthentication = async () => {
  localStorage.setItem("alertInvalidToken", true);
  logout();
};

const setIconMenuAvatar = () => {
  let iconAdmin = document.querySelector(".iconoAdmin");

  if (iconAdmin) {
    if (userData.genre == "M") {
      $(".iconoAdmin").attr(
        "src",
        "http://localhost/sistema%20Hotel/img/perfilM.png"
      );
    } else {
      $(".iconoAdmin").attr(
        "src",
        "http://localhost/sistema%20Hotel/img/perfilF.png"
      );
    }
  }
};

const setUserMenu = () => {
  let lblUser = document.querySelector("#userAdmin").querySelector("label");
  lblUser.textContent = userData.user;
};
document.addEventListener("DOMContentLoaded", async () => {
  let actualDate = new Date();
  let actualYear = actualDate.getFullYear();
  let logoutOption = document.querySelector(".logoutOption");

  if (document.getElementById("dashboard")) {
    getClientsByMonthActualYear(actualYear);
    getCategoryRoomsMostReserved();
    getRevenueActualYear();
    displayItemsDataCategoryRooms();
    displayItemDataRevenuesActual();
  }

  userData = await getDataToken();
  if (userData) {
    setIconMenuAvatar();
    setUserMenu();
  }
  optionsMenuAdmin();

  openSubMenu(
    "http://localhost/sistema%20Hotel/img/btnFlechaAbajo.png",
    "http://localhost/sistema%20Hotel/img/btnFlecha.png"
  );

  logoutOption.addEventListener("click", () => {
    logout();
  });
});
