import displayBarStagesAdvance from "./barStageAdvance.js";

import {
  fetchPOSTClient,
  fetchGetClient
} from "./scriptsFetchsBooking/scriptClient.js";
import {
  getBookingByClientMailAndDate,
  fetchPOSTBooking,
  fetchPUTBooking
} from "./scriptsFetchsBooking/scriptBooking.js";

import {
  fetchGETAvailableRoomsCategory,
  fetchPOSTRooms
} from "./scriptsFetchsBooking/scriptRooms.js";

import {
  fetchPOSTPay,
  fetchGETPay,
  fetchPUTPay
} from "./scriptsFetchsBooking/scriptRevenues.js";

import { alertBooking, confirmUpdateBooking } from "./alertsBooking.js";

let loadingSpinner = document.querySelector(".loading");
let btnNextStage = document.querySelector(".btnNextStage");
let booking = JSON.parse(localStorage.getItem("booking"));
let rooms;
let clientBooking = {};
let indexRoom = 0;
let btnNext = document.querySelector(".btnNext");
let btnPrev = document.querySelector(".btnPrev");
let roomsBooking = document.querySelector(".bookingRooms");
let containClientAndBooking = document.querySelector(
  ".containClientAndBooking"
);

document.addEventListener("DOMContentLoaded", function () {
  if (containClientAndBooking) {
    if (!localStorage.getItem("booking")) {
      location.href = "consultaHabitaciones.php";
    } else {
      if (booking) {
        rooms = booking.rooms;
      }

      displayBarStagesAdvance("#lineRoomsSelected");
      printBooking();
      displayIndexRoom();
    }

    btnNext.addEventListener("click", function () {
      if (indexRoom < rooms.length - 1) {
        indexRoom++;
        printBooking();
        displayIndexRoom();
      }
    });

    btnPrev.addEventListener("click", function () {
      if (indexRoom > 0) {
        indexRoom--;
        printBooking();
        displayIndexRoom();
      }
    });

    if (btnNextStage) {
      btnNextStage.addEventListener("click", function () {
        clientData();
        clickRemoveAlertInputs();
      });
    }

    if (document.querySelector("form")) {
      eventOnInputPhone();
    }
  }
});

const removeMsjAlertInputs = () => [
  document
    .querySelector("form")
    .querySelectorAll(".alertErrorInput")
    .forEach((alertMsj) => {
      alertMsj.textContent = "";
    })
];

function displayIndexRoom() {
  let indexSpan = document.querySelector(".indexRoom");

  indexSpan.textContent = `${indexRoom + 1} / ${rooms.length}`;
}

function quantityGuestRoom(roomGuest, typeGuest) {
  let span = "";
  let liGuest = "";

  if (roomGuest > 1) {
    span = roomGuest + " " + typeGuest;
  } else if (roomGuest == 1) {
    span = roomGuest + " " + typeGuest.substring(0, typeGuest.length - 1);
  }

  if (span.length > 0) {
    liGuest = `<li>${span}</li>`;
  }

  return liGuest;
}

function printBookingRooms() {
  let roomsToPrint = rooms.map((room) => {
    let liAdult = quantityGuestRoom(room.guests.adult, "Adultos");
    let liChildren = quantityGuestRoom(room.guests.children, "Niños");
    let quantityRoomsType = 1 + " Habitacion";
    if (room.quantity > 1) {
      quantityRoomsType = room.quantity + " Habitaciones";
    }

    return `
    
    
                            <div class="header">

                                <img src="data:image/png;base64,${room.images.imageTwo}">
                                <div class="data">
                                <span>Habitacion ${room.category}</span>

                                <div class="details">
                                <ul>
                                    ${liAdult}
                                    ${liChildren}
                                    <li>$USD ${room.price}</li>
                                    <li>${quantityRoomsType}</li>
                                    <li class="total">U$S ${room.total}</li>
                         
                                </div>
                            
                                </div>

                            </div>
    `;
  });

  roomsBooking.querySelector("li").innerHTML = roomsToPrint[indexRoom];

  if (rooms.length > 1) {
    document
      .querySelector(".controls")
      .querySelectorAll("img")
      .forEach(function (control) {
        control.style.visibility = "visible";
      });
  }
}

function printBooking() {
  var optionsFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  let startBooking = new Date(booking.date.start);
  let endBooking = new Date(booking.date.end);

  startBooking.setMinutes(
    startBooking.getMinutes() + startBooking.getTimezoneOffset()
  );
  endBooking.setMinutes(
    endBooking.getMinutes() + endBooking.getTimezoneOffset()
  );
  

  document.querySelector(
    ".startBooking"
  ).textContent = `${startBooking.toLocaleDateString("es-UY", optionsFormat)}`;
  document.querySelector(
    ".endBooking"
  ).textContent = `${endBooking.toLocaleDateString("es-UY", optionsFormat)}`;

  if (booking.nights > 1) {
    document.querySelector(".nights").textContent = `${booking.nights} Noches`;
  } else {
    document.querySelector(".nights").textContent = `${booking.nights} Noche`;
  }

  if (roomsBooking) {
    printBookingRooms();
  }
}

