import { BACK_URL_LOCALHOST } from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/userData.js";
let actualYear = new Date().getFullYear();
let selectYear, chartOfRooms;

export const configChartRooms = async () => {
  selectYear = document.querySelector(".selectYear");
  chartOfRooms = document.getElementById("chartRooms");

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
      `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params=` +
        JSON.stringify({ option: "getAllYearsWithRoomsBooking" }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        }
      }
    );
    const years = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw "No se pudieron cargar los años";
    }

    if (years.length > 0) {
      data = years;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData(true, "No se encontraron datos");
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
      `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params=` +
        JSON.stringify({
          option: "dashboardGraphic",
          year: year
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        }
      }
    );
    const roomsBookingCategorys = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw "No se pudieron cargar los habitaciones";
    }

    if (roomsBookingCategorys) {
      data = roomsBookingCategorys;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData(true, "No se encontraron datos");
    } else {
      noData(false);
      dataPointsRoomsToChart(data);
    }
  }
};

const noData = (state, msj) => {
  let noData = document.querySelector(".noData");
  let span = noData.querySelector("span");

  if (state) {
    chartOfRooms.classList.add("hideRoomsChart");
    noData.style.display = "flex";
    span.textContent = msj;
  } else {
    chartOfRooms.classList.remove("hideRoomsChart");
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

  var chart = new CanvasJS.Chart("chartRooms", {
    animationEnabled: true,
    colorSet: "greenShades",
    legend: {
      fontSize: window.innerWidth <= 600 ? 17 : 19
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelPlacement: "inside",
        indexLabel: "{y}",
        yValueFormatString: '#,##0.0"%"',
        indexLabelFontSize: window.innerWidth <= 600 ? 18 : 19,
        indexLabelFontColor: "white",
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();
};

const loading = (state) => {
  if (state) {
    chartOfRooms.classList.add("hideRoomsChart");
    document.querySelector(".loading").style.display = "flex";
  } else {
    chartOfRooms.classList.remove("hideRoomsChart");
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
