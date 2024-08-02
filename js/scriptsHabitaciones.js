
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

function cargarCalendario(calendar,events) {

    var calendarEl = calendar;
    calendar = new FullCalendar.Calendar(calendarEl, {
        locale:'es',
        initialView: 'dayGridMonth',
        initialDate: events[0].start,
        events: events

    });
    calendar.render();


}

