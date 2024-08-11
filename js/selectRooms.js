const formCheckIn = document.getElementById("checkIn");
let llegada = document.getElementById("llegada");
let salida = document.getElementById("salida");

if (formCheckIn) {
  formCheckIn.addEventListener("submit", (event) => {
    event.preventDefault();

    if (llegada.value == "" || salida.value=="") {
      alerta("Complete los campos de fecha");
    } else {
      const dateBooking = {
        start: llegada.value,
        end: salida.value,
      };

      submitDateBooking(dateBooking);
    }
  });
}

const submitDateBooking = (dateBooking) => {
  fetch(
    "http://localhost/sistema%20Hotel/controller/habitaciones.php?dateBooking=" +
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
      console.log(answer);
      printRoomsAvailable(answer);
    });
};

const printRoomsAvailable = () => {
  let containRooms = document.getElementById("containRooms");

  containRooms.innerHTML=``;
};
