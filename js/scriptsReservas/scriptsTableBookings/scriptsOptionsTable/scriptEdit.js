import { configEditForm } from "./scriptsEditBooking/scriptsFormEdit/scriptOptionEdit.js";
import { configRoomsAvailables } from "./scriptsEditBooking/scriptsRoomsAvailables/scriptRoomsAvailables.js";
import { pageNotFound, loadingPage } from "../../scriptReserva.js";

let body, idBooking;

export const configEdit = () => {
  idBooking = document.querySelector(".containEditOption").id;
  body = document.querySelector(".body");
  let menu = document.querySelector(".menu");
  let menuItems = menu.querySelectorAll("li");

  menuItems.forEach((item) => {
    item.addEventListener("click", async () => {
      if (item.id == "itemEdit") {
        configEditForm(idBooking, body);
      } else {
        let document = await drawOptionRoomsAvailables();
        if (document) {
          body.innerHTML = document;
          configRoomsAvailables();
        }
      }
    });
  });

  configEditForm(idBooking, body);
};

const drawOptionRoomsAvailables = async () => {
  let data;

  loadingPage(true, body);
  try {
    const response = await fetch(
      "optionsTableBooking/optionsEdit/roomsAvailables.php"
    );
    const document = await response.text();
    if (response.ok && document) {
      data = document;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, body);
    if (!data) {
      pageNotFound(body);
    }
    return data;
  }
};
