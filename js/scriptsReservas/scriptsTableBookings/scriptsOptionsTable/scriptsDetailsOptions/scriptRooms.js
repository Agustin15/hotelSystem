import { closeWindow, loading, noData } from "./scriptClient.js";
import { rooms } from "../../../../scriptsClientes/scriptOptionsTable/scriptsDetailsClient/scriptRooms.js";
import { getDataBookingRoomsWithCategory } from "../../../../scriptsRooms/scriptRooms.js";

let body, roomsBooking, idBooking;

export const configRooms = async () => {
  body = document.querySelector(".body");
  idBooking = document.querySelector(".containRoomsDetails").id;

  closeWindow();

  roomsBooking = await dataBookingRoomsWithCategory(idBooking);

  if (roomsBooking) {
    body.innerHTML = ` 

    <ul class="rooms">
    
    ${rooms(roomsBooking)}
    </ul>
    
    `;
  }
};

const dataBookingRoomsWithCategory = async () => {
  let data = null;
   loading(true,body);
  try {
    const roomsDataBooking = await getDataBookingRoomsWithCategory(idBooking);
    if (roomsDataBooking) {
      data = roomsDataBooking;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false,body);
    if (!data) {
      noData("Ups, no se pudieron cargar las habitaciones reservadas", body);
    }
    return data;
  }
};
