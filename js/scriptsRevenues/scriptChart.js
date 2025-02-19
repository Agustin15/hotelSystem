import { getAllYearsRevenues, getRevenuesByYear } from "./scriptRevenues.js";
let selectYear, currentYear,titleChart;

export const configChart = async () => {
  titleChart = document.querySelector(".chartTitle").querySelector("h3");
  let yearsRevenues = await allYearsRevenues();
  if (yearsRevenues) {
    displaySelectYears(yearsRevenues);
    revenuesByYear(selectYear.value);

    let btnSearchByYear = document.querySelector(".btnSearch");
    btnSearchByYear.addEventListener("click", async () => {
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
    loading.style.display = "flex";
  } else {
    loading.style.display = "none";
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

  titleChart.textContent = `Ganancias por mes ${selectYear.value}`;

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
    if (!revenues) {
      noData(true);
    } else {
      noData(false);
      dataPointsChart(revenues);
    }
  }
};

function dataPointsChart(yearRevenues) {
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

    graphicChart(dataPointsRevenues, "chartRevenues", "");
  } else {
    noData(true);
  }
}

const graphicChart = (dataPoints, elementChart) => {
  var chart = new CanvasJS.Chart(elementChart, {
    animationEnabled: true,
    title: {
      text: ""
    },
    axisX: {
      title: "Meses",
      valueFormatString: "MMM",
      titleFontColor: "grey",
      titleFontSize: 14,
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      title: "Precios ($USD)",
      valueFormatString: "$##0.00",
      gridColor: "white",
      titleFontColor: "grey",
      titleFontSize: 16,
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
