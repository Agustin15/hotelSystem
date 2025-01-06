import {
  getRoomsCategoryHotel,
  getRoomsFreeCategory,
} from "../../../../../scriptsRooms/scriptRooms.js";
import {
  startBookingSetting,
  endBookingSetting,
  nights,
} from "../scriptsFormEdit/scriptFormEdit.js";
import { createItemRoom } from "../scriptsFormEdit/scriptCartRooms.js";

let menuRooms, containCategoryRooms;

export const configRoomsAvailables = async () => {
  menuRooms = document.querySelector(".menuRooms");
  containCategoryRooms = document.querySelector(".category");

  drawTitle();
  await drawMenuRoomsCategoryHotel(menuRooms);
  let firstCategoryRoom = menuRooms.querySelector("li").dataset.categoryRoom;
  loadFreeRooms(firstCategoryRoom);
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

const drawTitle = () => {
  let title = document.querySelector(".title").querySelector("h3");

  title.textContent = `Habitaciones disponibles entre la fecha ${startBookingSetting} y ${endBookingSetting}`;
};

const loadFreeRooms = async (category) => {
  let results = await availablesRoomsCategory(category);
  if (results) {
    drawRoomsFreeCategory(results);
  }
};

const availablesRoomsCategory = async (category) => {
  const dataBooking = {
    category: category,
    startBooking: startBookingSetting,
    endBooking: endBookingSetting,
  };

  let data = null;

  loadingRooms(true);
  try {
    const result = await getRoomsFreeCategory(dataBooking);
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingRooms(false);
    if (!data) {
      noRooms();
    }

    return data;
  }
};

const loadingRooms = (state) => {
  if (state) {
    containCategoryRooms.querySelector("ul").innerHTML = `

<div class="loadingRooms">
<span>Cargando habitaciones disponbiles</span>
<img src="../../../img/spinnerMain.gif">
</div>

`;
  } else {
    containCategoryRooms.querySelector("ul").innerHTML = ``;
  }
};

const noRooms = () => {
  containCategoryRooms.querySelector("ul").innerHTML = `
<div class="noDataFreeRooms">
<img src="../../../img/sinDatos.png">
<h3>Ups, no se pudieron cargar las habitaciones disponibles</h3>
</div>
`;
};

const drawRoomsFreeCategory = async (roomsAvailableCategory) => {
  let categoryValue = roomsAvailableCategory[0]["category"];
  containCategoryRooms.querySelector(".titleCategory").textContent =
    categoryValue;

  let liRooms = roomsAvailableCategory.map((room) => {
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

  containCategoryRooms.querySelector("ul").innerHTML = liRooms.join("");
  addRoomToCart();
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
          priceRoom: dataRoom.price,
          status:"Nueva",
          icon: dataRoom.icon,
          adults: adultsQuantity,
          childs: childsQuantity,
          totalRoom: parseInt(dataRoom.price) * nights,
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
  let modalOptionEditBooking = document.querySelector(
    ".modalOptionEditBooking"
  );

  modalOptionEditBooking.innerHTML = `
  
  <div class="alertGuests">

  <img src="../../../img/advertenciaDelete.png">
  <h3>¡Advertencia!</h3>

  <p>${msj}</p>

  <button>OK</button>
  </div> `;

  modalOptionEditBooking.style.display = "flex";
  let buttonOk = modalOptionEditBooking.querySelector("button");

  buttonOk.addEventListener("click", () => {
    removeAlertGuests(modalOptionEditBooking);
  });
};

const removeAlertGuests = (modalOptionEditBooking) => {
  modalOptionEditBooking.innerHTML = ``;

  modalOptionEditBooking.style.display = "none";
};
