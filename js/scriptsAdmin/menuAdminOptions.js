export const optionsMenuAdmin = () => {
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
};


const routesOptions = (url, liOption, itemLocal) => {
  let allOptionsSubMenu = document
    .querySelector(liOption)
    .querySelectorAll("li");

  allOptionsSubMenu.forEach((option) => {
    option.addEventListener("click", () => {
      localStorage.setItem(itemLocal, option.dataset.subUrl);
      location.href = url;
    });
  });
};
