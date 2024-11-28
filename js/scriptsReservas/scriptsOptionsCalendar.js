import { inputAlert } from "../scriptsClientes/scriptAddClient.js";
import { getAllClients } from "../scriptsClientes/scriptClientsTable.js";

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

const getFormAddBooking = async () => {
  const response = await fetch("addBookingOptions/formAdd.html");
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

export const formAddBooking = async (startBooking, endBooking) => {
  let modalMainBookings = document.querySelector(".modalMainBookings");
  modal(true);
  let result = await getFormAddBooking();

  modalMainBookings.innerHTML = result;

  configFormAddBooking(startBooking, endBooking);
};

const configFormAddBooking = async (startBooking, endBooking) => {
  let form = document.querySelector("form");

  displayClients(form);
  setStartAndEndInputs(startBooking, endBooking, form);
  formAddSubmit(form);
};

const setStartAndEndInputs = async (startBooking, endBooking, form) => {
  let startInput = form.querySelector("#startInput");
  let endInput = form.querySelector("#endInput");

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  startBooking = new Date(startBooking);
  endBooking = new Date(endBooking);

  startInput.value = startBooking.toLocaleDateString("es-ar", options);
  endInput.value = endBooking.toLocaleDateString("es-ar", options);
};

const displayClients = async (form) => {
  let select = form.querySelector("select");

  const clients = await getAllClients();

  if (clients) {
    let clientsOptions = clients.map((client) => {
      return ` 
     <option value=${client.idCliente}>${client.nombre} ${client.apellido}(${client.correo})</option>   
 
 `;
    });

    select.innerHTML = clientsOptions.join("");
  }
};

const formAddSubmit = (form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const booking = {};
    let error;

    formData.forEach((value, key) => {
      if (key == "roomsQuantity" && value.length == 0) {
        return (error = {
          key: key,
          msj: "Elija al menos una habitacion para la reserva",
        });
      } else {
        booking[key] = value;
      }
    });


    if (error) {
      inputAlert(error);
    }
  });
};
