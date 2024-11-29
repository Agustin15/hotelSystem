import { getRoomsCategoryHotel } from "../../scriptsRooms/scriptRooms.js";

export const configFreeRooms = () => {
  let menuRooms = document.querySelector(".menuRooms");
  drawMenuRoomsCategoryHotel(menuRooms);
};

const drawMenuRoomsCategoryHotel = async (menuRooms) => {
  const roomsCategory = await getRoomsCategoryHotel();

  if (roomsCategory) {
    let liRoomsCategory = roomsCategory.map((roomCategory) => {
      return `
         <li>
       
          <img src="data:image/png;base64,${room.imageTwo}">
          <span>${roomCategory.category}</span>
          
         </li>
   `;
    });

    menuRooms.innerHTML = liRoomsCategory;
  }
};


