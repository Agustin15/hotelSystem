import { configFormAddBooking } from "./scriptsOptionsCalendar/scriptFormAdd.js";
import { configFreeRooms } from "./scriptsOptionsCalendar/scriptFreeRooms.js";

let startBookingLocal;
let endBookingLocal;

const getBookings = async () => {
  let data = null;
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/admin/bookings/bookingController.php"
    );
    const result = await response.json();

    if (result) {
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
      return {
        title: `Reserva ${booking.idReserva}`,
        start: booking.fechaLlegada,
        end: booking.fechaSalida,
      };
    });
  }

  return events;
};

const getOptionsAddBooking = async () => {
  const response = await fetch("addBookingOptions/optionsAddBooking.html");
  const result = await response.text();

  return result;
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
  let modalMainBookings = document.querySelector(".modalMainBookings");
  modal(true);
  let result = await getOptionsAddBooking();

  modalMainBookings.innerHTML = result;

  configOptionsAddBooking(startBooking, endBooking);
};

const configOptionsAddBooking = async (startBooking, endBooking) => {
  let optionAddBooking = document.querySelector(".optionAddBooking");
  let liOptionBooking = document.querySelector(".optionBooking");
  let liOptionFreeRooms = document.querySelector(".optionFreeRooms");

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
  const response = await fetch(url);
  const result = await response.text();

  optionAddBooking.innerHTML = result;

  if (optionAddBooking.querySelector("form")) {
    configFormAddBooking(startBookingLocal, endBookingLocal);
  } else if (optionAddBooking.querySelector(".containFreeRooms")) {
    configFreeRooms();
  }
};
