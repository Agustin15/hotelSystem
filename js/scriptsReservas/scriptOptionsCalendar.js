import {
  configFormAddBooking,
  resultBookingAdd
} from "./scriptsOptionsCalendar/scriptFormAdd.js";
import { configFreeRooms } from "./scriptsOptionsCalendar/scriptFreeRooms.js";
import { pageNotFound, loadingPage } from "./scriptReserva.js";
import { closePageNotFound } from "./scriptsTableBookings/scriptTableBookings.js";
import { BACK_URL_LOCALHOST } from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/userData.js";

let startBookingLocal;
let endBookingLocal;
let modalMainBookings;
let today = new Date();

const getBookings = async () => {
  let data = null;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/bookingRoutes.php?params=` +
        JSON.stringify({ option: "allBookings" }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

export const createEventsCalendar = async () => {
  let bookings = await getBookings();
  let events;

  if (bookings) {
    events = bookings.map((booking) => {
      let eventColor = "#0924bb";

      if (new Date(booking.fechaSalida) < today) {
        eventColor = "#c20000";
      } else if (
        new Date(booking.fechaLlegada) <= today &&
        new Date(booking.fechaSalida) >= today
      ) {
        eventColor = "#0ba8ad";
      }

      let day = new Date(booking.fechaSalida).getDate() + 2;
      let month = new Date(booking.fechaSalida).getMonth() + 1;
      let year = new Date(booking.fechaSalida).getFullYear();
      let bookingEnd = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;

      return {
        title: `Reserva ${booking.idReserva}`,
        idBooking: booking.idReserva,
        start: booking.fechaLlegada,
        end: bookingEnd,
        backgroundColor: eventColor,
        borderColor: eventColor
      };
    });
  }

  return events;
};

const getOptionsAddBooking = async () => {
  let page;
  loadingPage(true, modalMainBookings);

  try {
    const response = await fetch("addBookingOptions/optionsAddBooking.html");
    const result = await response.text();

    if (response.ok && result) {
      page = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(true, modalMainBookings);

    if (!page) {
      pageNotFound(modalMainBookings);
      closePageNotFound(modalMainBookings);
    }
    return page;
  }
};

const modal = (state) => {
  let modalMainBookings = document.querySelector(".modalMainBookings");

  if (state) {
    modalMainBookings.style.display = "flex";
  } else {
    modalMainBookings.style.display = "none";
  }
};

export const optionsAddBooking = async (startBooking, endBooking) => {
  modalMainBookings = document.querySelector(".modalMainBookings");
  modal(true);
  window.scrollTo(0, 0);
  let result = await getOptionsAddBooking();
  if (result) {
    modalMainBookings.innerHTML = result;
    endBooking = new Date(endBooking);

    let endBookingDay = endBooking.getDate();
    let endBookingMonth = endBooking.getMonth() + 1;
    let endBookingYear = endBooking.getFullYear();

    endBooking = `${endBookingYear}-${
      endBookingMonth < 10 ? `0${endBookingMonth}` : `${endBookingMonth}`
    }-${endBookingDay < 10 ? `0${endBookingDay}` : `${endBookingDay}`}`;

    configOptionsAddBooking(startBooking, endBooking);
  }
};

const configOptionsAddBooking = async (startBooking, endBooking) => {
  let optionAddBooking = document.querySelector(".optionAddBooking");
  let liOptionBooking = document.querySelector(".optionBooking");
  let liOptionFreeRooms = document.querySelector(".optionFreeRooms");

  closeWindowAddBooking();

  startBookingLocal = startBooking;
  endBookingLocal = endBooking;

  liOptionBooking.addEventListener("click", () => {
    drawOption(optionAddBooking, "addBookingOptions/formAdd.html");
  });

  liOptionFreeRooms.addEventListener("click", () => {
    drawOption(optionAddBooking, "addBookingOptions/roomsFree.html");
  });

  drawOption(optionAddBooking, "addBookingOptions/formAdd.html");
};

const drawOption = async (optionAddBooking, url) => {
  let optionPage;
  loadingPage(true, optionAddBooking);
  try {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok && result) {
      optionPage = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, optionAddBooking);
    if (!optionPage) {
      pageNotFound(optionAddBooking);
    }
  }

  if (optionPage) {
    optionAddBooking.innerHTML = optionPage;

    if (optionAddBooking.querySelector("form")) {
      configFormAddBooking(startBookingLocal, endBookingLocal);
    } else if (optionAddBooking.querySelector(".containFreeRooms")) {
      configFreeRooms(startBookingLocal, endBookingLocal);
    }
  }
};

const closeWindowAddBooking = () => {
  let close = document.querySelector(".headerWindow").querySelector("button");

  close.addEventListener("click", () => {
    modalMainBookings.innerHTML = ``;
    modal(false);
    if (resultBookingAdd) {
      location.reload();
    }
  });
};
