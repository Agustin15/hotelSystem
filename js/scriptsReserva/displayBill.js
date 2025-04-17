import { BACK_URL_LOCALHOST, FRONT_URL_LOCALHOST } from "../urlLocalhost.js";

export let stateBooking, idBooking, dataToFindBooking;
export let detailsBooking,
  startBooking,
  endBooking,
  roomsToDisplay = [];

export const displayBill = async (option) => {
  let params = new URLSearchParams(window.location.search);

  if (!params.get("details")) {
    location.href = `${FRONT_URL_LOCALHOST}views/reserva/consultaHabitaciones.php`;
  }

  dataToFindBooking = params.get("details");
  dataToFindBooking = JSON.parse(dataToFindBooking);

  let dataToFindBookingOk =
    Object.values(dataToFindBooking).length ==
    Object.keys(dataToFindBooking).length;

  if (!dataToFindBooking || !dataToFindBookingOk) {
    location.href = `${FRONT_URL_LOCALHOST}views/reserva/consultaHabitaciones.php`;
  }

  dataToFindBooking.option == "added"
    ? (stateBooking = "Confirmacion")
    : (stateBooking = "Actualizacion");

  detailsBooking = await getBookingByClientMailAndDate(dataToFindBooking);

  if (detailsBooking) {
    let containDetails = document.querySelector(".containDetails");

    if (option == "normal") {
      let barStageAdvance = document.querySelector(".barStageAdvance");
      barStageAdvance.style.display = "flex";
    }

    containDetails.style.display = "flex";

    if (!detailsBooking.length) {
      detailsBooking = [detailsBooking];
    }

    displayDetails(detailsBooking);
  }
};

export const getBookingByClientMailAndDate = async (dataToFindBooking) => {
  let data = null;
  let url =
    `${BACK_URL_LOCALHOST}routes/bookingClient/bookingRoutes.php?params=` +
    JSON.stringify({
      option: "bookingDetailsByClientMailAndDate",
      dataToFindBooking: dataToFindBooking
    });

  loading(true);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      }
    });
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

  startBooking = new Date(detailsBooking[0].fechaLlegada);
  endBooking = new Date(detailsBooking[0].fechaSalida);

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
  <div class="row">
  
  <div class="column">
  <div class="icon">
   <img src="../../img/revision.png">
   <span>Hotel system</span>
  </div>
  <ul>
   <li>
   <span>Numero de reserva</span>
   <a>${idBooking}</a>
   </li>
     <li>
   <span>Check in</span>
   <a>${startBooking}</a>
   </li>
     <li>
   <span>Check out</span>
   <a>${endBooking}</a>
   </li>
    <li>
   <span>Noches</span>
   <a>${nights}</a>
   </li>
  </ul>
  </div>

  <div class="columnTwo">
  <div class="msjSuccesfully">
  <h3>¡Confirmacion de reserva exitosa!</h3>
  </div>
    <div class="client">
    <h3>Cliente:</h3>
    <div>
      <span>Nombre: <a>${client.name}</a></span>
      </div>
      <div>
         <span>Apellido: <a>${client.lastname}</a></span>
         </div>   
           <div>
      <span>Telefono: <a>${client.phone}</a></span>
      </div>
      <div>
         <span>Correo: <a>${client.email}</a></span>
         </div>

    </div>

    <div class="rowData">
    </div>

    <div class="containAmount">
    <span>Total:$${detailsBooking[0].deposito}</span>
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
  roomsToDisplay = [];

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
         <div class="columnRoomData">
  
         <span>${room.quantity} ${
      room.quantity > 1 ? "Habitaciones" : "Habitacion"
    }  </span>
          <span>${room.adults} ${room.adults > 1 ? "Adultos" : "Adulto"} </span>
          ${
            room.childs > 0
              ? `<span>${room.childs}${
                  room.childs > 1 ? " Niños" : " Niño"
                }</span>`
              : ""
          }  
           
        <span>${
          window.innerWidth <= 600 ? room.total + " US$" : " US$" + room.total
        }</span>
       
         </div>
        </div>

      </li>
    `;
  });

  rowData.innerHTML += roomsItem.join("");
};
