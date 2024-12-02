import { getRoomsCategoryHotel } from "../../scriptsRooms/scriptRooms.js";
import { getRoomsFreeCategory } from "../../scriptsRooms/scriptRooms.js";
import { loading } from "../../scriptsClientes/scriptAddClient.js";
import { createItemRoom } from "./scriptCartRooms.js";
import { nights } from "./scriptFormAdd.js";

let startBookingLocal;
let endBookingLocal;
let ulRooms;
let categoryRoomsFree;

export const configFreeRooms = (startBooking, endBooking) => {
  startBookingLocal = startBooking;
  endBookingLocal = endBooking;

  let menuRooms = document.querySelector(".menuRooms");
  let title = document.querySelector(".title").querySelector("h3");
  title.textContent = `Habitaciones disponibles entre la fecha ${startBooking} y ${endBooking}`;

  drawMenuRoomsCategoryHotel(menuRooms);
  loadFreeRooms("Deluxe");
};

const loadFreeRooms = async (category) => {
  let results = await freeRoomsCategory(category);

  categoryRoomsFree = document.querySelector(".category");
  ulRooms = categoryRoomsFree.querySelector("ul");

  if (results) {
    drawRoomsFreeCategory(results);
    addRoomToCart();
  } else {
    noData();
  }
};

const drawMenuRoomsCategoryHotel = async (menuRooms) => {
  const roomsCategory = await getRoomsCategoryHotel();

  if (roomsCategory) {
    let liRoomsCategory = roomsCategory.map((roomCategory) => {
      return `
         <li data-category-room=${roomCategory.category}>
       
          <img src="data:image/png;base64,${roomCategory.imageTwo}">
          <span>${roomCategory.category}</span>
          
         </li>
   `;
    });

    menuRooms.innerHTML = liRoomsCategory.join("");

    menuRooms.querySelectorAll("li").forEach((option) => {
      option.addEventListener("click", () => {
        let category = option.dataset.categoryRoom;
        loadFreeRooms(category);
      });
    });
  }
};

const drawRoomsFreeCategory = async (result) => {
  categoryRoomsFree = document.querySelector(".category");
  let categoryValue = result[0]["category"];
  categoryRoomsFree.querySelector(".titleCategory").textContent = categoryValue;
  ulRooms = categoryRoomsFree.querySelector("ul");

  let liRooms = result.map((room) => {
    return `
       <li>
       <div class="row">
<div class="icon">
           <img src="data:image/png;base64,${room.icon}">
         </div>             
         
         <div class="info">
            <h5>Habitacion ${room.numRoom}</h5>

            <div class="guests">
            <div class="containAdults">
              <span>Adultos</span>
            <input class="adults"  min="0"  value="0" max="${
              room.capacity
            }" type="number">
            </div>

            <div class="containChilds">
             <span>Niños</span>
             <input class="childs" min="0" value="0"  max="${
               room.capacity - 1
             }" type="number">
             </div>
             </div>
         </div>
         </div>
         <div class="containAdd" data-room=${JSON.stringify(room)}>
         <button class="btnAddRoom">Agregar</button>
         </div>
     
         </li>`;
  });

  ulRooms.innerHTML = liRooms.join("");
};

export const freeRoomsCategory = async (category) => {
  const dataBooking = {
    category: category,
    startBooking: startBookingLocal,
    endBooking: endBookingLocal,
  };

  let data = null;

  loading(true);
  try {
    const result = await getRoomsFreeCategory(dataBooking);
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

const addRoomToCart = () => {
  let btnsAddRoom = document.querySelectorAll(".btnAddRoom");

  btnsAddRoom.forEach((btn) => {
    btn.addEventListener("click", () => {
      let dataRoom = JSON.parse(btn.parentElement.dataset.room);
      
      let adultsQuantity = parseInt(
        btn.parentElement.parentElement.querySelector(".adults").value
      );
      let childsQuantity = parseInt(
        btn.parentElement.parentElement.querySelector(".childs").value
      );

      let errorGuests = validationGuests(
        dataRoom.capacity,
        adultsQuantity,
        childsQuantity
      );

      if (errorGuests) {
        alertGuests(errorGuests);
      } else {
        const room = {
          numRoom: dataRoom.numRoom,
          category: dataRoom.category,
          price: parseInt(dataRoom.price) * nights,
          icon: dataRoom.icon,
          adults: adultsQuantity,
          childs: childsQuantity,
          total: parseInt(dataRoom.price) * nights,
        };

        createItemRoom(room);
      }
    });
  });
};

const validationGuests = (capacity, adultsQuantity, childsQuantity) => {
  let error;

  if (adultsQuantity == 0) {
    error = "Debe haber al menos un adulto";
  } else if (adultsQuantity + childsQuantity > capacity) {
    error = "Maxima capacidad de la habitacion excedida";
  }

  return error;
};

export const alertGuests = (msj) => {
  let modalOptionAddBooking = document.querySelector(".modalOptionAddBooking");

  modalOptionAddBooking.innerHTML = `
  
  <div class="alertGuests">

  <img src="../../../img/advertenciaDelete.png">
  <h3>¡Advertencia!</h3>

  <p>${msj}</p>

  <button>OK</button>
  </div> `;

  modalOptionAddBooking.style.display = "flex";
  let buttonOk = modalOptionAddBooking.querySelector("button");

  buttonOk.addEventListener("click", () => {
    removeAlertGuests();
  });
};

const removeAlertGuests = () => {
  let modalOptionAddBooking = document.querySelector(".modalOptionAddBooking");
  modalOptionAddBooking.innerHTML = ``;

  modalOptionAddBooking.style.display = "none";
};

const noData = () => {
  ulRooms.style.overflow = "hidden";
  ulRooms.style.height = "100%";
  ulRooms.innerHTML = `
<div class="noDataFreeRooms">

<img src="../../../img/sinDatos.png">
<h3>Ups, no se pudieron cargar las habitaciones disponibles</h3>
</div>
`;
};
