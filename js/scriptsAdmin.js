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

if (typeof iconAdmin !== "undefined") {
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
      $(".liGrafica").css("border-bottom", "3px solid rgb(96, 185, 219)");
      break;

    case "listaClientes":
      $(".liLista").css("border-bottom", "3px solid rgb(96, 185, 219)");
      break;

    case "agregar":
      $(".liAgregar").css("border-bottom", "3px solid rgb(96, 185, 219)");
      break;

    case "listaReservas":
      $(".liListaReservas").css("border-bottom", "3px solid rgb(96, 185, 219)");
      break;
    case "agregarReserva":
      $(".liAgregarReserva").css(
        "border-bottom",
        "3px solid rgb(96, 185, 219)"
      );
      break;

    case "habitaciones":
      $(".liHabitaciones").css("border-bottom", "3px solid rgb(96, 185, 219)");
      break;

    case "Estandar":
      $(".liEstandar").css("border-bottom", "3px solid rgb(96, 185, 219)");
      break;
    case "Deluxe":
      $(".liDeluxe").css("border-bottom", "3px solid rgb(96, 185, 219)");
      break;
    case "Suite":
      $(".liSuite").css("border-bottom", "3px solid rgb(96, 185, 219)");
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

function graficar(dataPoints, grafica, titulo, theme) {
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

//Grafica clientes

let viewClientes = document.getElementById("viewClientes");
let dataPointsClientes = [];

if (document.body.contains(viewClientes)) {
  var mesesClientes = JSON.parse(viewClientes.dataset.mesesClientes);

  let sumaClientes = mesesClientes.reduce((ac, element) => {
    return ac + element.cantClientes + element.cantClientes;
  }, 0);

  if (sumaClientes > 0) {
    $("#containButtonClientes").css("display", "block");
    $("#sinDatosGraficaClientes").css("display", "none");

    var mes = 0;
    var cantClientes = 0;

    dataPointsClientes = mesesClientes.map((mesCliente) => {
      var dataPointCliente = {
        label: getMes(mesCliente.mes),
        y: mesCliente.cantClientes,
      };

      return dataPointCliente;
    });
  }
}
//grafica habitaciones

dataPointsHabitacionesReservadas = [];
let viewHabitaciones = document.getElementById("viewHabitaciones");

if (document.body.contains(viewHabitaciones)) {
  let porcentajeEstandar = viewHabitaciones.dataset.porcentajeEstandar;
  let porcentajeDeluxe = viewHabitaciones.dataset.porcentajeDeluxe;
  let porcentajeSuite = viewHabitaciones.dataset.porcentajeSuite;

  if (porcentajeEstandar.length > 0) {
    $("#containButtonHabitaciones").css("display", "block");
    $("#sinDatosGraficaHabitaciones").css("display", "none");

    dataPointsHabitacionesReservadas.push(
      {
        y: porcentajeEstandar,
        label: "Estandar",
      },
      {
        y: porcentajeDeluxe,
        label: "Deluxe",
      },
      {
        y: porcentajeSuite,
        label: "Suite",
      }
    );
  }
}

let viewGanancias = document.getElementById("viewGanancias");
let dataPointsGanancias = [];

if (document.body.contains(viewGanancias)) {
  let gananciasPorMes = JSON.parse(viewGanancias.dataset.gananciasMes);

  let totalGanancias = gananciasPorMes.reduce(
    (ac, ganancia) => (ac += ganancia.ganancias),
    0
  );

  if (totalGanancias > 0) {
    $("#containButtonGanancias").css("display", "block");
    $("#sinDatosGraficaGanancias").css("display", "none");
    dataPointsGanancias = gananciasPorMes.map((ganancia) => {
      dataPointGanancia = {
        x: new Date(ganancia.mes),
        y: ganancia.ganancias,
      };

      return dataPointGanancia;
    });
  }
}

if (dataPointsClientes.length > 0) {
  graficar(dataPointsClientes, "graficaClientes", "", "light2");
  $("#navAdmin").css("marginTop", "-22px");
}

if (dataPointsHabitacionesReservadas.length > 0) {
  graficarHabitaciones(
    dataPointsHabitacionesReservadas,
    "graficaHabitaciones",
    ""
  );
}

if (dataPointsGanancias.length > 0) {
  graficarGananciasPorMes(dataPointsGanancias, "graficaGanancias", "");
}
