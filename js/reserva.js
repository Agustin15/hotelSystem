let booking = JSON.parse(localStorage.getItem("booking"));
let roomsBooking = document.querySelector(".bookingRooms");
let rooms = booking.rooms;

function submitBooking(clientBooking) {
  
  fetch("../controller/datosReserva.php", {
    body: JSON.stringify(clientBooking),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((answer) => {});
}

function createBooking(client) {
  const clientBooking = {
    client: client,
    booking: booking,
  };

  submitBooking(clientBooking);
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
    } else if (k == "mail") {
      if (!v.match(validRegex)) {
        inputAlert(k);
        return (validate = "Ingresa un correo valido");
      }
    } else {
      client[k] = v;
      createBooking(client);
    }
  });

  if (validate) {
    alertClientForm(validate);
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
  printBooking();
});
