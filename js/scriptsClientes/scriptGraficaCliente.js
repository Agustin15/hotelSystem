import { BACK_URL_LOCALHOST } from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/userData.js";

const greenShadesWeek = [
  "#055b5e",
  "#04b8c2",
  "#04c289",
  "#0ca073",
  "#16f1c2",
  "#15cca4",
  "#1497a8"
];
const greenShadesMonths = [
  "#055b5e",
  "#04b8c2",
  "#04c289",
  "#0ca073",
  "#16f1c2",
  "#4bebd0",
  "#15cca4",
  "#1497a8",
  "#2771b6",
  "#2771b6",
  "#1d5c97",
  "#1d3397"
];

CanvasJS.addColorSet("greenShadesWeek", greenShadesWeek);

CanvasJS.addColorSet("greenShadesMonths", greenShadesMonths);

let selectYear, chartClients;

export const configChart = async () => {
  chartClients = document.getElementById("chartClients");
  selectYear = document.querySelector(".selectYear");
  let years = await loadYears();
  selectYearChar(years);
  getDataClientsTOGraphic(selectYear.value);
};

const loadYears = async () => {
  {
    try {
      let url =
        `${BACK_URL_LOCALHOST}routes/admin/clientRoutes.php?params=` +
        JSON.stringify({ option: "AllYearsVisitClients" });

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      });
      const results = await response.json();

      if (!response.ok) {
        if (response.status == 401) {
          invalidAuthentication();
        } else throw results.error;
      } else if (results) {
        noData(false);
        return results;
      } else {
        noData(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const selectYearChar = (results) => {
  let options = results.map((result) => {
    return `
          <option value=${Object.values(result)}>${Object.values(
      result
    )}</option>
        `;
  });

  selectYear.innerHTML += options.join("");

  document.querySelector(".btnSearch").addEventListener("click", () => {
    getDataClientsTOGraphic(selectYear.value);
  });
};

const loadingChart = (state) => {
  const spinnerChar = document.querySelector(".loading");

  if (state) {
    chartClients.classList.add("hideClientsChart");
    spinnerChar.style.display = "flex";
  } else {
    chartClients.classList.remove("hideClientsChart");
    spinnerChar.style.display = "none";
  }
};

function getMes(numMes) {
  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  let mesElegido = null;

  mesElegido = meses.find((elemento) => meses.indexOf(elemento) + 1 == numMes);

  return mesElegido;
}

function graphicClients(dataPoints, grafica, titleAxisX, greenShades) {
  var chart = new CanvasJS.Chart(grafica, {
    colorSet: greenShades,
    animationEnabled: true,
    title: {
      text: ""
    },

    axisY: {
      title: "Clientes",
      titleFontSize: 25,
      margin: 0,
      labelFontSize: 18,
      gridColor: "white"
    },

    axisX: {
      title: titleAxisX,
      titleFontSize: 25,
      margin: 0,
      labelFontSize: 18
    },

    data: [
      {
        type: "column",
        indexLabelPlacement: "inside",
        xValueFormatString: "#,##0",
        indexLabelFontColor: "black",
        indexLabelFontSize: 15,
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();
}

function dataPointsToGraphicMonthsClients(monthsClients) {
  let dataPoints = monthsClients.map((monthClients) => {
    let monthString = getMes(monthClients.month);

    const dataPoint = {
      label: monthString,
      y: monthClients.quantity
    };

    return dataPoint;
  });

  let totalMonthsClients = dataPoints.reduce((ac, dataPoint) => {
    return (ac += dataPoint.y);
  }, 0);

  if (totalMonthsClients > 0) {
    graphicClients(dataPoints, "chartClients", "Meses", "greenShadesMonths");
  } else {
    noData(true, "Sin clientes este año");
  }
}

function dataPointsToGraphicWeekdayClients(weekdayClients) {
  let dataPoints = weekdayClients.map((weekdayClient) => {
    const dataPoint = {
      label: weekdayClient.weekday,
      y: weekdayClient.clients
    };

    return dataPoint;
  });

  let totalWeekdayClients = dataPoints.reduce((ac, dataPoint) => {
    return (ac += dataPoint.y);
  }, 0);

  if (totalWeekdayClients > 0) {
    graphicClients(
      dataPoints,
      "chartClients",
      "Dias de la semana",
      "greenShadesWeek"
    );
  } else {
    noData(true, "Sin clientes esta semana");
  }
}

async function getDataClientsTOGraphic(optionSelected) {
  let titleChart = document.querySelector(".titleChart").querySelector("h3");

  if (optionSelected == "thisWeek") {
    titleChart.innerHTML = `Cantidad de clientes esta semana`;
    dataClientsWeekday();
  } else {
    titleChart.innerHTML = `Cantidad de clientes por meses ${optionSelected}`;
    dataClientsMonths(selectYear.value);
  }
}

const dataClientsMonths = async (year) => {
  let data;
  try {
    loadingChart(true);
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/clientRoutes.php?params=` +
        JSON.stringify(
          { option: "clientsMonthsGraphic", year: year },
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              credentials: "same-origin"
            }
          }
        )
    );

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingChart(false);
    if (data) {
      dataPointsToGraphicMonthsClients(data);
      noData(false);
    } else {
      noData(true);
    }
  }
};

const noData = (state, msj) => {
  let noData = document.querySelector(".noData");
  let span = noData.querySelector("span");

  if (state) {
    chartClients.classList.add("hideClientsChart");
    noData.style.display = "flex";
    span.textContent = msj;
  } else {
    chartClients.classList.remove("hideClientsChart");
    noData.style.display = "none";
  }
};

const dataClientsWeekday = async () => {
  let data;
  try {
    loadingChart(true);
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/clientRoutes.php?params=` +
        JSON.stringify(
          {
            option: "getClientsOfThisWeek"
          },
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              credentials: "same-origin"
            }
          }
        )
    );

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingChart(false);
    if (data) {
      dataPointsToGraphicWeekdayClients(data);
    } else {
      noData(true, "No se encontraron datos");
    }
  }
};
