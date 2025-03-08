import { getAllServicesHotel } from "../../scriptsServices/scriptServices.js";
import { configEditService } from "./optionEditServices/editService.js";
import { loadingPage, pageNotFound } from "../dashboard.js";

let containServices, modalServices;

export const configTableServices = async () => {
  modalServices = document.querySelector(".modalServices");
  containServices = document.querySelector(".containServices");
  let services = await allServicesHotel();

  if (services) {
    displayServices(services);
  }
};

const displayServices = async (services) => {
  containServices.innerHTML = `<ul class="listServices"></ul>`;

  let ul = containServices.querySelector("ul");

  let itemsServices = services.map((service) => {
    let icon = `data:image/png;base64,${service.imagen}`;
    let descriptionService = service.descripcionServicio;

    if (service.nombreServicio == "Minibar") {
      icon = "../../../img/minibar.png";
      descriptionService =
        "Gestion de productos como bebidas,dulces,snacks del minibar";
    } else if (service.nombreServicio == "Cantina") {
      icon = "../../../img/bar-counter.png";
      descriptionService = "Gestion de productos de la cantina del hotel";
    }

    return `
      <li>
      <div class="row">
      <img src=${icon}>
      <div class="details">  
      <span>Servicio ${service.nombreServicio}</span>
      <p>${descriptionService}</p>
      </div>
      </div>
        
           <div class="footerOptions">
               <button id="${service.nombreServicio}" class="btnEdit">
               <a>Editar</a>
            <img src="../../../img/editProfileAvatar.png">
            </button>
           </div>  
      </li>
  `;
  });

  ul.innerHTML = itemsServices.join("");

  document.querySelectorAll(".btnEdit").forEach((btn) => {
    btn.addEventListener("click", () => {
      let nameService = btn.id;

      let serviceFound = services.find(
        (service) => service.nombreServicio == nameService
      );

      if (serviceFound) {
        if (nameService == "Telefono" || nameService == "Masajes") {
          openEditService(
            serviceFound,
            "optionEditService/edit.html",
            configEditService
          );
        }
      }
    });
  });
};

export const allServicesHotel = async () => {
  let servicesHotel;

  loading(true);
  try {
    const result = await getAllServicesHotel();
    if (result) {
      servicesHotel = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!servicesHotel) {
      noData();
    }
    return servicesHotel;
  }
};

const loading = (state) => {
  if (state) {
    containServices.innerHTML = `
<div class="loading">
    <span>Cargando datos</span>
   <img src="../../../img/spinnerMain.gif">
</div>
`;
  } else {
    containServices.innerHTML = ``;
  }
};

const noData = () => {
  containServices.innerHTML = `
<div class="noData">
   <img src="../../../img/sinDatos.png">
    <span>Ups, no se encontraron los servicios</span>
</div>
`;
};

const openEditService = async (service, url, method) => {
  modalServices.style.display = "flex";
  let page;

  loadingPage(false, modalServices);
  try {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok && result) {
      page = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, modalServices);
    if (page) {
      modalServices.innerHTML = page;
      window.scrollTo(0, 0);
      method(service);
    } else {
      pageNotFound(modalServices);
    }
  }
};
