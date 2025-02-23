import {
  getAllYearsRevenues,
  getRevenuesByYear,
  getAllRevenuesByYearLimitIndex,
  getRevenuDetailsById
} from "./scriptRevenues.js";

import { loadingPage, pageNotFound } from "./dashboardScript.js";
import { configBill } from "./scriptBill.js";

let selectYear, currentYear, controls, tableBills, modal;

let pages;
let index = 0;

export const configTable = async () => {
  modal = document.querySelector(".modalMainRevenues");
  controls = document.querySelector(".controls");
  tableBills = document.querySelector(".tableBills");

  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.get("idBooking")) {
    let yearsRevenues = await allYearsRevenues();
    if (yearsRevenues) {
      displaySelectYears(yearsRevenues);
      revenuesByYear(selectYear.value);

      let btnSearchByYear = document.querySelector(".btnSearch");
      btnSearchByYear.addEventListener("click", async () => {
        controls.style.display = "flex";
        revenuesByYear(selectYear.value);
      });
    }
  } else {
    controls.style.display = "none";
    let revenueBooking = await revenueByIdBooking(urlParams.get("idBooking"));
    if (revenueBooking) {
      displayTable([revenueBooking]);
    }
  }
};

const revenueByIdBooking = async (idBooking) => {
  let revenueBooking;

  loading(true);
  try {
    let result = await getRevenuDetailsById(idBooking);
    if (result) {
      revenueBooking = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);

    if (!revenueBooking) {
      noData();
    }
    return revenueBooking;
  }
};

const allYearsRevenues = async () => {
  let years;

  loading(true);
  try {
    let result = await getAllYearsRevenues();
    if (result) {
      years = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);

    if (!years) {
      noData();
    }
    return years;
  }
};

const displaySelectYears = (yearsRevenues) => {
  selectYear = document.querySelector(".selectYear");
  currentYear = new Date().getFullYear();
  let optionsYears = yearsRevenues.map((year) => {
    return ` 
      <option ${
        currentYear == Object.values(year) ? "selected" : ""
      } value=${Object.values(year)}>${Object.values(year)}</option>
    `;
  });

  selectYear.innerHTML = optionsYears.join("");
};

const revenuesByYear = async (year) => {
  let revenues;
  loading(true);
  try {
    let result = await getRevenuesByYear(!year ? currentYear : year);
    if (result) {
      revenues = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (revenues) {
      let revenuesLimit = await allRevenuesByYearLimitIndex(year);
      if (revenuesLimit) {
        displayControlsIndex(revenues.length, revenuesLimit);
        displayTable(revenuesLimit);
      }
    } else {
      noData();
    }
  }
};

export const formatDate = (date, character) => {
  let dateFormat;

  let day = date.getDate() + 1;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  dateFormat = `${day < 10 ? "0" + day : day}${character}${
    month < 10 ? "0" + month : month
  }${character}${year < 10 ? 0 + year : year}`;

  return dateFormat;
};

const displayTable = (revenuesLimit) => {
  let tableBills = document.querySelector(".tableBills");

  let revenuesRows = revenuesLimit.map((revenue, index) => {
    let iconStatusBooking, titleIconState;

    if (new Date(revenue.fechaSalida) <= new Date()) {
      iconStatusBooking = "../../../img/bookingEndIcon.png";
      titleIconState = "Finalizada";
    } else if (
      new Date(revenue.fechaLlegada) <= new Date() &&
      new Date(revenue.fechaSalida) > new Date()
    ) {
      titleIconState = "En curso";
    } else {
      iconStatusBooking = "../../../img/bookingPendingIcon.png";
      titleIconState = "Pendiente";
    }

    let bookingStartFormat = formatDate(new Date(revenue.fechaLlegada), "-");
    let bookingEndFormat = formatDate(new Date(revenue.fechaSalida), "-");
    return `
     <tr class="${index % 2 == 0 ? "trGray" : ""}"> 
      <td>
      <div class="idBooking">
      ${revenue.idReservaPago}
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
       <td>${revenue.correo}</td>
       <td>${bookingStartFormat}</td>
         <td>${bookingEndFormat}</td>
        <td>US$ ${revenue.deposito}</td>
        <td>
        <div class="buttons">
        <button data-revenue-booking=${JSON.stringify(
          revenue
        )} class="btnViewBill" title="Ver factura">
        <img src="../../../img/viewBill.png">
        </button>
        </div>
        </td>
     </tr>
    `;
  });

  tableBills.querySelector("tbody").innerHTML = revenuesRows.join("");
  search();

  document.querySelectorAll(".btnViewBill").forEach((btn) => {
    btn.addEventListener("click", async () => {
      modal.style.display = "flex";
      let page = await getPageBill();
      let revenueBooking = JSON.parse(btn.dataset.revenueBooking);
      if (page) {
        drawPageBill(page, revenueBooking);
      }
    });
  });
};

const displayControlsIndex = (revenuesRows, revenuesLimit) => {
  let pageIndexElement = document.querySelector(".pageIndex");
  revenuesRows < 10 ? (pages = 1) : (pages = (revenuesRows / 10).toFixed(0));

  pageIndexElement.textContent = `${index + 1}/${pages}`;

  controls.querySelector(".prev").addEventListener("click", () => {
    if (index + 1 > 0) {
      index--;
      displayTable(revenuesLimit);
    }
  });

  controls.querySelector(".next").addEventListener("click", () => {
    if (index + 1 < pages) {
      index++;
      displayTable(revenuesLimit);
    }
  });
};

const allRevenuesByYearLimitIndex = async (year) => {
  let revenuesLimit;

  loading(true);
  try {
    let result = await getAllRevenuesByYearLimitIndex(year, index);
    if (result) {
      revenuesLimit = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!revenuesLimit) {
      noData();
    }
    return revenuesLimit;
  }
};

const loading = (state) => {
  tableBills.querySelector("tbody").innerHTML = ``;
  let tfoot = document.querySelector("tfoot");
  if (state) {
    tfoot.innerHTML = `
      <td cellspan="6" colspan="6">
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

const noData = () => {
  tableBills.querySelector("tbody").innerHTML = ``;
  let tfoot = document.querySelector("tfoot");
  controls.style.display = "none";

  tfoot.innerHTML = `
  <td cellspan="6" colspan="6">
  <div class="noData">
 <img src="../../../img/sinDatos.png">
   <span>No se encontraron datos</span>
</div>
</td>
`;
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

const getPageBill = async () => {
  let pageBill;
  loadingPage(true, modal);
  try {
    const response = await fetch("optionBill/bill.html");
    const result = await response.text();
    if (response.ok && result) {
      pageBill = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, modal);
    if (!pageBill) {
      pageNotFound(modal);
    }
    return pageBill;
  }
};

const drawPageBill = (page, dataBooking) => {
  modal.innerHTML = page;
  configBill(dataBooking, modal);
};
