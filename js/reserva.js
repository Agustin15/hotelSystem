let booking = JSON.parse(localStorage.getItem("booking"));
let roomsBooking = document.querySelector(".bookingRooms");
let rooms = booking.rooms;

function printBookingRooms() {
 let roomsToPrint= rooms.map((room) => {
    return `<li>

        <div class="headerLi">
            <div class="icon">

                <img src="${room.image}">
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

  roomsBooking.innerHTML=roomsToPrint.join("");
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
  document
    .querySelector(".nights")
    .querySelector("span").textContent = `${booking.nights} noches`;

  if (roomsBooking) {
    printBookingRooms();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  printBooking();
});
