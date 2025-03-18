import { getDetailsCategoryRoom } from "./scriptRooms.js";
import {
  indexGetValue,
  displayIndexItemRoom,
  eventsButtonsSlider,
  indexSetValue
} from "../scriptsSelectRooms/slider.js";

let contentDetails;

export const configDetailsCategory = async (category) => {
  let modalMainRooms = document.querySelector(".modalMainRooms");
  contentDetails = document.querySelector(".contentDetails");

  let btnClose = document.querySelector(".btnClose");

  btnClose.addEventListener("click", () => {
    indexSetValue(category, 1);
    modalMainRooms.innerHTML = ``;
    modalMainRooms.style.display = "none";
  });

  let details = await dataCategoryRoom(category);
  if (details) {
    displayDetailsCategory(details);
  }
};

const displayDetailsCategory = async (details) => {
  contentDetails.innerHTML = `
    
       <div class="containRoom" data-category="${details.categoria}">
    <div class="row">
     <div class="images">
       <ul>
       <li><img class="imageSlider" src="data:image/png;base64,${details.imagenTres}"></li>
       <li><img class="imageSlider" src="data:image/png;base64,${details.imagenDos}"></li>
        <li><img class="imageSlider" src="data:image/png;base64,${details.imagenUno}"></li>
       </ul>
         <div class="controls">

              <img data-category=${details.categoria} class="prev" src="../../../img/prevRoom.png">
                  <img data-category=${details.categoria} class="next" src="../../../img/nextRoom.png">
            </div>

            <div class="indexImagesRoom">
              <li></li>
              <li></li>
              <li></li>
            </div>
       </div>
     <div class="dataRoom">
     <div class="title">
         <h3>${details.categoria}</h3>
         <img src="../../../img/room.png">
         </div>
         <div class="rowData">
       <div class="columnOne">
       <div class="data">
       <div class="titleData">
         <img src="../../../img/audience.png">
       <span>Capacidad</span>
       </div>
           <a>${details.capacidad}</a>
       </div>
       
       <div class="data">
        <div class="titleData">
         <img src="../../../img/terrace.png">
          <span>Terrazas</span>
       </div>
       <a>${details.terraza}</a>
       </div>
       </div>
         <div class="columnTwo">
         <div class="data">
          <div class="titleData">
         <img src="../../../img/bed.png">
       <span>Camas</span>
       </div>
       <a>${details.camas}</a>
       </div>
       <div class="data">
          <div class="titleData">
         <img src="../../../img/coin.png">
       <span>Precio</span>
       </div>
       <a>US$${details.precio}</a>
       </div>
       </div>
       </div>
       
     </div>
     </div>
    </div>
     `;

  let containRoom = document.querySelector(".containRoom");
  let index;
  let category = containRoom.dataset.category;
  index = indexGetValue(index, category);
  displayIndexItemRoom(containRoom.querySelector("ul"), index);
  eventsButtonsSlider();
};

const dataCategoryRoom = async (category) => {
  let data;
  loading(true);
  try {
    const result = await getDetailsCategoryRoom(category);
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData();
    }
    return data;
  }
};

const loading = (state) => {
  if (state) {
    contentDetails.innerHTML = `
      
      <div class="loading">
      <span>Cargando detalles</span>
      <img src="../../../img/spinnerMain.gif">
      </div>
  
      `;
  } else {
    contentDetails.innerHTML = ``;
  }
};

const noData = () => {
  contentDetails.innerHTML = `
        
        <div class="noData">
        <img src="../../../img/sinDatos.png">
        <span>Ups,no se encontraron los datos de la categoria</span>
        </div>
    
        `;
};
