import { FRONT_URL_LOCALHOST } from "../urlLocalhost.js";
export const optionsMenuAdmin = () => {
  let openMenu = document.querySelector(".openMenu").querySelector("img");
  let closeMenu = document.querySelector(".closeMenu").querySelector("img");
  let navAdmin = document.getElementById("navAdmin");

  openMenu.addEventListener("click", () => {
    navAdmin.classList.remove("navAdminHide");
    navAdmin.classList.add("navAdminShow");
  });

  closeMenu.addEventListener("click", () => {
    navAdmin.classList.add("navAdminHide");
  });

  let optionEditProfile = document.querySelector(".editProfile");
  if (optionEditProfile) {
    optionEditProfile.addEventListener("click", () => {
      location.href = `${FRONT_URL_LOCALHOST}views/admin/editarPerfil`;
    });
  }

  routesOptions(`${FRONT_URL_LOCALHOST}views/admin/index.php`, "#liInicio");

  routesOptions(
    `${FRONT_URL_LOCALHOST}views/admin/clientes/ `,
    "#liClientes",
    "actualOptionClient"
  );
  routesOptions(
    `${FRONT_URL_LOCALHOST}views/admin/reservas/`,
    "#liReserva",
    "actualOptionBooking"
  );
  routesOptions(
    `${FRONT_URL_LOCALHOST}views/admin/habitaciones/`,
    "#liHabitaciones",
    "actualOptionRooms"
  );

  routesOptions(
    `${FRONT_URL_LOCALHOST}views/admin/ganancias/`,
    "#liGanancias",
    "actualOptionRevenues"
  );

  routesOptions(
    `${FRONT_URL_LOCALHOST}views/admin/mantenimiento/index.php`,
    "#liMantenimiento"
  );
};

const routesOptions = (url, liOption, itemLocal) => {
  if (liOption == "#liInicio" || liOption == "#liMantenimiento") {
    let optionMenu = document.querySelector(liOption);
    if (optionMenu) {
      document
        .querySelector(liOption)
        .addEventListener("click", () => (location.href = url));
    }
  } else {
    let allOptionsSubMenu = document
      .querySelector(liOption)
      .querySelectorAll("li");
    allOptionsSubMenu.forEach((option) => {
      option.addEventListener("click", () => {
        localStorage.setItem(itemLocal, option.dataset.subUrl);
        location.href = url;
      });
    });
  }
};
