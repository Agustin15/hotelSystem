import { closeWindow, loading, noData } from "./scriptClient.js";
import { getDataServices } from "../../../../scriptsServices/scriptServices.js";

let body, servicesBooking, idBooking;

export const configServices = async () => {
  body = document.querySelector(".body");
  idBooking = document.querySelector(".containServicesDetails").id;

  closeWindow();

  let roomsBooking = await dataServicesRoomsBooking();

  if (roomsBooking) {
    body.innerHTML = ` 

    <ul class="rooms">
    
    ${services(servicesBooking)}
    </ul>
    
    `;
  }
};

const dataServicesRoomsBooking = async () => {
  let data = null;
  loading(true, body);
  try {
    const roomsServicesBooking = await getDataServices(idBooking);
    if (roomsServicesBooking) {
      data = roomsServicesBooking;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, body);
    if (!data) {
      noData(
        "Ups, no se pudieron cargar los servicios ordenados a las habitaciones",
        body
      );
    }
    return data;
  }
};


export const services = (servicesBooking) => {
  let liServicesBooking = servicesBooking.map((service) => {
    let nameService;
    let title;
    if (service.name == "Telefono" || service.name == "Masajes") {
      nameService = service.name;
      if (service.name == "Telefono") {
        title = "Llamadas";
      } else {
        title = "Masajistas";
      }
    } else {
      nameService = service.description;
      title = service.name;
    }
    return `
         <li>
         <div class="title">
           <span>Servicio ${title}</span>
         </div>
         <div class="details">
<div class="icon">
           <img src="data:image/png;base64,${service.icon}">
         </div>             
         
         <div class="info">
            <span>${nameService}</span>
             <span>Servicio a la habitacion ${service.room}</span>
         </div>
         <div>
         </li>`;
  });

  return liServicesBooking.join("");
};