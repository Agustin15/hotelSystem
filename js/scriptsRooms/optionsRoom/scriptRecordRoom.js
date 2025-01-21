import {
  getAllBookingsByRoomAndYear,
  getAllBookingsByRoomAndYearLimit,
} from "../scriptRooms.js";
import BACK_URL_LOCALHOST from "../../urlLocalhost.js";
import { modalMainRooms } from "../scriptListRooms.js";

let numRoom, containData, selectYear, limitPages;
let index = 0;
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
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/roomsBookingRoutes.php?params=` +
    JSON.stringify({ option: "getAllYearsWithRoomsBooking" });

  let data = null;
  loading(true, containData);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, containData);
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

const loading = (state, element) => {
  if (state) {
    element.innerHTML = `
      <div class="loading">
        <span>Cargando datos</span>
         <img src="../../../img/spinnerMain.gif">
      </div>
    `;
  } else {
    element.innerHTML = ``;
  }
};

const drawContainTable = (years) => {
  containData.innerHTML = `

 <div class="containTable">
   
 <div class="header">
   <div class="searchSelect">
        <div class="title">
        <span>Buscar por año</span>
        </div>
        <div class="containSelect">
       <select class="selectYear"></select>
       <button class="searchByYear">
      <img src="../../../img/search.png">
       </button>
       </div>
   </div>

   <h4>Reservas</h4>

   <div class="containInput">
   <input class="inputSearch" type="text" placeholder="Buscar...">
   <button class="btnSearch">
    <img src="../../../img/search.png">
   </button>
   </div>
 </div>
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

<div class="controls"></div>
 </div>

`;

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
  loading(true, document.querySelector("tfoot"));
  try {
    const result = await getAllBookingsByRoomAndYear(selectYear.value, numRoom);
    data = result;
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, document.querySelector("tfoot"));
    if (!data || data.length == 0) {
      noDataTable();
    }
    return data;
  }
};

const allBookingsByRoomAndYearLimit = async () => {
  let data;
  loading(true, document.querySelector("tfoot"));
  try {
    const result = await getAllBookingsByRoomAndYearLimit(
      index,
      selectYear.value,
      numRoom
    );
    data = result;
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, document.querySelector("tfoot"));
    if (!data || data.length == 0) {
      noDataTable();
    }
    return data;
  }
};

const displayTable = async () => {
  let allBookingsRoom = await allBookingsByRoomAndYear();

  if (allBookingsRoom) {
    if (allBookingsRoom.length >= 10) {
      limitPages = (allBookingsRoom.length / 10).toFixed(0);
    } else {
      limitPages = 1;
    }
    let allBookingsRoomLimit = await allBookingsByRoomAndYearLimit();
    drawTable(allBookingsRoomLimit);
  }
};

const drawTable = (allBookingsRoomLimit) => {
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

  document.querySelector("tbody").innerHTML = rowsTable.join("");

  document.querySelector(".controls").innerHTML = `
  <span class="prev">Anterior</span>
  <span>${index + 1}/${limitPages}</span>
  <span class="next">Siguiente</span>`;

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
      displayTable();
    });
};

const controlsIndexPage = () => {
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");

  next.addEventListener("click", () => {
    if (index + 1 < limitPages) {
      index++;
      displayTable();
    }
  });

  prev.addEventListener("click", () => {
    if (index + 1 > 1) {
      index--;
      displayTable();
    }
  });
};

const searchBooking = () => {
  let input = document.querySelector(".inputSearch");
  let btnSearch = document.querySelector(".btnSearch");

  btnSearch.addEventListener("click", () => {
    let rows = document.querySelector("tbody").querySelectorAll("tr");

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
  let tFoot = document.querySelector(".containTable").querySelector("tfoot");
  if (state) {
    tFoot.innerHTML = `
  <td rowspan="4" colspan="4">
  <div class="containNoFound">
<img src="../../../img/noFind.png">
<h3>Sin resultados</h3>
</div>
  
  </td>
`;
  } else {
    tFoot.innerHTML = ``;
  }
  console.log(tFoot);
};

const noDataTable = () => {
  let tFoot = document.querySelector(".containTable").querySelector("tfoot");
  tFoot.innerHTML = `
  <td rowspan="4" colspan="4">
  <div class="containNoFound">
<img src="../../../img/sinDatos.png">
<h3>Ups,no se encontraron reservas</h3>
</div>
</td>
`;
};

const redirectToTableBookings = () => {
  let divsIdBooking = document.querySelectorAll(".iconIdBooking");

  divsIdBooking.forEach((div) => {
    let spanIdBooking = div.querySelector("span");

    spanIdBooking.addEventListener("click", () => {
      localStorage.setItem("actualOptionBooking", "bookingsTable.html");
      window.open(
        "http://localhost/sistema%20Hotel/views/admin/reservas/index.php?idBooking=" +
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
        "http://localhost/sistema%20Hotel/views/admin/clientes/index.php?idClient=" +
          span.id
      );
    });
  });
};

const close = () => {
  let btnClose = document
    .querySelector(".containBtnClose")
    .querySelector("button");

  btnClose.addEventListener("click", () => {
    modalMainRooms.innerHTML = ``;
    modalMainRooms.style.display = "none";
  });
};
