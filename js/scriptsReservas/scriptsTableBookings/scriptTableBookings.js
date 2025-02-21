import { configDelete } from "./scriptsOptionsTable/scriptDelete.js";
import { configDetails } from "./scriptsOptionsTable/scriptDetails.js";
import { configEdit } from "./scriptsOptionsTable/scriptEdit.js";
import { loadingPage, pageNotFound } from "../scriptReserva.js";
import BACK_URL_LOCALHOST from "../../urlLocalhost.js";
import { invalidAuthentication } from "../../scriptsAdmin/scriptsAdmin.js";

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
  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.get("idBooking")) {
    let quantityRows = await getQuantityBookingsActualYear();

    if (quantityRows) {
      let bookingsYearlimit = await getBookingsYearLimit();

      if (bookingsYearlimit) {
        drawIndex();
        drawRowsTable(bookingsYearlimit);
      }
    }
  } else {
    let bookingFound = await getBookingById(urlParams.get("idBooking"));
    if (bookingFound) {
      let arrayBookingFound = [bookingFound];
      drawRowsTable(arrayBookingFound);
      document.querySelector(".controls").style.display = "none";
    }
  }
};

const formatDate = (date) => {
  let dateFormat;

  let day = date.getDate() + 1;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  dateFormat = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year < 10 ? 0 + year : year}`;

  return dateFormat;
};

const drawRowsTable = (bookingsYearlimit) => {
  let tbody = document.querySelector("tbody");

  let rowsTableBooking = bookingsYearlimit.map((booking, index) => {
    let classBtnDisabled = "";
    let iconStatusBooking, titleIconState;

    if (new Date(booking.fechaSalida) < new Date()) {
      classBtnDisabled = "btnDisabled";
      iconStatusBooking = "../../../img/bookingEndIcon.png";
      titleIconState = "Finalizada";
    } else if (new Date(booking.fechaLlegada) > new Date()) {
      iconStatusBooking = "../../../img/bookingPendingIcon.png";
      titleIconState = "Pendiente";
    }

    let bookingStartFormat = formatDate(new Date(booking.fechaLlegada));
    let bookingEndFormat = formatDate(new Date(booking.fechaSalida));

    return `

<tr class=${index % 2 == 0 ? "trGray" : ""}>
<td>

 <div class="idBooking">
       ${booking.idReserva}
              <img src="../../../img/reservas.png">
                 ${
                   iconStatusBooking
                     ? `<img title=${titleIconState} class="iconStatus" src=${iconStatusBooking}></img>`
                     : `<div title="En curso" class="bar">
                       <div class="contentBar"></div>
                     </div>`
                 }  
       </div>

</td>
<td>${booking.correo}</td>
<td class="tdStartDate">${bookingStartFormat}</td>
<td class="tdEndDate">${bookingEndFormat}</td>
<td>${booking.cantidadHabitaciones}</td>
  <td class="tdOptions">

           <div class="buttons" id=${booking.idReserva}>

            <button data-option="delete" class="btnDelete"><img src="../../../img/borrar.png"></button>
                <button ${
                  new Date(booking.fechaSalida) < new Date() ? "disabled" : ""
                } class="btnEdit ${classBtnDisabled}" data-option="edit"><img src="../../../img/editar.png"></button>
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
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/bookingRoutes.php?params= ` +
      JSON.stringify({ option: "bookingsRowsYear", year: yearSelected });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
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
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    loading(false);
    if (!data) {
      noData("No se encontraron reservas en este año");
    }
    return data;
  }
};

const getBookingById = async (idBooking) => {
  let data = null;
  loading(true);
  try {
    let url =
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/bookingRoutes.php?params=` +
      JSON.stringify({ option: "getBookingById", idBooking: idBooking });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    loading(false);
    if (!data) {
      noData("Ups,no se pudo encontrar la reserva");
    }
    return data;
  }
};

const noData = (error) => {
  let tbody = document.querySelector("tbody");
  let tfoot = document.querySelector("tfoot");
  tbody.innerHTML = ``;

  tfoot.innerHTML = `
   <td rowspan="6" colspan="6">
  <div class="noDataBookings">
      <img src="../../../img/sinDatos.png">
      <span>${error}</span>
  </div>
  </td>

  `;
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
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/bookingRoutes.php?params=` +
      JSON.stringify({
        option: "bookingsYearlimit",
        data: { year: yearSelected, indexPage: indexPage }
      });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
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
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/bookingRoutes.php?params= ` +
    JSON.stringify({ option: "allYearsBooking" });

  let data = null;
  loading(true);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result.length) {
      data = result;
    }
  } catch (error) {
    console.log("Error message:", error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
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
  <option selected=${year == new Date().getFullYear() ? true : false}value=${
      year["YEAR(fechaLlegada)"]
    }>${year["YEAR(fechaLlegada)"]}</option>
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
  edit: "optionsTableBooking/edit.php?idBooking="
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
  let page;
  if (url) {
    modalOption(true, modalMainBookings);
    loadingPage(true, modalMainBookings);
    try {
      const response = await fetch(url);
      const result = await response.text();
      if (response.ok && result) {
        page = result;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingPage(false, modalMainBookings);
      if (!page) {
        pageNotFound(modalMainBookings);
        closePageNotFound(modalMainBookings);
      }
    }

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
      case "edit":
        configEdit();
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

export const closePageNotFound = (modal) => {
  document.querySelector(".btnClose").addEventListener("click", () => {
    modalOption(false, modal);
  });
};

const search = () => {
  let btnInputSearch = document.querySelector(".btnSearchInput");
  let inputSearch = document.querySelector(".inputSearch");
  let tfoot = document.querySelector("tfoot");

  let rows = document.querySelector("tbody").querySelectorAll("tr");
  btnInputSearch.addEventListener("click", () => {
    let value = inputSearch.value.trim();

    rows.forEach((row) => {
      if (row.innerText.indexOf(value) == -1) {
        row.style.display = "none";
      } else {
        row.style.display = "table-row";
      }
    });

    let totalRowsHide = [...rows].reduce((ac, row) => {
      row.style.display == "none" ? ac++ : ac;
      return ac;
    }, 0);

    if (rows.length == totalRowsHide) {
      tfoot.innerHTML = `
   <td rowspan="6" colspan="6">
  <div class="noResults">
      <img src="../../../img/noFind.png">
      <span>Sin Resultados</span>
  </div>
  </td>
  
  `;
    } else {
      tfoot.innerHTML = ``;
    }
  });
};

const loading = (state) => {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = ``;

  if (state) {
    document.querySelector("tfoot").innerHTML = ` 
    
       <td rowspan="6" colspan="6">
    <div class="loading">
      <span>Cargando datos</span>
      <img src="../../../img/spinnerMain.gif">
    </div>
    </td>
    `;
  } else {
    document.querySelector("tfoot").innerHTML = ``;
  }
};
