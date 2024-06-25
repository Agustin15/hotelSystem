
function buscadorReserva() {

    const texto = $("#buscador").val();

    var trBody = $(".trBody");

    var cont = 0;
    trBody.each(function () {

        cont++;

        if ($(this).text().indexOf(texto) === -1) {

            $(this).hide();

        } else {


            $(this).show();


        }
    });


    var trHidden = trBody.filter(':hidden');
    if (trHidden.length === cont) {

        $("#sinDatosTblReservas").css("display", "block");
    } else {

        $("#sinDatosTblReservas").css("display", "none");

    }


}


function buscadorParametroReserva(valueFind, tdClass, dataSet) {

    var tds = $(tdClass);

    tds.each(function () {

        var tr = $(this).parent();

        var tdValue = $(this).data(dataSet);

        if (tdValue == valueFind) {

            tr.show();

        } else {

            tr.hide();

        }
    });


}

function opcionReserva(datosReserva, opcion) {


    var reserva = datosReserva[0];

    $("#modal").css("display", "block");
    $("#modal").css("cursor", "none");

    switch (opcion) {


        case "eliminar":

            $(".divOpcion").addClass("divConfirmacionDelete");
            $(".divOpcion").load("formEliminar.php?reserva=" +
                encodeURIComponent(JSON.stringify(reserva)));



            break;
        case "editar":

            $(".divOpcion").addClass("divEditar");
            $(".divOpcion").load("formEditar.php?reserva=" +
                encodeURIComponent(JSON.stringify(reserva)));


            break;

        case "info":

            $(".divOpcion").addClass("divInfo");
            $(".divOpcion").load("infoReserva.php?reserva=" +
                encodeURIComponent(JSON.stringify(reserva)));


            break;
    }

}



function aviso(resultado, opcion) {

    console.log(resultado);

    var imgAvisoReserva = null;
    var lblReservaAviso = null;
    var imgAvisoHabitacion = null;
    var lblHabitacionAviso = null;


    switch (opcion) {

        case "Eliminar":


            var aviso = document.getElementById("avisoReserva");

            aviso.classList.remove("avisoReservaDesactive");
            aviso.classList.add("avisoReservaActive");

            aviso.style.background = "linear-gradient(red,rgb(226, 4, 4))";
            if (resultado) {

                imgAvisoReserva = "../../../img/tickEliminar.png";
                lblReservaAviso = "Reserva eliminada";


            } else {

                imgAvisoReserva = "../../../img/cruzEliminar.png";
                lblReservaAviso = "Error al eliminar la reserva";

            }


            aviso.innerHTML = `
    
    <img src="${imgAvisoReserva}">

    <label>${lblReservaAviso}</label>
    `;

            borrarAviso(aviso);
            break;

        case "Editar":

            var aviso = document.getElementById("avisoReserva");
            aviso.style.background = "rgb(0, 89, 255)";

            if (resultado) {

                imgAvisoReserva = "../../../img/tickEditar.png";
                lblReservaAviso = "Reserva actualizada";

            }

            aviso.innerHTML = `
    
    <img src="${imgAvisoReserva}">

    <label>${lblReservaAviso}</label>
    
    `;

            borrarAviso(aviso);

            break;

        case "Asignar habitacion":

            var avisoHabitacion = document.getElementById("avisoHabitacion");
            avisoHabitacion.style.background = "red";

            if (resultado) {

                imgAvisoHabitacion = "../../../img/tickEliminar.png";
                lblHabitacionAviso = "Habitacion asignada";

            }

            avisoHabitacion.innerHTML = `
    
            <img src="${imgAvisoHabitacion}">
        
            <label>${lblHabitacionAviso}</label>
            `;

            borrarAviso(avisoHabitacion);
            break;

        case "Remplazar habitacion":


            var avisoHabitacion = document.getElementById("avisoHabitacion");

            avisoHabitacion.classList.remove("avisoHabitacionDesactive");
            avisoHabitacion.classList.add("avisoHabitacionActive");
            avisoHabitacion.style.backgroundColor = "red";


            if (resultado) {

                imgAvisoHabitacion = "../../../img/tickEliminar.png";
                lblHabitacionAviso = "Habitacion remplazada";

            }

            avisoHabitacion.innerHTML = `
    
    <img src="${imgAvisoHabitacion}">

    <label>${lblHabitacionAviso}</label>
    `;

            borrarAviso(avisoHabitacion);

            break;

        case "Liberar habitacion":


            var avisoHabitacion = document.getElementById("avisoHabitacion");

            avisoHabitacion.classList.remove("avisoHabitacionDesactive");
            avisoHabitacion.classList.add("avisoHabitacionActive");
            avisoHabitacion.style.backgroundColor = green;


            if (resultado) {

                imgAvisoHabitacion = "../../../img/tickAgregar.png";
                lblHabitacionAviso = "Habitacion liberada";

            }

            avisoHabitacion.innerHTML = `
    
    <img src="${imgAvisoHabitacion}">

    <label>${lblHabitacionAviso}</label>
    `;

            borrarAviso(avisoHabitacion);

            break;

    }



    recargar();

}

