import {
  getAllYearsRevenues,
  getAllRevenuesByYear,
  getAllRevenuesByYearLimitIndex,
  getRevenuesOfThisWeek,
  getRevenuesOfThisWeekLimit,
  getRevenuDetailsById
} from "./scriptRevenues.js";

let selectYear, controls, tableBills, next, prev, pageIndexElement;
let pages;
let index = 1;
let offset = 0;

export const configTable = async () => {
  controls = document.querySelector(".controls");
  pageIndexElement = controls.querySelector(".pageIndex");
  prev = controls.querySelector(".prev");
  next = controls.querySelector(".next");
  tableBills = document.querySelector(".tableBills");

  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.get("idBooking")) {
    let yearsRevenues = await allYearsRevenues();
    if (yearsRevenues) {
      displaySelectYears(yearsRevenues);
      await displayControlsIndex();
      displayTable();
      eventsControlsIndex();
      eventSearchByYear();
    }
  } else {
    controls.style.display = "none";
    let revenueBooking = await revenueByIdBooking(urlParams.get("idBooking"));
    drawRows([revenueBooking]);
  }
};

const eventSearchByYear = async () => {
  let btnSearchByYear = document.querySelector(".btnSearch");
  btnSearchByYear.addEventListener("click", async () => {
    index = 1;
    offset = 0;
    await displayControlsIndex();
    displayTable();
  });
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
      noData("No se encontro la factura de la reserva");
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
      noData("No se encontraron ganancias");
    }
    return years;
  }
};

const displaySelectYears = (yearsRevenues) => {
  selectYear = document.querySelector(".selectYear");
  let optionsYears = yearsRevenues.map((year) => {
    return ` 
      <option value=${Object.values(year)}>${Object.values(year)}</option>
    `;
  });

  selectYear.innerHTML += optionsYears.join("");
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

const displayTable = async () => {
  let revenues;
  if (selectYear.value == "thisWeek") {
    revenues = await revenuesThisWeekLimit();
  } else {
    revenues = await allRevenuesByYearLimitIndex(selectYear.value);
  }

  if (revenues) {
    drawRows(revenues);
  }
};

const displayControlsIndex = async () => {
  let revenues;
  if (selectYear.value == "thisWeek") {
    revenues = await revenuesThisWeek();
  } else {
    revenues = await revenuesByYear(selectYear.value);
  }

  if (revenues.length) {
    controls.style.display = "flex";
    pages = Math.ceil(revenues.length / 5);
    if (index > pages && pages > 0) {
      index--;
      offset -= 5;
    }
    pageIndexElement.textContent = `${index}/${pages}`;
  } else {
    controls.style.display = "none";
  }
};

const drawRows = (revenues) => {
  let tableBills = document.querySelector(".tableBills");

  let revenuesRows = revenues.map((revenue, index) => {
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
      <button id=${
        revenue.idReservaPago
      } class="btnViewBill" title="Ver factura">
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
      let idRevenue = btn.id;
      if (idRevenue) {
        openBill(idRevenue);
      }
    });
  });
};

const eventsControlsIndex = () => {
  prev.addEventListener("click", () => {
    if (index > 1) {
      index--;
      offset -= 5;
      pageIndexElement.textContent = `${index}/${pages}`;
      displayTable("revenues");
    }
  });

  next.addEventListener("click", () => {
    if (index < pages) {
      index++;
      offset += 5;
      pageIndexElement.textContent = `${index}/${pages}`;
      displayTable("revenues");
    }
  });
};

const allRevenuesByYearLimitIndex = async (year) => {
  let revenuesLimit;

  loading(true);
  try {
    let result = await getAllRevenuesByYearLimitIndex(year, offset);
    if (result) {
      revenuesLimit = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!revenuesLimit) {
      noData("Sin ganancias este año");
    }
    return revenuesLimit;
  }
};

const revenuesThisWeekLimit = async () => {
  let revenuesLimit;

  loading(true);
  try {
    let result = await getRevenuesOfThisWeekLimit(offset);
    if (result) {
      revenuesLimit = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!revenuesLimit) {
      noData("Sin ganancias esta semana");
    }
    return revenuesLimit;
  }
};

const revenuesByYear = async () => {
  let revenues;
  loading(true);
  try {
    let result = await getAllRevenuesByYear(selectYear.value);
    if (result) {
      revenues = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (revenues) {
      return revenues;
    } else {
      noData("Sin ganancias este año");
    }
  }
};

const revenuesThisWeek = async () => {
  let revenues;
  loading(true);
  try {
    let result = await getRevenuesOfThisWeek();
    if (result) {
      revenues = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (revenues) {
      return revenues;
    } else {
      noData("Sin ganancias esta semana");
    }
  }
};

const loading = (state) => {
  tableBills.querySelector("tbody").innerHTML = ``;
  let tfoot = document.querySelector("tfoot");
  if (state) {
    tfoot.innerHTML = `
     <td rowspan="${window.innerWidth <= 600 ? 2 : 6}" colspan=${
      window.innerWidth <= 600 ? 2 : 6
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

const noData = (msj) => {
  tableBills.querySelector("tbody").innerHTML = ``;
  let tfoot = document.querySelector("tfoot");

  tfoot.innerHTML = `
  
         <td rowspan="${window.innerWidth <= 600 ? 2 : 6}" colspan=${
    window.innerWidth <= 600 ? 2 : 6
  }">
  <div class="noData">
 <img src="../../../img/sinDatos.png">
   <span>${msj}</span>
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

const openBill = (idRevenueBooking) => {
  window.open("optionBill/bill.php?idRevenueBooking=" + idRevenueBooking);
};
