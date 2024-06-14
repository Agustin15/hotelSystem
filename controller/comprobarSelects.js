const selectAdultoEstandar = document.querySelector(".selectAdultoEstandar");
const selectNinoEstandar = document.querySelector(".selectNinoEstandar");

const selectAdultoDeluxe = document.querySelector(".selectAdultoDeluxe");
const selectNinoDeluxe = document.querySelector(".selectNinoDeluxe");

const selectAdultoSuite = document.querySelector(".selectAdultoSuite");
const selectNinoSuite = document.querySelector(".selectNinoSuite");

const btnsAumentar = document.querySelectorAll(".btnSumar");
const btnsRestar = document.querySelectorAll(".btnRestar");

var valorAdultoEstandar = null;
var valorNinoEstandar = null;
var valorAdultoDeluxe = null;
var valorNinoDeluxe = null;
var valorAdultoSuite = null;
var valorNinoEstandar = null;



selectAdultoEstandar.addEventListener("change", function () {


    var valorAdultoEstandar = selectAdultoEstandar.options[selectAdultoEstandar.selectedIndex].text;

    for (var f = 1; f < selectNinoEstandar.options.length; f++) {

        selectNinoEstandar.options[f].disabled = false;

    }

    switch (valorAdultoEstandar) {


        case '2':

            selectNinoEstandar.options[3].disabled = true;

            break;


        case '3':

            selectNinoEstandar.options[3].disabled = true;
            selectNinoEstandar.options[2].disabled = true;

            break;


        case '4':


            for (var f = 1; f < selectNinoEstandar.options.length; f++) {


                selectNinoEstandar.options[f].disabled = true;
            }




            break;

        default:

            for (var f = 1; f < selectNinoEstandar.options.length; f++) {

                selectNinoEstandar.options[f].disabled = false;

            }

            break;

    }

});


selectNinoEstandar.addEventListener("change", function () {


    var valorNinoEstandar = selectNinoEstandar.options[selectNinoEstandar.selectedIndex].text;

    for (var f = 0; f < selectAdultoEstandar.options.length; f++) {

        selectAdultoEstandar.options[f].disabled = false;

    }


    switch (valorNinoEstandar) {


        case '1':


            selectAdultoEstandar.options[4].disabled = true;


            break;

        case '2':

            selectAdultoEstandar.options[4].disabled = true;
            selectAdultoEstandar.options[3].disabled = true;


            break;

        case '3':

            for (var f = 2; f < selectAdultoEstandar.options.length; f++) {

                selectAdultoEstandar.options[f].disabled = true;

            }

            break;

        default:

            for (var f = 0; f < selectAdultoEstandar.options.length; f++) {

                selectAdultoEstandar.options[f].disabled = false;

            }

            break;

    }



});




selectAdultoDeluxe.addEventListener("change", function () {

    var valorAdultoDeluxe = selectAdultoDeluxe.options[selectAdultoDeluxe.selectedIndex].text;

    for (var f = 1; f < selectNinoDeluxe.options.length; f++) {

        selectNinoDeluxe.options[f].disabled = false;

    }


    switch (valorAdultoDeluxe) {


        case '2':

            selectNinoDeluxe.options[4].disabled = true;


            break;

        case '3':

            selectNinoDeluxe.options[3].disabled = true;
            selectNinoDeluxe.options[4].disabled = true;


            break;

        case '4':

            for (var f = 2; f < selectNinoDeluxe.options.length; f++) {

                selectNinoDeluxe.options[f].disabled = true;

            }


            break;


        case '5':

            for (var f = 1; f < selectNinoDeluxe.options.length; f++) {

                selectNinoDeluxe.options[f].disabled = true;

            }


            break;

        default:

            for (var f = 1; f < selectNinoDeluxe.options.length; f++) {

                selectNinoDeluxe.options[f].disabled = false;

            }

            break;



    }


});