function inputAlert(key, msjAlertInput) {
  let inputs = [...document.getElementsByName(key)];
  let input = inputs[0];
  input.classList.add("inputAlert");

  let containAlertError = input.parentNode.querySelector(".alertErrorInput");
  containAlertError.classList.add("alertErrorInputShow");
  let spanError = containAlertError.querySelector("span");
  spanError.textContent = msjAlertInput;
}

function removeInputAlert(input) {
  input.classList.remove("inputAlert");
  input.classList.remove("inputAlert::placeholder");
}

const validationsInputs = (value) => {
  let validRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
  const validations = [
    {
      key: "name",
      validation: value.length > 0,
      msj: "Ingrese un nombre"
    },
    {
      key: "lastName",
      validation: value.length > 0,
      msj: "Ingrese un apellido"
    },
    {
      key: "mail",
      validation: value.match(validRegex),
      msj: "Ingrese un correo válido"
    },
    {
      key: "phone",
      validation: value.length == 8 || value.length == 9,
      msj: "Ingrese un telefono válido"
    }
  ];
  return validations;
};

const firstLetterUpper = (value) => {
  let valueArray = [...value];
  return valueArray
    .map((char, index) => {
      if (index == 0) {
        return char.toUpperCase();
      }
      return char.toLowerCase();
    })
    .join("");
};
function clientData() {
  const form = document.querySelector("form");

  const formData = new FormData(form);

  const client = {};
  let inputsValidates = [];
  let quantityInputs = [...form.querySelectorAll("input")].length;

  formData.forEach((v, k) => {
    let inputToAlert = validationsInputs(v).find(
      (validInput) => k == validInput.key && !validInput.validation
    );

    if (inputToAlert) {
      inputAlert(inputToAlert.key, inputToAlert.msj);
    } else {
      if (k == "name" || k == "lastName") {
        v = firstLetterUpper(v);
      }
      inputsValidates.push({ key: k, value: v });
    }
  });

  if (inputsValidates.length == quantityInputs) {
    inputsValidates.forEach((inputVal) => {
      client[inputVal.key] = inputVal.value;
    });

    removeMsjAlertInputs();
    createBooking(client);
  }
}

const createBooking = async (client) => {
  clientBooking = {
    client: client,
    booking: booking
  };

  let clientExisted = await fetchGetClient(client);

  if (clientExisted) {
    addBooking(clientBooking, clientExisted);
  } else {
    addClient(clientBooking);
  }
};

const addClient = async (clientBooking) => {
  let clientAdded = await fetchPOSTClient(clientBooking.client);

  if (clientAdded) {
    let clientFind = await fetchGetClient(clientBooking.client);
    if (clientFind) {
      addBooking(clientBooking, clientFind);
    }
  }
};

const addBooking = async (clientBooking, clientFind) => {
  let bookingFind = await getBookingByClientMailAndDate(clientBooking);
  if (bookingFind) {
    alertBooking(
      "Advertencia",
      "Ya tiene una reserva en esta fecha, ¿Desea agregar las nuevas habitaciones a dicha reserva?"
    );

    let confirm = await confirmUpdateBooking(
      document.querySelector(".alertBooking")
    );

    if (confirm) {
      updateBooking(bookingFind, clientBooking);
    }
  } else {
    const dataAddBooking = {
      client: clientFind.idCliente,
      startBooking: clientBooking.booking.date.start,
      endBooking: clientBooking.booking.date.end,
      roomsQuantity: totalRoomsInBooking(clientBooking.booking.rooms)
    };

    let bookingAdded = await fetchPOSTBooking(dataAddBooking);

    if (bookingAdded) {
      addRoomsBookings(
        clientBooking.booking,
        clientFind.idCliente,
        clientBooking
      );
    }
  }
};

const addRoomsBookings = async (booking, idClient, clientBooking, option) => {
  const dataConsult = {
    startBooking: booking.date.start,
    endBooking: booking.date.end
  };

  let noRoomsAvailables = null;

  let roomsAssign = await Promise.all(
    booking.rooms.map(async (room) => {
      let result = await assignRoom(dataConsult, room, rooms);
      if (!result) {
        noRoomsAvailables = `Ups, no quedan suficientes habitaciones ${room.category} disponibles`;
      } else {
        return result;
      }
    })
  );
  if (noRoomsAvailables) {
    alertBooking("Error", noRoomsAvailables);
  } else {
    let getBookingAdded = await getBookingByClientMailAndDate(clientBooking);

    const roomsToBooking = {
      idBooking: getBookingAdded.idReserva,
      client: idClient,
      startBooking: dataConsult.startBooking,
      endBooking: dataConsult.endBooking,
      rooms: roomsAssign.flat()
    };

    addRoomsAssigned(roomsToBooking, option);
  }
};

