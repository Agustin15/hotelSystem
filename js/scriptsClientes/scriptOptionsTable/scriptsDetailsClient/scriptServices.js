import { closeWindow } from "./scriptGuests.js";
import { loading } from "../../scriptAddClient.js";

let servicesBooking;

export const configServicesDetails = async () => {
  let containServicesDetails = document.querySelector(
    ".containServicesDetails"
  );
  let idBooking = containServicesDetails.id;
  let body = containServicesDetails.querySelector(".body");
  servicesBooking = await getDataServices(idBooking);

  closeWindow();

  if (servicesBooking) {

    body.innerHTML += ` 

      <ul class="services">
      
      ${services()}
      </ul>
      
      `;
  } else {
    noData(body);
  }
};

export const getDataServices = async (idBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/services/servicesController.php?option=getServicesBooking&&idBooking=" +
    idBooking;

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

const services = () => {
  
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

const noData = (body) => {
  body.innerHTML = `
      <div class="noData">
           <img src="../../../img/sinDatos.png">
           <span>Ups,esta reserva no tiene servicios aun</span>
          
      </div>
       `;
};
