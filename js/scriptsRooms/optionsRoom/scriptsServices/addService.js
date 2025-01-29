import { getAllServicesHotel } from "../../../scriptsServices/scriptServices.js";
let containAddService;

export const configAddService = async (numRoom, idBooking) => {
  let titleAddService = document.querySelector(".titleAddService");
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
    let icon;
    switch (service.nombreServicio) {
      case "Minibar":
        icon = "../../../img/minibar.png";
        break;
      case "Cantina":
        icon = "../../../img/bar-counter.png";
        break;
    }
    return `
        <li>        
        <div>
             <img src=${
               icon ? icon : "data:image/png;base64," + service.imagen
             }>   
              <p>${service.descripcionServicio}</p>    
        </div>
        <div>
        <span>${service.nombreServicio}</span>
        <img src="../../../img/ver.png">
        </div>
        </li>
       `;
  });

  containAddService.innerHTML = servicesItems.join("");
};
