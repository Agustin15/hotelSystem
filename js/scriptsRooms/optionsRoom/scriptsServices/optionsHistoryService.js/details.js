import { numRoom, idBooking } from "../historyServices.js";
import { getServiceRoomDetailsByNumRoomAndBooking } from "../../../../scriptsServices/scriptServices.js";

let contentDetails;

export const detailsService = (nameService) => {
  drawWindow(nameService);
};

const drawWindow = async (nameService) => {
  let modal = document.querySelector(".modalMainHistory");
  modal.style.display = "flex";

  modal.innerHTML = `
   
    <div class="containDetails">
      <div class="headerWindow">
      <div class="titleDetailService">
      <h3>Detalles ${nameService} </h3>
      </div>
      <button class="btnCloseDetails">X</button>
      </div>
      <div class="contentDetails"></div>

    </div>
   `;

  contentDetails = document.querySelector(".contentDetails");
  closeWindow(modal);
  let servicesDetails = await serviceRoomDetails(nameService);

  if (servicesDetails) {
    displayDetails(servicesDetails);
  }
};

const serviceRoomDetails = async (nameService) => {
  const serviceToFind = {
    nameService: nameService,
    idBooking: idBooking,
    numRoom: parseInt(numRoom)
  };

  let servicesDetails;
  loading(true);
  try {
    let result = await getServiceRoomDetailsByNumRoomAndBooking(serviceToFind);
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

const displayDetails = (serviceDetails) => {
  contentDetails.innerHTML = `<ul class="ulItems"></ul>`;

  let items = serviceDetails.map((service) => {
    return `
   
 <li class="item">
    <span title="${service.descripcionServicio}" class="name">${
      service.nombreServicio == "Masajes" ||
      service.nombreServicio == "Telefono"
        ? "Servico " + service.nombreServicio
        : service.descripcionServicio
    }</span>
    <div class="row">
        <div class="columnOne">
            <div class="icon">
                <img src="data:image/png;base64,${service.imagen}">
            </div>
        </div>
        <div class="columnTwo">
            <span><a>Cantidad:</a>${service.cantidad}</span>
            <span><a>Precio:</a>U$S ${service.precio}</span>
             <span><a>Total:</a>U$S ${service.cantidad * service.precio}</span>
        </div>
    </div>
</li>
  `;
  });

  contentDetails.querySelector("ul").innerHTML = items.join("");
};

const closeWindow = (modal) => {
  document.querySelector(".btnCloseDetails").addEventListener("click", () => {
    modal.style.display = "none";
    modal.innerHTML = ``;
  });
};
