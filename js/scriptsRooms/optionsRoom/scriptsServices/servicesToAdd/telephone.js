import {
  getServiceByName,
  POSTService
} from "../../../../scriptsServices/scriptServices.js";

import {
  setAlertService,
  loadingForm,
  changeStateBtnAdd,
  closeWindow
} from "./massages.js";

let modalAddService, contentTelephone, idBooking, numRoom, service;
let total = 0;
let btnAdd, minutesInput, alertService, textTotal;

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

  alertService = document.querySelector(".alertService");
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
  textTotal = document.querySelector(".containTotal").querySelector("span");
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
        let serviceAddedToRoom = await addServiceToRoom(quantityMinutes, total);
        if (serviceAddedToRoom == true) {
          defaultValues();
          setAlertService(
            alertService,
            true,
            `Servicio agregado exitosamente a la habitacion ${numRoom}`
          );
  
        }
      });
    }
  });
};

const addServiceToRoom = async (quantityMinutes, amountService) => {
  const serviceToAdd = {
    idService: service.idServicio,
    option: "telephone",
    idBooking: parseInt(idBooking),
    numRoom: parseInt(numRoom),
    quantity: parseInt(quantityMinutes),
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

const defaultValues = () => {
  total = 0;
  textTotal.innerHTML = `Total:`;
  minutesInput.value = "";
  changeStateBtnAdd(false, btnAdd);
};