selectNinoDeluxe.addEventListener("change", function () {


    var valorNinoDeluxe = selectNinoDeluxe.options[selectNinoDeluxe.selectedIndex].text;

    for (var f = 1; f < selectAdultoDeluxe.options.length; f++) {

        selectAdultoDeluxe.options[f].disabled = false;

    }


    switch (valorNinoDeluxe) {


        case '1':


            selectAdultoDeluxe.options[5].disabled = true;

            break

        case '2':

            selectAdultoDeluxe.options[4].disabled = true;
            selectAdultoDeluxe.options[5].disabled = true;

            break;

        case '3':

            for (var f = 3; f < selectAdultoDeluxe.options.length; f++) {

                selectAdultoDeluxe.options[f].disabled = true;

            }

            break;


        case '4':

            for (var f = 2; f < selectAdultoDeluxe.options.length; f++) {

                selectAdultoDeluxe.options[f].disabled = true;

            }

            break;

        default:

            for (var f = 1; f < selectAdultoDeluxe.options.length; f++) {

                selectAdultoDeluxe.options[f].disabled = false;

            }

            break;

    }



});



selectAdultoSuite.addEventListener("change", function () {

    var valorAdultoSuite = selectAdultoSuite.options[selectAdultoSuite.selectedIndex].text;

    for (var f = 1; f < selectNinoSuite.options.length; f++) {

        selectNinoSuite.options[f].disabled = false;

    }


    switch (valorAdultoSuite) {



        case '0':

            for (var f = 0; f < selectNinoSuite.options.length; f++) {

                selectNinoSuite.options[f].disabled = true;

            }

            break;

        case '1':

            for (var f = 1; f < selectNinoSuite.options.length; f++) {

                selectNinoSuite.options[f].disabled = false;

            }

            break;

        case '2':

            selectNinoSuite.options[5].disabled = true;


            break;

        case '3':

            selectNinoSuite.options[4].disabled = true;
            selectNinoSuite.options[5].disabled = true;


            break;

        case '4':

            for (var f = 3; f < selectNinoSuite.options.length; f++) {

                selectNinoSuite.options[f].disabled = true;

            }


            break;


        case '5':

            for (var f = 2; f < selectNinoSuite.options.length; f++) {

                selectNinoSuite.options[f].disabled = true;

            }


            break;

        case '6':

            for (var f = 1; f < selectNinoSuite.options.length; f++) {

                selectNinoSuite.options[f].disabled = true;

            }


            break;


    }


});





selectNinoSuite.addEventListener("change", function () {


    var valorNinoSuite = selectNinoSuite.options[selectNinoSuite.selectedIndex].text;

    for (var f = 1; f < selectAdultoSuite.options.length; f++) {

        selectAdultoSuite.options[f].disabled = false;

    }


    switch (valorNinoSuite) {

        case '1':


            selectAdultoSuite.options[6].disabled = true;

            break;

        case '2':

            for (var f = 5; f < selectAdultoSuite.options.length; f++) {

                selectAdultoSuite.options[f].disabled = true;

            }

            break;

        case '3':

            for (var f = 4; f < selectAdultoSuite.options.length; f++) {

                selectAdultoSuite.options[f].disabled = true;

            }

            break;


        case '4':

            for (var f = 3; f < selectAdultoSuite.options.length; f++) {

                selectAdultoSuite.options[f].disabled = true;

            }

            break;


        case '5':

            for (var f = 2; f < selectAdultoSuite.options.length; f++) {

                selectAdultoSuite.options[f].disabled = true;

            }

            break;


        default:

            for (var f = 1; f < selectAdultoSuite.options.length; f++) {

                selectAdultoSuite.options[f].disabled = false;

            }

            break;

    }



});





btnsAumentar.forEach(function (btnAumentar){
  
btnAumentar.addEventListener("click", function () {

 
cantInputHabitaciones(btnAumentar);

});

});


btnsRestar.forEach(function (btnRestar){

    
btnRestar.addEventListener("click", function () {


    cantInputHabitaciones(btnRestar);

});

});

var contador = 0;

function cantInputHabitaciones(boton){
 
   
    const divPadre = boton.parentNode;

    const inputCantHabitaciones = divPadre.querySelector("input");

    switch(boton.dataset.tipoBtn){


        case "sumar":

            if (contador <11) {
                contador++;
        
        
                inputCantHabitaciones.value = contador;
            }
        
            break;


        case "restar":
    if (contador > 0) {
        contador--;


        inputCantHabitaciones.value = contador;
    }

    break;

}

}