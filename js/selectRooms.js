const formCheckIn = document.getElementById("checkIn");
let llegada = document.getElementById("llegada");
let salida = document.getElementById("salida");
let cart = document.getElementById("cart");
let divDeposit = document.getElementById("containDeposit");
let modal = document.getElementById("modal");
let buttonNext = document.getElementById("buttonNext");

let totalDeposit = 0;
let rooms = [];
let quantityCategorysRooms;
let nights;
let dateBooking;
let booking;

const submitDateBooking = (dateBooking) => {
  fetch(
    "http://localhost/sistema%20Hotel/controller/habitaciones.php?option=roomsAvailable&dateBooking=" +
      JSON.stringify(dateBooking),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then((answer) => {
      quantityCategorysRooms = answer;
      printQuantAvailable(quantityCategorysRooms);
    });
};

function disabledRoomWithoutStock(containRoom, quantity) {
  let buttonDisabled = containRoom.querySelector("button");
  if (quantity == 0) {
    containRoom.querySelectorAll("input").forEach((input) => {
      input.disabled = true;
      input.classList.add("inputGuestDisabled");
    });

    buttonDisabled.disabled = true;
    buttonDisabled.classList.add("buttonAddDisabled");
  } else {
    containRoom.querySelectorAll("input").forEach((input) => {
      input.disabled = false;
      input.classList.remove("inputGuestDisabled");
    });
    buttonDisabled.disabled = false;
    buttonDisabled.classList.remove("buttonAddDisabled");
  }
}

const printQuantAvailable = () => {
  let containRooms = [...document.querySelectorAll(".containRoom")];

  containRooms.forEach((containRoom) => {
    let category = containRoom.dataset.category;

    let quantityCategoryFilter = quantityCategorysRooms.filter(
      (quantityCategoryRoom) => quantityCategoryRoom.category == category
    );

    containRoom.querySelector(".containAvailableRooms").innerHTML += `
    
    <div class="quantityAvailableRoom">
    <div>
    <span>STOCK</span>
    </div>
    <div>
    <span>${quantityCategoryFilter[0].quantity}</span>
    </div>
    
    </div>
    `;

    disabledRoomWithoutStock(containRoom, quantityCategoryFilter[0].quantity);
  });
};

const printHotelRooms = (rooms) => {
  hotelRoomsPrint = rooms.map((room) => {
    return `
    

    <div class="containRoom" data-category="${room.category}">
  

        <div class="containTitleAndRoom">
            <div class="img">
  
                <img src="data:image/png;base64,${room.imageOne}">
  
            </div>
            <div class="titleRoom">
  
                <div class="title">
                    <span>${room.category}</span>
                </div>
  
                <div class="icon">
  
                    <img src="../img/room.png">
                </div>
            </div>
            <div class="containAvailableRooms">

            </div>
        </div>
  
  
        <ul class="detailsRoom">
  
            <li>
  
                <div class="title">
                    <div>
                        <img src="../img/audience.png">
                    </div>
                    <div>
                        <h6>Capacidad</h6>
  
                    </div>
                </div>
  
                <div class="value">
                    <span>${room.ability} personas</span>
                </div>
            </li>
  
            <li class="night">
  
                <div class="title">
                    <div>
                        <img src="../img/night.png">
                    </div>
  
                    <div>
                        <h6>Noche minima</h6>
  
                    </div>
                </div>
  
                <div class="value">
                    <span>1</span>
                </div>
  
            </li>
  
            <li class="beds">
                <div class="title">
  
                    <div>
                        <img src="../img/bed.png">
                    </div>
  
                    <div>
  
                        <h6>Camas</h6>
                    </div>
                </div>
  
                <div class="value">
                    <span>${room.beds}</span>
                </div>
  
            </li>
  
            <li class="price">
                <div class="title">
                    <div>
                        <img src="../img/coin.png">
                    </div>
                    <div>
                        <h6>Precio</h6>
                    </div>
                </div>
  
                <div class="value">
                    <span>$${room.price}</span>
                </div>
  
            </li>
        </ul>
  
        <div class="containForm">
  
  
            <div class="containSelectGuests">
  
                <div class="containSelect">
  
                    <div>
                        <label>Adultos</label>
                    </div>
  
                    <div>
                        <input type="number" value="0" min=0 max=${
                          room.ability
                        } data-ability="${room.ability}" class="adult">
                           
                   
                    </div>
  
  
                </div>
  
                <div class="containSelects">
                    <div>
                        <label>Niños</label>
                    </div>
                    <div>
                        <input 
                        type="number" value="0" min=0 max=${
                          room.ability - 1
                        } data-ability="${room.ability - 1}"  class="children">
                           
                   
                    </div>
  
                </div>
  
  
            </div>
  
            <div class="containButton" data-data-room='${JSON.stringify(room)}'>
                <button class="buttonAdd">Agregar</button>
            </div>
        </div>
  
  
  
    </div>
  
    `;
  });

  document.getElementById("containRooms").innerHTML = hotelRoomsPrint.join("");

  validateDateInputs();
};

const submitGetCategoryHotelRooms = () => {
  fetch(
    "http://localhost/sistema%20Hotel/controller/habitaciones.php?option=roomsHotel",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then((answer) => {
      printHotelRooms(answer);
    });
};

function calculateDifferenceNight(llegada, salida) {
  let differenceTime = salida.getTime() - llegada.getTime();

  let differenceDays = Math.round(differenceTime / (1000 * 3600 * 24));

  return differenceDays;
}

const printDateBookingInCart = (dateBooking) => {
  cart.style.display = "flex";

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.querySelector(".startBooking").textContent =
    dateBooking.start.toLocaleDateString("es-ar",options);
  document.querySelector(".endBooking").textContent =
    dateBooking.end.toLocaleDateString("es-ar",options);

  nights = calculateDifferenceNight(dateBooking.start, dateBooking.end);

  if(nights>1){
  document.querySelector(".quantityNights").textContent = `${nights} Noches`;
  }else{

    document.querySelector(".quantityNights").textContent = `${nights} Noche`;
  }
};

const createDataRoom = (button) => {
  let adultInput = button.parentNode.parentNode.querySelector(".adult");
  let childrenInput = button.parentNode.parentNode.querySelector(".children");

  let dataRoom = JSON.parse(button.parentNode.dataset.dataRoom);

  const room = {
    id: rooms.length + 1,
    category: dataRoom.category,
    image: dataRoom.imageOne,
    price: dataRoom.price,
    quantity: 1,
    guests: { adult: adultInput.value, children: childrenInput.value },
    total: dataRoom.price * nights,
  };
  return room;
};

function validateQuantityGuestsInputs(adultInput, childrenInput) {
  let ability = adultInput.ability;
  let validate = null;
  if (childrenInput.value == 0 && adultInput.value == 0) {
    validate = "Ingresa algun huesped";
  } else if (childrenInput.value + adultInput.value > ability) {
    validate = "Capacidad de huespedes excedida";
  }

  return validate;
}

function validateDateInputs() {
  [...document.querySelectorAll(".buttonAdd")].forEach((btn) => {
    btn.addEventListener("click", () => {
      if (llegada.value == "" || salida.value == "") {
        alerta("Ingresa una fecha válida");
      } else {
        if (
          validateQuantityGuestsInputs(
            btn.parentNode.parentNode.querySelector(".adult"),
            btn.parentNode.parentNode.querySelector(".children")
          ) != null
        ) {
          alertGuests(
            validateQuantityGuestsInputs(
              btn.parentNode.parentNode.querySelector(".adult"),
              btn.parentNode.parentNode.querySelector(".children")
            ),
            document.getElementById("alertGuests"),
            btn.parentNode.parentNode.parentNode
          );
        } else {
          let room = createDataRoom(btn);
          let result = comprobateQuantityRoomForAdd(room);
          switch (result) {
            case "quantityAdded":
              printRoomsCart();
              break;
            case null:
              addRoomToList(room);
              printRoomsCart();

              break;
            default:
              alertModal("show");
              window.scroll(0, 90);

              break;
          }
        }
      }
    });
  });
}

if (formCheckIn) {
  formCheckIn.addEventListener("submit", (event) => {
    event.preventDefault();

    if (llegada.value == "" || salida.value == "") {
      alerta("Completa todos los campos");
    } else {
      cleanRoomCart(document.getElementById("roomsBooking"));
      cleanDateBooking();
      cleanQuantityAvailable();
      cleanDeposit();
      rooms = [];

      let startBooking = new Date(llegada.value);
      let endBooking = new Date(salida.value);

      if (endBooking <= startBooking) {
        alerta("Ingresa una fecha válida");
      } else {
        dateBooking = {
          start: startBooking,
          end: endBooking,
        };

        submitDateBooking(dateBooking);
        printDateBookingInCart(dateBooking);
      }
    }
  });
}

const addRoomToList = (room) => {
  rooms.push(room);
};

const printRoomsCart = () => {
  let roomsBooking = document.getElementById("roomsBooking");

  cleanRoomCart(roomsBooking);

  let roomsToPrint = rooms.map((room) => {
    return `

<li class="roomSelected">


<div class="containIconAndQuantity">


<div class="deleteRoom">

<img data-id="${room.id}" class="buttonDelete" src="../img/basura.png">
</div>

<div class="containIconAndCategory">

<div class="icon">
<img src="data:image/png;base64,${room.image}">
</div>

<div class="category">

<span>${room.category}<span>
</div>

</div>
<div class="quantity">

  <div>
 <img data-room='${JSON.stringify(
   room
 )}' class="buttonSubtract" src="../img/minus.png">
  </div>

  <div>

  <span>${room.quantity}</span>
  </div>
  <div>
  <img data-room='${JSON.stringify(
    room
  )}' class="buttonPlus" src="../img/add.png">
  </div>
</div>
</div>

<div class="guests">

<div class="adult">
<div>
<img src="../img/adultRoom.png">
</div>
<div class="value">
<div>
<span>Adultos:</span>
</div>
<div>
<span>${room.guests.adult}</span>
</div>
</div>

</div>

<div class="children">
<div>
<img src="../img/children.png">
</div>
<div class="value">
<div>
<span>Niños:</span>
</div>
<div>
<span>${room.guests.children}</span>
</div>
</div>


</div>

</div>

<div class="containFooterDetails">
<div class="quantityValue">

<span>Cantidad:${room.quantity}</span>
</div>

<div class="price">
<span>Precio:$${room.total}</span>
</div>
</div>
</li>



   `;
  });

  roomsBooking.innerHTML = roomsToPrint.join("");

  document.querySelectorAll(".buttonDelete").forEach((buttonDelete) => {
    buttonDelete.addEventListener("click", function () {
      deleteRoomToList(this.dataset.id);
    });
  });

  document.querySelectorAll(".buttonSubtract").forEach((buttonSubtract) => {
    buttonSubtract.addEventListener("click", function () {
      subtractRoom(JSON.parse(this.dataset.room));
    });
  });

  document.querySelectorAll(".buttonPlus").forEach((buttonPlus) => {
    buttonPlus.addEventListener("click", function () {
      plusRoom(JSON.parse(this.dataset.room));
    });
  });

  totalPriceBooking();

  if (rooms.length > 0) {
    printDeposit();
  } else {
    cleanDeposit();
  }
};

const deleteRoomToList = (id) => {
  rooms = rooms.filter((roomDelete) => roomDelete.id != id);

  printRoomsCart();
};

const subtractRoom = (roomToSubstract) => {
  rooms = rooms.map((roomQuantitySubtract) => {
    if (roomQuantitySubtract.id == roomToSubstract.id) {
      console.log(roomQuantitySubtract);
      if (roomQuantitySubtract.quantity > 1) {
        roomQuantitySubtract.quantity--;
        roomQuantitySubtract.total = calculateTotalRoom(roomQuantitySubtract);
      }
    }
    return roomQuantitySubtract;
  });

  printRoomsCart();
};

const plusRoom = (roomToPlus) => {
  rooms = rooms.map((roomQuantityPlus) => {
    if (roomQuantityPlus.id == roomToPlus.id) {
      let limitRoom = quantityCategorysRooms.reduce((ac, categoryRoom) => {
        if (categoryRoom.category == roomToPlus.category) {
          ac = categoryRoom.quantity;
        }
        return ac;
      }, 0);

      if (roomQuantityPlus.quantity < limitRoom) {
        roomQuantityPlus.quantity++;
        roomQuantityPlus.total = calculateTotalRoom(roomQuantityPlus);
      }
    }

    return roomQuantityPlus;
  });

  printRoomsCart();
};

function comprobateQuantityRoomForAdd(roomForAdd) {
  let result = null;

  if (rooms.length > 0) {
    rooms.forEach((roomInCart) => {
      if (
        roomInCart.category == roomForAdd.category &&
        roomInCart.guests.adult == roomForAdd.guests.adult &&
        roomInCart.guests.children == roomForAdd.guests.children
      ) {
        let limitRoom = quantityCategorysRooms.reduce((ac, categoryRoom) => {
          if (categoryRoom.category == roomForAdd.category) {
            ac = categoryRoom.quantity;
          }
          return ac;
        }, 0);

        if (roomForAdd.quantity + roomInCart.quantity <= limitRoom) {
          roomInCart.quantity++;
          roomInCart.total = calculateTotalRoom(roomInCart);

          return (result = "quantityAdded");
        } else {
          return (result = "Excede el limite de habitaciones disponibles");
        }
      }
    });
  }

  return result;
}

function printDeposit() {
  divDeposit.style.display = "flex";
  divDeposit.querySelector(".total").textContent = "Total:$" + totalDeposit;
}

const calculateTotalRoom = (roomToCalculate) => {
  return roomToCalculate.price * roomToCalculate.quantity * nights;
};

function totalPriceBooking() {
  totalDeposit = rooms.reduce(
    (ac, roomToCalculate) => (ac += roomToCalculate.total),
    0
  );

  return totalDeposit;
}

const alertModal = (option) => {
  if (option == "show") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
  buttonModalAlert();
};

function buttonModalAlert() {
  modal.querySelector("button").addEventListener("click", function () {
    alertModal("hide");
  });
}

const cleanRoomCart = (roomsBooking) => {
  roomsBooking.innerHTML = "";
};

const cleanDateBooking = () => {
  if (document.getElementById("dateBooking")) {
    let spans = document.getElementById("dateBooking").querySelectorAll("span");
    spans.forEach((span) => (span.textContent = ""));
  }
};

const cleanDeposit = () => {
  divDeposit.querySelector(".total").textContent = "";
  divDeposit.style.display = "none";
};

const cleanQuantityAvailable = () => {
  if (document.querySelector(".quantityAvailableRoom")) {
    document
      .querySelectorAll(".containAvailableRooms")
      .forEach((element) => (element.innerHTML = ""));
  }
};

document.addEventListener("DOMContentLoaded", function () {
  submitGetCategoryHotelRooms();
});

buttonNext.addEventListener("click", function () {
  booking = {
    date: dateBooking,
    nights: nights,
    rooms: rooms,
    totalDeposit: totalDeposit,
  };

  localStorage.setItem("booking", JSON.stringify(booking));
  location.href = "reserva.php";
});