const assignRoom = async (dataConsult, room, rooms) => {
  dataConsult.category = room.category;

  let roomsAvailablesCategory = await fetchGETAvailableRoomsCategory(
    dataConsult
  );
  if (
    roomsAvailablesCategory.length <
    totalRoomsEqualCategoryInBooking(room.category, rooms)
  ) {
    return false;
  } else {
    let roomCategoryAssing = [];
    for (let f = 0; f <= roomsAvailablesCategory.length; f++) {
      if (roomCategoryAssing.length < room.quantity) {
        roomCategoryAssing.push({
          numRoom: roomsAvailablesCategory[f].numRoom,
          adults: parseInt(room.guests.adult),
          childs: parseInt(room.guests.children) || 0
        });
      } else {
        return roomCategoryAssing;
      }
    }
  }
};
const totalRoomsEqualCategoryInBooking = (category, rooms) => {
  let total = rooms.reduce((ac, room) => {
    if (room.category == category) {
      ac += room.quantity;
    }
    return ac;
  }, 0);
  return total;
};

const totalRoomsInBooking = (rooms) => {
  let total = rooms.reduce((ac, room) => {
    return (ac += room.quantity);
  }, 0);
  return total;
};

const addRoomsAssigned = async (roomsToBooking, option) => {
  let resultAddRooms = await fetchPOSTRooms(roomsToBooking);
  if (resultAddRooms == true && option !== "update") {
    addPay(roomsToBooking);
  } else if (resultAddRooms == true && option == "update") {
    updatePay(roomsToBooking);
  }
};

const addPay = async (roomsToBooking) => {
  let resultAddPay = await fetchPOSTPay({
    idBooking: roomsToBooking.idBooking,
    client: roomsToBooking.client,
    amount: booking.totalDeposit
  });

  if (resultAddPay) {
    const dataToGetBooking = {
      email: clientBooking.client.mail,
      startDate: clientBooking.booking.date.start,
      endDate: clientBooking.booking.date.end,
      option: "added"
    };

    localStorage.clear();
    location.href = "detalles.html?details=" + encodeURI(JSON.stringify(dataToGetBooking));
  }
};

const updateBooking = async (bookingFind, clientBooking) => {
  const dataBookingToUpdate = {
    idBooking: bookingFind.idReserva,
    idClient: bookingFind.idClienteReserva,
    startBooking: bookingFind.fechaLlegada,
    endBooking: bookingFind.fechaSalida,
    quantityRooms:
      bookingFind.cantidadHabitaciones + totalRoomsInBooking(booking.rooms)
  };

  let resultUpdate = await fetchPUTBooking(dataBookingToUpdate);

  if (resultUpdate) {
    addRoomsBookings(
      booking,
      bookingFind.idClienteReserva,
      clientBooking,
      "update"
    );
  }
};

const updatePay = async (roomsToBooking) => {
  let actualRevenue = await fetchGETPay(roomsToBooking.idBooking);
  if (actualRevenue) {
    let resultUpdatePay = await fetchPUTPay({
      idBooking: roomsToBooking.idBooking,
      newAmount: booking.totalDeposit + actualRevenue.deposito
    });

    if (resultUpdatePay) {
      const dataToGetBookingUpdated = {
        email: clientBooking.client.mail,
        startDate: clientBooking.booking.date.start,
        endDate: clientBooking.booking.date.end,
        option: "updated"
      };

      localStorage.clear();
      location.href =
        "detalles.html?details=" + encodeURI(JSON.stringify(dataToGetBookingUpdated));
    }
  }
};

export function loadingBooking(loadingState, msj) {
  if (msj) {
    loadingSpinner.querySelector(".spanLoading").textContent = msj;
  }

  if (loadingState) {
    loadingSpinner.style.display = "flex";
    document.querySelector(".modalBooking").style.display = "flex";
  } else {
    loadingSpinner.style.display = "none";
    document.querySelector(".modalBooking").style.display = "none";
  }
}

function eventOnInputPhone() {
  document.querySelector("#phone").addEventListener("input", (input) => {
    replaceCharacter(input.target);
  });
}

function replaceCharacter(input) {
  let valid = /\d/;

  let ultimateCharacter = input.value
    .trim()
    .charAt(input.value.trim().length - 1);

  if (!ultimateCharacter.match(valid)) {
    let newValue = input.value.replace(ultimateCharacter, "");
    input.value = newValue;
  }
}

function clickRemoveAlertInputs() {
  document
    .querySelector("form")
    .querySelectorAll("input")
    .forEach((input) => {
      input.addEventListener("click", function () {
        removeInputAlert(input);
      });
    });
}
