import BACK_URL_LOCALHOST from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/scriptsAdmin.js";
let actualYear = new Date().getFullYear();
let selectYear;

export const configChartRooms = async () => {
  selectYear = document.querySelector(".selectYear");
  const years = await getAllYearsToSelect();
  if (years) {
    drawYearsToSelect(years);
    getDataCategoryRoomsBookingByYear(selectYear.value);
  }
  btnSearchByYear();
};
const getAllYearsToSelect = async () => {
  let data;
  loading(true);
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params=` +
        JSON.stringify({ option: "getAllYearsWithRoomsBooking" }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );
    const years = await response.json();
    if (!response.ok) {
      throw "No se pudieron cargar los años";
    }

    if (years) {
      data = years;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    loading(false);
    if (!data) {
      noData(true);
    } else {
      noData(false);
    }
    return data;
  }
};

const drawYearsToSelect = async (years) => {
  let options = years.map((year) => {
    let selected = false;

    if (actualYear == year) {
      selected = true;
    }
    return `
        <option selected=${selected} value=${Object.values(
      year
    )}>${Object.values(year)}</option>
        `;
  });

  selectYear.innerHTML = options.join("");
};

const getDataCategoryRoomsBookingByYear = async (year) => {
  drawTitle();
  if (!year) {
    year = actualYear;
  }
  let data;
  loading(true);
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params=` +
        JSON.stringify({
          option: "dashboardGraphic",
          year: year
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );
    const roomsBookingCategorys = await response.json();
    if (!response.ok) {
      throw "No se pudieron cargar los habitaciones";
    }

    if (roomsBookingCategorys) {
      data = roomsBookingCategorys;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    loading(false);
    if (!data) {
      noData(true);
    } else {
      noData(false);
      dataPointsRoomsToChart(data);
    }
    return data;
  }
};

const noData = (state) => {
  let noData = document.querySelector(".noData");

  if (state) {
    noData.style.display = "flex";
  } else {
    noData.style.display = "none";
  }
};

const dataPointsRoomsToChart = (roomsBookingCategorys) => {
  let totalRoomsBooking = roomsBookingCategorys.reduce((ac, room) => {
    return (ac += room.quantityReserved);
  }, 0);

  let dataPoints = roomsBookingCategorys.map((room) => {
    let percentageCategory = (room.quantityReserved * 100) / totalRoomsBooking;
    return {
      y: percentageCategory,
      label: room.categoryRoom
    };
  });

  chartRooms(dataPoints);
};
const chartRooms = (dataPoints) => {
  CanvasJS.addColorSet("greenShades", ["#055b5e", "#04b8c2", "#04c289"]);

  console.log(dataPoints);
  var chart = new CanvasJS.Chart("chartRooms", {
    animationEnabled: true,
    colorSet: "greenShades",
    legend: {
      fontSize: 15
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 17,
        indexLabel: "{label} - {y}%",
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();
};

const loading = (state) => {
  if (state) {
    document.querySelector(".loading").style.display = "flex";
  } else {
    document.querySelector(".loading").style.display = "none";
  }
};

const btnSearchByYear = () => {
  document.querySelector(".btnSearch").addEventListener("click", () => {
    getDataCategoryRoomsBookingByYear(selectYear.value);
  });
};

const drawTitle = () => {
  document.querySelector(
    ".titleChart"
  ).textContent = `Categorias mas reservadas ${selectYear.value}`;
};
