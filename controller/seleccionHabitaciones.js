const formDatosReserva = document.getElementById("formDatosReserva");

const habitacionesElegidas = document.getElementById("habitacionesElegidas");

const fechaReserva = document.getElementById("fechaReserva");

const containerDeposito = document.getElementById("containerDeposito");

const habitaciones = document.getElementById("habitaciones");

const btnSiguiente = document.getElementById("btnSiguiente");

const btnsAgregarHabitacion = document.querySelectorAll(".btnAgregar");

const estandar = document.querySelector(".containerEstandar");

var fechaLlegada = document.getElementById("lblFechaLlegada");
var fechaSalida = document.getElementById("lblFechaSalida");
var diferenciaNoches = document.getElementById("diferenciasNoches");
var listaHabitaciones = JSON.parse(localStorage.getItem("habitaciones")) || [];
var depositoFinal = 0;
var contador = 0;


if (listaHabitaciones.length != 0) {

    depositoFinal = calcularDeposito();
    imprimirHabitaciones();

}

btnsAgregarHabitacion.forEach(function (btnAgregarHabitacion) {


    btnAgregarHabitacion.addEventListener("click", function () {


        if (fechaLlegada.textContent == "" || fechaSalida.textContent == "") {


            alerta("Ingresa la fecha de ingreso y de salida");
            window.scroll(0,0);


        } else {

            var idHuespedes = comprobarSelect(btnAgregarHabitacion);

            console.log(idHuespedes);
            if (idHuespedes != null) {

                alertaHuespedes(idHuespedes);

               
            } else {
                var datosHabitacion = leerDatosHabitacion(btnAgregarHabitacion);
                listaHabitaciones.push(datosHabitacion);

                depositoFinal = calcularDeposito();

                imprimirHabitaciones();

                window.scroll(0,0);
                setLocalStorage();


            }



        }

    });


});


function comprobarSelect(boton) {


    var idHuespedes = null;

    var formHabitacion = boton.parentNode;
    var selectAdulto = formHabitacion.querySelector("#selectAdulto");
    var selectNino = formHabitacion.querySelector("#selectNino");

    var section = formHabitacion.parentNode;
    var divHabitacion= section.parentNode;


    
    if (selectAdulto.options[selectAdulto.selectedIndex].text == "0" &&
        selectNino.options[selectNino.selectedIndex].text == "0") {

        idHuespedes = divHabitacion.querySelector("#alertaHuesped");


    }


    return idHuespedes;


}

function leerDatosHabitacion(boton) {



    const habitacion = boton.parentNode;
    contador++;

    var categoria = habitacion.dataset.categoria;
    var precioHab = habitacion.dataset.precio;
    var cantHabitaciones = 1;
    var cantAdulto = null;
    var cantNino = null;
    var icono = habitacion.dataset.icono;
    var noches = diferenciaNoches.textContent;
    var disponibles = habitacion.dataset.disponibles;
    var id = contador;


    var selects = habitacion.querySelectorAll("select");

    selects.forEach(function (select) {

        if (select.id === "selectAdulto") {

            cantAdulto = select.options[select.selectedIndex].text;

        } else {

            cantNino = select.options[select.selectedIndex].text;

        }
    });


    const datosHabitacion = {
        "Id": id,
        "Categoria": categoria,
        "PrecioHab": precioHab,
        "CantHabitaciones": cantHabitaciones,
        "CantAdultos": cantAdulto,
        "CantNinos": cantNino,
        "Icono": icono,
        "Noches": noches,
        "Disponibles": disponibles,
        "TotalHabitacion": null

    }

    return datosHabitacion;


}


function calcularDeposito() {


    var deposito = 0;


    listaHabitaciones.forEach(function (habitacion) {


        habitacion.TotalHabitacion = (habitacion.PrecioHab * habitacion.Noches)
            * habitacion.CantHabitaciones;

        deposito += habitacion.TotalHabitacion;



    });



    return deposito;



}



