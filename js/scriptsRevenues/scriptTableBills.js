import {
  getAllYearsRevenues,
  getRevenuesByYear,
  getAllRevenuesByYearLimitIndex
} from "./scriptRevenues.js";

let selectYear, currentYear, inputSearch, controls, tableBills;

let pages;
let index = 0;

export const configTable = async () => {
  controls = document.querySelector(".controls");
  tableBills = document.querySelector(".tableBills");

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
      displayControlsIndex(revenues);
      let revenuesLimit = await allRevenuesByYearLimitIndex(year);
      if (revenuesLimit) {
        displayTable(revenuesLimit);
      }
    } else {
      noData();
    }
  }
};

const displayTable = (revenuesLimit) => {
  let tableBills = document.querySelector(".tableBills");

  let revenuesRows = revenuesLimit.map((revenue, index) => {
    return `
     <tr class="${index % 2 == 0 ? "trGray" : ""}"> 
      <td>${revenue.idReservaPago}</td>
       <td>${revenue.correo}</td>
        <td>US$ ${revenue.deposito}</td>
        <td>
        <div class="buttons">
        <button title="Ver factura">
        <img src="../../../img/viewBill.png">
        </button>
        </div>
        </td>
     </tr>
    `;
  });

  tableBills.querySelector("tbody").innerHTML = revenuesRows;
};

const displayControlsIndex = (revenues) => {
  let pageIndexElement = document.querySelector(".pageIndex");
  revenues.length < 10
    ? (pages = 1)
    : (pages = (revenues.length / 10).toFixed(0));

  pageIndexElement.textContent = `${index + 1}/${pages}`;
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
      <td cellspan="4" colspan="4">
    <div class="loading">
        <span>Cargando datos</span>
       <img src="../../../img/spinnerMain.gif">
    </div>
      <td cellspan="4" colspan="4">
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
  <td cellspan="4" colspan="4">
  <div class="noData">
 <img src="../../../img/sinDatos.png">
   <span>No se encontraron datos</span>
</div>
</td>
`;
};
