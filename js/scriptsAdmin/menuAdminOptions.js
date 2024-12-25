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

  let logout = document.querySelector(".logout");

  logout.addEventListener("click", () => {
    localStorage.clear();
  });
};

const routesOptions = (url, liOption, itemLocal) => {
  let allOptionsSubMenu = document
    .querySelector(liOption)
    .querySelectorAll("li");

  allOptionsSubMenu.forEach((option) => {
    option.addEventListener("click", () => {
      location.href = url;
      localStorage.setItem(itemLocal, option.dataset.subUrl);
    });
  });
};
