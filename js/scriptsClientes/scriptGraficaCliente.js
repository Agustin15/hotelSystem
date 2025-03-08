import BACK_URL_LOCALHOST from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/userData.js";
let today = new Date();
let actualYear = today.getFullYear();

const loadingChart = (state) => {
  const spinnerChar = document.querySelector(".loading");

  if (state) {
    spinnerChar.style.display = "flex";
  } else {
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

CanvasJS.addColorSet("greenShades", ["#055b5e", "#04b8c2", "#04c289"]);

const loadYears = async () => {
  {
    try {
      let url =
        `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/clientRoutes.php?params=` +
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
        selectYearChar(results);
        document.querySelector(".noData").style.display = "none";
      } else {
        document.querySelector(".noData").style.display = "flex";
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const selectYearChar = (results) => {
  let selectYear = document.querySelector(".selectYear");
  let yearSelected;

  let options = results.map((result) => {
    let selected = false;
    if (Object.values(result) == actualYear) {
      selected = true;
    }

    return `
          <option selected=$${selected} value=${Object.values(
      result
    )}>${Object.values(result)}</option>
        `;
  });

  selectYear.innerHTML += options.join("");

  selectYear.querySelectorAll("option").forEach((option) => {
    if (option.value == actualYear) {
      option.selected;
    }
  });

  selectYear.addEventListener("change", () => {
    yearSelected = selectYear.value;
  });

  document.querySelector(".btnSearch").addEventListener("click", () => {
    getDataClientsTOGraphic(yearSelected);
  });
};

function graphicClients(dataPoints, grafica, titulo, theme) {
  console.log(dataPoints);
  var chart = new CanvasJS.Chart(grafica, {
    colorSet: "greenShades",
    animationEnabled: true,
    title: {
      text: titulo
    },

    axisY: {
      title: "Clientes",
      titleFontSize: 25,
      margin: 0,
      labelFontSize: 18,
      gridColor: "white"
    },

    axisX: {
      title: "Meses",
      titleFontSize: 25,
      margin: 0,
      labelFontSize: 18
    },

    data: [
      {
        type: "column",
        indexLabelPlacement: "inside",
        xValueFormatString: '#,##0',
        indexLabelFontColor:"black",
        indexLabelFontSize:15,
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();
}

function dataPointsToGraphicClients(monthsClients) {
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
    graphicClients(dataPoints, "chartClients", "");
  }
}

async function getDataClientsTOGraphic(year) {
  let yearToConsult;
  let data = null;

  if (typeof year == "undefined") {
    yearToConsult = actualYear;
  } else {
    yearToConsult = year;
  }

  document
    .querySelector(".titleChart")
    .querySelector(
      "h3"
    ).innerHTML = `Cantidad de clientes por mes  ${yearToConsult}`;

  try {
    loadingChart(true);
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/clientRoutes.php?params=` +
        JSON.stringify(
          { option: "clientsGraphic", year: yearToConsult },
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
      dataPointsToGraphicClients(data);
      document.querySelector(".noData").style.display = "none";
    } else {
      document.querySelector(".noData").style.display = "flex";
    }
  }
}

export { getDataClientsTOGraphic, loadYears };
