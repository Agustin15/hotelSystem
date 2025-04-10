import displayBarStagesAdvance from "./barStageAdvance.js";

import {
  fetchPOSTBooking,
  fetchPUTBooking
} from "./scriptsFetchsBooking/scriptBooking.js";

import { alertBooking, confirmUpdateBooking } from "./alertsBooking.js";

let loadingSpinner = document.querySelector(".loading");
let btnNextStage = document.querySelector(".btnNextStage");
let booking = JSON.parse(localStorage.getItem("booking"));
let rooms;
let clientBooking = {};
let indexRoom = 0;
let btnNext = document.querySelector(".btnNext");
let btnPrev = document.querySelector(".btnPrev");
let iconNights = document.querySelector(".iconNigths");
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
 </ul>
  </div>
  </div>

                      
    `;
  });

  roomsBooking.querySelector("li").innerHTML = roomsToPrint[indexRoom];

  if (rooms.length > 1) {
    btnNext.style.visibility = "visible";
    btnPrev.style.visibility = "visible";
    if (window.innerWidth <= 600) {
      btnPrev.src = "../../img/up.png";
      btnNext.src = "../../img/up.png";
    }
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

  window.innerWidth <= 600
    ? (iconNights.src = "../../img/night.png")
    : (iconNights.src = "../../img/moonBooking.png");

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

  let resultBookingAdded = await fetchPOSTBooking(clientBooking);

  if (resultBookingAdded.error) {
    let msjError = resultBookingAdded.error;
    if (resultBookingAdded.error.indexOf("reserva existente") > -1) {
      alertBooking(
        "Advertencia",
        "¿Ya tiene una reserva en estas fechas, desea agregar la nuevas habitaciones?"
      );
      let confirm = await confirmUpdateBooking(
        document.querySelector(".alertBooking")
      );
      if (confirm) {
        return updateBooking(clientBooking);
      }
    }

    alertBooking("Error", msjError);
  }

  if (resultBookingAdded == true) {
    redirect(clientBooking, "added");
  }
};

const updateBooking = async (clientBooking) => {
  const resultUpdate = await fetchPUTBooking(clientBooking);

  if (resultUpdate.error) {
    alertBooking("Error", resultUpdate.error);
  }
  if (resultUpdate == true) {
    redirect(clientBooking, "update");
  }
};

const redirect = (clientBooking, option) => {
  const dataToGetBookingUpdated = {
    email: clientBooking.client.mail,
    startDate: clientBooking.booking.date.start,
    endDate: clientBooking.booking.date.end,
    option: option
  };
  localStorage.clear();
  location.href =
    "detalles.html?details=" +
    encodeURI(JSON.stringify(dataToGetBookingUpdated));
};

export function loadingBooking(loadingState, msj) {
  window.scroll(0, 0);

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
