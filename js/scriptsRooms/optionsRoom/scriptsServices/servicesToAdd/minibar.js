import { getServiceByName } from "../../../../scriptsServices/scriptServices.js";
import { closeWindow } from "./massages.js";
import { displayContentShop } from "./minibarScripts/displayProducts.js";
let modalAddService, productsMinibar;
export let contentMinibar, idBooking, numRoom;

export const configMinibarService = async (
  nameService,
  idBookingService,
  numRoomService
) => {
  idBooking = idBookingService;
  numRoom = numRoomService;

  modalAddService = document.querySelector(".modalAddService");
  contentMinibar = document.querySelector(".contentMinibar");
  closeWindow(modalAddService, ".btnCloseMinibar");

  productsMinibar = await serviceByName(nameService, contentMinibar);

  if (productsMinibar) {
    displayContentShop(productsMinibar, "minibar");
  }
};

export const serviceByName = async (nameService, contentMinibar) => {
  let data;
  loading(true, contentMinibar);
  try {
    const result = await getServiceByName(nameService);
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, contentMinibar);
    if (!data) {
      noData("Ups,no se pudo cargar el servicio", contentMinibar);
    }
    return data;
  }
};

const noData = (msj, contentMinibar) => {
  contentMinibar.innerHTML = `
             <div class="noData">
             <img src="../../../img/sinDatos.png">
             <span>${msj}</span>
             </div>
          `;
};

const loading = (state, contentMinibar) => {
  if (state) {
    contentMinibar.innerHTML = `
               <div class="loading">
             <span>Cargando datos</span>
               <img src="../../../img/spinnerMain.gif">
               </div>
            `;
  } else {
    contentMinibar.innerHTML = ``;
  }
};
