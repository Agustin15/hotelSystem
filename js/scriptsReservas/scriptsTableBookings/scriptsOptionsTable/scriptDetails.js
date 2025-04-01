import { modalOption, closePageNotFound } from "../scriptTableBookings.js";
import { configClient } from "./scriptsDetailsOptions/scriptClient.js";
import { configGuests } from "./scriptsDetailsOptions/scriptGuests.js";
import { configRooms } from "./scriptsDetailsOptions/scriptRooms.js";
import { configServices } from "./scriptsDetailsOptions/scriptServices.js";
import { configBill } from "./scriptsDetailsOptions/scriptBill.js";
import { pageNotFound, loadingPage } from "../../scriptReserva.js";
let modalOptionsBookingDetails;

const itemsUrl = [
  {
    option: "client",
    url: "optionsTableBooking/optionsDetails/client.php?idBooking=",
    method: () => {
      configClient();
    },
  },
  {
    option: "guests",
    url: "optionsTableBooking/optionsDetails/guests.php?idBooking=",
    method: () => {
      configGuests();
    },
  },
  {
    option: "rooms",
    url: "optionsTableBooking/optionsDetails/rooms.php?idBooking=",
    method: () => {
      configRooms();
    },
  },
  {
    option: "services",
    url: "optionsTableBooking/optionsDetails/services.php?idBooking=",
    method: () => {
      configServices();
    },
  },
  {
    option: "bill",
    url: "optionsTableBooking/optionsDetails/redirectToBill.php?idBooking=",
    method: () => {
      configBill();
    },
  },
];

export const configDetails = () => {
  let btnCloseDetails = document.querySelector(".btnCloseDetails");
  let itemsViews = document.querySelectorAll(".item");
  
  modalOptionsBookingDetails = document.querySelector(
    ".modalOptionsBookingDetails"
  );

  btnCloseDetails.addEventListener("click", () => {
    modalOption(false, document.querySelector(".modalMainBookings"));
  });

  itemsViews.forEach((itemView) => {
    itemView.addEventListener("click", () => {
      let idBooking = itemView.parentElement.dataset.id;
      let item = itemView.parentElement.dataset.item;
      let itemUrlFind = itemsUrl.find((itemUrl) => itemUrl.option == item);
      drawItemData(itemUrlFind, idBooking);
    });
  });
};

const drawItemData = async (itemUrlFind, idBooking) => {
  let pageData;
  modalOption(true, modalOptionsBookingDetails);
  loadingPage(true, modalOptionsBookingDetails);
  try {
    const response = await fetch(itemUrlFind.url + idBooking);
    const result = await response.text();
    if (response.ok && result) {
      pageData = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, modalOptionsBookingDetails);
    if (!pageData) {
      pageNotFound(modalOptionsBookingDetails);
      closePageNotFound(modalOptionsBookingDetails);
    }
  }

  if (pageData) {
    modalOption(true, modalOptionsBookingDetails);
    modalOptionsBookingDetails.innerHTML = pageData;
    

    itemUrlFind.method();
  }
};
