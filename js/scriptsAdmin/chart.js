import BACK_URL_LOCALHOST from "../urlLocalhost.js";

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

  mesElegido = meses.find((mes, index) => index + 1 == numMes);

  return mesElegido;
}

const loading = (status, char) => {
  switch (char) {
    case "revenues":
      displayLoading(status, ".loadingRevenues");
      break;
    case "bookings":
      displayLoading(status, ".loadingBookings");
      break;
    case "rooms":
      displayLoading(status, ".loadingRooms");
      break;
  }
};

const displayLoading = (status, element) => {
  if (status) {
    document.querySelector(element).style.display = "flex";
  } else {
    document.querySelector(element).style.display = "none";
  }
};

async function getClientsByMonthActualYear(actualYear) {
  loading(true, "bookings");
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/clientRoutes.php?params=` +
        JSON.stringify({ option: "clientsGraphic", year: actualYear }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
      dataPointsToGraphicClientsDashboard(result);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, "bookings");
    if (!data) {
      document.querySelector(".noDataBookings").style.display = "flex";
    }
  }
}

function dataPointsToGraphicClientsDashboard(monthsClients) {
  let dataPointsMonthsClients = [];

  if (monthsClients) {
    dataPointsMonthsClients = monthsClients.map((monthClients) => {
      let monthString = getMes(monthClients.month);

      const dataPoint = {
        label: monthString,
        y: monthClients.quantity,
      };

      return dataPoint;
    });

    let totalMonthsClients = dataPointsMonthsClients.reduce((ac, dataPoint) => {
      return (ac += dataPoint.y);
    }, 0);

    if (totalMonthsClients > 0) {
      graphicClientsDashboard(dataPointsMonthsClients, "charBookings", "");
      $("#navAdmin").css("marginTop", "-22px");
    }
  } else {
    document.querySelector(".noDataBookings").style.display = "flex";
  }
}
function graphicClientsDashboard(dataPoints, grafica, titulo) {
  CanvasJS.addColorSet("greenShades", ["#055b5e", "#04b8c2", "#04c289"]);
  var chart = new CanvasJS.Chart(grafica, {
    animationEnabled: true,
    colorSet: "greenShades",
    title: {
      text: titulo,
    },
    axisY: {
      title: "Reservas",
      titleFontColor: "grey",
      titleFontSize: 17,
      gridColor: "white",
    },
    axisX: {
      title: "Meses",
      titleFontColor: "grey",
      titleFontSize: 17,
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

async function getRevenueActualYear() {
  loading(true, "revenues");

  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/revenuesRoutes.php?params=` +
        JSON.stringify({ option: "dashboardGraphic" }),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      dataPointsToGraphicRevenues(result);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, "revenues");
  }
}

function dataPointsToGraphicRevenues(revenuesByMonth) {
  let dataPointsRevenues = [];

  let totalRevenues = revenuesByMonth.reduce(
    (ac, ganancia) => (ac += ganancia.revenues),
    0
  );

  if (totalRevenues > 0) {
    dataPointsRevenues = revenuesByMonth.map((ganancia) => {
      const dataPointRevenue = {
        x: new Date(ganancia.month),
        y: ganancia.revenues,
      };

      return dataPointRevenue;
    });
  } else {
    document.querySelector(".noDataRevenues").style.display = "flex";
  }

  if (dataPointsRevenues.length > 0) {
    graficarGananciasPorMes(dataPointsRevenues, "charRevenues", "");
  }
}

const graficarGananciasPorMes = (dataPoints, graficaGanancias, title) => {
  var chart = new CanvasJS.Chart(graficaGanancias, {
    animationEnabled: true,
    title: {
      text: title,
    },
    axisX: {
      title: "Meses",
      valueFormatString: "MMM",
      titleFontColor: "grey",
      titleFontSize: 14,
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
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
        },
      },
    },
    data: [
      {
        type: "area",
        color: "#06c9d0",
        xValueFormatString: "MMM",
        yValueFormatString: "$##0.00",
        dataPoints: dataPoints,
      },
    ],
  });
  chart.render();
};

async function getCategoryRoomsMostReserved() {
  let actualYear = new Date().getFullYear();

  loading(true, "rooms");
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/roomsBookingRoutes.php?params=` +
        JSON.stringify({ option: "dashboardGraphic", year: actualYear }),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else {
      dataPointsToGraphicRooms(result);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, "rooms");
  }
}

function dataPointsToGraphicRooms(quantitysRoomsCategoryReserved) {
  let dataPointsRoomsReserved = [];

  let totalRoomsReserved = quantitysRoomsCategoryReserved.reduce(
    (ac, categoryRoomQuantity) => {
      return (ac += categoryRoomQuantity.quantityReserved);
    },
    0
  );

  if (totalRoomsReserved > 0) {
    dataPointsRoomsReserved = quantitysRoomsCategoryReserved.map(
      (roomCategory) => {
        let percentageCategory =
          (roomCategory.quantityReserved * 100) / totalRoomsReserved;

        const roomCategoryQuantityReserved = {
          y: percentageCategory,
          label: roomCategory.categoryRoom,
        };

        return roomCategoryQuantityReserved;
      }
    );
  } else {
    document.querySelector(".noDataRooms").style.display = "flex";
  }

  if (dataPointsRoomsReserved.length > 0) {
    graficarHabitaciones(dataPointsRoomsReserved, "charRooms", "");
  }
}

function graficarHabitaciones(
  dataPointsHabitacionesReservadas,
  graficaHabitaciones,
  title
) {
  CanvasJS.addColorSet("greenShades", ["#055b5e", "#04b8c2", "#04c289"]);
  var chart = new CanvasJS.Chart(graficaHabitaciones, {
    animationEnabled: true,
    colorSet: "greenShades",
    title: {
      text: title,
    },

    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 14,
        indexLabel: "{label} - {y}%",
        dataPoints: dataPointsHabitacionesReservadas,
      },
    ],
  });
  chart.render();
}

export {
  getClientsByMonthActualYear,
  getRevenueActualYear,
  getCategoryRoomsMostReserved,
  getMes,
};
