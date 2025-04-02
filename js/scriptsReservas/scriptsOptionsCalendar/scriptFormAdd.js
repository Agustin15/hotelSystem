import {
  configCartRooms,
  calculateDifferenceNight,
  roomsCart,
  amount,
  cleanRoomCart
} from "./scriptCartRooms.js";

import {
  POSTBooking,
  alertForm,
  removeAlertForm
} from "./scriptsMethodsFetch.js";

import { BACK_URL_LOCALHOST, FRONT_URL_LOCALHOST } from "../../urlLocalhost.js";
import { invalidAuthentication } from "../../scriptsAdmin/userData.js";

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

  clients = await getAllClients();
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
  if (window.innerWidth <= 600) {
    cartRooms.style.display = "none";
  } else {
    cartRooms.style.display = "flex";
  }

  displayNights();
  displayClients(form, clients);
  setInputsForm();
  formAddSubmit();
  configCartRooms();
  closeAndOpenCart();
};

const closeAndOpenCart = () => {
  let openCart = document.querySelector(".openCart");
  let cart = document.querySelector(".cartRooms");

  openCart.addEventListener("click", () => {
    if (openCart.src == `${FRONT_URL_LOCALHOST}img/menuHabitacion.png`) {
      openCart.src = `${FRONT_URL_LOCALHOST}img/menuOpenCart.png`;
      cart.classList.remove("cartRoomsHide");
      cart.classList.add("cartRoomsShow");
      cart.style.display = "flex";
    } else {
      openCart.src = `${FRONT_URL_LOCALHOST}img/menuHabitacion.png`;
      cart.classList.add("cartRoomsHide");
      setTimeout(function () {
        cart.style.display = "none";
      }, 200);
    }
  });
};

const setInputsForm = async () => {
  startInput = form.querySelector("#startInput");
  endInput = form.querySelector("#endInput");
  let quantityInput = form.querySelector("#roomsQuantityInput");

  startInput.value = startBookingLocal;

  endInput.value = endBookingLocal;

  quantityInput.value = roomsCart.length || null;
};

export const displayClients = async (form, clients) => {
  let select = form.querySelector("select");

  let clientsOptions = clients.map((client) => {
    return ` 
       <option value=${client.idCliente}>${client.nombre} ${client.apellido}(${client.correo})</option>   
   
   `;
  });

  select.innerHTML = clientsOptions.join("");
};

const getAllClients = async () => {
  let data = null;

  loading(true);
  try {
    let url =
      `${BACK_URL_LOCALHOST}routes/admin/clientRoutes.php?params= ` +
      JSON.stringify({ option: "allClients" });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
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
    loading(false);
    if (!data) {
      noData();
    }
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
          msj: "Elija al menos una habitacion para la reserva"
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
      booking.rooms = roomsCart;
      booking.amount = amount;

      let resultBooking = await POSTBooking(booking);

      if (resultBooking.error) {
        let title = "¡Error!";

        if (resultBooking.error.indexOf("actualizarla") > -1) {
          title = "¡Advertencia!";
        }
        alertForm(
          "../../../img/advertenciaLogin.png",
          resultBooking.error,
          title,
          "alertFormError"
        );
      }
      if (resultBooking == true) {
        cleanRoomCart();
        setInputsForm();
        configCartRooms();
        alertForm(
          "../../../img/tickAdmin.png",
          "¡Reserva agregada exitosamente!",
          "¡Exito!",
          "alertFormCorrect"
        );
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

export const inputAlert = (inputError) => {
  let namesInputs = [...document.getElementsByName(inputError.key)];
  let input = namesInputs[0];
  input.classList.add("inputAlert");

  let msjError = input.parentNode.querySelector(".msjError");
  msjError.querySelector("span").textContent = inputError.msj;
  msjError.classList.add("msjErrorShow");

  removeAlertInputs();
};

const removeAlertInputs = () => {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("click", () => {
      input.classList.remove("inputAlert");
    });
  });
};
