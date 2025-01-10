import { getRoomsCategoryHotel, getAllRoomsByCategory } from "./scriptRooms.js";

let ulRooms, menuRooms, category;

export const configListRooms = async () => {
  ulRooms = document.querySelector(".itemsRooms");
  menuRooms = document.querySelector(".categorysRooms");
  let roomsCategorys = await roomsCategoryHotel();
  if (roomsCategorys) {
    drawMenuRooms(roomsCategorys);
    let rooms = await roomsByCategory();
    if (rooms) {
      drawRooms(rooms);
    }
  }
};

const roomsCategoryHotel = async () => {
  drawLoading(true);
  let data;
  try {
    let roomsCategorys = await getRoomsCategoryHotel();

    if (roomsCategorys) {
      data = roomsCategorys;
    }
  } catch (error) {
    console.log(error);
  } finally {
    drawLoading(false);
    if (!data) {
      drawNoData();
    }

    return data;
  }
};

const drawMenuRooms = (roomsCategorys) => {
  let itemsRooms = roomsCategorys.map((room) => {
    return `<li>
    <img src="data:image/png;base64,${room.imageTwo}">
    <span>${room.category}</span>
   </li> `;
  });

  menuRooms.innerHTML = itemsRooms.join("");
  category = roomsCategorys[0].category;
};

const drawLoading = (state) => {
  if (state) {
    ulRooms.innerHTML = `
    
    <div class="loading">
    <span>Cargando habitaciones</span>
    <img src="../../../img/spinnerMain.gif">
    </div>

    `;
  } else {
    ulRooms.innerHTML = ``;
  }
};

const drawNoData = () => {
  ul.innerHTML = `
      
      <div class="noData">
      <img src="../../../img/sinDatos.png">
      <span>Ups,no se pudieron cargar las habitaciones</span>
      </div>
  
      `;
};

const roomsByCategory = async () => {
  drawLoading(true);
  let data;
  try {
    const rooms = await getAllRoomsByCategory(category);
    if (rooms) {
      data = rooms;
    }
  } catch (error) {
    console.log(error);
  } finally {
    drawLoading(false);
    if (!data) {
      drawNoData();
    }
    return data;
  }
};

const drawRooms = (rooms) => {
  let ulRooms = document.querySelector(".itemsRooms");
  let roomsItems = rooms.map((room) => {
    return ` 
      <li>
      <div class="rowOne">
      <div class="icon">
       <img src="data:image/png;base64,${room.imageTwo}">
       </div>
       <div class="details">
       <span class="number">Habitacion ${room.numRoom}</span>
       <span class=${
         room.state == "available" ? "stateAvailable" : "stateBusy"
       }>${room.state == "available" ? "Disponible" : "Ocupada"}</span>

       <div class=${
         room.bookingRoom ? "containBookingShow" : "containBookingHide"
       }>

       <img src="../../../img/reserva.png">
       <span id="${room.bookingRoom}" class="idBooking">Reserva ${
      room.bookingRoom
    }</span>
       </div>
       </div>
       </div>
      </li>
     `;
  });
  ulRooms.innerHTML = roomsItems.join("");

  let spanBooking = document.querySelector(".idBooking");
  spanBooking.addEventListener("click", () => {
    localStorage.setItem("actualOptionBooking", "bookingsTable.html");
    window.open(
      "http://localhost/sistema%20Hotel/views/admin/reservas/index.php?idBooking=" +
        spanBooking.id
    );
  });
};