function imprimirHabitaciones() {

    limpiarHabitacionesImpresas();



    listaHabitaciones.forEach(function (habitacionSeleccionada) {


        const habitacionElegida = document.createElement('div');
        habitacionElegida.classList.add("datosHabitaciones");
        habitacionesElegidas.appendChild(habitacionElegida);


        habitacionElegida.innerHTML = `
        <img class="iconoHabitacion" src=${habitacionSeleccionada.Icono}> 
        <label class="lblCategoria">Habitacion:${habitacionSeleccionada.Categoria}</label>
        <label class="lblCantAdultos">Adultos:${habitacionSeleccionada.CantAdultos}</label>
        <label class="lblCantNinos">Niños:${habitacionSeleccionada.CantNinos}</label>
        <label class="lblNoches">Noches:${habitacionSeleccionada.Noches}</label>
        <label class="lblPrecio">Precio:$${habitacionSeleccionada.TotalHabitacion}</label>
        <label class="lblCantHabitaciones">${habitacionSeleccionada.CantHabitaciones}</label>`;


        const eliminar = document.createElement('img');
        eliminar.src = "../img/basura.png";
        eliminar.classList.add("imgEliminar");
        habitacionElegida.appendChild(eliminar);


        const btnAumentar = document.createElement('button');
        btnAumentar.textContent = "+";
        btnAumentar.dataset.tipoBoton = "aumentar";
        btnAumentar.classList.add("btnSumar");
        habitacionElegida.appendChild(btnAumentar);

        const btnRestar = document.createElement('button');
        btnRestar.textContent = "–";
        btnRestar.dataset.tipoBoton = "restar";
        btnRestar.classList.add("btnRestar");
        habitacionElegida.appendChild(btnRestar);


        eliminar.addEventListener("click", function () {

            eliminarHabitacion(habitacionSeleccionada);

        });


        btnAumentar.addEventListener("click", function () {


            aumentarCantHabitacion(habitacionSeleccionada, habitacionSeleccionada.Disponibles);
        });

        btnRestar.addEventListener("click", function () {


            restarCantHabitacion(habitacionSeleccionada, habitacionSeleccionada.Disponibles);

        });


    });


    if (depositoFinal > 0) {
        containerDeposito.style.visibility = "visible";
        inputDeposito.value = "$" + depositoFinal;

    } else {

        containerDeposito.style.visibility = "hidden";

    }



}


function eliminarHabitacion(habitacionSeleccionada) {


    listaHabitaciones = listaHabitaciones.filter((habitacion) => habitacion.Id !=
        habitacionSeleccionada.Id);

    depositoFinal = calcularDeposito();
    imprimirHabitaciones();

    setLocalStorage();


}


function aumentarCantHabitacion(habitacionSeleccionada, habitacionesDisponibles) {

    const habitacionAEditar = listaHabitaciones.find((habitacion) => habitacion.Id ===
        habitacionSeleccionada.Id)



    if (habitacionAEditar.CantHabitaciones < habitacionesDisponibles) {

        habitacionAEditar.CantHabitaciones++;

        depositoFinal = calcularDeposito();

        imprimirHabitaciones();

        setLocalStorage();


    }


}

function restarCantHabitacion(habitacionSeleccionada) {

    const habitacionAEditar = listaHabitaciones.find((habitacion) => habitacion.Id ===
        habitacionSeleccionada.Id)


    if (habitacionAEditar.CantHabitaciones > 1) {

        habitacionAEditar.CantHabitaciones--;

        depositoFinal = calcularDeposito();

        imprimirHabitaciones();

        setLocalStorage();
    }
}



function limpiarHabitacionesImpresas() {

    habitacionesElegidas.innerHTML = "";

}

function setLocalStorage() {

    localStorage.setItem("habitaciones", JSON.stringify(listaHabitaciones));


}



function stocks(divPadre, estandarDisponibles) {


    const divStockEstandar = document.createElement("div");
    divStockEstandar.id = "divStockEstandar";

    divStockEstandar.innerHTML = `
<label>STOCK</label>
<br>
<a>${estandarDisponibles}</a>

`;
    divPadre.appendChild(divStockEstandar);

}



formDatosReserva.addEventListener("submit", function () {


    const fecha = { 'FechaLlegada': fechaLlegada.textContent, 'FechaSalida': fechaSalida.textContent }

    var fechas = [];

    fechas.push(fecha);





    fetch("http://localhost/Sistema%20Hotel/views/reserva.php", {

        
        method: "POST",
        body: JSON.stringify({ 'habitaciones': JSON.stringify(listaHabitaciones), 'fechas': JSON.stringify(fechas)}),
        headers:
        {

            "Content-Type": "application/json",
        },


    });



});



