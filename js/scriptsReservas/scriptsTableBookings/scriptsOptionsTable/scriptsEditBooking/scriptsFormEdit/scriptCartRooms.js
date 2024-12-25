import { getBookingRoomsDetails } from "../../../../../scriptsRooms/scriptRooms.js";
import { alertGuests } from "../scriptsRoomsAvailables/scriptRoomsAvailables.js";
export let roomsCart = [];

let cartRooms, idBookingGlobal, roomsBooking, amount, divTotal;

export const configRoomsCart = async (idBooking, nights) => {
  cartRooms = document.querySelector(".cartRooms");
  divTotal = document.querySelector(".total");
  idBookingGlobal = idBooking;

  roomsBooking = await getRoomsBooking();

  if (roomsBooking) {
    drawRoomsInCart(nights);
  }
};


const getRoomsBooking = async () => {
  let data;
  loadingRoomsCart(true);

  try {
    const roomsBookingData = await getBookingRoomsDetails(idBookingGlobal);
    if (roomsBookingData) {
      data = roomsBookingData;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingRoomsCart(false);
    if (!data) {
      noRoomsCart("Ups,no se pudieron cargar las habitaciones");
    }
    return data;
  }
};

const noRoomsCart = (error) => {
  cartRooms.querySelector("ul").innerHTML = `
    <div class="noDataRoomsCart">
     <img src="../../../img/emptyData.png">
  <span>${error}</span>
    </div>
    `;
};

const loadingRoomsCart = (state) => {
  if (state) {
    cartRooms.querySelector("ul").innerHTML = `
        <div class="loadingRoomsCart">
      <span>Cargando habitaciones</span>
               <img src="../../../img/spinnerBooking.gif">
        </div>
        `;
  } else {
    cartRooms.querySelector("ul").innerHTML = ` `;
  }
};

export const drawRoomsInCart = (nights) => {
  roomsCart = roomsBooking.map((room) => {
    room.totalRoom = room.priceRoom * nights;
    return room;
  });

  let liRoomsCart = roomsCart.map((room) => {
    let statusAddedClass = "statusAddedPreviously";

    if (room.status != "Actual") {
      statusAddedClass = "statusAddedNew";
    }
    return `
     
  <li>
   
      <div class="header">
      <span>${room.category}</span>
         <span class=${statusAddedClass} >${room.status}</span>
      <img class="delete" data-num-room=${room.numRoom}  src="../../../img/basura.png">
      
      </div>
  
      <div class="row">
      <div class="icon">
       <img src="data:image/png;base64,${room.icon}">
      </div>
      
      <div class="info">
       <h5>Habitacion ${room.numRoom}</h5>
      
        <div class="guests">
              <div class="containAdults">
                <span>Adultos:${room.adults}</span>
              </div>
              <div class="containChilds">
               <span>Niños:${room.childs}</span>
               </div>
               </div>
      
       </div>
      
      </div>
     
      <div class="price">
      <span>US$${room.totalRoom}</span>
      </div>
      </li>
      `;
  });

  cartRooms.querySelector("ul").innerHTML = liRoomsCart.join("");
  calculateAmount();
};

const calculateAmount = () => {
  amount = roomsCart.reduce((ac, room) => {
    return (ac += room.totalRoom);
  }, 0);

  divTotal.style.display = "flex";
  divTotal.querySelector("span").textContent = `Total: US$${amount}`;
};


export const createItemRoom = (room) => {
  let roomFind = roomsCart.find((roomCart) => roomCart.numRoom == room.numRoom);
  if (roomFind) {
    alertGuests("La habitacion " + roomFind.numRoom + " ya esta agregada");
  } else {
    addRoom(room);
  }
};

const addRoom = (room) => {
  roomsCart.push(room);
};