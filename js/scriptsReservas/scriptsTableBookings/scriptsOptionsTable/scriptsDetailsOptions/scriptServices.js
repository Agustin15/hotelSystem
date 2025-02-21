import { closeWindow } from "./scriptClient.js";
import { getDataServices } from "../../../../scriptsServices/scriptServices.js";
import { displayServicesDetailsRoom } from "./displayServicesRoom/displayServicesRoom.js";

let servicesBooking, body;

export const configServices = async () => {
  let containServicesDetails = document.querySelector(
    ".containServicesDetails"
  );

  closeWindow();

  let idBooking = containServicesDetails.id;
  body = containServicesDetails.querySelector(".body");
  servicesBooking = await getServices(idBooking);
  if (servicesBooking) {
    displayServicesRoom();
  }
};

const displayServicesRoom = () => {
  body.innerHTML = `
  <div class="modalServicesRoom"></div>
  <ul class="roomServices"></ul>`;

  let numRooms = servicesBooking.map(
    (service) => service.numHabitacionServicio
  );
  let numRoomsNoDuplicate = [];

  numRooms.reduce((ac, current) => {
    if (current != ac) {
      ac = current;
      numRoomsNoDuplicate.push(current);
    }
  }, 0);

  let items = numRoomsNoDuplicate.map((numberRoom) => {
    return `
  
    <li id=${numberRoom}>
      <div class="headerItem">
      <div class="row">
      <img src="../../../img/roomInfoIcon.png">
      <p>Acceda a los servicios de la habitacion ${numberRoom}</p>
     </div>
      </div> 
      <div class="footerItem">
      <img class="displayServices" src="../../../img/ver.png">
           <span>Ver servicios</span>
      </div>  
    </li>
   
     `;
  });

  body.querySelector("ul").innerHTML = items;

  document.querySelectorAll(".displayServices").forEach((display) => {
    display.addEventListener("click", () => {
      let roomNumber = display.parentElement.parentElement.id;
      let servicesRoom = servicesBooking.filter(
        (service) => service.numHabitacionServicio == roomNumber
      );

      displayServicesDetailsRoom(roomNumber, servicesRoom);
    });
  });
};

export const getServices = async (idBooking) => {
  let data = null;

  loading(true);
  try {
    const result = await getDataServices(idBooking);
    if (result.length > 0) {
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

const noData = () => {
  body.innerHTML = `
      <div class="noData">
           <img src="../../../img/sinDatos.png">
           <span>Ups,esta reserva no tiene servicios</span>
          
      </div>
       `;
};

const loading = (state) => {
  if (state) {
    body.innerHTML = `
      <div class="loading">
           <span>Cargando datos</span>
            <img src="../../../img/spinnerMain.gif">
          
      </div>
       `;
  } else {
    body.innerHTML = ``;
  }
};
