
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

    $(document).ready(function () {


      var buttonsOpenSubMenu =document.querySelectorAll(".btnFlecha");

      buttonsOpenSubMenu.forEach(function(button){

        button.addEventListener("click",function(){

            if(this.src===linkBtnFlecha){

            this.src=linkBtnFlechaAbajo;
            var item=button.parentNode;
            var subMenu=item.querySelector("ul");

            subMenu.style.display="block";

            }else{

                this.src=linkBtnFlecha;

            }
        });

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

            $(".liAgregarReserva").css("border-bottom", "3px solid rgb(96, 185, 219)");
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

    meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    mesElegido = null;

    mesElegido = meses.find((elemento) => meses.indexOf(elemento) + 1 == numMes);

    return mesElegido;
}



function graficar(dataPoints, grafica, titulo, theme) {


    var chart = new CanvasJS.Chart(grafica, {
        theme: theme,
        animationEnabled: true,
        title: {
            text: titulo
        },
        data: [{

            type: "column",
            dataPoints: dataPoints

        }]

    });
    chart.render();


}


function graficarHabitaciones(dataPointsHabitacionesReservadas, graficaHabitaciones, title) {


    var chart = new CanvasJS.Chart(graficaHabitaciones, {
        theme: "light2",
        animationEnabled: true,
        title: {
            text: title
        },

        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: dataPointsHabitacionesReservadas
        }]
    });
    chart.render();


}


