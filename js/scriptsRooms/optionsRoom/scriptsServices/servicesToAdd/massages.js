import {
  getServiceByName,
  POSTService,
  getServiceByIdAndNumRoomAndBooking,
  PUTService,
} from "../../../../scriptsServices/scriptServices.js";

import BACK_URL_LOCALHOST from "../../../../urlLocalhost.js";
import { getPayById } from "../../../../scriptsRevenues/scriptRevenues.js";

let modalAddService, contentMassage, idBooking, numRoom, service;
let total = 0;
let btnAdd, sessionsInput, alertService;

export const configMassageService = async (
  nameService,
  idBookingService,
  numRoomService
) => {
  idBooking = idBookingService;
  numRoom = numRoomService;

  modalAddService = document.querySelector(".modalAddService");
  contentMassage = document.querySelector(".contentMassage");
  closeWindow(modalAddService, ".btnCloseMassage");

  service = await serviceByName(nameService);
  if (service) {
    displayMassageService();
  }
};

const displayMassageService = () => {
  contentMassage.innerHTML = ` 
     <div class="info">
      <span>Precio por sesion:U$S ${service.precio}</span>
      </div>
      <div class="containCalculate">
      <div class="inputCalculate">
       <input min="1" placeholder="Ingrese cantidad de sesiones" type="number" id="sessions">
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

  sessionsInput = document.querySelector("#sessions");
  btnAdd = document.querySelector(".addServiceBtn");
  sessionsInput.addEventListener("change", () => {
    if (!sessionsInput.value.trim()) {
      changeStateBtnAdd(false, btnAdd);
    }
  });

  calculateTotal();
};

export const changeStateBtnAdd = (state, button) => {
  if (state) {
    button.disabled = false;
    button.classList.add("addServiceBtnActive");
  } else {
    button.disabled = true;
    button.classList.remove("addServiceBtnActive");
  }
};

const serviceByName = async (nameService) => {
  let data;
  loading(true, btnAdd);
  try {
    const result = await getServiceByName(nameService);
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, btnAdd);
    if (!data) {
      noData("Ups,no se pudo cargar el servicio");
    }
    return data[0];
  }
};

const noData = (msj) => {
  contentMassage.innerHTML = `
             <div class="noData">
             <img src="../../../img/sinDatos.png">
             <span>${msj}</span>
             </div>
          `;
};

const loading = (state) => {
  if (state) {
    contentMassage.innerHTML = `
               <div class="loading">
             <span>Cargando datos</span>
               <img src="../../../img/spinnerMain.gif">
               </div>
            `;
  } else {
    contentMassage.innerHTML = ``;
  }
};

export const closeWindow = (modal, btnToClose) => {
  document.querySelector(btnToClose).addEventListener("click", () => {
    modal.innerHTML = ``;
    modal.style.display = "none";
  });
};

const calculateTotal = () => {
  let btnCalculate = document.querySelector(".btnCalculate");
  let errorInput = document.querySelector(".errorInput");
  let textTotal = document.querySelector(".containTotal").querySelector("span");
  let priceMassage = service.precio;

  btnCalculate.addEventListener("click", () => {
    errorInput.textContent = "";

    let quantitySessions = sessionsInput.value.trim();
    if (!quantitySessions) {
      errorInput.textContent = "*Ingrese un  valor valido";
    } else {
      total = priceMassage * quantitySessions;
      textTotal.innerHTML = `Total:U$S ${total}`;
      changeStateBtnAdd(true, btnAdd);
      btnAdd.addEventListener("click", async () => {
        if (alertService) {
          alertService.style.display = "none";
        }
        serviceFind(quantitySessions);
      });
    }
  });
};

const serviceFind = async (quantitySessions) => {
  const serviceToAdd = {
    idService: service.idServicio,
    quantity: parseInt(quantitySessions),
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

export const loadingForm = (state, button) => {
  let spinner = button.querySelector("img");
  if (state) {
    spinner.style.display = "flex";
  } else {
    spinner.style.display = "none";
  }
};

export const setAlertService = (state, msj) => {
  alertService = document.querySelector(".alertService");
  if (state) {
    setComponentsAlert(
      "../../../img/tickAdmin.png",
      "Exito",
      "alertServiceCorrect",
      msj
    );
  } else {
    setComponentsAlert(
      "../../../img/advertenciaLogin.png",
      "Error",
      "alertServiceError",
      msj
    );
  }
};

const setComponentsAlert = (icon, title, classStyle, msj) => {
  let iconAlert = alertService.querySelector("img");
  let msjAlert = alertService.querySelector("p");
  let titleAlert = alertService.querySelector("span");

  iconAlert.src = icon;
  titleAlert.textContent = title;
  alertService.classList.add(classStyle);
  msjAlert.textContent = msj;
  alertService.style.display = "flex";
};

const defaultValues = () => {
  total = 0;
  sessionsInput.value = "";
  changeStateBtnAdd(false, btnAdd);
};
