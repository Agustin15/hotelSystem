
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


        ///SubMenu

        $(".btnFlecha").on("click", function () {



            if ($(".subMenu").attr("display")=="block") {

               alert("hay un subMenu abierto");

            }

            var li = $(this).parent();
            var liNext = li.next("li");
            const subMenu = li.find("ul");

            if ($(this).attr("src") == linkBtnFlechaAbajo) {


                $(this).attr("src", linkBtnFlecha);
                subMenu.slideToggle("fast", "swing");
                liNext.animate({
                    'margin-top': '11px'
                }, "fast");

                $("#userAdmin").animate({
                    'margin-top': '0px'
                }, "fast");


            } else {

                $(this).attr("src", linkBtnFlechaAbajo);
                if (subMenu.attr("class") == "subMenuAdmin") {


                    $("#userAdmin").animate({
                        'margin-top': '-80px'
                    }, "fast");

                    subMenu.slideToggle("fast");

                } else {



                    subMenu.slideToggle("fast", "swing");
                    if (liNext.hasClass("optionGanancias")) {

                        liNext.animate({
                            'margin-top': '99px'
                        }, "fast");

                    } else {
                        liNext.animate({
                            'margin-top': '150px'
                        }, "fast");

                    }


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


