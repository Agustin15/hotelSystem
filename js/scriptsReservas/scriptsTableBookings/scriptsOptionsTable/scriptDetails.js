import { modalOption } from "../scriptTableBookings.js";
import { configClient } from "./scriptsDetailsOptions/scriptClient.js";
import { configGuests } from "./scriptsDetailsOptions/scriptGuests.js";
import { configRooms } from "./scriptsDetailsOptions/scriptRooms.js";
import { configServices } from "./scriptsDetailsOptions/scriptServices.js";
import { configBill } from "./scriptsDetailsOptions/scriptBill.js";

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
  }
  
];

export const configDetails = () => {
  let btnCloseDetails = document.querySelector(".btnCloseDetails");
  let itemsViews = document.querySelectorAll(".item");
  let url;

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
  const response = await fetch(itemUrlFind.url + idBooking);
  const pageData = await response.text();

  if (pageData) {
    modalOption(true, document.querySelector(".modalOptionsBookingDetails"));
    document.querySelector(".modalOptionsBookingDetails").innerHTML = pageData;

    itemUrlFind.method();
  }
};
