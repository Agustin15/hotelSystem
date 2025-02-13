import { quantityCategorysRooms, guestsAlert, modal } from "./selectRooms.js";
import { alertGuests, alertModal } from "../alertas.js";

let nights;
let totalDeposit = 0;
let booking;
let bookingDate;
let cart = document.getElementById("cart");
export let rooms = [];

export const changeRooms = (roomsChanged) => {
  rooms = roomsChanged;
};

export function printDateBookingInCart(dateBooking) {
  cart.style.display = "flex";

  bookingDate = dateBooking;

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let startDate = new Date(dateBooking.start);
  let endDate = new Date(dateBooking.end);

  document.querySelector(".startBooking").textContent =
    startDate.toLocaleDateString("es-ar", options);
  document.querySelector(".endBooking").textContent =
    endDate.toLocaleDateString("es-ar", options);

  nights = calculateDifferenceNight(startDate, endDate);

  if (nights > 1) {
    document.querySelector(".quantityNights").textContent = `${nights} Noches`;
  } else {
    document.querySelector(".quantityNights").textContent = `${nights} Noche`;
  }
}

export const createDataRoom = (button) => {
  let adultInput = button.parentNode.parentNode.querySelector(".adult");
  let childrenInput = button.parentNode.parentNode.querySelector(".children");

  let dataRoom = JSON.parse(button.parentNode.dataset.dataRoom);

  const room = {
    id: rooms.length + 1,
    category: dataRoom.category,
    images: {
      imageOne: dataRoom.imageOne,
      imageTwo: dataRoom.imageTwo,
      imageThree: dataRoom.imageThree,
    },
    price: dataRoom.price,
    quantity: 1,
    guests: { adult: adultInput.value, children: childrenInput.value },
    total: dataRoom.price * nights,
  };
  return room;
};

export function validateQuantityGuestsInputs(
  adultInput,
  childrenInput,
  roomToDisplayError
) {
  let ability = adultInput.dataset.ability;
  let validate = null;

  if (childrenInput.value == 0 && adultInput.value == 0) {
    validate = "Ingresa algun huesped";
  } else if (
    parseInt(childrenInput.value) + parseInt(adultInput.value) >
    ability
  ) {
    validate = "Capacidad excedida";
  }

  if (validate) {
    alertGuests(validate, guestsAlert, roomToDisplayError);
  }

  return validate;
}

export const addRoomToList = (room) => {
  rooms.push(room);
  localStorage.setItem("rooms", JSON.stringify(rooms));
  printRoomsCart();
};

function quantityGuestRoomCart(roomGuest, typeGuest) {
  let span;

  if (roomGuest > 1) {
    span = roomGuest + " " + typeGuest;
  } else if (roomGuest == 1) {
    span = roomGuest + " " + typeGuest.substring(0, typeGuest.length - 1);
  }

  return span;
}

export const printRoomsCart = () => {
  let divDeposit = document.getElementById("containDeposit");

  let roomsBooking = document.getElementById("roomsBooking");
  cleanRoomCart(roomsBooking);

  if (rooms.length == 0) {
    cleanDeposit(divDeposit);
    emptyCartRooms(roomsBooking);
  } else {
    let roomsToPrint = rooms.map((room) => {
      let spanAdults = quantityGuestRoomCart(room.guests.adult, "Adultos");
      let spanChildrens = quantityGuestRoomCart(room.guests.children, "Niños");

      return `
  
  <li class="roomSelected">
  
  <div class="imgRoom">
  <img src="data:image/png;base64,${room.images.imageTwo}">
  </div>
  <div class="dataRoom">
  
  <div class="header">
  <span class="category">Habitacion ${room.category}</span>
  <img data-id=${
    room.id
  } title="Eliminar" class="buttonDelete" src="../../img/deleteRoomCartClient.png">
  </div>
  
  <div class="guests">
  <span class="adults">${spanAdults}</span>
  ${spanChildrens ? `<span class="childrens">${spanChildrens}</span>` : ""} 
  </div>
  
  <div class="changeQuantity">
  <img class="buttonSubtract" data-room='${JSON.stringify(
    room
  )}' src="../../img/substract.png">
  <span>${room.quantity}</span>
  <img class="buttonPlus" data-room='${JSON.stringify(
    room
  )}' src="../../img/plus.png">
  </div>
  
  <span class="total">U$S ${room.total}</span>
  </div>
  </li>
  <hr>
     `;
    });

    roomsBooking.innerHTML = roomsToPrint.join("");

    document.querySelectorAll(".buttonDelete").forEach((buttonDelete) => {
      buttonDelete.addEventListener("click", function () {
        deleteRoomToList(this.dataset.id);
      });
    });

    document.querySelectorAll(".buttonSubtract").forEach((buttonSubtract) => {
      buttonSubtract.addEventListener("click", function () {
        subtractRoom(JSON.parse(this.dataset.room));
      });
    });

    document.querySelectorAll(".buttonPlus").forEach((buttonPlus) => {
      buttonPlus.addEventListener("click", function () {
        plusRoom(JSON.parse(this.dataset.room));
      });
    });

    totalPriceBooking();
    printDeposit(divDeposit);
  }
};

