export const drawHotelRooms = (rooms) => {
 let  hotelRoomsPrint = rooms.map((room) => {
    return `
  
    <div class="containRoom" data-category="${room.category}">
  

        <div class="containTitleAndRoom">
            <div class="img">  
            <ul>
            <li>
             <img class="imageSlider" src="data:image/png;base64,${room.imageTwo}">
            </li>
             <li>
             <img class="imageSlider" src="data:image/png;base64,${room.imageOne}">
            </li>
             <li>
             <img class="imageSlider" src="data:image/png;base64,${room.imageThree}">
            </li>
            </ul>  
              <div class="controls">

              <img data-category=${
                room.category
              } class="prev" src="../../img/prevRoom.png">
                  <img data-category=${
                    room.category
                  } class="next" src="../../img/nextRoom.png">
            </div>

            <div class="indexImagesRoom">

              <li></li>
              <li></li>
              <li></li>
            </div>
            </div>
            <div class="titleRoom">
  
                <div class="title">
                    <span>${room.category}</span>
                </div>
  
                <div class="icon">
  
                    <img src="../../img/room.png">
                </div>
            </div>
            <div class="containAvailableRooms">

            </div>
        </div>
  
  
        <ul class="detailsRoom">
  
            <li>
  
                <div class="title">
                    <div>
                        <img src="../../img/audience.png">
                    </div>
                    <div>
                        <h6>Capacidad</h6>
  
                    </div>
                </div>
  
                <div class="value">
                    <span>${room.ability} personas</span>
                </div>
            </li>
  
            <li class="night">
  
                <div class="title">
                    <div>
                        <img src="../../img/night.png">
                    </div>
  
                    <div>
                        <h6>Noche minima</h6>
  
                    </div>
                </div>
  
                <div class="value">
                    <span>1</span>
                </div>
  
            </li>
  
            <li class="beds">
                <div class="title">
  
                    <div>
                        <img src="../../img/bed.png">
                    </div>
  
                    <div>
  
                        <h6>Camas</h6>
                    </div>
                </div>
  
                <div class="value">
                    <span>${room.beds}</span>
                </div>
  
            </li>
  
            <li class="price">
                <div class="title">
                    <div>
                        <img src="../../img/coin.png">
                    </div>
                    <div>
                        <h6>Precio</h6>
                    </div>
                </div>
  
                <div class="value">
                    <span>U$S ${room.price}</span>
                </div>
  
            </li>
        </ul>
  
        <div class="containForm">
  
  
            <div class="containSelectGuests">
  
                <div class="containSelect">
  
                    <div>
                        <label>Adultos</label>
                    </div>
  
                    <div>
                        <input type="number" value="0" min=0 max=${
                          room.ability
                        } data-ability="${room.ability}" class="adult">
                           
                   
                    </div>
  
  
                </div>
  
                <div class="containSelects">
                    <div>
                        <label>Niños</label>
                    </div>
                    <div>
                        <input 
                        type="number" value="0" min=0 max=${
                          room.ability - 1
                        } data-ability="${room.ability - 1}"  class="children">
                           
                   
                    </div>  
                </div>

            </div>
  
            <div class="containButton" data-data-room='${JSON.stringify(room)}'>
                <button class="buttonAdd">Agregar</button>
            </div>
        </div>
  
  
  
    </div>
  
    `;
  });

  return hotelRoomsPrint;
};
