import displayBarStagesAdvance from "./barStageAdvance.js";
import {
  alertClientFormBooking,
  confirmAlertBookingExist,
  alertErrorBooking,
} from "./alertsBooking.js";

let btnNextStage = document.querySelector(".btnNextStage");
let booking = JSON.parse(localStorage.getItem("booking"));
let loadingSpinner = document.querySelector(".loading");
let rooms;
let indexRoom = 0;
let btnNext = document.querySelector(".btnNext");
let btnPrev = document.querySelector(".btnPrev");
let roomsBooking = document.querySelector(".bookingRooms");
let containClientAndBooking = document.querySelector(
  ".containClientAndBooking"
);

document.addEventListener("DOMContentLoaded", function () {
  if (containClientAndBooking) {
    if (localStorage.getItem("booking") == null) {
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
    }),
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
    day: "numeric",
  };
  let startBooking = new Date(booking.date.start);
  let endBooking = new Date(booking.date.end);

  document.querySelector(
    ".startBooking"
  ).textContent = `${startBooking.toLocaleDateString("es-ar", optionsFormat)}`;
  document.querySelector(
    ".endBooking"
  ).textContent = `${endBooking.toLocaleDateString("es-ar", optionsFormat)}`;

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
  let input = [...document.getElementsByName(key)];

  input[0].classList.add("inputAlert");

  let spanError = input[0].parentNode.querySelector("span");

  spanError.classList.add("alertErrorInputShow");
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
      validation: value !== "",
      msj: "*Ingrese un nombre",
    },
    {
      key: "lastName",
      validation: value !== "",
      msj: "*Ingrese un apellido",
    },
    {
      key: "mail",
      validation: value.match(validRegex),
      msj: "*Ingrese un correo válido",
    },
    {
      key: "phone",
      validation: value.length == 9,
      msj: "*Ingrese un telefono válido",
    },
  ];
  return validations;
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

function createBooking(client) {
  const clientBooking = {
    client: client,
    booking: booking,
  };

  getIfExistingBooking(clientBooking);
}

const getIfExistingBooking = (clientBooking) => {
  const dataBooking = {
    client: clientBooking.client,
    date: clientBooking.booking.date,
  };

  loading(true, "Cargando");
  setTimeout(async () => {
    try {
      const response = await fetch(
        "http://localhost/sistema%20Hotel/controller/bookingClient/bookingController.php?dataBooking=" +
          JSON.stringify(dataBooking),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.advertencia) {
        throw result.advertencia;
      } else if (result.respuesta) {
        loading(false);
        const confirm = await confirmAlertBookingExist(
          "Ya tiene una reserva en esta fecha, por lo tanto las habitaciones seleccionadas se agregaran a esa reserva",
          "../../img/advertencia.gif"
        );

        if (confirm) {
          let bookingToUpdate = result.respuesta;
          clientBooking.idBooking = bookingToUpdate.idReserva;
          updateBooking(clientBooking);
        } else {
          return;
        }
      } else {
        realizeBooking(clientBooking);
      }
    } catch (error) {
      loading(false);
      alertClientFormBooking(error);
    }
  }, 2000);
};

function loading(loadingState, msj) {
  if (msj) {
    loadingSpinner.querySelector("span").textContent = msj;
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

async function updateBooking(clientBooking) {
  loading(true, "Buscando habitaciones");

  setTimeout(async () => {
    try {
      const response = await fetch(
        "http://localhost/sistema%20Hotel/controller/bookingClient/bookingController.php",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clientBooking),
        }
      );
      const result = await response.json();

      if (typeof result.respuesta == "string") {
        throw result.respuesta;
      } else if (result.respuesta == true) {
        loading(false);
        location.href =
          "http://localhost/sistema%20Hotel/views/reserva/pay/checkout.html";
      }
    } catch (error) {
      loading(false);

      alertErrorBooking(error, "../../img/advertencia.gif");
    }
  }, 2000);
}

async function realizeBooking(clientBooking) {
  loading(true, "Buscando habitaciones");

  setTimeout(async () => {
    try {
      const response = await fetch(
        "http://localhost/sistema%20Hotel/controller/bookingClient/bookingController.php",
        {
          method: "POST",
          body: JSON.stringify(clientBooking),
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();

      if (typeof result.respuesta == "string") {
        throw response.respuesta;
      } else {
        loading(false);
        location.href =
          "http://localhost/sistema%20Hotel/views/reserva/pay/checkout.html";
      }
    } catch (error) {
      loading(false);
      alertErrorBooking(error, "../../img/advertencia.gif");
    }
  }, 2000);
}
