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
let dateBooking = null;
let booking;
let ultimateItemIndex;
let indexsImgRooms = [
  { category: "Estandar", indexValue: 1 },
  { category: "Deluxe", indexValue: 1 },
  { category: "Suite", indexValue: 1 },
];

document.addEventListener("DOMContentLoaded", async function () {
  let resultGetCategoryRooms = await submitGetCategoryHotelRooms();

  if (resultGetCategoryRooms) {
    printHotelRooms(resultGetCategoryRooms);

    document.querySelectorAll(".containRoom").forEach((element) => {
      let index;
      let category = element.dataset.category;
      index = indexGetValue(index, category);
      displayIndexItemRoom(element.querySelector("ul"), index);
    });
  }

  if (JSON.parse(localStorage.getItem("rooms")).length > 0) {
    dateBooking = JSON.parse(localStorage.getItem("dateBooking"));

    let startBooking = new Date(dateBooking.start);
    let endBooking = new Date(dateBooking.end);

    dateBooking = {
      start: startBooking,
      end: endBooking,
    };

    submitDateBooking(dateBooking);
    printDateBookingInCart(dateBooking);
    rooms = JSON.parse(localStorage.getItem("rooms"));
   
    printRoomsCart();
  }
});

async function submitGetCategoryHotelRooms() {
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/habitaciones.php?option=roomsHotel",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

if (formCheckIn) {
  formCheckIn.addEventListener("submit", (event) => {
    event.preventDefault();

    if (llegada.value == "" || salida.value == "") {
      alerta("Ingresa una fecha válida");
    } else {
      cleanDateBooking();
      cleanQuantityAvailable();

      let startBooking = new Date(llegada.value);
      let endBooking = new Date(salida.value);

      if (endBooking <= startBooking) {
        alerta("Ingresa una fecha válida");
      } else {
        dateBooking = {
          start: startBooking,
          end: endBooking,
        };

        localStorage.setItem("dateBooking", JSON.stringify(dateBooking));

        submitDateBooking(dateBooking);
        printDateBookingInCart(dateBooking);
        if (rooms) {
          editTotalPriceRooms();
        }
      }
    }
  });
}

async function submitDateBooking(dateBooking) {
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/controller/habitaciones.php?option=roomsAvailable&dateBooking=" +
        JSON.stringify(dateBooking),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (result) {
      quantityCategorysRooms = result;
      printQuantAvailable(quantityCategorysRooms);
    }
  } catch (error) {
    console.log(error);
  }
}

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
            <ul>
            <li>
             <img src="data:image/png;base64,${room.imageTwo}">
            </li>
             <li>
             <img src="data:image/png;base64,${room.imageOne}">
            </li>
             <li>
             <img src="data:image/png;base64,${room.imageThree}">
            </li>
            </ul>  
              <div class="controls">

              <img class="prev"  onclick="controlsSlider(event,'prev','${
                room.category
              }')" src="../img/prevRoom.png">
                  <img onclick="controlsSlider(event,'next','${
                    room.category
                  }')" class="next" src="../img/nextRoom.png">
            </div>

            <div class="indexImagesRoom">

              <li></li>
              <li></li>
              <li></li>
            </div>
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

function controlsSlider(event, orientacion, category) {
  let arrow = event.target;
  let ul = arrow.parentNode.parentNode.querySelector("ul");
  let imgsRoom = ul.querySelectorAll("li");
  let index;

  index = indexGetValue(index, category);

  if (index < imgsRoom.length - 1 && orientacion == "next") {
    ul.style.transform += "translateX(-40%)";
    index++;
  } else if (index > 0 && orientacion == "prev") {
    ul.style.transform += "translateX(40%)";
    index--;
  }

  displayIndexItemRoom(ul, index);
  indexSetValue(category, index);
}

function displayIndexItemRoom(ul, indexImg) {
  let containRoom = ul.parentNode.parentNode;
  let itemsIndex = containRoom
    .querySelector(".indexImagesRoom")
    .querySelectorAll("li");

  let itemIndex = itemsIndex[indexImg];

  itemsIndex.forEach((item) => {
    if (item.classList.contains("itemIndexActive")) {
      item.classList.remove("itemIndexActive");
    }
  });
  itemIndex.classList.add("itemIndexActive");
}

function indexSetValue(category, newValueIndex) {
  let indexsRoomsUpdate = indexsImgRooms.map((indexRoom) => {
    if (indexRoom.category == category) {
      indexRoom.indexValue = newValueIndex;
    }
    return indexRoom;
  });

  indexsImgRooms = indexsRoomsUpdate;
}

function indexGetValue(index, category) {
  let indexRoom = indexsImgRooms.find(
    (indexRoom) => indexRoom.category == category
  );

  index = indexRoom.indexValue;
  return index;
}

function calculateDifferenceNight(llegada, salida) {
  let differenceTime = salida.getTime() - llegada.getTime();

  let differenceDays = Math.round(differenceTime / (1000 * 3600 * 24));

  return differenceDays;
}

function printDateBookingInCart(dateBooking) {
  cart.style.display = "flex";

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  document.querySelector(".startBooking").textContent =
    dateBooking.start.toLocaleDateString("es-ar", options);
  document.querySelector(".endBooking").textContent =
    dateBooking.end.toLocaleDateString("es-ar", options);

  nights = calculateDifferenceNight(dateBooking.start, dateBooking.end);

  if (nights > 1) {
    document.querySelector(".quantityNights").textContent = `${nights} Noches`;
  } else {
    document.querySelector(".quantityNights").textContent = `${nights} Noche`;
  }
}

