import { closeWindow } from "./scriptGuests.js";
import { loading } from "../../scriptAddClient.js";
import { getDataBookingRoomsWithCategory } from "../../../scriptsRooms/scriptRooms.js";

let roomsBooking;

export const configRoomsDetails = async () => {
  let containRoomsDetails = document.querySelector(".containRoomsDetails");
  let idBooking = containRoomsDetails.id;
  let body = containRoomsDetails.querySelector(".body");
  roomsBooking = await getDataBookingRooms(idBooking);

  closeWindow();
  if (roomsBooking) {
    body.innerHTML += ` 

      <ul class="rooms">
      
      ${rooms(roomsBooking)}
      </ul>
      
      `;
  } else {
    noData(body);
  }
};

export const getDataBookingRooms = async (idBooking) => {
  let data = null;
  loading(true);
  try {
    const result = await getDataBookingRoomsWithCategory(idBooking);

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
 
  } finally {
    loading(false);
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

const noData = (body) => {
  body.innerHTML = `
      <div class="noData">
           <img src="../../../img/sinDatos.png">
           <span>Ups, no se pudieron encontrar los datos</span>
          
      </div>
       `;
};
