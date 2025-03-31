export const displayServicesDetailsRoom = (numberRoom, servicesRoom) => {
  let modal = document.querySelector(".modalServicesRoom");
  modal.style.display = "flex";
  modal.innerHTML = `
  <div class="containServicesRoom">
      <div class="headerServicesRoom">
                  <div class="titleServicesRoom">
                <h3>Servicios habitacion ${numberRoom}</h3>
                 </div>
                <div class="closeServicesRoom">
                <button class="btnCloseServicesRoom">X</button>
                </div>
        </div>
        <div class="bodyServicesRoom"></div>
  </div>
  `;

  document
    .querySelector(".btnCloseServicesRoom")
    .addEventListener("click", () => {
      closeWindow(modal);
    });
  displayItems(servicesRoom);
};

const displayItems = (servicesRoom) => {
  let bodyServicesRoom = document.querySelector(".bodyServicesRoom");

  bodyServicesRoom.innerHTML = `<ul></ul>`;

  let items = servicesRoom.map((service) => {
    return `
     <li class="item">
    <span title="${
      service.nombreServicio == "Cantina" || service.nombreServicio == "Minibar"
        ? service.descripcionServicio
        : ""
    }" class="name">${
      service.nombreServicio == "Masajes" ||
      service.nombreServicio == "Telefono"
        ? "Servicio " + service.nombreServicio
        : `${service.nombreServicio}(${service.descripcionServicio}) `
    }</span>
    <div class="row">
        <div class="columnOne">
            <div class="icon">
                <img src="data:image/png;base64,${service.imagen}">
            </div>
        </div>
        <div class="columnTwo">
            <span><a>Cantidad:</a>${service.cantidad}</span>
            <span><a>Precio:</a>U$S ${service.precio}</span>
             <span><a>Total:</a>U$S ${service.cantidad * service.precio}</span>
        </div>
    </div>
</li>
     
    `;
  });

  bodyServicesRoom.querySelector("ul").innerHTML = items.join("");
};

const closeWindow = (modal) => {
  modal.style.display = "none";
  modal.innerHTML = ``;
};
