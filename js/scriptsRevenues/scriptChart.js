import {
  getAllYearsRevenues,
  getRevenuesByYear,
  getRevenuesThisWeekToChart
} from "./scriptRevenues.js";
let selectYear, titleChart, chartRevenues;

export const configChart = async () => {
  titleChart = document.querySelector(".chartTitle").querySelector("h3");
  chartRevenues = document.getElementById("chartRevenues");
  let yearsRevenues = await allYearsRevenues();
  if (yearsRevenues) {
    displaySelectYears(yearsRevenues);
    getRevenuesToChart(selectYear.value);

    let btnSearchByYear = document.querySelector(".btnSearch");
    btnSearchByYear.addEventListener("click", async () => {
      getRevenuesToChart(selectYear.value);
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
      noData(true);
    } else {
      noData(false);
    }
    return years;
  }
};

const loading = (state) => {
  let loading = document.querySelector(".loading");

  if (state) {
    chartRevenues.classList.add("hideChartRevenues");
    loading.style.display = "flex";
  } else {
    chartRevenues.classList.remove("hideChartRevenues");
    loading.style.display = "none";
  }
};

const noData = (state) => {
  let noData = document.querySelector(".noData");

  if (state) {
    noData.style.display = "flex";
    chartRevenues.classList.add("hideChartRevenues");
  } else {
    noData.style.display = "none";
    chartRevenues.classList.remove("hideChartRevenues");
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

const getRevenuesToChart = async (optionSelected) => {
  if (optionSelected == "thisWeek") {
    titleChart.textContent = `Ganancias de esta semana`;
    revenuesOfThisWeek();
  } else {
    titleChart.textContent = `Ganancias por mes ${selectYear.value}`;
    revenuesByYear(selectYear.value);
  }
};

const revenuesByYear = async (year) => {
  let revenues;
  loading(true);
  try {
    let result = await getRevenuesByYear(year);
    if (result) {
      revenues = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!revenues) {
      noData(true);
    } else {
      noData(false);
      dataPointsRevenuesMonthsChart(revenues);
    }
  }
};

const revenuesOfThisWeek = async () => {
  let revenues;
  loading(true);
  try {
    let result = await getRevenuesThisWeekToChart();
    if (result) {
      revenues = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!revenues) {
      noData(true);
    } else {
      noData(false);
      dataPointsRevenuesWeekChart(revenues);
    }
  }
};

function dataPointsRevenuesMonthsChart(yearRevenues) {
  let dataPointsRevenues = [];

  let totalRevenues = yearRevenues.reduce(
    (ac, ganancia) => (ac += ganancia.revenues),
    0
  );

  if (totalRevenues > 0) {
    dataPointsRevenues = yearRevenues.map((revenue) => {
      const dataPointRevenue = {
        x: new Date(revenue.month),
        y: revenue.revenues
      };

      return dataPointRevenue;
    });

    graphicChart(dataPointsRevenues, "chartRevenues", "Meses", "MMM");
  } else {
    noData(true);
  }
}

function dataPointsRevenuesWeekChart(revenuesWeek) {
  let dataPointsRevenues = [];

  let totalRevenues = revenuesWeek.reduce(
    (ac, revenueWeek) => (ac += revenueWeek.revenues),
    0
  );

  if (totalRevenues > 0) {
    dataPointsRevenues = revenuesWeek.map((revenue) => {
      const dataPointRevenue = {
        label: revenue.weekday,
        y: revenue.revenues
      };

      return dataPointRevenue;
    });

    graphicChart(dataPointsRevenues, "chartRevenues", "Dias de la semana", "");
  } else {
    noData(true);
  }
}

const graphicChart = (
  dataPoints,
  elementChart,
  titleAxisX,
  valueFormatString
) => {
  var chart = new CanvasJS.Chart(elementChart, {
    animationEnabled: true,
    title: {
      text: ""
    },
    axisX: {
      title: titleAxisX,
      valueFormatString: valueFormatString,
      titleFontColor: "black",
      titleFontSize: 17,
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      title: "Precios ($USD)",
      valueFormatString: "$##0.00",
      gridColor: "white",
      titleFontColor: "black",
      titleFontSize: 17,
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e) {
          return "$" + CanvasJS.formatNumber(e.value, "##0.00");
        }
      }
    },
    data: [
      {
        type: "area",
        color: "#06c9d0",
        xValueFormatString: "MMM",
        yValueFormatString: "$##0.00",
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();
};
