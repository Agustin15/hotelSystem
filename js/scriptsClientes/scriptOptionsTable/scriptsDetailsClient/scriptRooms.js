import { closeWindow } from "./scriptGuests.js";
import { loading } from "../../scriptAddClient.js";

let roomsBooking;

export const configRoomsDetails = async () => {
  let containRoomsDetails = document.querySelector(".containRoomsDetails");
  let idBooking = containRoomsDetails.id;
  let body = containRoomsDetails.querySelector(".body");
  roomsBooking = await getDataBookingRoomsWithCategory(idBooking);


  closeWindow();
  if (roomsBooking) {
    body.innerHTML += ` 

      <ul class="rooms">
      
      ${rooms()}
      </ul>
      
      `;
  } else {
    noData(body);
  }
};

export const getDataBookingRoomsWithCategory = async (idBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/rooms/roomsBookingController.php?option=getDataRoomsBookingAndCategory&&idBooking=" +
    idBooking;

  let data = null;
  loading(true);
  try {
    const response = await fetch(url);
    const result = await response.json();

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

const rooms = () => {
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
