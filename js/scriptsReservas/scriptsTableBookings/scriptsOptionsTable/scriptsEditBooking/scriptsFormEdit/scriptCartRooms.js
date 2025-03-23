import { getBookingRoomsDetails } from "../../../../../scriptsRooms/scriptRooms.js";
import { alertGuests } from "../scriptsRoomsAvailables/scriptRoomsAvailables.js";
import { nights } from "./scriptFormEdit.js";

export let roomsCart = [];
export let roomsBooking;
export let amount;
let cartRooms, idBookingGlobal, divTotal;

export const configRoomsCart = async (idBooking, nights) => {
  cartRooms = document.querySelector(".cartRooms");
  divTotal = document.querySelector(".total");
  idBookingGlobal = idBooking;

  roomsBooking = await getRoomsBooking();

  if (roomsBooking) {
    drawRoomsInCart(nights, "initCart");
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
     <img src="../../../img/emptyCart.png">
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

export const drawRoomsInCart = (nights, option) => {
  if (roomsCart.length == 0) {
    if (option == "initCart") {
      roomsCart = roomsBooking.map((room) => {
        room.totalRoom = room.priceRoom * nights;
        return room;
      });
    } else {
      divTotal.style.display = "none";
      divTotal.querySelector("span").textContent = ``;
      noRoomsCart("Sin habitaciones seleccionadas aun");
      valueInputQuantityRooms();

      return;
    }
  } else {
    roomsCart = roomsCart.map((room) => {
      room.totalRoom = room.priceRoom * nights;
      return room;
    });
  }

  let liRoomsCart = roomsCart.map((room) => {
    let statusAddedClass = "statusAddedPreviously";
    if (room.status != "Actual") {
      statusAddedClass = "statusAddedNew";
    }
    if (room.amountServiceRoom) {
      room.totalRoom += room.amountServiceRoom;
    }
    return `
     
  <li>
   
      <div class="header">
      <span>${room.category}</span>
         <span class=${statusAddedClass} >${room.status}</span>
      <img class="delete" data-num-room=${
        room.numRoom
      }  src="../../../img/basura.png">
      
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
     
      <div class="price" style=${
        room.amountServiceRoom
          ? `"justify-content:space-between"`
          : "justify-content:flex-end"
      }>
      ${
        room.amountServiceRoom
          ? `<span>Servicios:US$${room.amountServiceRoom}</span>`
          : ""
      }
      <span>Total:US$${room.totalRoom}</span>
      </div>
      </li>
      `;
  });

  cartRooms.querySelector("ul").innerHTML = liRoomsCart.join("");
  valueInputQuantityRooms();
  calculateAmount();
  deleteRoom();
};

const valueInputQuantityRooms = () => {
  document.querySelector("#roomsQuantityInput").value = roomsCart.length;
};

const calculateAmount = () => {
  amount = roomsCart.reduce((ac, room) => {
    return (ac += room.totalRoom);
  }, 0);

  divTotal.style.display = "flex";
  divTotal.querySelector("span").textContent = `Total: US$ ${amount}`;
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
  drawRoomsInCart(nights);
};

const deleteRoom = () => {
  let btnsDelete = document.querySelectorAll(".delete");

  btnsDelete.forEach((btnDelete) => {
    btnDelete.addEventListener("click", () => {
      let numRoom = btnDelete.dataset.numRoom;
      roomsCart = roomsCart.filter((room) => room.numRoom != numRoom);
      drawRoomsInCart(nights);
    });
  });
};

export const cleanRoomsCart = () => {
  roomsCart = [];
};
