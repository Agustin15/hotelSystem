function alerta(msj) {
 
    const avisoCompleteDatos = document.querySelector(".avisoCompleteDatos");
    const progresBar=avisoCompleteDatos.querySelector(".bar");
    const labelMsj = avisoCompleteDatos.querySelector("label");
    labelMsj.textContent=msj;
   
    window.scroll(0, 0);
  
   
    avisoCompleteDatos.classList.remove("desactivarCompleteDatos");
    avisoCompleteDatos.classList.add("activarCompleteDatos");
    progresBar.classList.add("barActive");

    function borrarAlerta() {
      avisoCompleteDatos.classList.remove("activarCompleteDatos");
      avisoCompleteDatos.classList.add("desactivarCompleteDatos");
      progresBar.classList.remove("barActive");
   
    }

    setTimeout(borrarAlerta, 6000);
  
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

function alertGuests(msj, alert, roomToDisplay) {
  alert.style.top = roomToDisplay.offsetTop + "px";
  alert.querySelector("span").textContent = msj;
  alert.classList.remove("alertGuestsHide");
  alert.classList.add("alertGuestsShow");
  alert.querySelector(".bar").classList.add("barActive");
  

  setTimeout(function () {
    alert.classList.add("alertGuestsHide");
    alert.classList.remove("alertGuestsShow");
    alert.querySelector(".bar").classList.remove(".barActive");
  }, 4000);
}

function alertClientForm(msj) {
  let alertClient = document.getElementById("alertClient");
  let progresBar= document.querySelector(".progres");
  alertClient.querySelector("p").textContent = msj;

  alertClient.classList.remove("alertClientHide");
  alertClient.classList.add("alertClientShow");
  progresBar.classList.add("progresBarActive");
  
  setTimeout(function () {
    alertClient.classList.add("alertClientHide");
    alertClient.classList.remove("alertClientShow");
    progresBar.classList.remove("progresBarActive");
  }, 10000);
}

async function confirmAlertBookingExist(msj) {
  return new Promise((resolve) => {
    let modalBooking = document.querySelector(".modalBooking");
    modalBooking.querySelector("p").textContent = msj;

    modalBooking.style.display = "block";

    modalBooking.querySelector(".btnOK").addEventListener("click", function () {
      resolve(true);
    });

    modalBooking
      .querySelector(".btnCancel")
      .addEventListener("click", function () {
        resolve(false);
      });
  });
}


function alertErrorBooking(msj){

  let modalBooking = document.querySelector(".modalBooking");
  modalBooking.querySelector("p").textContent = msj;
  modalBooking.style.display = "block";
  modalBooking.querySelector(".btnCancel").style.display="none";

  
  modalBooking.querySelector(".btnOK").addEventListener("click", function () {
    
    modalBooking.style.display = "none";
  });

}