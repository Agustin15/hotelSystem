import { getDataClient } from "./scriptDeleteClient.js";
import { loading } from "../scriptAddClient.js";

export const configDetailsClient = async () => {
  let containDetails = document.querySelector(".containDetailsClientBooking");
  let id = containDetails.id;
  let title = document.querySelector(".name");

  let dataClient = await getDataClient(id);

  if (dataClient) {
    title.textContent += ` ${dataClient.nombre} ${dataClient.apellido} `;

    let result = await getRowsBookingClients(id);
    if (result) {
      displayBookingsClient(id);
    } else {
      noBookingsClient("Ups, este cliente no tiene reservas aun");
    }
  }
};

const getRowsBookingClients = async (id) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/client/clientController.php?option=rowsClient&&client=" +
    id;
  let data = null;

  loading(true);

  try {
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    return data;
  }
};

const noBookingsClient = (msj) => {
  let noBookings = document.querySelector(".noBookings");

  noBookings.style.display = "flex";
  noBookings.querySelector("h4").textContent = msj;
};

const getClientBookingLimit = async (id) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/client/clientController.php?option=bookingsClient&&client=" +
    id;
  let data = null;

  loading(true);
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    return data;
  }
};

const displayBookingsClient = async (id) => {
  let containBookings = document.querySelector(".bookings");

  let booking = await getClientBookingLimit(id);
  if (booking) {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let startBooking = new Date(booking.fechaLlegada);
    let endBooking = new Date(booking.fechaSalida);

    startBooking = startBooking.toLocaleDateString("es", options);
    endBooking = endBooking.toLocaleDateString("es", options);

    let items = generateItemsInfo();

    containBookings.innerHTML = `
  
                  <div class="date">
                      <div class="start">
                                <img src="../../../img/entrada.png">
                          <h4>Fecha de llegada</h4>
                          <span>${startBooking}</span>
                      </div>
                      <div class="end">
                      <img src="../../../img/salida.png">
                          <h4>Fecha de salida</h4>
                          <span>${endBooking}</span>
                      </div>
                  </div>
  
                  <div class="items">
                  ${items}
  
                  </div>
                 
          
    `;
  } else {
    noBookingsClient("Ups, no se pudo cargar la reserva");
  }
};

const generateItemsInfo = () => {
  let itemsInfo = [
    {
      icon: "../../../img/guestInfo.png",
      title: "Huespedes",
      class: "guests",
      description:
        "Puede ver la cantidad de huespedes de la reserva,y la cantidad que estan hospedados por cada habitacion reservada",
    },

    {
      icon: "../../../img/roomInfoIcon.png",
      title: "Habitaciones",
      class: "rooms",
      description:
        "Detalles de las habitaciones reservadas por el cliente , como numero de habitacion y categoria",
    },

    {
        icon: "../../../img/minibarInfo.png",
        title: "Servicios",
        class: "services",
        description:
          "Detalles sobre los productos consumidos en la habitaciones como el minibar y la cantina del hotel durante la estadia"
      },
  ];

  let items = itemsInfo.map((item) => {
    return `

    <div class=${item}>
  
        <div class="headerItem">
  
            <img src="${item.icon}">
            <p>${item.description}</p>
        </div>
        <div class="footer">
  
        <span>${item.title}</span>
            <img src="../../../img/ver.png">
        </div>
  
    </div>`;
  });

  return items;
};
