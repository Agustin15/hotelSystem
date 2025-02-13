import { numRoom, idBooking } from "../historyServices.js";
import { getServiceByIdAndNumRoomAndBooking } from "../../../../scriptsServices/scriptServices.js";

let serviceId, contentDetails;

export const detailsService = (idService, nameService) => {
  serviceId = idService;
  drawWindow(nameService);
};

const drawWindow = async (nameService) => {
  let modal = document.querySelector(".modalMainHistory");
  modal.style.display = "flex";

  modal.innerHTML = `
   
    <div class="containDetails">
      <div class="headerWindow">
      <h3>Detalles ${nameService} </h3>
      <button>X</button>
      </div>

      <div class="contentDetails"></div>

    </div>
   `;

  contentDetails = document.querySelector(".contentDetails");
  let servicesDetails = await serviceRoomDetails();

};

const serviceRoomDetails = async () => {
  const serviceToFind = {
    idService: serviceId,
    idBooking: idBooking,
    numRoom: numRoom
  };

  let servicesDetails;
  loading(true);
  try {
    let result = await getServiceByIdAndNumRoomAndBooking(serviceToFind);
    if (result) {
      servicesDetails = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!servicesDetails) {
      noData("Ups,no se pudo encontrar el servicio");
    }
    return servicesDetails;
  }
};

const noData = (msj) => {
  contentDetails.innerHTML = `
             <div class="noData">
             <img src="../../../img/sinDatos.png">
             <span>${msj}</span>
             </div>
          `;
};

const loading = (state) => {
  if (state) {
    contentDetails.innerHTML = `
               <div class="loading">
             <span>Cargando datos</span>
               <img src="../../../img/spinnerMain.gif">
               </div>
            `;
  } else {
    contentDetails.innerHTML = ``;
  }
};
