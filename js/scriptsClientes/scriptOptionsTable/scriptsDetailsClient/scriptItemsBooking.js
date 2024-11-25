export const generateItemsInfo = (idBooking) => {
  let itemsInfo = [
    {
      icon: "../../../img/guestInfo.png",
      title: "Huespedes",
      class: "guests",
      btnClass:"viewGuests",
      description:
        "Puede ver la cantidad de huespedes de la reserva,y la cantidad que estan hospedados por cada habitacion reservada",
    },

    {
      icon: "../../../img/roomInfoIcon.png",
      title: "Habitaciones",
      class: "rooms",
      btnClass:"viewRooms",
      description:
        "Detalles de las habitaciones reservadas por el cliente , como numero de habitacion y categoria",
    },

    {
      icon: "../../../img/minibarInfo.png",
      title: "Servicios",
      class: "services",
      btnClass:"viewServices",
      description:
        "Detalles sobre los productos consumidos en la habitaciones como el minibar y la cantina del hotel durante la estadia",
    },
  ];

  let items = itemsInfo.map((item) => {
    return `
  
      <div class=${item.class}>
    
          <div class="headerItem">
    
              <img src="${item.icon}">
              <p>${item.description}</p>
          </div>
          <div id=${idBooking}  class="footer">
    
          <span>${item.title}</span>
              <img class="${item.btnClass}" src="../../../img/ver.png">
          </div>
    
      </div>`;
  });

  return items;
};
