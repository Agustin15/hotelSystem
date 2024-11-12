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
    let selectYear = document.querySelector(".selectYear");

    const response = await fetch("");
  }
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

async function getDataClientsTOGraphic() {
  let year = new Date().getFullYear();
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/admin/cliente/opcionCliente.php?option=clientsGraphic&year=" +
        year,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    dataPointsToGraphicClients(result);
  } catch (error) {
    console.log(error);
  }
}

export default getDataClientsTOGraphic;
