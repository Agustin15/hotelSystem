import { modalOption } from "../scriptTableBookings.js";
import { configClient } from "./scriptsDetailsOptions/scriptClient.js";
import { configGuests } from "./scriptsDetailsOptions/scriptGuests.js";

const itemsUrl = {
  client: "optionsTableBooking/optionsDetails/client.php?idBooking=",
  guests: "optionsTableBooking/optionsDetails/guests.php?idBooking=",
};

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
      url = itemsUrl[item] + idBooking;
      
      drawItemData(url, item);
    });
  });
};

const drawItemData = async (url, item) => {
  const response = await fetch(url);
  const pageData = await response.text();

  if (pageData) {
    modalOption(true, document.querySelector(".modalOptionsBookingDetails"));
    document.querySelector(".modalOptionsBookingDetails").innerHTML = pageData;
  
    switch (item) {
      case "client":
        await configClient();
        break;
        case "guests":
          await configGuests();
          break;
    }
  }
};
