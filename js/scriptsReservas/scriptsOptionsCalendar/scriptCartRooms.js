export let roomsCart = [];
export let amount;
let cartRooms;
let divTotal;
import { alertGuests } from "./scriptFreeRooms.js";

export const configCartRooms = () => {
  cartRooms = document.querySelector(".cartRooms");
  divTotal = document.querySelector(".total");
  if (roomsCart.length > 0) {
    drawRoomsCart();
  } else {
    noRoomsCart();
  }
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

const drawRoomsCart = () => {
  let liRoomsCart = roomsCart.map((room) => {
    return `
   
<li>
 
    <div class="header">
    <span>${room.category}</span>
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
    <span>US$${room.price}</span>
    </div>
    </li>
    `;
  });

  cartRooms.querySelector("ul").innerHTML = liRoomsCart.join("");
  btnsDeleteRoomCart();
  calculateAmount();
};

const noRoomsCart = () => {
  cartRooms.querySelector("ul").innerHTML = `
  
  <div class="noRoomsCart">

  <img src="../../../img/emptyCart.png">
  <span>Sin habitaciones elegidas aun</span>
  </div>
  `;

  divTotal.style.display = "none";
};

const calculateAmount = () => {
  amount = roomsCart.reduce((ac, room) => {
    return (ac += room.price);
  }, 0);

  divTotal.style.display = "flex";
  divTotal.querySelector("span").textContent = `Total: US$ ${amount}`;
};

const deleteRoomToCart = (numberRoom) => {
  roomsCart = roomsCart.filter((room) => room.numRoom != numberRoom);
  configCartRooms();
};

export function calculateDifferenceNight(start, end) {
  let differenceTime = end.getTime() - start.getTime();

  let differenceDays = Math.round(differenceTime / (1000 * 3600 * 24));

  return differenceDays;
}

const btnsDeleteRoomCart = () => {
  let deletes = document.querySelectorAll(".delete");

  deletes.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      let numRoomDelete = deleteBtn.dataset.numRoom;
      deleteRoomToCart(numRoomDelete);
    });
  });
};

export const cleanRoomCart = () => {
  roomsCart = [];
  configCartRooms();
};
