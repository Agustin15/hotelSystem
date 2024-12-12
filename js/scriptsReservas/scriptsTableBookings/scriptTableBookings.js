import { search, loading } from "../../scriptsClientes/scriptClientsTable.js";
import { configDelete } from "./scriptsOptionsTable/scriptDelete.js";
import { configDetails } from "./scriptsOptionsTable/scriptDetails.js";

let pages;
let limitByPage = 1;
let indexPage = 0;
let yearSelected = new Date().getFullYear();

export const displayTable = async () => {
  let yearsAllBookings = await displaySelectYear();

  if (yearsAllBookings) {
    drawYearsSelect(yearsAllBookings);
    drawTable();
  }
};

export const drawTable = async () => {
  let quantityRows = await getQuantityBookingsActualYear();

  if (quantityRows) {
    let bookingsYearlimit = await getBookingsYearLimit();

    if (bookingsYearlimit) {
      drawIndex();
      drawRowsTable(bookingsYearlimit);
    }
  }
};

const drawRowsTable = (bookingsYearlimit) => {
  let tbody = document.querySelector("tbody");

  let rowsTableBooking = bookingsYearlimit.map((booking, index) => {
    let classTr = "";
    let classBtnDisabled = "";
    if (new Date(booking.fechaSalida) < new Date()) {
      classBtnDisabled = "btnDisabled";
    }

    if (index % 2 == 0) {
      classTr = "trGray";
    }

    return `
<tr class=${classTr}>
<td>

 <div class="idBooking">
       ${booking.idReserva}
              <img src="../../../img/reservas.png">
       </div>

</td>
<td>${booking.correo}</td>
<td class="tdStartDate">${booking.fechaLlegada}</td>
<td class="tdEndDate">${booking.fechaSalida}</td>
<td>${booking.cantidadHabitaciones}</td>
  <td class="tdOptions">

           <div class="buttons" id=${booking.idReserva}>

            <button data-option="delete" class="btnDelete ${classBtnDisabled}"><img src="../../../img/borrar.png"></button>
                <button class="btnEdit ${classBtnDisabled}"><img src="../../../img/editar.png"></button>
                    <button data-option="details"
                     class="btnDetails"><img src="../../../img/detalles.png"></button>
            
           </div>
           </td>
           </tr>
`;
  });

  tbody.innerHTML = rowsTableBooking.join("");

  search();
  optionBooking(tbody);
};

const getQuantityBookingsActualYear = async () => {
  let data = null;
  loading(true);
  try {
    let url =
      "http://localhost/sistema%20Hotel/routes/bookingRoutes.php?params=" +
      JSON.stringify({ option: "bookingsRowsYear", year: yearSelected });

    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;

      if (result <= 10) {
        pages = 1;
      } else {
        pages = (result / limitByPage).toFixed(0);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData("No se encontraron reservas en este año");
    }
    return data;
  }
};

const noData = (error) => {
  let tfoot = document.querySelector("tfoot");
  tfoot.innerHTML = `
   <td rowspan="6" colspan="6">
  <div class="noDataBookings">
      <img src="../../../img/sinDatos.png">
      <span>${error}</span>
  </div>
  </td>

  `;

  document.querySelector(".controls").style.display = "none";
  document.querySelector(".containSearch").style.display = "none";
  document.querySelector(".titleTable").classList.add("titleTableNoData");
};

const drawIndex = () => {
  let controlsIndex = document.querySelector(".controls");
  let indexText = controlsIndex.querySelector(".pageIndex");
  let prevPage = controlsIndex.querySelector(".prev");
  let nextPage = controlsIndex.querySelector(".next");

  controlsIndex.style.display = "flex";
  prevPage.addEventListener("click", () => {
    if (indexPage + 1 > 1) {
      indexPage--;
      drawTable();
    }
  });
  nextPage.addEventListener("click", () => {
    if (indexPage + 1 < pages) {
      indexPage++;
      drawTable();
    }
  });

  indexText.textContent = `${indexPage + 1}/${pages}`;
};

const getBookingsYearLimit = async () => {
  let data = null;
  loading(true);
  try {
    let url =
      "http://localhost/sistema%20Hotel/routes/bookingRoutes.php?params=" +
      JSON.stringify({
        option: "bookingsYearlimit",
        data: { year: yearSelected, indexPage: indexPage },
      });

    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData("No se encontraron reservas en este año");
    }
    return data;
  }
};

const displaySelectYear = async () => {
  let url =
    "http://localhost/sistema%20Hotel/routes/bookingRoutes.php?params=" +
    JSON.stringify({ option: "allYearsBooking" });

  let data = null;
  loading(true);
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log("Error message:", error);
  } finally {
    loading(false);
    if (!data) {
      noData("No se encontraron reservas en este año");
    }
    return data;
  }
};

const drawYearsSelect = (years) => {
  let selectYears = document.querySelector(".selectYears");
  let btnSearch = document.querySelector(".btnSearch");

  let yearsOptions = years.map((year) => {
    return `
  <option value=${year["YEAR(fechaLlegada)"]}>${year["YEAR(fechaLlegada)"]}</option>
  `;
  });

  selectYears.innerHTML = yearsOptions.join("");

  btnSearch.addEventListener("click", () => {
    yearSelected = selectYears.value;
    drawTable();
  });
};

const optionsUrls = {
  delete: "optionsTableBooking/delete.php?idBooking=",
  details: "optionsTableBooking/details.php?idBooking=",
};

const optionBooking = (tbody) => {
  let buttons = tbody.querySelectorAll("button");
  let url, idBooking, option;

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      idBooking = button.parentElement.id;
      option = button.dataset.option;
      url = optionsUrls[option] + idBooking;
      await displayOptionModal(url, option);
    });
  });
};

const displayOptionModal = async (url, option) => {
  let modalMainBookings = document.querySelector(".modalMainBookings");
  if (url) {
    modalOption(true, modalMainBookings);
    const response = await fetch(url);
    const page = await response.text();

    if (page) {
      modalMainBookings.innerHTML = page;
    }

    switch (option) {
      case "delete":
        configDelete();
        break;
      case "details":
        configDetails();
        break;
    }
  }
};

export const modalOption = (state, modal) => {
  if (state) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
    modal.innerHTML = ``;
  }
};
