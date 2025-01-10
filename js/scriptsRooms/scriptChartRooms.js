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
      "http://localhost/sistema%20Hotel/routes/roomsBookingRoutes.php?params=" +
        JSON.stringify({ option: "getAllYearsWithRoomsBooking" })
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
  } finally {
    loading(false);
    if (!data) {
      noData();
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
      "http://localhost/sistema%20Hotel/routes/roomsBookingRoutes.php?params=" +
        JSON.stringify({
          option: "dashboardGraphic",
          year: year,
        })
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
  } finally {
    loading(false);
    if (!data) {
      noData();
    } else {
      dataPointsRoomsToChart(data);
    }
    return data;
  }
};

const noData = () => {
  let noData = document.querySelector(".noData");
  noData.style.display = "flex";
};

const dataPointsRoomsToChart = (roomsBookingCategorys) => {
  let totalRoomsBooking = roomsBookingCategorys.reduce((ac, room) => {
    return (ac += room.quantityReserved);
  }, 0);

  let dataPoints = roomsBookingCategorys.map((room) => {
    let percentageCategory = (room.quantityReserved * 100) / totalRoomsBooking;
    return {
      y: percentageCategory,
      label: room.categoryRoom,
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
      fontSize: 15,
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
        dataPoints: dataPoints,
      },
    ],
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
  ).textContent = `Grafica categorias mas reservadas ${selectYear.value}`;
};
