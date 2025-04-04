import { close } from "./scriptRecordRoom.js";
import { getBookingByRoomReserved } from "../scriptRooms.js";
import { configHistory } from "./scriptsServices/historyServices.js";
import { configAddService } from "./scriptsServices/addService.js";
import { configDeleteService } from "./scriptsServices/deleteService.js";
import { pageNotFound, loadingPage } from "../dashboardScript.js";

let numRoom;
let divOptionService;
let booking;

export const configServices = async () => {
  numRoom = document.querySelector(".containServices").id;
  divOptionService = document.querySelector(".optionService");
  close();

  if (numRoom) {
    booking = await bookingByRoomReserved();
    if (booking) {
      optionMenu();
      let page = await getDocument("optionsMenu/optionServices/history.html");
      if (page) {
        drawDocument(page);
        configHistory(numRoom, booking.idReservaHabitacion);
      }
    }
  }
};

const getDocument = async (url) => {
  let page;
  loadingPage(true, divOptionService);
  try {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok && result) {
      page = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, divOptionService);
    if (!page) {
      pageNotFound(divOptionService);
    }
    return page;
  }
};

const drawDocument = (page) => {
  divOptionService.innerHTML = page;
};

const optionServicePage = [
  {
    page: "history.html",
    function: configHistory
  },
  {
    page: "addService.html",
    function: configAddService
  },
  {
    page: "deleteService.html",
    function: configDeleteService
  }
];

const bookingByRoomReserved = async () => {
  let bookingFind;
  loading(true);
  try {
    const result = await getBookingByRoomReserved(numRoom);
    if (result) {
      bookingFind = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!bookingFind) {
      noData("Ups, esta habitacion no tiene reserva actualmente");
    }
    return bookingFind;
  }
};

const noData = (msj) => {
  divOptionService.innerHTML = `
         <div class="noData">
         <img src="../../../img/sinDatos.png">
         <span>${msj}</span>
         </div>
      `;
};

const loading = (state) => {
  if (state) {
    divOptionService.innerHTML = `
           <div class="loading">
         <span>Cargando datos</span>
           <img src="../../../img/spinnerMain.gif">
           </div>
        `;
  } else {
    divOptionService.innerHTML = ``;
  }
};

const optionMenu = () => {
  let options = document
    .querySelector(".headerWindowContainServices")
    .querySelectorAll("li");

  options.forEach((option) => {
    option.addEventListener("click", async () => {
      let url = option.dataset.url;

      let optionSwitched = optionServicePage.find(
        (optionService) => url.indexOf(optionService.page) > -1
      );

      let page = await getDocument(url);
      if (page) {
        drawDocument(page);
        optionSwitched.function(numRoom, booking.idReservaHabitacion);
      }
    });
  });
};
