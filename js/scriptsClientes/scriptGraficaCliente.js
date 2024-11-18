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
    "Diciembre",
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
        "http://localhost/sistema%20Hotel/controller/admin/cliente/opcionCliente.php?option=AllYearsVisitClients";
      const response = await fetch(url);
      const results = await response.json();
      if (results) {
        selectYearChar(results);
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
    return `
          <option value=${Object.values(result)}>${Object.values(
      result
    )}</option>
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
  var chart = new CanvasJS.Chart(grafica, {
    colorSet: "greenShades",
    animationEnabled: true,
    title: {
      text: titulo,
    },

    axisY: {
      title: "Personas",
      titleFontSize: 25,
      margin: 0,
      labelFontSize: 18,
      gridColor: "white",
    },

    axisX: {
      title: "Meses",
      titleFontSize: 25,
      margin: 0,
      labelFontSize: 18,
    },

    data: [
      {
        type: "column",
        dataPoints: dataPoints,
      },
    ],
  });
  chart.render();

  loadYears();
}

function dataPointsToGraphicClients(monthsClients) {
  let dataPoints = monthsClients.map((monthClients) => {
    let monthString = getMes(monthClients.month);

    const dataPoint = {
      label: monthString,
      y: monthClients.quantity,
    };

    return dataPoint;
  });

  let totalMonthsClients = dataPoints.reduce((ac, dataPoint) => {
    return (ac += dataPoint.y);
  }, 0);

  if (totalMonthsClients > 0) {
    graphicClients(dataPoints, "graficaClientes", "");
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
    .querySelector(".header")
    .querySelector("h3").innerHTML += ` ${yearToConsult}`;
    
  try {
    loadingChart(true);
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/admin/cliente/opcionCliente.php?option=clientsGraphic&year=" +
        yearToConsult,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    data = result;
  } catch (error) {
    console.log(error);
  } finally {
    loadingChart(false);
    if (data) {
      dataPointsToGraphicClients(data);
    } else {
      document.querySelector(".noData").style.display = "flex";
    }
  }
}

export default getDataClientsTOGraphic;
