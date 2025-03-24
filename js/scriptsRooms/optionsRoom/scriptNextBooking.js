import { invalidAuthentication } from "../../scriptsAdmin/userData.js";
import { BACK_URL_LOCALHOST ,FRONT_URL_LOCALHOST} from "../../urlLocalhost.js";
import { close } from "./scriptRecordRoom.js";

let numRoom, bodyContainNextBookings;
export const configNextBookings = async () => {
  let containNextBookings = document.querySelector(".containNextBookings");
  bodyContainNextBookings = document.querySelector(".bodyContainNextBookings");
  numRoom = containNextBookings.id;

  close();
  if (numRoom) {
    let nextBookingsRoom = await getNextBookingsRoom();
    if (nextBookingsRoom) {
      displayBookings(nextBookingsRoom);
    }
  }
};

const getNextBookingsRoom = async () => {
  let data;
  loading(true);
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params=${JSON.stringify(
        { option: "getNextBookingsRoom", numRoom: numRoom }
      )}`
    );
    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (result.length > 0) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData();
    }
    return data;
  }
};

const displayBookings = (nextBookingsRoom) => {
  bodyContainNextBookings.innerHTML = `
     
       <table class="tableNextBookings">
       <thead>
       <tr>
       <th>Id Reserva</th>
        <th>Llegada</th>
        <th>Salida</th>
        <th>Opcion</th>
       </tr>
       </thead>
      <tbody></tbody>       
       </table>
    `;

  drawTable(nextBookingsRoom);
};

const drawTable = (nextBookingsRoom) => {
  let tableNextBookings = document.querySelector(".tableNextBookings");
  let rows = nextBookingsRoom.map((bookingNext, index) => {
    return `
    <tr class=${index % 2 == 0 ? "trGray" : "trWhite"}>
    <td>${bookingNext.idReserva}</td>
     <td>${bookingNext.fechaLlegada}</td>
      <td>${bookingNext.fechaSalida}</td>
       <td>
       <div class="containViewCalendar">
       <button data-booking=${JSON.stringify(
         bookingNext
       )} class="viewCalendar">Ver calendario
        <img src="../../../img/reservaId.png">
       </button>
       </div>
       </td>
    </tr>
 `;
  });

  tableNextBookings.querySelector("tbody").innerHTML = rows.join("");

  redirectToCalendarBooking();
};
const loading = (state) => {
  if (state) {
    bodyContainNextBookings.innerHTML = `
    <div class="loading">
    <span>Cargando datos</span>
    <img src="../../../img/spinnerMain.gif">
    </div>
 `;
  } else {
    bodyContainNextBookings.innerHTML = ``;
  }
};
const noData = () => {
  bodyContainNextBookings.innerHTML = `
       <div class="noData">
       <img src="../../../img/sinDatos.png">
       <span>Ups, no se encontraron reservas cercanas</span>
       </div>
    `;
};

const redirectToCalendarBooking = () => {
  let btnsViewCalendar = document.querySelectorAll(".viewCalendar");
  btnsViewCalendar.forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.setItem("actualOptionBooking", "addBooking.html");
      let booking = JSON.parse(btn.dataset.booking);
      let bookingToCalendar = {
        startBooking: booking.fechaLlegada,
        endBooking: booking.fechaSalida,
        idBooking: booking.idReserva
      };
      window.open(
        `${FRONT_URL_LOCALHOST}views/admin/reservas/index.php?booking=${JSON.stringify(
          bookingToCalendar
        )}`
      );
    });
  });
};
