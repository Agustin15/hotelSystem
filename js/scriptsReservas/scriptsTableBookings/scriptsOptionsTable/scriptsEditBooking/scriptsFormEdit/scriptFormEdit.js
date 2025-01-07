import { displayClients } from "../../../../scriptsOptionsCalendar/scriptFormAdd.js";
import {
  configRoomsCart,
  drawRoomsInCart,
  roomsCart,
} from "./scriptCartRooms.js";
import { inputAlert } from "../../../../scriptsOptionsCalendar/scriptFormAdd.js";
import { verifyStateRoomsToBooking } from "../../../../../scriptsRooms/scriptRooms.js";
import {
  alertForm,
  loadingForm,
} from "../../../../scriptsOptionsCalendar/scriptsMethodsFetch.js";

let bookingGlobal;
let allClients;
let formEdit;

export let nights;
export let startBookingSetting;
export let endBookingSetting;

export const drawFormEdit = (body, booking, clients) => {
  bookingGlobal = booking;
  allClients = clients;

  if (!startBookingSetting && !endBookingSetting) {
    startBookingSetting = booking.fechaLlegada;
    endBookingSetting = booking.fechaSalida;
  }

  nights = calculateDifferenceNight(
    new Date(startBookingSetting),
    new Date(endBookingSetting)
  );

  body.innerHTML = `
   <div class="containFormAndCart">

        <div class="row">
            <div class="containForm">
            <div class="title">

            <h3>Editar Reserva <?php echo $idBooking ?> </h3>
            <img src="../../../img/updateBooking.png">
               </div>
        
                <div class="nights">

                    <h3>${nights} noches</h3>
                    <img src="../../../img/night.png">
                </div>

                <form id="formEdit">
                    <div class="rowOne">
                        <div class="dateStart">
                            <label>Fecha de llegada</label>
                            <input name="startBooking" value=${startBookingSetting} type="date" id="startInput">
                        </div>

                        <div class="dateEnd">
                            <label>Fecha de Salida</label>
                            <input name="endBooking" value=${endBookingSetting}  type="date" id="endInput">
                        </div>
                    <button type="button" class="btnCalculate">Calcular</button>
                    </div>

                    <div class="rowTwo">
                        <div class="client">
                            <label>Cliente</label>
                            <select name="client" id="clientsSelect"></select>
                        </div>


                        <div class="quantityRooms">

                            <label>Cantidad de habitaciones</label>
                            <input id="roomsQuantityInput" name="roomsQuantity" type="number" readonly
                                placeholder="Habitaciones seleccionadas">
                            <div class="msjError">
                                <div class="arrow"></div>
                                <img src="../../../img/advertenciaLogin.png">
                                <span></span>
                            </div>
                        </div>

                    </div>

                    <div class="containButton">
                    <button type="submit">
                        Editar reserva
                        <img class="loadingForm" src="../../../img/spinnerBooking.gif">
                    </button>
                  </div>

                    <div class="alertForm">
                        <img>
                        <div class="body">
                            <span></span>

                            <p></p>
                        </div>

                    </div>

                </form>

            </div>

            <div class="cartRooms">

                <h3>Habitaciones seleccionadas</h3>

                <ul></ul>

                <div class="total">

                    <span>Total</span>

                </div>
            </div>

        </div>

</div>
    `;

  formEdit = document.querySelector("#formEdit");
  let selectClients = formEdit.querySelector("select");

  drawSelectClients(formEdit, selectClients);
  configRoomsCart(bookingGlobal.idReserva, nights);
  calculateDate();
  sendFormEdit();
};

function calculateDifferenceNight(llegada, salida) {
  let differenceTime = salida.getTime() - llegada.getTime();

  let differenceDays = Math.round(differenceTime / (1000 * 3600 * 24));

  return differenceDays;
}

const drawSelectClients = (form, selectClients) => {
  displayClients(form, allClients);
  selectClients.value = bookingGlobal.idClienteReserva;
};

const calculateDate = () => {
  let inputStart = document.querySelector("#startInput");
  let inputEnd = document.querySelector("#endInput");
  let btnCalculate = document.querySelector(".btnCalculate");
  let titleNights = document.querySelector(".nights").querySelector("h3");
  let textNights;

  btnCalculate.addEventListener("click", () => {
    nights = calculateDifferenceNight(
      new Date(inputStart.value),
      new Date(inputEnd.value)
    );

    if (nights > 1) {
      textNights = `${nights} noches`;
    } else {
      textNights = `${nights} noche`;
    }

    titleNights.textContent = textNights;
    drawRoomsInCart(nights);
    startBookingSetting = inputStart.value;
    endBookingSetting = inputEnd.value;
  });
};

const sendFormEdit = () => {
  formEdit.addEventListener("submit", (event) => {
    event.preventDefault();

    const bookingToUpdate = {};
    const formData = new FormData(formEdit);
    let error;

    formData.forEach((value, key) => {
      if (key == "roomsQuantity" && value == 0) {
        error = {
          key: key,
          msj: "Elija al menos una habitacion para la reserva",
        };
      } else {
        bookingToUpdate[key] = value;
      }
    });

    if (error) {
      inputAlert(error);
    } else {
      updateBooking(bookingToUpdate);
    }
  });
};

const getVerifyStateRoomsToBooking = async (bookingToUpdate) => {
  let roomsAvailables;

  let numbersRoomsCart = roomsCart.map((room) => room.numRoom);

  try {
    const result = await verifyStateRoomsToBooking(
      bookingToUpdate,
      numbersRoomsCart,
      bookingGlobal.idReserva
    );

    if (result) {
      roomsAvailables = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return roomsAvailables;
  }
};
const updateBooking = async (bookingToUpdate) => {
  let roomsAvailables = await getVerifyStateRoomsToBooking(bookingToUpdate);

  if (roomsAvailables) {
    if (roomsAvailables.length == roomsCart.length) {
    } else {
      roomsToBookingNotAvailables(roomsAvailables);
    }
  }
};

const roomsToBookingNotAvailables = (roomsAvailables) => {
  let roomsNotAvailables = roomsCart.filter(
    (room) =>
      !roomsAvailables.find((roomAvailable) => roomAvailable == room.numRoom)
  );

  let numbersRoomsBusy = roomsNotAvailables.map((room) => room.numRoom);

  let phraseNumsRooms = `la habitacion ${numbersRoomsBusy.join("")} ya tiene`;
  if (numbersRoomsBusy.length > 1) {
    phraseNumsRooms = `las habitaciones ${numbersRoomsBusy.join(
      ","
    )} ya tienen`;
  }
  alertForm(
    "../../../img/advertenciaLogin.png",
    `Ups, ${phraseNumsRooms} reserva en esta fecha `,
    "Error",
    "alertFormError"
  );
};
