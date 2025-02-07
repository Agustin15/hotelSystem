import { getServiceByName } from "../../../../scriptsServices/scriptServices.js";
import { closeWindow } from "./massages.js";
import { displayProducts } from "./minibarScripts/displayProducts.js";

let modalAddService, idBooking, numRoom, productsMinibar;
export let contentMinibar;

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

  productsMinibar = await serviceByName(nameService);

  if (productsMinibar) {
    displayProducts(productsMinibar);
  }
};

const serviceByName = async (nameService) => {
  let data;
  loading(true);
  try {
    const result = await getServiceByName(nameService);
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData("Ups,no se pudo cargar el servicio");
    }
    return data;
  }
};

const noData = (msj) => {
  contentMinibar.innerHTML = `
             <div class="noData">
             <img src="../../../img/sinDatos.png">
             <span>${msj}</span>
             </div>
          `;
};

const loading = (state) => {
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
