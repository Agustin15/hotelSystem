function alerta(msj) {
  $(document).ready(function () {
    const avisoCompleteDatos = $(".avisoCompleteDatos");
    const labelMsj = avisoCompleteDatos.find("label");

    labelMsj.text(msj);

    window.scroll(0, 0);
    avisoCompleteDatos.removeClass("desactivarCompleteDatos");
    avisoCompleteDatos.addClass("activarCompleteDatos");

    function borrarAlerta() {
      avisoCompleteDatos.removeClass("activarCompleteDatos");
      avisoCompleteDatos.addClass("desactivarCompleteDatos");
    }

    setTimeout(borrarAlerta, 5000);
  });
}

function alertaCompleteDatos(msj) {
  const avisoCompleteDatos = $(".avisoCompleteDatosFormulario");

  const labelMsj = avisoCompleteDatos.find("label");
  labelMsj.text(msj);

  window.scroll(0, 0);
  avisoCompleteDatos.removeClass("desactivarCompleteDatosFormulario");
  avisoCompleteDatos.addClass("activarCompleteDatosFormulario");

  function borrarAlerta() {
    avisoCompleteDatos.addClass("desactivarCompleteDatosFormulario");
  }

  setTimeout(borrarAlerta, 4000);
}

function alertGuests(msj,alert,roomToDisplay) {

  

  alert.style.top=roomToDisplay.offsetTop+"px";
  alert.querySelector("span").textContent = msj;  
  alert.classList.remove("alertGuestsHide");
  alert.classList.add("alertGuestsShow");

  
  setTimeout(function(){
   
    alert.classList.add("alertGuestsHide");
    alert.classList.remove("alertGuestsShow");
   

  }, 4000);
}
