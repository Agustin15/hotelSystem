import displayBarStagesAdvance from "./barStageAdvance.js";

let btnNextStage = document.querySelector(".btnNextStage");
let booking = JSON.parse(localStorage.getItem("booking"));
let loadingSpinner = document.querySelector(".loading");
let rooms;
let indexRoom = 0;
let btnNext = document.querySelector(".btnNext");
let btnPrev = document.querySelector(".btnPrev");
let roomsBooking = document.querySelector(".bookingRooms");
let confirmationMsj = document.getElementById("confirmationBooking");
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
  }
});


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

    return `
    
    
                            <div class="header">

                                <img src="data:image/png;base64,${room.images.imageTwo}">
                                <div class="data">
                                <span>Habitacion ${room.category}</span>

                                <div class="details">
                                <ul>
                                    ${liAdult}
                                    ${liChildren}
                                    <li>Precio:$${room.price}</li>
                                    <li>Cantidad:${room.quantity}</li>
                                    <li class="total">Total:$${room.total}</li>
                         
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
  // var optionsFormat = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };
  // let startBooking = new Date(booking.date.start);
  // let endBooking = new Date(booking.date.end);

  // document.querySelector(
  //   ".startBooking"
  // ).textContent = `${startBooking.toLocaleDateString("es-ar", optionsFormat)}`;
  // document.querySelector(
  //   ".endBooking"
  // ).textContent = `${endBooking.toLocaleDateString("es-ar", optionsFormat)}`;

  // if (booking.nights > 1) {
  //   document
  //     .querySelector(".nights")
  //     .querySelector("span").textContent = `${booking.nights} Noches`;
  // } else {
  //   document
  //     .querySelector(".nights")
  //     .querySelector("span").textContent = `${booking.nights} Noche`;
  // }

  if (roomsBooking) {
    printBookingRooms();
  }
}



function inputAlert(key) {
  let input = [...document.getElementsByName(key)];

  input[0].classList.add("inputAlert");
}

function removeInputAlert(input) {
  input.classList.remove("inputAlert");
  input.classList.remove("inputAlert::placeholder");
}

function clientData() {
  const form = document.querySelector("form");

  const formData = new FormData(form);

  const client = {};
  let validate = null;
  let validRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

  formData.forEach((v, k) => {
    if (v.trim() == "") {
      inputAlert(k);
      return (validate = "Completa todos los campos");
    } else if (k == "phone" && v.length < 8) {
      inputAlert(k);
      return (validate = "Ingresa un telefono valido");
    } else if (k == "mail" && !v.match(validRegex)) {
      inputAlert(k);
      return (validate = "Ingresa un correo valido");
    } else {
      client[k] = v;
    }
  });

  if (validate) {
    alertClientFormBooking(validate);
  } else {
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

async function getIfExistingBooking(clientBooking) {
  const dataBooking = {
    client: clientBooking.client,
    date: clientBooking.booking.date,
  };

  try {
    loading(true);
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/datosReserva.php?dataBooking=" +
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
      const confirm = await confirmAlertBookingExist(
        "Ya tiene una reserva en esta fecha, por lo tanto las habitaciones seleccionadas se agregaran a esa reserva"
      );

      if (confirm) {
        document.querySelector(".modalBooking").style.display = "none";

        updateBookingExists(clientBooking, result.respuesta);
      } else {
        document.querySelector(".modalBooking").style.display = "none";
        return;
      }
    } else {
      alert("Good");
    }
  } catch (error) {
    alertClientFormBooking(error);
  } finally {
    loading(false);
  }
}


function loading(loadingState) {
  if (loadingState) {
    loadingSpinner.style.display = "block";
  } else {
    loadingSpinner.style.display = "none";
  }
}

function replaceCharacter(event) {
  let valid = /\d/;

  let input = event.target;

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

