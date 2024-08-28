let booking = JSON.parse(localStorage.getItem("booking"));
let rooms;
let roomsBooking = document.querySelector(".bookingRooms");
let confirmationMsj = document.getElementById("confirmationBooking");
let containClientAndBooking = document.querySelector(
  ".containClientAndBooking"
);



if(booking){

   rooms = booking.rooms;
}


if (confirmationMsj) {
  confirmationBooking();
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

    console.log(result);

    if (result.respuesta==true) {
      localStorage.clear();
      location.href =
        "../views/confirmacionReserva.php?option=bookingRealized&mailClient=" +
        clientBooking.client.mail;
    }else{

      alertClientForm(result.respuesta);
    }

  } catch (error) {
    console.log(error);
  }
}

async function updateBookingExists(clientBooking, bookingPast) {
  const updateBooking = {
    idBooking: JSON.stringify(bookingPast.idReserva),
    client: clientBooking.client,
    quantityRoomsBookingPast: bookingPast.cantidadHabitaciones,
    booking: clientBooking.booking,
  };

  console.log(updateBooking);
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
  }
}

async function getIfExistingBooking(clientBooking) {
  const dataBooking = {
    client: clientBooking.client,
    date: clientBooking.booking.date,
  };

  try {
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
      alertClientForm(result.advertencia);
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
    console.log(error);
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
    alertClientForm(validate);
  } else {
    createBooking(client);
  }
}

function printBookingRooms() {
  let roomsToPrint = rooms.map((room) => {
    return `<li>

        <div class="headerLi">
            <div class="icon">

                <img src="data:image/png;base64,${room.image}">
            </div>

            <div class="category">
                <span>${room.category}</span>
            </div>

            <div class="iconTwo">

            <img src="../img/roomIconBooking.png">
            </div>

        </div>

        <div class="bodyLi">
            <div>

                <span>Adultos:${room.guests.adult}</span>
            </div>

            <div>
                <span>Niños:${room.guests.children}</span>
            </div>

        </div>

        <div class="footerLi">
            <div>
                <span>Cantidad:${room.quantity}</span>
            </div>
            <div>
                <span>Total:$${room.total}</span>
            </div>
        </div>
    </li>
    `;
  });

  roomsBooking.innerHTML = roomsToPrint.join("");

  document
    .querySelector(".containTotalBooking")
    .querySelector("span").textContent = `Total:$${booking.totalDeposit}`;
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
    document
      .querySelector(".nights")
      .querySelector("span").textContent = `${booking.nights} Noches`;
  } else {
    document
      .querySelector(".nights")
      .querySelector("span").textContent = `${booking.nights} Noche`;
  }

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
  }
}

});
