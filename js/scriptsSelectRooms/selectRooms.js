import { drawHotelRooms } from "./drawHotelRooms.js";

import {
  printDateBookingInCart,
  createDataRoom,
  validateQuantityGuestsInputs,
  printRoomsCart,
  editTotalPriceRooms,
  comprobateQuantityRoomForAdd,
  cleanDateBooking,
  next,
  rooms,
  changeRooms,
} from "./functionsCart.js";

import { alerta } from "../alertas.js";

import {
  eventsButtonsSlider,
  indexGetValue,
  displayIndexItemRoom,
} from "./slider.js";

export let quantityCategorysRooms;
export let dateBooking = null;

const formCheckIn = document.getElementById("checkIn");
let llegada = document.getElementById("llegada");
let salida = document.getElementById("salida");
export let modal = document.getElementById("modal");
let buttonNext = document.getElementById("buttonNext");
let alertEmptyDate = document.querySelector(".avisoCompleteDatos");

export let guestsAlert = document.getElementById("alertGuests");

document.addEventListener("DOMContentLoaded", async function () {
  let resultGetCategoryRooms = await submitGetCategoryHotelRooms();

  if (resultGetCategoryRooms) {
    printHotelRooms(resultGetCategoryRooms);

    document.querySelectorAll(".containRoom").forEach((element) => {
      let index;
      let category = element.dataset.category;
      index = indexGetValue(index, category);
      displayIndexItemRoom(element.querySelector("ul"), index);
    });
  }

  if (JSON.parse(localStorage.getItem("rooms")).length > 0) {
    dateBooking = JSON.parse(localStorage.getItem("dateBooking"));

    dateBooking = {
      start: dateBooking.start,
      end: dateBooking.end,
    };

    submitDateBooking(dateBooking);
    printDateBookingInCart(dateBooking);
    changeRooms(JSON.parse(localStorage.getItem("rooms")));

    printRoomsCart();
  }
});

const loading = (status) => {
  if (status) {
    document.querySelector(".loading").style.display = "flex";
  } else {
    document.querySelector(".loading").style.display = "none";
  }
};

const displayErrorGetHotelRooms = (status) => {
  if (status) {
    document.querySelector(".errorHotelRooms").style.display = "flex";
  } else {
    document.querySelector(".errorHotelRooms").style.display = "none";
  }
};
async function submitGetCategoryHotelRooms() {
  try {
    loading(true);
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/roomsAvailable/rooms.php?option=roomsHotel");

    const result = await response.json();
    displayErrorGetHotelRooms(false);
    return result;
  } catch (error) {
    displayErrorGetHotelRooms(true);
  } finally {
    loading(false);
  }
}

if (formCheckIn) {
  formCheckIn.addEventListener("submit", (event) => {
    event.preventDefault();

    alertEmptyDate.style.display = "none";

    if (llegada.value == "" || salida.value == "") {
      alerta("Ingresa una fecha válida");
    } else {
      cleanDateBooking();
      cleanQuantityAvailable();

      let startBooking =llegada.value;
      let endBooking = salida.value;

      if (endBooking <= startBooking) {
        alerta("Ingresa una fecha válida");
      } else {
        dateBooking = {
          start: startBooking,
          end: endBooking,
        };

        localStorage.setItem("dateBooking", JSON.stringify(dateBooking));

        submitDateBooking(dateBooking);
        printDateBookingInCart(dateBooking);
        if (rooms) {
          editTotalPriceRooms();
        }
      }
    }
  });
}

async function submitDateBooking(dateBooking) {
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/roomsAvailable/rooms.php?option=roomsAvailable&dateBooking=" +
        JSON.stringify(dateBooking));

    const result = await response.json();

    if (result) {
      quantityCategorysRooms = result;
      printQuantAvailable(quantityCategorysRooms);
    }
  } catch (error) {
    console.log(error);
  }
}

function disabledRoomWithoutStock(containRoom, quantity) {
  let buttonDisabled = containRoom.querySelector("button");
  if (quantity == 0) {
    containRoom.querySelectorAll("input").forEach((input) => {
      input.disabled = true;
      input.classList.add("inputGuestDisabled");
    });

    buttonDisabled.disabled = true;
    buttonDisabled.classList.add("buttonAddDisabled");
  } else {
    containRoom.querySelectorAll("input").forEach((input) => {
      input.disabled = false;
      input.classList.remove("inputGuestDisabled");
    });
    buttonDisabled.disabled = false;
    buttonDisabled.classList.remove("buttonAddDisabled");
  }
}

const cleanQuantityAvailable = () => {
  if (document.querySelector(".quantityAvailableRoom")) {
    document
      .querySelectorAll(".containAvailableRooms")
      .forEach((element) => (element.innerHTML = ""));
  }
};
const printQuantAvailable = () => {
  let containRooms = [...document.querySelectorAll(".containRoom")];

  containRooms.forEach((containRoom) => {
    let category = containRoom.dataset.category;

    let quantityCategoryFilter = quantityCategorysRooms.filter(
      (quantityCategoryRoom) => quantityCategoryRoom.category == category
    );

    containRoom.querySelector(".containAvailableRooms").innerHTML += `
    
    <div class="quantityAvailableRoom">
    <div>
    <span>STOCK</span>
    </div>
    <div>
    <span>${quantityCategoryFilter[0].quantity}</span>
    </div>
    
    </div>
    `;

    disabledRoomWithoutStock(containRoom, quantityCategoryFilter[0].quantity);
  });
};

const printHotelRooms = (rooms) => {
  let hotelRoomsPrint = drawHotelRooms(rooms);

  document.getElementById("containRooms").innerHTML = hotelRoomsPrint.join("");

  eventsButtonsSlider();
  validateDateInputs();
};

function validateDateInputs() {
  [...document.querySelectorAll(".buttonAdd")].forEach((btn) => {
    btn.addEventListener("click", () => {
      alertEmptyDate.style.display = "none";
      guestsAlert.style.display = "none";

      if (!dateBooking) {
        alerta("Ingresa una fecha valida");
      } else {
        let errorGuests = validateQuantityGuestsInputs(
          btn.parentNode.parentNode.querySelector(".adult"),
          btn.parentNode.parentNode.querySelector(".children"),
          btn.parentNode.parentNode.parentNode
        );

        if (!errorGuests) {
          let room = createDataRoom(btn);
          comprobateQuantityRoomForAdd(room);
        }
      }
    });
  });
}

next(buttonNext);
