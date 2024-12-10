import { modalOption } from "../scriptTableBookings.js";

const itemsUrl = {
  client: "optionsTableBooking/optionsDetails/client.php?idBooking=",
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
      let idBooking = itemView.parentElement.id;
      let item = itemView.parentElement.dataset.item;
      url = itemsUrl[item] + idBooking;
   
      drawItemData(url);
    });
  });
};

const drawItemData = async (url) => {
  const response = await fetch(url);
  const pageData = await response.text();

  if (pageData) {
    modalOption(true, document.querySelector(".modalOptionsBookingDetails"));
    document.querySelector(".modalOptionsBookingDetails").innerHTML = pageData;
  }
};
