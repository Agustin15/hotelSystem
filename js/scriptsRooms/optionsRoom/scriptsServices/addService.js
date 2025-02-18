import { getAllServicesHotel } from "../../../scriptsServices/scriptServices.js";
import { configMassageService } from "./servicesToAdd/massages.js";
import { configTelephoneService } from "./servicesToAdd/telephone.js";
import { configMinibarService } from "./servicesToAdd/minibar.js";
import { configBarService } from "./servicesToAdd/bar.js";
import { pageNotFound, loadingPage } from "../../dashboardScript.js";

let containAddService, idBookingService, numRoomService, modalAddService;

export const configAddService = async (numRoom, idBooking) => {
  idBookingService = idBooking;
  numRoomService = numRoom;
  let titleAddService = document.querySelector(".titleAddService");
  modalAddService = document.querySelector(".modalAddService");

  titleAddService.innerHTML = `Agregar servicios a habitacion ${numRoom}`;
  containAddService = document.querySelector(".containAddService");
  let servicesHotel = await allServicesHotel();
  if (servicesHotel) {
    displayServices(servicesHotel);
  }
};

const allServicesHotel = async () => {
  let services;

  loading(true);
  try {
    const result = await getAllServicesHotel();
    if (result) {
      services = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!services) {
      noData("Ups, no se encontraron servicios");
    }
    return services;
  }
};

const noData = (msj) => {
  containAddService.innerHTML = `
           <div class="noData">
           <img src="../../../img/sinDatos.png">
           <span>${msj}</span>
           </div>
        `;
};

const loading = (state) => {
  if (state) {
    containAddService.innerHTML = `
             <div class="loading">
           <span>Cargando datos</span>
             <img src="../../../img/spinnerMain.gif">
             </div>
          `;
  } else {
    containAddService.innerHTML = ``;
  }
};

const displayServices = (services) => {
  let servicesItems = services.map((service) => {
    let icon, description;
    switch (service.nombreServicio) {
      case "Minibar":
        icon = "../../../img/minibar.png";
        description =
          "Agrege los gastos de los productos del minibar consumidos por el cliente a la habitacion";
        break;
      case "Cantina":
        icon = "../../../img/bar-counter.png";
        description =
          "Agrege los gastos productos de la cantina consumidos por el cliente a la habitacion";
        break;
    }
    return `
        <li id=${service.nombreServicio}>        
        <div class="headerService">
             <img src=${
               icon ? icon : "data:image/png;base64," + service.imagen
             }>   
              <p>${
                description ? description : service.descripcionServicio
              }</p>    
        </div>
        <div class="footerService">
        <span>${service.nombreServicio}</span>
        <img class="openService" src="../../../img/ver.png">
        </div>
        </li>
       `;
  });

  containAddService.innerHTML = "<ul></ul>";
  let ul = containAddService.querySelector("ul");
  ul.innerHTML = servicesItems.join("");

  switchOption();
};

const switchOption = () => {
  let opensServices = document.querySelectorAll(".openService");
  opensServices.forEach((openService) => {
    openService.addEventListener("click", async () => {
      let nameService = openService.parentElement.parentElement.id;

      let serviceSwitched = optionsAddService.find(
        (optionAddService) => optionAddService.name == nameService
      );
      if (serviceSwitched) {
        const page = await getDocument(serviceSwitched.url);
        if (page) {
          displayDocument(page);
          serviceSwitched.function(
            nameService,
            idBookingService,
            numRoomService
          );
        }
      }
    });
  });
};

const optionsAddService = [
  {
    name: "Masajes",
    url: "optionsMenu/optionServices/optionsAddService/massage.html",
    function: configMassageService
  },
  {
    name: "Telefono",
    url: "optionsMenu/optionServices/optionsAddService/telephone.html",
    function: configTelephoneService
  },
  {
    name: "Minibar",
    url: "optionsMenu/optionServices/optionsAddService/minibar.html",
    function: configMinibarService
  },
  {
    name: "Cantina",
    url: "optionsMenu/optionServices/optionsAddService/bar.html",
    function: configBarService
  }
];

const getDocument = async (url) => {
  let data;
  modalAddService.style.display = "flex";
  loadingPage(true, modalAddService);
  try {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok && result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, modalAddService);
    if (!data) {
      pageNotFound(modalAddService);
    }
    return data;
  }
};

const displayDocument = (page) => {
  modalAddService.innerHTML = page;
};
