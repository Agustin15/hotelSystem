import { loading } from "../../scriptAddClient.js";
import { optionModal } from "../scriptDetailsClient.js";
import { getDataBookingRoomsGuests } from "../../../scriptsRooms/scriptRooms.js";

let dataBooking;

export const configGuestsDetails = async () => {
  let containGuestDetails = document.querySelector(".containGuestDetails");
  let idBooking = containGuestDetails.id;
  let body = containGuestDetails.querySelector(".body");
  dataBooking = await getBookingRoomsGuests(idBooking);

  closeWindow();

  if (dataBooking) {
    let guestsTotal = totalGuests();
    body.innerHTML += ` 
       
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
    
    ${roomsGuests()}
    </ul>
    
    `;
  } else {
    noData(body);
  }
};

export const getBookingRoomsGuests = async (idBooking) => {
  let data = null;
  loading(true);
  try {
    const result= await getDataBookingRoomsGuests(idBooking);

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

const totalGuests = () => {
  let adults = 0;
  let childs = 0;
  dataBooking.map((data) => {
    adults += data.adultos;
    childs += data.ninos;
  });

  return { adults: adults, childs: childs };
};

const roomsGuests = () => {
  return dataBooking.map((data) => {
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
};

export const closeWindow = () => {
  let btnCloseWindow = document.querySelector(".btnCloseWindow");
  const modal = document.querySelector(".modalOptionsBookingClient");

  btnCloseWindow.addEventListener("click", () => {
    optionModal(modal, "none");
  });
};

const noData = (body) => {
  body.innerHTML = `
    <div class="noData">
         <img src="../../../img/sinDatos.png">
         <span>Ups, no se pudieron encontrar los datos</span>
        
    </div>
     `;
};
