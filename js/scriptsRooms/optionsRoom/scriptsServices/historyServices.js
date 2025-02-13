import { getHistoryServicesByCurrentBookingRoom } from "../../../scriptsServices/scriptServices.js";

let containHistory;

export const configHistory = async (numRoom, idBooking) => {
  let titleHistory = document.querySelector(".titleHistory");
  titleHistory.innerHTML = `Historial servicios habitacion ${numRoom}`;
  containHistory = document.querySelector(".containHistory");
  let services = await historyServicesByCurrentBookingRoom(idBooking, numRoom);

  if (services) {
    drawServices(services);
  }
};

const historyServicesByCurrentBookingRoom = async (idBooking, numRoom) => {
  let servicesRoom;

  loading(true);
  try {
    const result = await getHistoryServicesByCurrentBookingRoom(
      numRoom,
      idBooking
    );
    if (result) {
      servicesRoom = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!servicesRoom) {
      noData("Ups, esta habitacion no tiene servicios aun");
    }
    return servicesRoom;
  }
};

const noData = (msj) => {
  containHistory.innerHTML = `
           <div class="noData">
           <img src="../../../img/sinDatos.png">
           <span>${msj}</span>
           </div>
        `;
};

const loading = (state) => {
  if (state) {
    containHistory.innerHTML = `
             <div class="loading">
           <span>Cargando datos</span>
             <img src="../../../img/spinnerMain.gif">
             </div>
          `;
  } else {
    containHistory.innerHTML = ``;
  }
};

const drawServices = (services) => {
  containHistory.innerHTML = `<ul></ul>`;
  let iconItem = "../../../img/minibar.png";

  let itemServices = services.map((service) => {
    
    if (service.nombreServicio == "Cantina") {
      iconItem = "../../../img/bar-counter.png";
    }

    return `
      <li>
        <div class="headerItem">
        <img src=${
          service.nombreServicio == "Telefono" ||
          service.nombreServicio == "Masajes"
            ? `data:image/png;base64,${service.imagen}`
            : iconItem
        }>
        <span>Servicio ${service.nombreServicio}</span>
         </div>
        <div class="footerItem">
         <span>Detalles</span>
        </div>

      </li>
    `;
  });

  let listServices = containHistory.querySelector("ul");

  listServices.innerHTML = itemServices.join("");
};
