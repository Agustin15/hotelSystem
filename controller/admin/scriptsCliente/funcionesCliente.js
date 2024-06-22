


function buscadorEstadia() {

    const textoBuscador = $("#buscadorEstadia").val();

    const tableEstadias = $("#tableEstadias");

    var trs = tableEstadias.find('tr');

    var cont = 0;
    trs.each(function () {

        cont++;

        if ($(this).text().indexOf(textoBuscador) === -1) {

            $(this).hide();

        } else {


            $(this).show();


        }

    });

    var trHidden = trs.filter(':hidden');
    if (trHidden.length === cont) {

        $(".sinResultados").css("display", "block");
    } else {

        $(".sinResultados").css("display", "none");

    }


}

function buscadorCliente() {

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

        $("#sinDatosTblClientes").css("display", "block");
    } else {

        $("#sinDatosTblClientes").css("display", "none");

    }


}


function buscadorParametroCliente(valueFind,tdClass,dataSet) {

    var tds = $(tdClass);

    tds.each(function () {

        var tr=$(this).parent();

        var tdValue = $(this).data(dataSet);

        if (tdValue == valueFind) {

            tr.show();

        } else {

            tr.hide();

        }
    });

}

function opcionCliente(datosCliente, opcion) {


    var cliente = datosCliente[0];

    $("#modal").css("display", "block");
    $("#modal").css("cursor", "none");



    switch (opcion) {


        case "eliminar":

            $(".divOpcion").addClass("divConfirmacionDelete");
            $(".divOpcion").load("formEliminar.php?cliente=" +
                encodeURIComponent(JSON.stringify(cliente)));



            break;
        case "editar":

            $(".divOpcion").addClass("divEditar");
            $(".divOpcion").load("formEditar.php?cliente=" +
                encodeURIComponent(JSON.stringify(cliente)));


            break;

        case "info":

            $(".divOpcion").addClass("divInfo");
            $(".divOpcion").load("infoCliente/infoCliente.php?cliente=" +
                encodeURIComponent(JSON.stringify(cliente)));


            break;
    }

}



function aviso(resultado, opcion) {


    
    console.log(resultado);

    const aviso = document.getElementById("avisoCliente");
    var imgAvisoCliente = null;
    var lblClienteAviso = null;

    aviso.classList.remove("avisoClienteDesactive");
    aviso.classList.add("avisoClienteActive");

    switch (opcion) {

        case "Eliminar":

            aviso.style.background = "linear-gradient(red,rgb(226, 4, 4))";
            if (resultado) {

                imgAvisoCliente = "../../../img/tickEliminar.png";
                lblClienteAviso = "Cliente eliminado";


            } else {

                imgAvisoCliente = "../../../img/cruzEliminar.png";
                lblClienteAviso = "Error al eliminar el cliente";

            }
            break;

        case "Editar":
            aviso.style.background = "rgb(0, 89, 255)";

            if (resultado) {

                imgAvisoCliente = "../../../img/tickEditar.png";
                lblClienteAviso = "Cliente actualizado";

            }

            break;

    }


    aviso.innerHTML = `
    
    <img src="${imgAvisoCliente}">

    <label>${lblClienteAviso}</label>
    `;

    borrarAviso(aviso);


    recargar();

}

function borrarAviso(aviso) {

    setTimeout(function () {


        aviso.classList.add("avisoClienteDesactive");


    }, 2000);
}

function recargar() {

    setTimeout(function () {

        location.reload();

    }, 2020)

}