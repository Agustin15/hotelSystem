function openSubMenu(linkBtnFlechaAbajo, linkBtnFlecha) {
  var buttonsOpenSubMenu = document.querySelectorAll(".btnFlecha");

  var menu, item, subMenu, itemNext;

  buttonsOpenSubMenu.forEach(function (buttonOpen) {
    buttonOpen.addEventListener("click", function () {
      if (this.src === linkBtnFlecha) {
        //verifica si existe un submenu desplegado
        menu = document.getElementById("navAdmin");
        var subMenus = menu.querySelectorAll(".subMenu");

        subMenus = Array.from(subMenus);

        var subMenusToNone = subMenus.filter(
          (sub) => sub.style.display == "block"
        );

        if (subMenusToNone.length > 0) {
          subMenusToNone.forEach(function (subMenuToNone) {
            var item = subMenuToNone.parentNode;
            item.querySelector(".btnFlecha").src = linkBtnFlecha;
            subMenuToNone.style.display = "none";
            var itemNext = item.nextElementSibling;
            itemNext.style.marginTop = "11px";
          });
        }

        //abrir submenu
        this.src = linkBtnFlechaAbajo;
        item = this.parentNode;
        subMenu = item.querySelector("ul");
        subMenu.style.display = "block";

        if (item.id == "userAdmin") {
          item.style.marginTop = "-86px";
        } else {
          itemNext = item.nextElementSibling;

          if (itemNext.id == "liGanancias") {
            itemNext.style.marginTop = "110px";
          } else {
            itemNext.style.marginTop = "145px";
          }
        }
      } else {
        //cerrar submenu
        this.src = linkBtnFlecha;
        subMenu.style.display = "none";

        if (item.id == "userAdmin") {
          item.style.marginTop = "0px";
        } else {
          itemNext.style.marginTop = "11px";
        }
      }
    });
  });
}

let iconAdmin = document.querySelector(".iconoAdmin");

if (iconAdmin) {
  let genreData = iconAdmin.dataset.genre;

  if ((genreData = "M")) {
    $(".iconoAdmin").attr(
      "src",
      "http://localhost/sistema%20Hotel/img/perfilM.png"
    );
  } else {
    $(".iconoAdmin").attr(
      "src",
      "http://localhost/sistema%20Hotel/img/perfilF.png"
    );
  }
}

function liBorderBottom(pagina) {
  switch (pagina) {
    case "grafica":
      $(".liGrafica").css("border-bottom", "3px solid #3ec7bb");
      break;

    case "listaClientes":
      $(".liLista").css("border-bottom", "3px solid #3ec7bb");
      break;

    case "agregar":
      $(".liAgregar").css("border-bottom", "3px solid #3ec7bb");
      break;

    case "listaReservas":
      $(".liListaReservas").css("border-bottom", "3px solid #3ec7bb");
      break;
    case "agregarReserva":
      $(".liAgregarReserva").css("border-bottom", "3px solid #3ec7bb");
      break;

    case "habitaciones":
      $(".liHabitaciones").css("border-bottom", "3px solid #3ec7bb");
      break;

    case "Estandar":
      $(".liEstandar").css("border-bottom", "3px solid #3ec7bb");
      break;
    case "Deluxe":
      $(".liDeluxe").css("border-bottom", "3px solid #3ec7bb");
      break;
    case "Suite":
      $(".liSuite").css("border-bottom", "3px solid #3ec7bb");
      break;
  }
}

function getMes(numMes) {
  meses = [
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

  mesElegido = null;

  mesElegido = meses.find((elemento) => meses.indexOf(elemento) + 1 == numMes);

  return mesElegido;
}

//abrir subMenus
openSubMenu(
  "http://localhost/sistema%20Hotel/img/btnFlechaAbajo.png",
  "http://localhost/sistema%20Hotel/img/btnFlecha.png"
);

function graphicClientsDashboard(dataPoints, grafica, titulo, theme) {
  var chart = new CanvasJS.Chart(grafica, {
    theme: theme,
    animationEnabled: true,
    title: {
      text: titulo,
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

function graficarHabitaciones(
  dataPointsHabitacionesReservadas,
  graficaHabitaciones,
  title
) {
  var chart = new CanvasJS.Chart(graficaHabitaciones, {
    theme: "light2",
    animationEnabled: true,
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
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: dataPointsHabitacionesReservadas,
      },
    ],
  });
  chart.render();
}

const graficarGananciasPorMes = (dataPoints, graficaGanancias, title) => {
  var chart = new CanvasJS.Chart(graficaGanancias, {
    animationEnabled: true,
    title: {
      text: title,
    },
    axisX: {
      valueFormatString: "MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "Precios (en $UY)",
      valueFormatString: "$##0.00",
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
        xValueFormatString: "MMM",
        yValueFormatString: "$##0.00",
        dataPoints: dataPoints,
      },
    ],
  });
  chart.render();
};

async function getClientsByMonthActualYear(actualYear) {
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/admin/cliente/opcionCliente.php?option=clientsGraphic&year=" +
        actualYear,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    dataPointsToGraphicClientsDashboard(result);
  } catch (error) {
    console.log(error);
  }
}

function dataPointsToGraphicClientsDashboard(monthsClients) {
  let dataPointsMonthsClients = [];

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
    $("#containButtonClientes").css("display", "block");
    $("#sinDatosGraficaClientes").css("display", "none");

    graphicClientsDashboard(
      dataPointsMonthsClients,
      "graficaClientesDashboard",
      "",
      "light2"
    );
    $("#navAdmin").css("marginTop", "-22px");
  }
}

async function getCategoryRoomsMostReserved() {
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/admin/reservas/opcionHabitacion.php?option=dashboardGraphic",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const result = await response.json();

    dataPointsToGraphicRooms(result);
  } catch (error) {
    console.log(error);
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
    $("#containButtonHabitaciones").css("display", "block");
    $("#sinDatosGraficaHabitaciones").css("display", "none");

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
  }

  if (dataPointsRoomsReserved.length > 0) {
    graficarHabitaciones(
      dataPointsRoomsReserved,
      "graficaHabitacionesDashboard",
      ""
    );
  }
}

async function getRevenueActualYear() {
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/admin/ganancias/opcionPago.php?option=dashboardGraphic",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const result = await response.json();

    dataPointsToGraphicRevenues(result);
  } catch (error) {
    console.log(error);
  }
}

function dataPointsToGraphicRevenues(revenuesByMonth) {
  let dataPointsRevenues = [];

  let totalRevenues = revenuesByMonth.reduce(
    (ac, ganancia) => (ac += ganancia.revenues),
    0
  );

  if (totalRevenues > 0) {
    $("#containButtonGanancias").css("display", "block");
    $("#sinDatosGraficaGanancias").css("display", "none");

    dataPointsRevenues = revenuesByMonth.map((ganancia) => {
      dataPointRevenue = {
        x: new Date(ganancia.month),
        y: ganancia.revenues,
      };

      return dataPointRevenue;
    });
  }

  if (dataPointsRevenues.length > 0) {
    graficarGananciasPorMes(
      dataPointsRevenues,
      "graficaGananciasDashboard",
      ""
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let actualDate = new Date();
  let actualYear = actualDate.getFullYear();

  if (document.getElementById("viewClientesDashboard")) {
    getClientsByMonthActualYear(actualYear);
    getCategoryRoomsMostReserved();
    getRevenueActualYear();
  }
});
