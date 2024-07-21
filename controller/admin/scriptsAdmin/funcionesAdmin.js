function lblInputsLoginActive(label, clase, claseRemove) {
  label.removeClass(claseRemove);
  label.addClass(clase);
}

function lblInputsLoginDesactive(label, input, claseAdd) {
  if (input.val() == "") {
    label.addClass(claseAdd);
  }
}

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

function setImg(bannerLink, iconoLink) {
  $(document).ready(function () {
    $(".imgBanner").attr("src", bannerLink);
    $(".iconoAdmin").attr("src", iconoLink);
  });
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