export function editTotalPriceRooms() {
  rooms = rooms.map((roomEdit) => {
    roomEdit.total = calculateTotalRoom(roomEdit);
    return roomEdit;
  });

  localStorage.setItem("rooms", JSON.stringify(rooms));
  printRoomsCart(rooms);
}

const deleteRoomToList = (id) => {
  rooms = rooms.filter((roomDelete) => roomDelete.id != id);

  localStorage.setItem("rooms", JSON.stringify(rooms));
  printRoomsCart();
};

const subtractRoom = (roomToSubstract) => {
  rooms = rooms.map((roomQuantitySubtract) => {
    if (roomQuantitySubtract.id == roomToSubstract.id) {
      if (roomQuantitySubtract.quantity > 1) {
        roomQuantitySubtract.quantity--;
        roomQuantitySubtract.total = calculateTotalRoom(roomQuantitySubtract);
      }
    }
    return roomQuantitySubtract;
  });

  localStorage.setItem("rooms", JSON.stringify(rooms));
  printRoomsCart(rooms);
};

const plusRoom = (roomToPlus) => {
  rooms = rooms.map((roomQuantityPlus) => {
    if (roomQuantityPlus.id == roomToPlus.id) {
      let limitRoom = quantityCategorysRooms.reduce((ac, categoryRoom) => {
        if (categoryRoom.category == roomToPlus.category) {
          ac = categoryRoom.quantity;
        }
        return ac;
      }, 0);

      let totalQuantityRoomsCategory = comprobateQuantityLimitCategotyRooms(
        roomToPlus.category
      );
      if (totalQuantityRoomsCategory < limitRoom) {
        roomQuantityPlus.quantity++;
        roomQuantityPlus.total = calculateTotalRoom(roomQuantityPlus);
      }
    }

    return roomQuantityPlus;
  });

  localStorage.setItem("rooms", JSON.stringify(rooms));
  printRoomsCart();
};

function comprobateQuantityLimitCategotyRooms(categoryRoom) {
  let roomsCategory = rooms.filter((room) => {
    return room.category == categoryRoom;
  });

  let totalQuantityRoomsCategory = roomsCategory.reduce((ac, roomCategory) => {
    return (ac += roomCategory.quantity);
  }, 0);

  return totalQuantityRoomsCategory;
}

export function comprobateQuantityRoomForAdd(roomForAdd) {
  if (rooms.length > 0) {
    let limitRoom = quantityCategorysRooms.reduce((ac, categoryRoom) => {
      if (categoryRoom.category == roomForAdd.category) {
        ac = categoryRoom.quantity;
      }
      return ac;
    }, 0);

    let totalQuantityRoomsCategory = comprobateQuantityLimitCategotyRooms(
      roomForAdd.category
    );

    if (totalQuantityRoomsCategory < limitRoom) {
      let roomFind = rooms.find((room) => {
        if (
          room.category == roomForAdd.category &&
          room.guests.adult == roomForAdd.guests.adult &&
          room.guests.children == roomForAdd.guests.children
        ) {
          return room;
        }
      });

      if (roomFind) {
        roomFind.quantity++;
        roomFind.total = calculateTotalRoom(roomFind);
        localStorage.setItem("rooms", JSON.stringify(rooms));
        printRoomsCart();
      } else {
        addRoomToList(roomForAdd);
      }
    } else {
      alertModal(modal, "show");
      window.scroll(0, 90);
    }
  } else {
    addRoomToList(roomForAdd);
  }
}

function printDeposit(divDeposit) {
  divDeposit.style.display = "flex";
  divDeposit.querySelector(".total").textContent = "Total:U$S " + totalDeposit;
}

const calculateTotalRoom = (roomToCalculate) => {
  return roomToCalculate.price * roomToCalculate.quantity * nights;
};

function totalPriceBooking() {
  totalDeposit = rooms.reduce(
    (ac, roomToCalculate) => (ac += roomToCalculate.total),
    0
  );
  return totalDeposit;
}

const cleanRoomCart = (roomsBooking) => {
  roomsBooking.innerHTML = "";
};

export const cleanDateBooking = () => {
  if (document.getElementById("dateBooking")) {
    let spans = document.getElementById("dateBooking").querySelectorAll("span");
    spans.forEach((span) => (span.textContent = ""));
  }
};

const cleanDeposit = (divDeposit) => {
  divDeposit.querySelector(".total").textContent = "";
  divDeposit.style.display = "none";
};

function calculateDifferenceNight(llegada, salida) {
  let differenceTime = salida.getTime() - llegada.getTime();

  let differenceDays = Math.round(differenceTime / (1000 * 3600 * 24));

  return differenceDays;
}

export const next = (buttonNext) => {
  buttonNext.addEventListener("click", function () {
    booking = {
      date: bookingDate,
      nights: nights,
      rooms: rooms,
      totalDeposit: totalDeposit,
    };

    localStorage.setItem("booking", JSON.stringify(booking));
    location.href = "datosCliente.php";
  });
};

const emptyCartRooms = (roomsBooking) => {
  roomsBooking.innerHTML = `

  <div class="emptyCartRooms">
  <img src="../../img/emptyCart.png">
  <span>Carrito vacio</span>
  </div>
  
  `;
};
