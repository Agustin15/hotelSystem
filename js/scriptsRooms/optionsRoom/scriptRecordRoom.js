import {
  getAllBookingsByRoomAndYear,
  getAllBookingsByRoomAndYearLimit
} from "../scriptRooms.js";
import { BACK_URL_LOCALHOST, FRONT_URL_LOCALHOST } from "../../urlLocalhost.js";
import { modalMainRooms } from "../scriptListRooms.js";
import { invalidAuthentication } from "../../scriptsAdmin/userData.js";

let numRoom, containData, selectYear, limitPages, tbody, tfoot, controlsIndex;
let index = 1;
let offset = 0;
let actualYear = new Date().getFullYear();

export const configRecordRoom = async () => {
  numRoom = document.querySelector(".mainContain").id;
  containData = document.querySelector(".containData");

  close();
  let years = await getYears();

  if (years) {
    drawContainTable(years);

    if (selectYear) {
      displayTable();
    }
  }
};

const getYears = async () => {
  let url =
    `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params=` +
    JSON.stringify({ option: "getAllYearsWithRoomsBooking" });

  let data = null;
  loading(true);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      }
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(true, containData);
    if (!data) {
      noData("No se encontraron reservas en esta habitacion");
    }
    return data;
  }
};

const noData = (msj) => {
  containData.innerHTML = `
    <div class="noData">
      <img src="../../../img/sinDatos.png">
      <h4>${msj}</h4>
    </div>
  `;
};

const loading = (state) => {
  if (state) {
    containData.innerHTML = `
      <div class="loading">
        <span>Cargando datos</span>
         <img src="../../../img/spinnerMain.gif">
      </div>
    `;
  } else {
    containData.innerHTML = ``;
  }
};

const drawContainTable = (years) => {
  containData.innerHTML = `

 <div class="containTable">
   
  <h4 class="titleBookingsRecord">Registros reservas ${actualYear}</h4>
 <div class="headerTable">
 <div class="containInput">
   <input class="inputSearch" type="text" placeholder="Buscar...">
   <button class="btnSearch">
    <img src="../../../img/search.png">
   </button>
   </div>

   <div class="searchSelect">
        <div class="containSelect">
       <select class="selectYear"></select>
       <button class="searchByYear">
      <img src="../../../img/search.png">
       </button>
       </div>
   </div>
 
 </div>
 <div class="scrollTableRecord">
  <table>
 <thead>
 <tr>
 <th>Id Reserva</th>
 <th>Cliente</th>
 <th>Llegada</th>
 <th>Salida</th>
 </tr>
 </thead>
 <tbody></tbody>
<tfoot></tfoot>
</table>
</div>
<div class="controls"></div>
 </div>

`;

  controlsIndex = document.querySelector(".controls");
  tfoot = document.querySelector(".containTable").querySelector("tfoot");
  tbody = document.querySelector(".containTable").querySelector("tbody");
  drawOptionsYear(years);
};

const drawOptionsYear = (years) => {
  selectYear = document.querySelector(".selectYear");

  let optionYears = years.map((year) => {
    return `
      
    <option selected=${year == actualYear ? true : false} value=${Object.values(
      year
    )}>${Object.values(year)}</option>
    `;
  });

  selectYear.innerHTML = optionYears;
};

const allBookingsByRoomAndYear = async () => {
  let data;
  loadingTable(true);
  try {
    const result = await getAllBookingsByRoomAndYear(selectYear.value, numRoom);
    data = result;
  } catch (error) {
    console.log(error);
  } finally {
    loadingTable(false);
    if (!data || data.length == 0) {
      noDataTable();
    }
    return data;
  }
};

const allBookingsByRoomAndYearLimit = async () => {
  let data;
  loadingTable(true);
  try {
    const result = await getAllBookingsByRoomAndYearLimit(
      offset,
      selectYear.value,
      numRoom
    );
    data = result;
  } catch (error) {
    console.log(error);
  } finally {
    loadingTable(false);

    if (!data || data.length == 0) {
      noDataTable();
    }
    return data;
  }
};

const displayTable = async () => {
  let allBookingsRoom = await allBookingsByRoomAndYear();
  let titleBookingsRecord = document.querySelector(".titleBookingsRecord");

  titleBookingsRecord.textContent = `Registros reservas ${selectYear.value}`;

  if (allBookingsRoom && allBookingsRoom.length > 0) {
    controlsIndex.style = "flex";
    limitPages = Math.ceil(allBookingsRoom.length / 5);
    drawTable();
  } else {
    controlsIndex.style = "none";
  }
};

