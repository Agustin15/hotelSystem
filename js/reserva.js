let booking = JSON.parse(localStorage.getItem("booking"));
let loadingSpinner = document.querySelector(".loading");
let rooms;
let indiceRoom=0;
let btnNext=document.querySelector(".btnNext");
let roomsBooking = document.querySelector(".bookingRooms");
let confirmationMsj = document.getElementById("confirmationBooking");
let containClientAndBooking = document.querySelector(
  ".containClientAndBooking"
);

if (booking) {
  rooms = booking.rooms;
}

if (confirmationMsj) {
  confirmationBooking();
}

function loading(loadingState) {
  if (loadingState) {
    loadingSpinner.style.display = "block";
  } else {
    loadingSpinner.style.display = "none";
  }
}

function confirmationBooking() {
  document.addEventListener("DOMContentLoaded", function () {
    let confirmationMsj = document.getElementById("confirmationBooking");
    setTimeout(function () {
      if (confirmationMsj) {
        let icon = document.querySelector(".icon");
        let gif = document.querySelector(".gif");
        icon.classList.add("iconMotion");
        gif.classList.add("gifWidth");
      }
    }, 1000);

    setTimeout(function () {
      confirmationMsj.querySelector(".body").style.display = "block";
    }, 2000);
  });
}

async function submitBooking(clientBooking) {
  try {
    loading(true);
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/datosReserva.php",
      {
        method: "POST",
        body: JSON.stringify(clientBooking),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (result.respuesta == true) {
      localStorage.clear();
      location.href =
        "../views/confirmacionReserva.php?option=bookingRealized&mailClient=" +
        clientBooking.client.mail;
    } else {
      throw result.respuesta;
    }
  } catch (error) {
    alertErrorBooking(error);
  } finally {
    loading(false);
  }
}

async function updateBookingExists(clientBooking, bookingPast) {
  const updateBooking = {
    idBooking: JSON.stringify(bookingPast.idReserva),
    client: clientBooking.client,
    quantityRoomsBookingPast: bookingPast.cantidadHabitaciones,
    booking: clientBooking.booking,
  };

  try {
    loading(true);
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/datosReserva.php",

      {
        method: "PUT",
        body: JSON.stringify(updateBooking),
        headers: {
          "Content-Type": "applica{tion/json",
        },
      }
    );

    const result = await response.json();

    if (result.respuesta) {
      localStorage.clear();
      location.href =
        "../views/confirmacionReserva.php?option=bookingUpdated&mailClient=" +
        clientBooking.client.mail;
    } else {
      throw result.respuesta;
    }
  } catch (error) {
    alertErrorBooking(error);
  } finally {
    loading(false);
  }
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
      submitBooking(clientBooking);
    }
  } catch (error) {
    alertClientFormBooking(error);
  } finally {
    loading(false);
  }
}

function createBooking(client) {
  const clientBooking = {
    client: client,
    booking: booking,
  };

  getIfExistingBooking(clientBooking);
}

function inputAlert(key) {
  let input = [...document.getElementsByName(key)];

  input[0].classList.add("inputAlert");
}

function removeInputAlert(event) {
  event.target.classList.remove("inputAlert");
  event.target.classList.remove("inputAlert::placeholder");
}

function clientData(event) {
  event.preventDefault();

  const form = event.target;

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

function printBookingRooms() {
  let roomsToPrint = rooms.map((room) => {
    let textAdult;
    let textChildren="";
    if (room.guests.adult > 1) {
      textAdult = `${room.guests.adult} adultos`;
     
    }else{
        textAdult = `${room.guests.adult} adulto`;
      }
    
    if (room.guests.children > 0) {
      textChildren = `${room.guests.children} niños`;
      if (room.guests.adult == 1) {
        textChildren = `${room.guests.children} niño`;
      }
    }
    return `
    
    
                            <div class="header">

                                <img src="data:image/png;base64,${room.image}">
                                <div class="data">
                                <span>Habitacion ${room.category}</span>

                                <div class="details">
                                <ul>
                                    <li>${textAdult}</li>
                                    <li>${textChildren}</li>
                                    <li>Precio:$${room.price}</li>
                                    <li>Cantidad:${room.quantity}</li>
                                    <li class="total">Total:$${room.total}</li>
                         
                                </div>
                            
                                </div>

                            </div>
    `;
  });

  roomsBooking.querySelector("li").innerHTML=roomsToPrint[indiceRoom];

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

document.addEventListener("DOMContentLoaded", function () {
  if (containClientAndBooking) {
    if (localStorage.getItem("booking") == null) {
      location.href = "consultaHabitaciones.php";

    }else{

      printBooking();


     
      btnNext.addEventListener("click",function(){

        indiceRoom++;
        printBooking();
      });
    }
  }
});