const createDataRoom = (button) => {
  let adultInput = button.parentNode.parentNode.querySelector(".adult");
  let childrenInput = button.parentNode.parentNode.querySelector(".children");

  let dataRoom = JSON.parse(button.parentNode.dataset.dataRoom);

  const room = {
    id: rooms.length + 1,
    category: dataRoom.category,
    images: {
      imageOne: dataRoom.imageOne,
      imageTwo: dataRoom.imageTwo,
      imageThree: dataRoom.imageThree,
    },
    price: dataRoom.price,
    quantity: 1,
    guests: { adult: adultInput.value, children: childrenInput.value },
    total: dataRoom.price * nights,
  };
  return room;
};

function validateQuantityGuestsInputs(adultInput, childrenInput) {
  let ability = adultInput.dataset.ability;
  let validate = null;
  if (childrenInput.value == 0 && adultInput.value == 0) {
    validate = "Ingresa algun huesped";
  } else if (
    parseInt(childrenInput.value) + parseInt(adultInput.value) >
    ability
  ) {
    validate = "Capacidad excedida";
  }

  return validate;
}

function validateDateInputs() {
  [...document.querySelectorAll(".buttonAdd")].forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!dateBooking) {
        alerta("Ingresa una fecha valida");
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

const addRoomToList = (room) => {
  rooms.push(room);

  localStorage.setItem("rooms", JSON.stringify(rooms));
};

function quantityGuestRoomCart(roomGuest, typeGuest) {
  let span = "";

  if (roomGuest > 1) {
    span = roomGuest + " " + typeGuest;
  } else if (roomGuest == 1) {
    span = roomGuest + " " + typeGuest.substring(0, typeGuest.length - 1);
  }

  return span;
}

const printRoomsCart = () => {
  let roomsBooking = document.getElementById("roomsBooking");
  cleanRoomCart(roomsBooking);

  let roomsToPrint = rooms.map((room) => {
    let spanAdults = quantityGuestRoomCart(room.guests.adult, "Adultos");
    let spanChildrens = quantityGuestRoomCart(room.guests.children, "Niños");

    return `

<li class="roomSelected">

<div class="imgRoom">
<img src="data:image/png;base64,${room.images.imageTwo}">
</div>
<div class="dataRoom">

<div class="header">
<span class="category">Habitacion ${room.category}</span>
<img data-id=${room.id} class="buttonDelete" src="../img/borrar.png">
</div>

<div class="guests">
<span class="adults">${spanAdults}</span>
<span class="childrens">${spanChildrens}</span>
</div>

<div class="changeQuantity">
<img class="buttonSubtract" data-room='${JSON.stringify(
      room
    )}' src="../img/substract.png">
<span>${room.quantity}</span>
<img class="buttonPlus" data-room='${JSON.stringify(
      room
    )}' src="../img/plus.png">
</div>

<span class="total">Precio:$${room.total}</span>
</div>
</li>
<hr>
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

function editTotalPriceRooms() {
  rooms = rooms.map((roomEdit) => {
    roomEdit.total = calculateTotalRoom(roomEdit);
    return roomEdit;
  });

  localStorage.setItem("rooms", JSON.stringify(rooms));
  printRoomsCart();
}

const deleteRoomToList = (id) => {
  rooms = rooms.filter((roomDelete) => roomDelete.id != id);

  localStorage.setItem("rooms", JSON.stringify(rooms));
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

  localStorage.setItem("rooms", JSON.stringify(rooms));
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

      let totalQuantityRoomsCategory = comprobateQuantityLimitCategotyRooms(
        roomToPlus.category
      );
      if (totalQuantityRoomsCategory < limitRoom) {
        roomQuantityPlus.quantity++;
        roomQuantityPlus.total = calculateTotalRoom(roomQuantityPlus);
      }
    }

    return roomQuantityPlus;
  });

  localStorage.setItem("rooms", JSON.stringify(rooms));
  printRoomsCart();
};

function comprobateQuantityLimitCategotyRooms(categoryRoom) {
  let roomsCategory = rooms.filter((room) => {
    return room.category == categoryRoom;
  });

  let totalQuantityRoomsCategory = roomsCategory.reduce((ac, roomCategory) => {
    return (ac += roomCategory.quantity);
  }, 0);

  return totalQuantityRoomsCategory;
}
function comprobateQuantityRoomForAdd(roomForAdd) {
  let result = null;

  if (rooms.length > 0) {
    let limitRoom = quantityCategorysRooms.reduce((ac, categoryRoom) => {
      if (categoryRoom.category == roomForAdd.category) {
        ac = categoryRoom.quantity;
      }
      return ac;
    }, 0);

    let totalQuantityRoomsCategory = comprobateQuantityLimitCategotyRooms(
      roomForAdd.category
    );

    if (totalQuantityRoomsCategory < limitRoom) {
      rooms.forEach((roomInCart) => {
        if (
          roomInCart.category == roomForAdd.category &&
          roomInCart.guests.adult == roomForAdd.guests.adult &&
          roomInCart.guests.children == roomForAdd.guests.children
        ) {
          roomInCart.quantity++;
          roomInCart.total = calculateTotalRoom(roomInCart);
          localStorage.setItem("rooms", JSON.stringify(rooms));

          return (result = "quantityAdded");
        }
      });
    } else {
      result = "Excede el limite de habitaciones";
    }
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


buttonNext.addEventListener("click", function () {
  booking = {
    date: dateBooking,
    nights: nights,
    rooms: rooms,
    totalDeposit: totalDeposit,
  };

  localStorage.setItem("booking", JSON.stringify(booking));
  location.href = "reserva-datosCliente.php";
});


