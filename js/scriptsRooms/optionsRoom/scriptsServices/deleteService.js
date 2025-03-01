import {
  getDetailsServicesByCurrentBookingRoom,
  DELETEService,
  PUTServiceHotel
} from "../../../scriptsServices/scriptServices.js";
import {
  modalConfirmDelete,
  footerModal
} from "./modalDeleteService/modalConfirm.js";

import { getPayById } from "../../../scriptsRevenues/scriptRevenues.js";
import BACK_URL_LOCALHOST from "../../../urlLocalhost.js";

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
            let resultPay = await PUTPay(serviceFound);
            if (resultPay) {
              let resultPut = putServiceHotel(serviceFound);
              if (resultPut) {
                serviceDeleted();
              }
            }
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

    if (result) {
      resultDeleteService = result;
    }
  } catch (error) {
    console.log(error);
    loading(false, "Cargando", "loadingDelete", footerModal);
  } finally {
    if (!resultDeleteService) {
      noData(
        "Ups no se pudo eliminar el servicio",
        "errorDelete",
        footerModal,
        "../../../img/advertenciaDelete.png"
      );
    }
    return resultDeleteService;
  }
};

const PUTPay = async (service) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/revenuesRoutes.php `;

  let data;
  loading(true, "Cargando", "loadingDelete", footerModal);
  try {
    let revenueBooking = await getPayById(idBooking);
    if (!revenueBooking) {
      throw "Ups, no se pudo encontrar el precio de la reserva";
    }
    let newAmount =
      revenueBooking["deposito"] - service.cantidad * service.precio;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      },
      body: JSON.stringify({ idBooking: idBooking, newAmount: newAmount })
    });
    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (result.response == true) {
      data = result;
    }
  } catch (error) {
    loading(false, "Cargando", "loadingDelete", footerModal);
    console.log(error);
  } finally {
    if (!data) {
      noData(
        "Ups no se pudo actualizar el precio de la reserva",
        "errorDelete",
        footerModal,
        "../../../img/advertenciaDelete.png"
      );
    }
    return data;
  }
};

const putServiceHotel = async (service) => {
  const serviceToUpdate = {
    option: "updateStockOneService",
    idService: service.idServicio,
    newMaxStock: service.maxStock + service.cantidad
  };

  loading(true, "Cargando", "loadingDelete", footerModal);
  let resultPut;
  try {
    const result = await PUTServiceHotel(serviceToUpdate);

    if (result) {
      resultPut = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, "Cargando", "loadingDelete", footerModal);
    if (!resultPut) {
      noData(
        "Ups no se pudo actualizar el stock del producto",
        "errorDelete",
        footerModal,
        "../../../img/advertenciaDelete.png"
      );
    }
    return resultPut;
  }
};
