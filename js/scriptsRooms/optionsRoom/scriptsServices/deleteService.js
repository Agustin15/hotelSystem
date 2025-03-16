import {
  getDetailsServicesByCurrentBookingRoom,
  DELETEService
} from "../../../scriptsServices/scriptServices.js";
import {
  modalConfirmDelete,
  footerModal
} from "./modalDeleteService/modalConfirm.js";


let idBooking, numRoom, containDeleteService, modal;

export const configDeleteService = async (numRoomService, idBookingService) => {
  idBooking = idBookingService;
  numRoom = numRoomService;

  let titleDeleteService = document.querySelector(".titleDeleteService");
  containDeleteService = document.querySelector(".containDeleteService");
  titleDeleteService.innerHTML = `Eliminar servicios habitacion ${numRoom}`;

  modal = document.querySelector(".modalDeleteService");

  let servicesRoomDetails = await servicesRoomBooking();
  if (servicesRoomDetails) {
    displayServices(servicesRoomDetails);
  }
};

const servicesRoomBooking = async () => {
  let servicesRoomDetails;
  loading(true, "Cargando datos", "loading", containDeleteService);
  try {
    let result = await getDetailsServicesByCurrentBookingRoom(
      numRoom,
      idBooking
    );

    if (result) {
      servicesRoomDetails = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, "Cargando datos", "loading", containDeleteService);
    if (!servicesRoomDetails) {
      noData(
        "Ups, esta habitacion no tiene servicios aun",
        "noData",
        containDeleteService,
        "../../../img/sinDatos.png"
      );
    }
    return servicesRoomDetails;
  }
};

const noData = (msj, classOfElement, element, icon) => {
  element.innerHTML = `
           <div class=${classOfElement}>
           <img src=${icon}>
           <span>${msj}</span>
           </div>
        `;
};

const loading = (state, msj, classOfElement, element) => {
  if (state) {
    element.innerHTML = `
             <div class=${classOfElement}>
           <span>${msj}</span>
             <img src="../../../img/spinnerMain.gif">
             </div>
          `;
  } else {
    element.innerHTML = ``;
  }
};

const displayServices = (servicesRoomDetails) => {
  containDeleteService.innerHTML = `<ul class="ulItems"></ul>`;

  let items = servicesRoomDetails.map((service) => {
    return `
   
 <li class="item" id=${service.idServicioHabitacion}>
    <span title="${service.descripcionServicio}" class="name">${
      service.nombreServicio == "Masajes" ||
      service.nombreServicio == "Telefono"
        ? "Servicio " + service.nombreServicio
        : `${service.nombreServicio}(${service.descripcionServicio})`
    }</span>
    <div class="row">
        <div class="columnOne">
            <div class="icon">
                <img src="data:image/png;base64,${service.imagen}">
                <button class="btnDelete">Eliminar</button>
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

  containDeleteService.querySelector("ul").innerHTML = items.join("");

  document.querySelectorAll(".btnDelete").forEach((btnDelete) => {
    btnDelete.addEventListener("click", async () => {
      let itemService =
        btnDelete.parentElement.parentElement.parentElement.parentElement;
      let serviceFound = servicesRoomDetails.find(
        (service) => service.idServicioHabitacion == itemService.id
      );
      if (serviceFound) {
        let optionSwitched = await modalConfirmDelete(serviceFound, modal);

        if (optionSwitched) {
          let resultDelete = await deleteService(serviceFound);
          if (resultDelete) {
            serviceDeleted();
          }
        } else {
          modal.style.display = "none";
        }
      }
    });
  });
};

const serviceDeleted = async () => {
  modal.style.display = "none";
  let servicesRoomDetails = await servicesRoomBooking();
  if (servicesRoomDetails) {
    displayServices(servicesRoomDetails);
  }
};

const deleteService = async (service) => {
  let resultDeleteService;
  loading(true, "Cargando", "loadingDelete", footerModal);
  try {
    const result = await DELETEService(service.idServicioHabitacion);

    if (result.error) {
      throw result.error;
    }
    if (result) {
      resultDeleteService = result;
    }
  } catch (error) {
    console.log(error);
    noData(
      "Ups no se pudo eliminar el servicio",
      "errorDelete",
      footerModal,
      "../../../img/advertenciaDelete.png"
    );
  } finally {
    loading(false, "Cargando", "loadingDelete", footerModal);
    return resultDeleteService;
  }
};
