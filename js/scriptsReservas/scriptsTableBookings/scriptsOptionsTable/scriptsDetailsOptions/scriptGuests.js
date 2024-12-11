import { getDataBookingRoomsGuests } from "../../../../scriptsRooms/scriptRooms.js";
import { loading, closeWindow, noData } from "./scriptClient.js";
import {
  totalGuests,
  roomsGuests,
} from "../../../../scriptsClientes/scriptOptionsTable/scriptsDetailsClient/scriptGuests.js";

let body;
let idBooking;
let dataBooking;

export const configGuests = async () => {
  body = document.querySelector(".body");
  idBooking = document.querySelector(".containGuestDetails").id;
  closeWindow();

  dataBooking =  await getBookingRoomsGuests(idBooking);

  
  if (dataBooking.length>0) {
    let guestsTotal = totalGuests(dataBooking);
    body.innerHTML = ` 
     
  <div class="totalGuests">

  <div class="adults">
  <img src="../../../img/adultRoom.png">
  <span>Adultos:${guestsTotal.adults}</span>
  </div>

   <div class="childs">
  <img src="../../../img/children.png">
  <span>Niños:${guestsTotal.childs}</span>
  </div>
  </div>

  <ul class="roomsGuests">
  
  ${roomsGuests(dataBooking)}
  </ul>
  
  `;
  }
};

export const getBookingRoomsGuests = async (idBooking) => {
  let data = null;
  loading(true,body);
  try {
    const result = await getDataBookingRoomsGuests(idBooking);

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false,body);
    if (!data || data.length==0) {
      noData("Ups,no se pudieron encontrar los huespedes",body);
    }
    return data;
  }
};
