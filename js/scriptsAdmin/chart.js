import { BACK_URL_LOCALHOST } from "../urlLocalhost.js";
import { invalidAuthentication } from "./userData.js";

function month(numMonth) {
  let month = [
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

  let monthSwitched = null;

  monthSwitched = month.find((month, index) => index + 1 == numMonth);

  return monthSwitched;
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
      `${BACK_URL_LOCALHOST}routes/admin/clientRoutes.php?params=` +
        JSON.stringify({ option: "clientsGraphic", year: actualYear }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, "bookings");
    if (!data) {
      document.querySelector(".noDataBookings").style.display = "flex";
    } else {
      dataPointsToChartClientsDashboard(data);
    }
  }
}

function dataPointsToChartClientsDashboard(monthsClients) {
  let dataPointsMonthsClients = [];

  if (monthsClients) {
    dataPointsMonthsClients = monthsClients.map((monthClients) => {
      let monthString = month(monthClients.month);

      const dataPoint = {
        label: monthString,
        y: monthClients.quantity
      };

      return dataPoint;
    });

    let totalMonthsClients = dataPointsMonthsClients.reduce((ac, dataPoint) => {
      return (ac += dataPoint.y);
    }, 0);

    if (totalMonthsClients > 0) {
      graphicClientsDashboard(dataPointsMonthsClients, "chartBookings", "");
      $("#navAdmin").css("marginTop", "-22px");
    }
  } else {
    document.querySelector(".noDataBookings").style.display = "flex";
  }
}
function graphicClientsDashboard(dataPoints, chartClientsBooking, titulo) {
  CanvasJS.addColorSet("greenShades", ["#055b5e", "#04b8c2", "#04c289"]);
  var chart = new CanvasJS.Chart(chartClientsBooking, {
    animationEnabled: true,
    colorSet: "greenShades",
    title: {
      text: titulo
    },
    axisY: {
      title: "Clientes",
      titleFontColor: "black",
      titleFontSize: 17,
      gridColor: "white"
    },
    axisX: {
      title: "Meses",
      titleFontColor: "black",
      titleFontSize: 17
    },

    data: [
      {
        type: "column",
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();
}

async function getRevenueActualYear() {
  let currentYear = new Date().getFullYear();
  loading(true, "revenues");
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/revenuesRoutes.php?params=` +
        JSON.stringify({
          option: "dashboardGraphic",
          year: currentYear
        }),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, "revenues");
    if (data) {
      dataPointsToRevenues(data);
    } else {
      document.querySelector(".noDataRevenues").style.display = "flex";
    }
  }
}

function dataPointsToRevenues(revenuesByMonth) {
  let dataPointsRevenues = [];

  let totalRevenues = revenuesByMonth.reduce(
    (ac, ganancia) => (ac += ganancia.revenues),
    0
  );

  if (totalRevenues > 0) {
    dataPointsRevenues = revenuesByMonth.map((ganancia) => {
      const dataPointRevenue = {
        x: new Date(ganancia.month),
        y: ganancia.revenues
      };

      return dataPointRevenue;
    });

    graphicRevenues(dataPointsRevenues, "chartRevenues", "");
  } else {
    document.querySelector(".noDataRevenues").style.display = "flex";
  }
}

const graphicRevenues = (dataPoints, chartRevenues, title) => {
  var chart = new CanvasJS.Chart(chartRevenues, {
    animationEnabled: true,
    title: {
      text: title
    },
    axisX: {
      title: "Meses",
      valueFormatString: "MMM",
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

async function getCategoryRoomsMostReserved() {
  let actualYear = new Date().getFullYear();
  let data;

  loading(true, "rooms");
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params=` +
        JSON.stringify({ option: "dashboardGraphic", year: actualYear }),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          credentials: "same-origin"
        }
      }
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
    loading(false, "rooms");
    if (data) {
      dataPointsToGraphicRooms(data);
    } else {
      document.querySelector(".noDataRooms").style.display = "flex";
    }
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
          label: roomCategory.categoryRoom,
          y: percentageCategory
        };

        return roomCategoryQuantityReserved;
      }
    );
  } else {
    document.querySelector(".noDataRooms").style.display = "flex";
  }

  if (dataPointsRoomsReserved.length > 0) {
    graphicRooms(dataPointsRoomsReserved, "chartRooms", "");
  }
}

function graphicRooms(dataPointsRoomsBooking, chartRooms, title) {
  CanvasJS.addColorSet("greenShades", ["#055b5e", "#04b8c2", "#04c289"]);
  var chart = new CanvasJS.Chart(chartRooms, {
    animationEnabled: true,
    colorSet: "greenShades",
    title: {
      text: title
    },
    legend: {
      fontSize: 15
    },

    data: [
      {
        type: "pie",
        startAngle: 25,
        showInLegend: "true",
        legendText: "{label}",
        indexLabelPlacement: "inside",
        indexLabel: "{y}",
        yValueFormatString: '#,##0.0"%"',
        indexLabelFontSize: 15,
        indexLabelFontColor: "white",
        dataPoints: dataPointsRoomsBooking
      }
    ]
  });
  chart.render();
}

export {
  getClientsByMonthActualYear,
  getRevenueActualYear,
  getCategoryRoomsMostReserved,
  month
};
