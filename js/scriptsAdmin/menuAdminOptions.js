export const optionsMenuAdmin = () => {
  let optionEditProfile = document.querySelector(".editProfile");
  if (optionEditProfile) {
    optionEditProfile.addEventListener("click", () => {
      location.href =
        "http://localhost/sistema%20Hotel/views/admin/editarPerfil";
    });
  }

  routesOptions(
    "http://localhost/sistema%20Hotel/views/admin/index.php",
    "#liInicio"
  );

  routesOptions(
    "http://localhost/sistema%20Hotel/views/admin/clientes/",
    "#liClientes",
    "actualOptionClient"
  );
  routesOptions(
    "http://localhost/sistema%20Hotel/views/admin/reservas/",
    "#liReserva",
    "actualOptionBooking"
  );
  routesOptions(
    "http://localhost/sistema%20Hotel/views/admin/habitaciones/",
    "#liHabitaciones",
    "actualOptionRooms"
  );

  routesOptions(
    "http://localhost/sistema%20Hotel/views/admin/ganancias/",
    "#liGanancias",
    "actualOptionRevenues"
  );

  routesOptions(
    "http://localhost/sistema%20Hotel/views/admin/mantenimiento/index.php",
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