function borrarAviso(aviso) {

    setTimeout(function () {

        if (aviso == "aviso") {
            aviso.classList.add("avisoReservaDesactive");

        } else {
            aviso.classList.add("avisoHabitacionDesactive");
        }

    }, 2000);
}

function recargar() {

    setTimeout(function () {

        location.reload();

    }, 2020)

}

function cargarCalendario(calendar,evento) {

    var calendarEl = calendar;
    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        initialDate: evento[0].start,
        events: evento,

        eventMouseEnter: function (info) {

            info.event.setProp("backgroundColor", "#2984A2");


        },

        eventMouseLeave: function (info) {

            info.event.setProp("backgroundColor", "#329DBF");


        }

    });
    calendar.render();


}


function cargarCalendarioAddEvent(calendar, evento) {



    var hoy = new Date();
    var calendarEl = calendar;
    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        selectable: true,
        initialDate: hoy,
        events: evento,
        eventClick: function (info) {


            descriptionEvent(info.jsEvent, info.event);

        },

        select: function (info) {

            modalNewReserve(info);
        },

        eventMouseEnter: function (info) {

            if (info.event.end < hoy) {

                info.event.setProp("backgroundColor", "#D03232");

            } else {

                info.event.setProp("backgroundColor", "#1A69A2");

            }

        },

        eventMouseLeave: function (info) {

            if (info.event.end < hoy) {
                info.event.setProp("backgroundColor", "#F04141");

            }else{

                info.event.setProp("backgroundColor", "#329DBF");
            }
        }

    });

    calendar.render();

}



var valueMouseEnterEvent = 0;
const descriptionEvent = (jsEvent, dataEvent) => {

    if ($("#descriptionEvent").length == 0 || dataEvent.id != valueMouseEnterEvent) {

        if ($("#descriptionEvent").length > 0) {

            $("#descriptionEvent").remove();
        }

        valueMouseEnterEvent = dataEvent.id;
        var idReserva = dataEvent.id;
        var llegada = dataEvent.start;
        var salida = dataEvent.end;
        var nombre = dataEvent.extendedProps.clienteNombre;
        var apellido = dataEvent.extendedProps.clienteApellido;
        var correo = dataEvent.extendedProps.clienteCorreo;
        llegada = llegada.toLocaleDateString();
        salida = salida.toLocaleDateString();


        var divDescriptionEvent = document.createElement("div");
        divDescriptionEvent.id = "descriptionEvent";
        divDescriptionEvent.style.left = jsEvent.pageX + "px";
        divDescriptionEvent.style.top = jsEvent.pageY + "px";
        divDescriptionEvent.innerHTML =

            `
        <img src="../../../img/detalles.png">
        <br>
        <h1><a class="linkReserva" href="lista.php?idReserva=${idReserva}">Reserva${idReserva}<a></h1>
    
     <li>Llegada:${llegada}</li>
     <li>salida:${salida}</li>
     <li>cliente:<a class="linkCliente" href="../../admin/clientes/lista.php?cliente=${correo}">
     ${nombre} ${apellido}(${correo})</a></li>

    `;

        calendarAdd.appendChild(divDescriptionEvent);
        divDescriptionEvent.classList.remove("descriptionEventHide");
        divDescriptionEvent.classList.add("descriptionEventShow");

        const btnCerrar = document.createElement("img");
        btnCerrar.id = "btnCerrar";
        btnCerrar.src = "../../../img/cerrarVentana.png";
        divDescriptionEvent.appendChild(btnCerrar);


        $("#btnCerrar").on("click", function () {

            $("#descriptionEvent").remove();

        });

    }


}

const modalNewReserve = (info) => {

    // alert('selected ' + info.startStr + ' to ' + info.endStr);

    const fechaLlegada = info.startStr;
    const fechaSalida = info.endStr;
    $("#modal").css("display", "block");
    $("#modal").css("cursor", "none");

    $(".divOpcion").addClass("newReserve");
    $(".divOpcion").load("formAgregar.php?fechaLlegada=" +
        fechaLlegada, "&fechaSalida=" + fechaSalida);


}