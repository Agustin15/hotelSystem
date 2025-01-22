import { closeModal, getDataClient } from "./scriptDeleteClient.js";
import { loading } from "../scriptAddClient.js";
import { generateItemsInfo } from "./scriptsDetailsClient/scriptItemsBooking.js";
import { configGuestsDetails } from "./scriptsDetailsClient/scriptGuests.js";
import { configRoomsDetails } from "./scriptsDetailsClient/scriptRooms.js";
import { configServicesDetails } from "./scriptsDetailsClient/scriptServices.js";
import { pageNotFound, loadingPage } from "../scriptCliente.js";
import { closePageNotFound } from "../scriptClientsTable.js";
import BACK_URL_LOCALHOST from "../../urlLocalhost.js";
import { invalidAuthentication } from "../../scriptsAdmin/scriptsAdmin.js";

let pages;
let indexPage = 1;
let indexBooking = 0;
let totalBookings;

export const configDetailsClient = async () => {
  let containDetails = document.querySelector(".containDetailsClientBooking");
  let idClient = containDetails.id;
  let title = document.querySelector(".name");
  closeDetails();

  let dataClient = await getDataClient(idClient);

  if (dataClient) {
    title.textContent += ` ${dataClient.nombre} ${dataClient.apellido} `;
    totalBookings = await getRowsBookingClients(idClient);

    if (totalBookings) {
      displayBookingClient(idClient);
    } else {
      noBookingsClient("Ups, este cliente no tiene reservas aun");
    }
  }
};

const getRowsBookingClients = async (id) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/clientRoutes.php?params= ` +
    JSON.stringify({ option: "rowsBookingsClient", client: id });

  let data = null;

  loading(true);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    loading(false);
    return data;
  }
};

const noBookingsClient = (msj) => {
  let noBookings = document.querySelector(".noBookings");

  noBookings.style.display = "flex";
  noBookings.querySelector("h4").textContent = msj;
};

const getClientBookingLimit = async (id) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/clientRoutes.php?params=  ` +
    JSON.stringify({
      option: "bookingsClient",
      client: id,
      index: indexBooking,
    });

  let data = null;

  loading(true);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    loading(false);
    return data;
  }
};

const displayBookingClient = async (idClient) => {
  let containBookings = document.querySelector(".bookings");

  let booking = await getClientBookingLimit(idClient);
  pages = totalBookings / 1;

  if (booking) {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let startBooking = new Date(booking.fechaLlegada);
    let endBooking = new Date(booking.fechaSalida);

    startBooking = startBooking.toLocaleDateString("es", options);
    endBooking = endBooking.toLocaleDateString("es", options);

    let items = generateItemsInfo(booking.idReserva);

    containBookings.innerHTML = `
  
                  <div class="date">
                      <div class="start">
                                <img src="../../../img/entrada.png">
                          <h4>Fecha de llegada</h4>
                          <span>${startBooking}</span>
                      </div>
                      <div class="end">
                      <img src="../../../img/salida.png">
                          <h4>Fecha de salida</h4>
                          <span>${endBooking}</span>
                      </div>
                  </div>
  
                  <div class="items" >
                  ${items}
  
                  </div>
                 
          
    `;

    buttonsOptions();
    controlsIndexBooking(idClient);
  } else {
    noBookingsClient("Ups, no se pudo cargar la reserva");
  }
};

const controlsIndexBooking = (idClient) => {
  let containIndexBookings = document.querySelector(".indexBookings");

  containIndexBookings.innerHTML = ` 
  <span class="prevBooking">Anterior</span>
           ${indexPage}/${pages}
     <span class="nextBooking">Siguiente</span>
`;

  let prevBooking = document.querySelector(".prevBooking");
  let nextBooking = document.querySelector(".nextBooking");

  prevBooking.addEventListener("click", () => {
    if (indexPage > 1) {
      indexPage--;
      indexBooking--;

      displayBookingClient(idClient);
    }
  });

  nextBooking.addEventListener("click", () => {
    if (indexPage < pages) {
      indexBooking++;
      indexPage++;
      displayBookingClient(idClient);
    }
  });
};

const buttonsOptions = () => {
  let btnGuests = document.querySelector(".viewGuests");
  let btnRooms = document.querySelector(".viewRooms");
  let btnServices = document.querySelector(".viewServices");

  btnGuests.addEventListener("click", () => {
    let idBooking = btnGuests.parentNode.id;
    drawOptionDetail(
      "optionClient/optionsDetails/guest.php?idBooking=" + idBooking,
      configGuestsDetails
    );
  });

  btnRooms.addEventListener("click", () => {
    let idBooking = btnRooms.parentNode.id;
    drawOptionDetail(
      "optionClient/optionsDetails/rooms.php?idBooking=" + idBooking,
      configRoomsDetails
    );
  });

  btnServices.addEventListener("click", () => {
    let idBooking = btnServices.parentNode.id;
    drawOptionDetail(
      "optionClient/optionsDetails/services.php?idBooking=" + idBooking,
      configServicesDetails
    );
  });
};

const drawOptionDetail = async (url, configOptionDetail) => {
  const modal = document.querySelector(".modalOptionsBookingClient");
  let optionPage;

  optionModal(modal, "flex");
  loadingPage(true, modal);
  try {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok && result) {
      optionPage = result;
    }
  } catch (error) {
    console.log(error);
   
  } finally {
    loadingPage(false, modal);
    if (!optionPage) {
      pageNotFound(modal);
      closePageNotFound(modal);
    } else {
      modal.innerHTML = optionPage;
      configOptionDetail();
    }
  }
};

export const optionModal = (modal, option) => {
  modal.style.display = option;
};

const closeDetails = () => {
  let btnCloseDetails = document.querySelector(".btnCloseDetails");

  btnCloseDetails.addEventListener("click", () => {
    closeModal();
  });
};
