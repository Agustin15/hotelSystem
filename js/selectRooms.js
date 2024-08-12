const formCheckIn = document.getElementById("checkIn");
let llegada = document.getElementById("llegada");
let salida = document.getElementById("salida");
let cart = document.getElementById("cart");

let rooms=[];


if (formCheckIn) {
  formCheckIn.addEventListener("submit", (event) => {
    event.preventDefault();

    if (llegada.value == "" || salida.value == "") {
      alerta("Completa todos los campos");
    } else {
      startBooking = new Date(llegada.value);
      endBooking = new Date(salida.value);

      if (salida < llegada) {
        alerta("Ingresa una fecha válida");
      } else {
        const dateBooking = {
          start: startBooking,
          end: endBooking,
        };

        submitDateBooking(dateBooking);
        printDateBookingInCart(dateBooking);
      }
    }
  });
}



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
      printQuantAvailable(answer);
    });
};

const printQuantAvailable = (quantityCategorysRooms) => {
  let containRooms = [...document.querySelectorAll(".containRoom")];

  containRooms.forEach((containRoom) => {
    let category = containRoom.dataset.category;

    let quantityCategoryFilter = quantityCategorysRooms.filter(
      (quantityCategoryRoom) => quantityCategoryRoom.category == category
    );

    containRoom.querySelector(".containAvailableRooms").innerHTML += `
    
    <div class="quantityAvailabeRoom">
    <div>
    <span>STOCK</span>
    </div>
    <div>
    <span>${quantityCategoryFilter[0].quantity}</span>
    </div>
    
    </div>
    `;
  });
};

const printHotelRooms = (rooms) => {
  rooms.forEach((room) => {
    document.getElementById("containRooms").innerHTML += `
  
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
                        <input type="number" value="0" min=0 max=${
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

  abilityRoom(".adult");
  abilityRoom(".children");
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

function abilityRoom(element) {
  [...document.querySelectorAll(element)].forEach((select) => {
    let ability = select.dataset.ability;

    for (let f = 0; f <= ability; f++) {
      select.innerHTML += `
    
    <option>${f}</option>
    `;
    }
  });
}


const printDateBookingInCart = (dateBooking) => {
  cart.style.display = "flex";
  document.querySelector(".startBooking").textContent += dateBooking.start.toDateString();
  document.querySelector(".endBooking").textContent += dateBooking.end.toDateString();

  let differenceDays=calculateDifferenceNight(dateBooking.start,dateBooking.end);
  document.querySelector(".quantityNights").textContent= `${differenceDays} noches`; 

};

function calculateDifferenceNight(llegada,salida){

  let differenceTime=salida.getTime()-llegada.getTime();

  let differenceDays=Math.round(differenceTime/(1000 * 3600 * 24));

  return differenceDays;
}


function validateDateInputs() {
  [...document.querySelectorAll(".buttonAdd")].forEach((btn) => {
    btn.addEventListener("click", () => {
      if (llegada.value == "" || salida.value == "") {
        alerta("Ingresa una fecha válida");
      }else{

        let room=createDataRoom(btn);
        console.log(room);
        addRoomToList(room);
        printRoomsCart();
      }
    });
  });
}

const createDataRoom=(button)=>{

 
 let adultInput= button.parentNode.parentNode.querySelector(".adult");
 let childrenInput= button.parentNode.parentNode.querySelector(".children");

 let dataRoom=JSON.parse(button.parentNode.dataset.dataRoom);

   const room={

    category:dataRoom.category,
    image:dataRoom.imageOne,
    price:dataRoom.price,
    quantity:1,
    guests:{adult:adultInput.value,
    children:childrenInput.value},


   }

  
   return room;


}


const addRoomToList=(room)=>{

  rooms.push(room);

}

const printRoomsCart=()=>{

 let roomsBooking=document.getElementById("roomsBooking");
  rooms.forEach(room=>{
   roomsBooking.innerHTML+=`
   
 
    
   <li>


<div class="containIconAndQuantity">


<div class="deleteRoom">

<img src="../img/basura.png">
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
 <span>-</span>
  </div>

  <div>

  <span>1</span>
  </div>
  <div>
 <span>+</span>
  </div>
</div>
</div>

<div class="guests">

<div>
<img src="../img/adultRoom.png">
</div>
<div>
<span>Adultos</span>
</div>

<div>
<img src="../img/children.png">
</div>
<div>
<span>Niños</span>
</div>


</div>
</li>

   `;


  });


}

window.onload = function () {
  submitGetCategoryHotelRooms();
};

