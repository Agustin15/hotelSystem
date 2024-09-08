let viewGrafica = document.getElementById("viewGrafica");

let year = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {

  liBorderBottom("grafica");
  if (viewGrafica) {
   
    getDataClientsTOGraphic(year);
  }
});

function displaySelectYearGraphic() {
  let searchYear = document.querySelector(".searchYear");
  let selectYear = searchYear.querySelector("select");

  searchYear.style.display = "flex";
  let valueYear = selectYear.options[selectYear.selectedIndex].value;

  selectYear.addEventListener("change", function () {
    valueYear = selectYear.options[selectYear.selectedIndex].value;
  });

  document
    .querySelector(".btnGraphicClients")
    .addEventListener("click", function () {
      getDataClientsTOGraphic(valueYear);
    });
}

function graphicClients(dataPoints, grafica, titulo, theme) {
  var chart = new CanvasJS.Chart(grafica, {
    theme: "light2",
    animationEnabled: true,
    title: {
      text: titulo,
    },

    axisY: {
      title: "Personas",
      titleFontSize: 25,
      margin: 0,
      labelFontSize: 18,
    },

    axisX: {
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

  displaySelectYearGraphic();
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
    graphicClients(dataPoints, "graficaClientes", "", "light2");
  } else {
    $(".sinDatos").css("display", "block");
  }
}

async function getDataClientsTOGraphic(year) {
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