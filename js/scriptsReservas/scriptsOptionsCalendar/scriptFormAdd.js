import { inputAlert } from "../../scriptsClientes/scriptAddClient.js";
import { getAllClients } from "../../scriptsClientes/scriptClientsTable.js";
import {
  configCartRooms,
  calculateDifferenceNight,
  roomsCart,
  amount,
  cleanRoomCart,
} from "./scriptCartRooms.js";

import {
  POSTBooking,
  getBookingByClientAndDate,
  alertForm,
  removeAlertForm,
} from "./scriptsMethodsFetch.js";

import { POSTRooms } from "../../scriptsRooms/scriptRooms.js";
import { POSTPay } from "../../scriptsRevenues/scriptRevenues.js";

export let nights;
export let resultBookingAdd;

let startBookingLocal;
let endBookingLocal;
let clients;
let startInput;
let endInput;
let form;

export const configFormAddBooking = async (startBooking, endBooking) => {
  form = document.querySelector("form");
  let containForm = document.querySelector(".containForm");
  let cartRooms = document.querySelector(".cartRooms");

  clients = await getClients();
  startBookingLocal = startBooking;
  endBookingLocal = endBooking;

  if (clients) {
    draw(containForm, cartRooms);
  } else {
    noData(containForm, cartRooms);
  }
};

const draw = (containForm, cartRooms) => {
  containForm.style.display = "flex";
  cartRooms.style.display = "flex";
  displayNights();
  displayClients();
  setInputsForm();
  formAddSubmit();
  configCartRooms();
};
const setInputsForm = async () => {
  startInput = form.querySelector("#startInput");
  endInput = form.querySelector("#endInput");
  let quantityInput = form.querySelector("#roomsQuantityInput");

  startInput.value = startBookingLocal;

  endInput.value = endBookingLocal;

  quantityInput.value = roomsCart.length || null;
};

const displayClients = async () => {
  let select = form.querySelector("select");

  let clientsOptions = clients.map((client) => {
    return ` 
       <option value=${client.idCliente}>${client.nombre} ${client.apellido}(${client.correo})</option>   
   
   `;
  });

  select.innerHTML = clientsOptions.join("");
};

const getClients = async () => {
  loading(true);
  let data = null;
  try {
    const clients = await getAllClients();
    if (clients) {
      data = clients;
    } else {
      throw "Ups, no se pudieron cargar los clientes para la reserva";
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    return data;
  }
};

const formAddSubmit = () => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    removeAlertForm();

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
        if (key == "roomsQuantity" || key == "client") {
          booking[key] = parseInt(value);
        }
      }
    });

    if (error) {
      inputAlert(error);
    } else {
      let bookingFind = await getBookingByClientAndDate(booking);
      if (bookingFind) {
        alertForm(
          "../../../img/advertenciaLogin.png",
          "Ups, este cliente ya tiene una reserva en esta fecha",
          "Error",
          "alertFormError"
        );
      } else {
        let resultBooking = await POSTBooking(booking);
        resultBookingAdd = resultBooking;
        if (resultBooking) {
          booking.rooms = roomsCart;
          booking.idBooking = bookingFind.idReserva;
          let resultRoomsBooking = await POSTRooms(booking);

          if (resultRoomsBooking) {
            booking.amount = amount;
            let resultPayBooking = await POSTPay(booking);
            if (resultPayBooking) {
              alertForm(
                "../../../img/tickAdmin.png",
                "¡Reserva agregada exitosamente!",
                "Exito",
                "alertFormCorrect"
              );

              cleanRoomCart();
              setInputsForm();
            }
          }
        }
      }
    }
  });
};

const loading = (state) => {
  let loading = document.querySelector(".loading");

  if (state) {
    loading.style.display = "flex";
  } else {
    loading.style.display = "none";
  }
};

const noData = (containForm, cartRooms) => {
  let containNoData = document.querySelector(".noDataFormAdd");
  containForm.style.display = "none";
  cartRooms.style.display = "none";

  containNoData.style.display = "flex";
};

const displayNights = () => {
  nights = calculateDifferenceNight(
    new Date(startBookingLocal),
    new Date(endBookingLocal)
  );

  let textNights = `${nights} noche`;

  if (nights > 1) {
    textNights = `${nights} noches`;
  }
  document
    .querySelector(".nights")
    .querySelector("h3").textContent = `${textNights}`;
};
