import displayBarStagesAdvance from "./barStageAdvance.js";
import BACK_URL_LOCALHOST from "../urlLocalhost.js";
import { generatePDF } from "./optionsDetails/generatePdf.js";

export let stateBooking, idBooking;

document.addEventListener("DOMContentLoaded", async () => {
  displayBarStagesAdvance("#linePersonalData");
  let btnDownloadPdf = document.querySelector(".btnDownloadPdf");

  let params = new URLSearchParams(window.location.search);

  let dataToFindBooking = params.get("details");

  if (!dataToFindBooking) {
    location.href =
      "http://localhost/sistema%20Hotel/views/reserva/consultaHabitaciones.php";
  }

  dataToFindBooking = JSON.parse(dataToFindBooking);

  dataToFindBooking.option == "added"
    ? (stateBooking = "Confirmacion")
    : (stateBooking = "Actualizacion");

  let detailsBooking = await getBookingByClientMailAndDate(dataToFindBooking);

  if (detailsBooking) {
    let barStageAdvance = document.querySelector(".barStageAdvance");
    let containDetails = document.querySelector(".containDetails");

    barStageAdvance.style.display = "flex";
    containDetails.style.display = "flex";

    if (!detailsBooking.length) {
      detailsBooking = [detailsBooking];
    }

    displayDetails(detailsBooking);

    generatePDF(
      "sendEmail",
      detailsBooking[0].correo,
      detailsBooking[0].nombre
    );

    btnDownloadPdf.style.display = "flex";
    btnDownloadPdf.addEventListener("click", () => {
      generatePDF("download");
    });
  }
});

export const getBookingByClientMailAndDate = async (dataToFindBooking) => {
  let data = null;
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/bookingRoutes.php?params=` +
    JSON.stringify({
      option: "bookingDetailsByClientMailAndDate",
      dataToFindBooking: dataToFindBooking
    });

  loading(true);
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);

    if (!data) {
      noData(true);
    }
    return data;
  }
};

const loading = (state) => {
  let loader = document.querySelector(".loading");
  if (state) {
    loader.style.display = "flex";
  } else {
    loader.style.display = "none";
  }
};

const noData = () => {
  let noData = document.querySelector(".noData");
  noData.style.display = "flex";
};
const displayDetails = (detailsBooking) => {
  idBooking = detailsBooking[0].idReserva;
  
  const client = {
    name: detailsBooking[0].nombre,
    lastname: detailsBooking[0].apellido,
    email: detailsBooking[0].correo,
    phone: detailsBooking[0].telefono
  };
  let details = document.querySelector(".details");

  let startBooking = new Date(detailsBooking[0].fechaLlegada);
  let endBooking = new Date(detailsBooking[0].fechaSalida);

  let nights =
    (endBooking.getTime() - startBooking.getTime()) / (1000 * 60 * 60 * 24);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  startBooking.setMinutes(
    startBooking.getMinutes() + startBooking.getTimezoneOffset()
  );
  endBooking.setMinutes(
    endBooking.getMinutes() + endBooking.getTimezoneOffset()
  );

  startBooking = startBooking.toLocaleDateString("es-UY", options);
  endBooking = endBooking.toLocaleDateString("es-UY", options);

  details.innerHTML = `
  
    <div class="header">

                <div class="containIdBooking">
                    <span>${stateBooking} reserva</span>
                    <div class="id">
                        <img src="../../img/id.png">
                        <span>Numero:<a>${
                          detailsBooking[0].idReserva
                        }</a></span>
                        </div>
                </div>
                <div class="logo">
                    <img src="../../img/revision2.png">
                    <h3>System Hotel</h3>

                </div>

            </div>

            <div class="msjSuccesfully">
                <img src="../../img/tickAdmin.png">
                <span>¡${stateBooking} de reserva exitosa!</span>
            </div>

            <div class="containDate">

            <div class="date">
            <img src="../../img/dateConfirm.png">
               <span><a>Check in: </a>${startBooking}</span>
                 <span><a>Check out: </a>${endBooking}</span>
                 </div>
                    
                 <span>${nights}${nights > 1 ? " noches" : " noche"}</span>
            </div>

            <div class="rowData">

            <div class="client">
            
            <h3>Cliente</h3>
            <div class="dataClient">
            <span>Nombre:<a>${client.name}</a></span>
            <span>Apellido:<a>${client.lastname}</a></span>
            <span>Telefono:<a>${client.phone}</a></span>
            <span>Correo:<a>${client.email}</a></span>
            </div>
            </div>
        
            </div>

            <div class="containAmount">
            <div class="column">
              <h3>Total</h3>
            <span>US$ ${detailsBooking[0].deposito}</span>
            </div>
            </div>
        </div>
  `;

  let rooms = detailsBooking.map((detail) => {
    return {
      categoria: detail.categoria,
      adultos: detail.adultos,
      ninos: detail.ninos,
      imagenDos: detail.imagenDos,
      precio: detail.precio
    };
  });

  displayRooms(rooms, nights);
};

const displayRooms = (rooms, nights) => {
  let roomsToDisplay = [];

  rooms.map((room) => {
    let roomInToDisplay = roomsToDisplay.find((roomFind) => {
      if (
        roomFind.category == room.categoria &&
        roomFind.adults == room.adultos &&
        roomFind.childs == room.ninos
      ) {
        return roomFind;
      }
    });

    if (!roomInToDisplay) {
      let quantityRoomsEqualConditions = rooms.reduce((ac, roomEqual) => {
        room.categoria == roomEqual.categoria &&
        room.adultos == roomEqual.adultos &&
        room.ninos == roomEqual.ninos
          ? ac++
          : ac;
        return ac;
      }, 0);

      roomsToDisplay.push({
        category: room.categoria,
        image: room.imagenDos,
        adults: room.adultos,
        childs: room.ninos,
        quantity: quantityRoomsEqualConditions,
        total: room.precio * quantityRoomsEqualConditions * nights
      });
    }
  });

  drawRooms(roomsToDisplay);
};

const drawRooms = (roomsToDisplay) => {
  let rowData = document.querySelector(".rowData");
  let roomsItem = roomsToDisplay.map((room) => {
    return `
      <li>
        <div class="title">
          <span>Habitacion ${room.category}</span>
        </div>
        
            <div class="row">
         <img src="data:image/png;base64,${room.image}">
         <div class="column">
          <span>Cantidad: ${room.quantity}</span>
          <span>${room.adults} ${room.adults > 1 ? "Adultos" : "Adulto"} </span>
          ${
            room.childs > 0
              ? `<span>${room.childs}${
                  room.childs > 1 ? " Niños" : " Niño"
                }</span>`
              : ""
          }  
         <span>US$ ${room.total}</span>
         </div>
        </div>

      </li>
    `;
  });

  rowData.innerHTML += roomsItem.join("");
};
