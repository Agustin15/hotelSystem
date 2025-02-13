import {
  getServiceByName,
  POSTService,
  getServiceByIdAndNumRoomAndBooking,
  PUTService,
} from "../../../../scriptsServices/scriptServices.js";

import BACK_URL_LOCALHOST from "../../../../urlLocalhost.js";
import { getPayById } from "../../../../scriptsRevenues/scriptRevenues.js";
import {
  setAlertService,
  loadingForm,
  changeStateBtnAdd,
  closeWindow,
} from "./massages.js";

let modalAddService, contentTelephone, idBooking, numRoom, service;
let total = 0;
let btnAdd, minutesInput, alertService;

export const configTelephoneService = async (
  nameService,
  idBookingService,
  numRoomService
) => {
  idBooking = idBookingService;
  numRoom = numRoomService;
  modalAddService = document.querySelector(".modalAddService");
  contentTelephone = document.querySelector(".contentTelephone");
  closeWindow(modalAddService, ".btnCloseTelephone");
  service = await serviceByName(nameService);
  if (service) {
    displayTelephoneService();
  }
};

const displayTelephoneService = () => {
  contentTelephone.innerHTML = ` 
       <div class="info">
        <span>Tarifa por minuto:U$S ${service.precio}</span>
        </div>
        <div class="containCalculate">
        <div class="inputCalculate">
         <input min="1" placeholder="Ingrese cantidad de minutos" type="number" id="minutes">
         <span class="errorInput"></span>
         </div>
         <button class="btnCalculate">
          <img src="../../../img/calculator.png">
         </button>
        </div>
        <div class="containTotal">
        <span>Total:</span>
        </div>
  
        <button class="addServiceBtn">
        Agregar servicio
        <img src="../../../img/spinnerBooking.gif">
        </button>
  
        <div class="alertService">
            <img src="../../../img/advertenciaLogin.png">
                      <div class="body">
                          <span>Error</span>
                          <p>Ups, no se pudo agregar el servicio</p>
                      </div>
  
                  </div>
  
        <div>
      `;

  minutesInput = document.querySelector("#minutes");
  btnAdd = document.querySelector(".addServiceBtn");
  minutesInput.addEventListener("change", () => {
    if (!minutesInput.value.trim()) {
      changeStateBtnAdd(false, btnAdd);
    }
  });

  calculateTotal();
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
    return data[0];
  }
};

const noData = (msj) => {
  contentTelephone.innerHTML = `
               <div class="noData">
               <img src="../../../img/sinDatos.png">
               <span>${msj}</span>
               </div>
            `;
};

const loading = (state) => {
  if (state) {
    contentTelephone.innerHTML = `
                 <div class="loading">
               <span>Cargando datos</span>
                 <img src="../../../img/spinnerMain.gif">
                 </div>
              `;
  } else {
    contentTelephone.innerHTML = ``;
  }
};

const calculateTotal = () => {
  let btnCalculate = document.querySelector(".btnCalculate");
  let errorInput = document.querySelector(".errorInput");
  let textTotal = document.querySelector(".containTotal").querySelector("span");
  let priceTelephone = service.precio;

  btnCalculate.addEventListener("click", () => {
    errorInput.textContent = "";

    let quantityMinutes = minutesInput.value.trim();
    if (!quantityMinutes) {
      errorInput.textContent = "*Ingrese un  valor valido";
    } else {
      total = priceTelephone * quantityMinutes;
      textTotal.innerHTML = `Total:U$S ${total}`;
      changeStateBtnAdd(true, btnAdd);
      btnAdd.addEventListener("click", async () => {
        if (alertService) {
          alertService.style.display = "none";
        }
        serviceFind(quantityMinutes);
      });
    }
  });
};

const serviceFind = async (quantityMinutes) => {
  const serviceToAdd = {
    idService: service.idServicio,
    option: "telephone",
    quantity: parseInt(quantityMinutes),
    idBooking: parseInt(idBooking),
    numRoom: parseInt(numRoom),
  };

  loadingForm(true, btnAdd);
  try {
    const serviceFinded = await getServiceByIdAndNumRoomAndBooking(
      serviceToAdd
    );

    if (serviceFinded == "error") {
      throw "Error al buscar el servicio";
    } else if (!serviceFinded) {
      addServiceToRoom(serviceToAdd);
    } else {
      updateServiceRoom(serviceFinded, serviceToAdd);
    }
  } catch (error) {
    console.log(error);
    loadingForm(false, btnAdd);
    setAlertService(
      false,
      `Ups, no se pudo agregar el servicio a la habitacion ${numRoom}`
    );
  }
};

const addServiceToRoom = async (serviceToAdd) => {
  let data;
  loadingForm(true, btnAdd);
  try {
    const result = await POSTService(serviceToAdd);
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    loadingForm(false, btnAdd);
    setAlertService(
      false,
      `Ups no se pudo agregar el servicio a la habitacion ${numRoom}`
    );
  } finally {
    if (data) {
      updatePay();
    }
  }
};

const updateServiceRoom = async (serviceFinded, serviceToAdd) => {
  const serviceToUpdate = {
    idServiceRoom: serviceFinded.idServicioHabitacion,
    option: "telephone",
    newQuantity: serviceToAdd.quantity + serviceFinded.cantidad,
  };

  let data;
  loadingForm(true, btnAdd);
  try {
    const result = await PUTService(serviceToUpdate);
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    loadingForm(false, btnAdd);
    setAlertService(
      false,
      `Ups no se pudo agregar el servicio a la habitacion ${numRoom}`
    );
  } finally {
    if (data) {
      updatePay();
    }
  }
};

const payByIdBooking = async () => {
  let data;
  loadingForm(true, btnAdd);
  try {
    data = await getPayById(idBooking);
  } catch (error) {
    console.log(error);
    loadingForm(false, btnAdd);
  } finally {
    if (!data) {
      setAlertService(
        false,
        `Ups no se pudo agregar el servicio a la habitacion ${numRoom}`
      );
    }
    return data;
  }
};

const updatePay = async () => {
  const payBookingFinded = await payByIdBooking();

  if (payBookingFinded) {
    let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/revenuesRoutes.php `;
    let data;
    const bookingToUpdate = {
      idBooking: idBooking,
      newAmount: payBookingFinded.deposito + total,
    };

    loadingForm(true, btnAdd);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin",
        },
        body: JSON.stringify(bookingToUpdate),
      });
      const result = await response.json();

      if (!response.ok) {
        throw result.error;
      } else if (result.response == true) {
        data = result;
      }
    } catch (error) {
      console.log(error);
      if (error.indexOf("Autenticacion") > -1) {
        invalidAuthentication();
      }
    } finally {
      loadingForm(false, btnAdd);
      if (!data) {
        setAlertService(
          false,
          `Ups no se pudo agregar el servicio a la habitacion ${numRoom}`
        );
      } else {
        setAlertService(
          true,
          `¡Servicio agregado exitosamente a la habitacion ${numRoom}!`
        );
        defaultValues();
      }
    }
  }
};

const defaultValues = () => {
  total = 0;
  minutesInput.value = "";
  changeStateBtnAdd(false, btnAdd);
};
