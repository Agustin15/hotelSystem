import { loadingPage, pageNotFound } from "../dashboard.js";
import { configEditRoom } from "./editRoom/editRoom.js";
import { getAllCategoryRoomsWithDetails } from "./methodsFetch.js";
import {
  indexGetValue,
  displayIndexItemRoom,
  eventsButtonsSlider
} from "../../scriptsSelectRooms/slider.js";

let roomsUl;
export let modalRooms;

export const configListRooms = async () => {
  modalRooms = document.querySelector(".modalRooms");
  roomsUl = document.querySelector(".categoryRooms");
  displayCategoryRooms();
};

export const displayCategoryRooms = async () => {
  let roomsCategory = await allCategoryRoomsWithDetails();

  if (roomsCategory) {
    drawCategoryRooms(roomsCategory);
  }
};

const drawCategoryRooms = async (roomsCategory) => {
  let roomsCategoryItems = roomsCategory.map((room) => {
    return `
    <div class="containRoom" data-category="${room.categoria}">
    <div class="row">
     <div class="images">
       <ul>
       <li><img class="imageSlider" src="data:image/png;base64,${room.imagenTres}"></li>
       <li><img class="imageSlider" src="data:image/png;base64,${room.imagenDos}"></li>
        <li><img class="imageSlider" src="data:image/png;base64,${room.imagenUno}"></li>
       </ul>
         <div class="controls">

              <img data-category=${room.categoria} class="prev" src="../../../img/prevRoom.png">
                  <img data-category=${room.categoria} class="next" src="../../../img/nextRoom.png">
            </div>

            <div class="indexImagesRoom">
              <li></li>
              <li></li>
              <li></li>
            </div>
       </div>
     <div class="dataRoom">
     <div class="title">
         <h3>${room.categoria}</h3>
         <img src="../../../img/room.png">
         </div>
         <div class="rowData">
       <div class="columnOne">
       <div class="data">
       <div class="titleData">
         <img src="../../../img/audience.png">
       <span>Capacidad</span>
       </div>
           <a>${room.capacidad}</a>
       </div>
       
       <div class="data">
        <div class="titleData">
         <img src="../../../img/terrace.png">
          <span>Terrazas</span>
       </div>
       <a>${room.terraza}</a>
       </div>
       </div>
         <div class="columnTwo">
         <div class="data">
          <div class="titleData">
         <img src="../../../img/bed.png">
       <span>Camas</span>
       </div>
       <a>${room.camas}</a>
       </div>
       <div class="data">
          <div class="titleData">
         <img src="../../../img/coin.png">
       <span>Precio</span>
       </div>
       <a>US$${room.precio}</a>
       </div>
       </div>
       </div>
       
     </div>
     </div>
     <div class="containButton">
     <button id="${room.categoria}" class="btnEditRoom"> 
     Editar 
     <img src="../../../img/editProfileAvatar.png">
     </button>
     </div>
    </div>
    `;
  });

  roomsUl.innerHTML = roomsCategoryItems.join("");
  document.querySelectorAll(".containRoom").forEach((element) => {
    let index;
    let category = element.dataset.category;
    index = indexGetValue(index, category);
    displayIndexItemRoom(element.querySelector("ul"), index);
  });
  eventsButtonsSlider();
  eventEditsButtons(roomsCategory);
};

const allCategoryRoomsWithDetails = async () => {
  let rooms;
  loading(true);
  try {
    const result = await getAllCategoryRoomsWithDetails();
    if (result) {
      rooms = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(true);
    if (!rooms) {
      noData();
    }
    return rooms;
  }
};

const loading = (state) => {
  if (state) {
    roomsUl.innerHTML = `

<div class="loading">
<span>Cargando habitaciones</span>
<img src="../../../img/spinnerMain.gif">
</div>
`;
  } else {
    roomsUl.innerHTML = ``;
  }
};

const noData = () => {
  roomsUl.innerHTML = `
  
  <div class="noData">
  <img src="../../../img/sinDatos.png">
 <span>Ups, no se encontraron las habitaciones</span>
  </div>
  `;
};

const eventEditsButtons = (roomsCategory) => {
  document.querySelectorAll(".btnEditRoom").forEach((btn) => {
    btn.addEventListener("click", () => {
      let category = btn.id;

      let roomFound = roomsCategory.find((room) => room.categoria == category);
      openEditRoom(roomFound);
    });
  });
};

const openEditRoom = async (roomFound) => {
  modalRooms.style.display = "flex";
  let page;

  loadingPage(false, modalRooms);
  try {
    const response = await fetch("optionEditRoom/edit.html");
    const result = await response.text();
    if (response.ok && result) {
      page = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(true, modalRooms);
    if (page) {
      modalRooms.innerHTML = page;
      window.scrollTo(0, 0);
      configEditRoom(roomFound);
    } else {
      pageNotFound(modalRooms);
    }
  }
};
