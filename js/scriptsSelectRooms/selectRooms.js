import { drawHotelRooms } from "./drawHotelRooms.js";

import {
  printDateBookingInCart,
  createDataRoom,
  validateQuantityGuestsInputs,
  addRoomToList,
  printRoomsCart,
  editTotalPriceRooms,
  comprobateQuantityRoomForAdd,
  cleanDateBooking,
  next,
  rooms,
  changeRooms,
} from "./functionsCart.js";

import {
  eventsButtonsSlider,
  indexGetValue,
  displayIndexItemRoom,
} from "./slider.js";

const formCheckIn = document.getElementById("checkIn");
let llegada = document.getElementById("llegada");
let salida = document.getElementById("salida");
let modal = document.getElementById("modal");
let buttonNext = document.getElementById("buttonNext");
export let quantityCategorysRooms;
export let dateBooking = null;

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

    let startBooking = new Date(dateBooking.start);
    let endBooking = new Date(dateBooking.end);

    dateBooking = {
      start: startBooking,
      end: endBooking,
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
      "http://localhost/sistema%20Hotel/controller/bookingClient/bookingRooms.php?option=roomsHotel",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

    if (llegada.value == "" || salida.value == "") {
      alerta("Ingresa una fecha válida");
    } else {
      cleanDateBooking();
      cleanQuantityAvailable();

      let startBooking = new Date(llegada.value);
      let endBooking = new Date(salida.value);

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
      "http://localhost/sistema%20Hotel/controller/bookingClient/bookingRooms.php?option=roomsAvailable&dateBooking=" +
        JSON.stringify(dateBooking),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
      if (!dateBooking) {
        alerta("Ingresa una fecha valida");
      } else {
        if (
          validateQuantityGuestsInputs(
            btn.parentNode.parentNode.querySelector(".adult"),
            btn.parentNode.parentNode.querySelector(".children")
          ) != null
        ) {
          alertGuests(
            validateQuantityGuestsInputs(
              btn.parentNode.parentNode.querySelector(".adult"),
              btn.parentNode.parentNode.querySelector(".children")
            ),
            document.getElementById("alertGuests"),
            btn.parentNode.parentNode.parentNode
          );
        } else {
          let room = createDataRoom(btn);
          let result = comprobateQuantityRoomForAdd(room);
          switch (result) {
            case "quantityAdded":
              printRoomsCart();
              break;
            case null:
              addRoomToList(room);
              printRoomsCart();

              break;
            default:
              alertModal("show");
              window.scroll(0, 90);

              break;
          }
        }
      }
    });
  });
}

const alertModal = (option) => {
  if (option == "show") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
  buttonModalAlert();
};

function buttonModalAlert() {
  modal.querySelector("button").addEventListener("click", function () {
    alertModal("hide");
  });
}
next(buttonNext);
