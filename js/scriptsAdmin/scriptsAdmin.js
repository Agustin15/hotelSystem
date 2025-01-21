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

const getDataToken = async () => {
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/controller/admin/authToken.php?params=` +
        JSON.stringify({ option: "getDataToken" }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin",
        },
      }
    );

    const token = await response.json();
    console.log(token);
  } catch (error) {
    console.log(error);
  }
};

const iconMenuAvatar = () => {
  let iconAdmin = document.querySelector(".iconoAdmin");

  if (iconAdmin) {
    let genreData = iconAdmin.dataset.genre;

    if ((genreData = "M")) {
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

document.addEventListener("DOMContentLoaded", () => {
  let actualDate = new Date();
  let actualYear = actualDate.getFullYear();

  if (document.getElementById("dashboard")) {
    getClientsByMonthActualYear(actualYear);
    getCategoryRoomsMostReserved();
    getRevenueActualYear();
    displayItemsDataCategoryRooms();
    displayItemDataRevenuesActual();
  }

  getDataToken();
  iconMenuAvatar();
  optionsMenuAdmin();

  openSubMenu(
    "http://localhost/sistema%20Hotel/img/btnFlechaAbajo.png",
    "http://localhost/sistema%20Hotel/img/btnFlecha.png"
  );
});