const drawTable = async () => {
  let allBookingsRoomLimit = await allBookingsByRoomAndYearLimit();

  let rowsTable = allBookingsRoomLimit.map((booking, index) => {
    return `
    <tr class=${index % 2 != 0 ? "rowGray" : "rowWhite"}>
    <td>
    <div class="iconIdBooking">
    <img src="../../../img/reservaId.png">
    <span>${booking.idReserva}</span>
    </div>
    </td>
    <td><span id=${booking.idCliente} class="client">${
      booking.correo
    }</span></td>
    <td>${booking.fechaLlegada}</td>
    <td>${booking.fechaSalida}</td>
    </tr>
   `;
  });

  tbody.innerHTML = rowsTable.join("");

  eventSearchByYear();
  controlsIndexPage();
  searchBooking();
  redirectToTableBookings();
  redirectToTableClients();
};

const eventSearchByYear = () => {
  document
    .querySelector(".searchByYear")
    .addEventListener("click", async () => {
      index = 1;
      offset = 0;
      displayTable();
    });
};

const controlsIndexPage = () => {
  controlsIndex.innerHTML = `
  <span class="prev">Anterior</span>
  <span class="pageIndex">${index}/${limitPages}</span>
  <span class="next">Siguiente</span>`;

  let next = controlsIndex.querySelector(".next");
  let prev = controlsIndex.querySelector(".prev");
  let pageIndex = controlsIndex.querySelector(".pageIndex");

  next.addEventListener("click", () => {
    if (index < limitPages) {
      index++;
      offset += 5;
      pageIndex.textContent = `${index}/${limitPages}`;

      displayTable();
    }
  });

  prev.addEventListener("click", () => {
    if (index > 1) {
      index--;
      offset -= 5;
      pageIndex.textContent = `${index}/${limitPages}`;

      displayTable();
    }
  });
};

const searchBooking = () => {
  let input = document.querySelector(".inputSearch");
  let btnSearch = document.querySelector(".btnSearch");

  btnSearch.addEventListener("click", () => {
    let rows = tbody.querySelectorAll("tr");

    rows.forEach((row) => {
      if (row.innerText.indexOf(input.value.trim()) > -1) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });

    let rowsHidden = [...rows].filter((row) => row.style.display == "none");
    if (rowsHidden.length == rows.length) {
      noFound(true);
    } else {
      noFound(false);
    }
  });
};

const noFound = (state) => {
  if (state) {
    tfoot.innerHTML = `
    <td rowspan="${window.innerWidth <= 600 ? 2 : 4}" colspan=${
      window.innerWidth <= 600 ? 2 : 4
    }">
  <div class="containNoFound">
<img src="../../../img/noFind.png">
<h3>No se encontraron resultados</h3>
</div>
  
  </td>
`;
  } else {
    tfoot.innerHTML = ``;
  }
};

const noDataTable = () => {
  tbody.innerHTML = ``;
  tfoot.innerHTML = `
   <td rowspan="${window.innerWidth <= 600 ? 2 : 4}" colspan=${
    window.innerWidth <= 600 ? 2 : 4
  }">
  <div class="containNoFound">
<img src="../../../img/sinDatos.png">
<h3>Ups,no se encontraron reservas</h3>
</div>
</td>
`;
};

const loadingTable = (state) => {
  tbody.innerHTML = ``;

  if (state) {
    tfoot.innerHTML = `
     <td rowspan="${window.innerWidth <= 600 ? 2 : 4}" colspan=${
      window.innerWidth <= 600 ? 2 : 4
    }">
  <div class="loading">
        <span>Cargando datos</span>
         <img src="../../../img/spinnerMain.gif">
      </div>
</td>
`;
  } else {
    tfoot.innerHTML = ``;
  }
};

const redirectToTableBookings = () => {
  let divsIdBooking = document.querySelectorAll(".iconIdBooking");

  divsIdBooking.forEach((div) => {
    let spanIdBooking = div.querySelector("span");

    spanIdBooking.addEventListener("click", () => {
      localStorage.setItem("actualOptionBooking", "bookingsTable.html");
      window.open(
        `${FRONT_URL_LOCALHOST}views/admin/reservas/index.php?idBooking=` +
          spanIdBooking.textContent
      );
    });
  });
};

const redirectToTableClients = () => {
  let spansClient = document.querySelectorAll(".client");

  spansClient.forEach((span) => {
    span.addEventListener("click", () => {
      localStorage.setItem("actualOptionClient", "clientsTable.html");
      window.open(
        `${FRONT_URL_LOCALHOST}views/admin/clientes/index.php?idClient=` +
          span.id
      );
    });
  });
};

export const close = () => {
  let btnClose = document.querySelector(".btnClose");

  btnClose.addEventListener("click", () => {
    modalMainRooms.innerHTML = ``;
    modalMainRooms.style.display = "none";
  });
};
