import { getServiceByName } from "../../../../scriptsServices/scriptServices.js";
import {
  displayContentShop,
  cleanCart
} from "./minibarScripts/displayProducts.js";
let modalAddService, productsBar;
export let contentBar, idBooking, numRoom;

export const configBarService = async (
  nameService,
  idBookingService,
  numRoomService
) => {
  idBooking = idBookingService;
  numRoom = numRoomService;

  modalAddService = document.querySelector(".modalAddService");
  contentBar = document.querySelector(".contentBar");
  closeWindow(modalAddService);

  productsBar = await serviceByName(nameService, contentBar);

  if (productsBar) {
    displayContentShop(productsBar, "cantina");
  }
};

const closeWindow = (modal) => {
  document.querySelector(".btnCloseBar").addEventListener("click", () => {
    modal.innerHTML = ``;
    modal.style.display = "none";
    cleanCart("toCloseWindow");
  });
};

export const serviceByName = async (nameService, contentBar) => {
  let data;
  loading(true, contentBar);
  try {
    const result = await getServiceByName(nameService);
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, contentBar);
    if (!data) {
      noData("Ups,no se pudo cargar el servicio", contentBar);
    }
    return data;
  }
};

const noData = (msj, contentBar) => {
  contentBar.innerHTML = `
             <div class="noData">
             <img src="../../../img/sinDatos.png">
             <span>${msj}</span>
             </div>
          `;
};

const loading = (state, contentBar) => {
  if (state) {
    contentBar.innerHTML = `
               <div class="loading">
             <span>Cargando datos</span>
               <img src="../../../img/spinnerMain.gif">
               </div>
            `;
  } else {
    contentBar.innerHTML = ``;
  }
};
