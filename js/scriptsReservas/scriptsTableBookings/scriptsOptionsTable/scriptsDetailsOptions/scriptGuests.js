import { getDataBookingRoomsGuests } from "../../../../scriptsRooms/scriptRooms.js";
import {closeWindow, noData,loading } from "./scriptClient.js";

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


const totalGuests = (dataBooking) => {
  let adults = 0;
  let childs = 0;
  dataBooking.map((data) => {
    adults += data.adultos;
    childs += data.ninos;
  });

  return { adults: adults, childs: childs };
};

export const roomsGuests = (dataBooking) => {
  let dataRoomsGuests= dataBooking.map((data) => {
    return `
            
<li>

         <div class="roomNumb">
          <span>Habitacion ${data.numHabitacionReservada}</span>
          </div>

          <div class="content">
          <div class="icon">
              <img src="../../../img/family.png">
          </div>
          <div class="guests">

          <div class="adults">
   
            <img src="../../../img/guestInfo.png">
            <div class="value">
             <span>Adultos:</span>
             <span>${data.adultos}</span>
             </div>
             </div>

              <div class="childs">

            <img src="../../../img/kids.png">
              <div class="value">
             <span>Niños:</span>
             <span>${data.ninos}</span>
             </div>
             </div>
          </div>
          </div>


        </li>
        `;
  });

  return dataRoomsGuests.join("");
};
