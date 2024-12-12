import { closeWindow, loading, noData } from "./scriptClient.js";
import { getDataServices } from "../../../../scriptsServices/scriptServices.js";
import { services } from "../../../../scriptsClientes/scriptOptionsTable/scriptsDetailsClient/scriptServices.js";

let body,servicesBooking,idBooking;

export const configServices = async () => {
  body = document.querySelector(".body");
  idBooking = document.querySelector(".containServicesDetails").id;

  closeWindow();

  roomsBooking = await dataServicesRoomsBooking(idBooking);

  if (roomsBooking) {
    body.innerHTML = ` 

    <ul class="rooms">
    
    ${services(servicesBooking)}
    </ul>
    
    `;
  }
};

const dataServicesRoomsBooking= async () => {
  let data = null;
   loading(true,body);
  try {
    const roomsServicesBooking= await getDataServices(idBooking);
    if (roomsServicesBooking) {
      data = roomsServicesBooking;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false,body);
    if (!data) {
      noData("Ups, no se pudieron cargar los servicios ordenados a las habitaciones", body);
    }
    return data;
  }
};
