import { getAllRoomsByCategory } from "./scriptRooms.js";
import { pageNotFound, loadingPage } from "./dashboardScript.js";
import { configRecordRoom } from "./optionsRoom/scriptRecordRoom.js";
import { configNextBookings } from "./optionsRoom/scriptNextBooking.js";
import { configServices } from "./optionsRoom/scriptServices.js";
import { configDetailsCategory } from "./scriptDetailsCategory.js";
import { getCategoryRoomsData } from "../scriptsAdmin/itemsData.js";
import { chartCategoryStateRooms } from "./scriptChartCategoryRoom.js";
import { FRONT_URL_LOCALHOST } from "../urlLocalhost.js";

let ulRooms, category;
export let modalMainRooms;

export const configListRooms = async () => {
  modalMainRooms = document.querySelector(".modalMainRooms");
  ulRooms = document.querySelector(".itemsRooms");

  let categoryStateRooms = await stateRoomsByCategory();
  if (categoryStateRooms) {
    await displayChartsRooms(categoryStateRooms);
    category = document.querySelector(".containChart").id;
    let rooms = await roomsByCategory();
    if (rooms) {
      drawRooms(rooms);
    }
  }
};

const optionsCategoryRoom = () => {
  document.querySelectorAll(".optionViewRooms").forEach((item) => {
    item.addEventListener("click", async () => {
      category = item.parentElement.parentElement.id;
      roomOptionSelected(item.parentElement.parentElement);
      let rooms = await roomsByCategory();
      if (rooms) {
        drawRooms(rooms);
      }
    });
  });
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
  ulRooms.innerHTML = `
      
      <div class="noData">
      <img src="../../../img/sinDatos.png">
      <span>Ups,no se pudieron cargar las habitaciones</span>
      </div>
  
      `;
};

const roomOptionSelected = (item) => {
  let itemsSelected = [...document.getElementsByClassName("selected")];

  if (itemsSelected.length > 0) {
    itemsSelected[0].classList.remove("selected");
  }
  item.classList.add("selected");
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
      <div class="containIconMenu">
       <img class="iconMenu" src="../../../img/menuRoom.png">       
      </div>
      <ul id=${room.numRoom} style="display:none" class="menuOptions">
      <li class="optionMenuRoom" data-url="optionsMenu/record.php?numRoom=${
        room.numRoom
      }">
      <img src="../../../img/historyBookings.png">
      Historial reservas
      </li>
      <li class="optionMenuRoom" data-url="optionsMenu/nextBookings.php?numRoom=${
        room.numRoom
      }">
      <img src="../../../img/nextBookings.png">
      Proximas reservas
      </li>
      <li class="optionMenuRoom ${
        room.state == "available" ? "optionMenuRoomDisabled" : ""
      }" data-state=${room.state} data-url="optionsMenu/services.php?numRoom=${
      room.numRoom
    }">

      <img src="../../../img/services.png">
      Servicios
      </li>
      </ul>
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

  let spansBooking = document.querySelectorAll(".idBooking");

  if (spansBooking) {
    spansBooking.forEach((span) => {
      span.addEventListener("click", () => {
        localStorage.setItem("actualOptionBooking", "bookingsTable.html");
        window.open(
          `${FRONT_URL_LOCALHOST}views/admin/reservas/index.php?idBooking=` +
            span.id
        );
      });
    });
  }

  openOptionsRoom();
  optionMenuRoom();
};

const openOptionsRoom = () => {
  let iconsMenu = document.querySelectorAll(".iconMenu");
  iconsMenu.forEach((iconMenu) => {
    iconMenu.addEventListener("click", () => {
      let menuOptions =
        iconMenu.parentElement.parentElement.querySelector(".menuOptions");

      if (menuOptions.style.display == "none") {
        menuOptions.style.display = "flex";
      } else {
        menuOptions.style.display = "none";
      }
      checkShowMenu(menuOptions);
    });
  });
};

const optionMenuRoom = () => {
  let optionsMenuRoom = [...document.querySelectorAll(".optionMenuRoom")];
  optionsMenuRoom.forEach((option) => {
    option.addEventListener("click", () => {
      let url = option.dataset.url;
      if (!option.dataset.state || option.dataset.state == "busy") {
        getOptionRoomPage(url);
      }
    });
  });
};

const getOptionRoomPage = async (url, category) => {
  let data;
  modalMainRooms.style.display = "flex";
  window.scrollTo(0, 0);
  loadingPage(true, modalMainRooms);
  try {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok && result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, modalMainRooms);
    if (data) {
      drawDocument(data, url, category);
    } else {
      pageNotFound(modalMainRooms);
    }
  }
};

const drawDocument = (document, url, category) => {
  modalMainRooms.innerHTML = document;

  const functionsOptions = [
    {
      page: "record.php",
      function: configRecordRoom
    },
    {
      page: "nextBookings.php",
      function: configNextBookings
    },
    {
      page: "services.php",
      function: configServices
    },
    {
      page: "details.html",
      function: configDetailsCategory
    }
  ];

  let functionOption = functionsOptions.find(
    (option) => url.indexOf(option.page) > -1
  );

  if (category) {
    functionOption.function(category);
  } else {
    functionOption.function();
  }
};

const checkShowMenu = (menuCurrent) => {
  let menusRoom = [...document.querySelectorAll(".menuOptions")];
  let menuRoomShow = menusRoom.find(
    (menu) => menu.id != menuCurrent.id && menu.style.display == "flex"
  );
  if (menuRoomShow) {
    menuRoomShow.style.display = "none";
  }
};

const stateRoomsByCategory = async () => {
  let data;

  drawLoading(true);
  try {
    const result = await getCategoryRoomsData();

    if (result) {
      data = result;
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

const displayChartsRooms = async (data) => {
  let containCharts = document.querySelector(".containCharts");

  let charts = data.map((dataRoom) => {
    return `
      
    <div class="containChart" id="${dataRoom.category}"> 
    <div class="title">
    <span>${dataRoom.category}<span>
    <img class="infoCategory" src="../../../img/detalles.png">
    </div>
      <div id="chart${dataRoom.category}"></div>
      <div class="viewRooms">
      <img class="optionViewRooms" src="../../../img/ver.png">
      </div>
    </div>
    `;
  });

  containCharts.innerHTML = charts.join("");
  drawCharts(data);
  optionsCategoryRoom();
};

const drawCharts = async (data) => {
  data.map((dataRoom) => {
    chartCategoryStateRooms(
      dataRoom,
      document.getElementById(`chart${dataRoom.category}`)
    );
  });

  let infosCategory = document.querySelectorAll(".infoCategory");

  infosCategory.forEach((info) => {
    info.addEventListener("click", () => {
      let category = info.parentNode.parentNode.parentNode.parentNode.id;
      getOptionRoomPage("detailsCategoryRoom/details.html", category);
    });
  });
};
