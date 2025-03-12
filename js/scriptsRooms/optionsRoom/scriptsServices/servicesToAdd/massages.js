import {
  getServiceByName,
  POSTService
} from "../../../../scriptsServices/scriptServices.js";

import BACK_URL_LOCALHOST from "../../../../urlLocalhost.js";

let modalAddService, contentMassage, idBooking, numRoom, service;
let total = 0;
let btnAdd, sessionsInput, alertService, textTotal;

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
  alertService = document.querySelector(".alertService");

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
  textTotal = document.querySelector(".containTotal").querySelector("span");
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
        let serviceAddedToRoom = addServiceToRoom(quantitySessions, total);
        if (serviceAddedToRoom==true) {
          setAlertService(
            alertService,
            true,
            `Servicio agregado exitosamente a la habitacion ${numRoom}`
          );

          defaultValues();
        }
      });
    }
  });
};

const addServiceToRoom = async (quantitySessions, amountService) => {
  const serviceToAdd = {
    idService: service.idServicio,
    option: "massages",
    quantity: parseInt(quantitySessions),
    idBooking: parseInt(idBooking),
    numRoom: parseInt(numRoom),
    amountService: amountService
  };

  let data;
  loadingForm(true, btnAdd);
  try {
    const result = await POSTService(serviceToAdd);
    if (result.error) {
      throw result.error;
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    data = error;
  } finally {
    loadingForm(false, btnAdd);
    if (data.error) {
      setAlertService(
        alertService,
        false,
        `Ups no se pudo agregar el servicio a la habitacion ${numRoom}`
      );
    }
    return data;
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

export const setAlertService = (element, state, msj) => {
  if (state) {
    setComponentsAlert(
      element,
      "../../../img/tickAdmin.png",
      "Exito",
      "alertServiceCorrect",
      msj
    );
    setTimeout(() => {
      element.style.display = "none";
    }, 3000);
  } else {
    setComponentsAlert(
      element,
      "../../../img/advertenciaLogin.png",
      "Error",
      "alertServiceError",
      msj
    );
  }
};

const setComponentsAlert = (element, icon, title, classStyle, msj) => {
  let iconAlert = element.querySelector("img");
  let msjAlert = element.querySelector("p");
  let titleAlert = element.querySelector("span");

  iconAlert.src = icon;
  titleAlert.textContent = title;
  element.classList.add(classStyle);
  msjAlert.textContent = msj;
  element.style.display = "flex";
};

const defaultValues = () => {
  total = 0;
  textTotal.textContent = "Total:";
  sessionsInput.value = "";
  changeStateBtnAdd(false, btnAdd);
};
