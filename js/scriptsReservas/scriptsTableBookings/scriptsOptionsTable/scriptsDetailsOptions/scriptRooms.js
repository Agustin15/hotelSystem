import { closeWindow, loading, noData } from "./scriptClient.js";
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
  loading(true, body);
  try {
    const roomsDataBooking = await getDataBookingRoomsWithCategory(idBooking);

    if (roomsDataBooking) {
      data = roomsDataBooking;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, body);
    if (!data) {
      noData("Ups, no hay habitaciones reservadas", body);
    }
    return data;
  }
};

const rooms = (roomsBooking) => {
  let liRoomsBooking = roomsBooking.map((room) => {
    return `
         <li>
<div class="icon">
           <img src="data:image/png;base64,${room.image}">
         </div>             
         
         <div class="info">
            <span>Habitacion ${room.numRoom}</span>
            <span>Categoria ${room.category}</span>
         </div>
     
         </li>`;
  });

  return liRoomsBooking.join("");
};
