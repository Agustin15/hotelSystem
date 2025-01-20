import { displayClients } from "../../../../scriptsOptionsCalendar/scriptFormAdd.js";
import {
  configRoomsCart,
  drawRoomsInCart,
  roomsCart,
  roomsBooking,
  amount,
} from "./scriptCartRooms.js";
import { inputAlert } from "../../../../scriptsOptionsCalendar/scriptFormAdd.js";
import {
  verifyStateRoomsToBooking,
  fetchDeleteRoom,
  POSTRooms,
} from "../../../../../scriptsRooms/scriptRooms.js";
import { PUTPay } from "../../../../../scriptsRevenues/scriptRevenues.js";
import {
  alertForm,
  loadingForm,
} from "../../../../scriptsOptionsCalendar/scriptsMethodsFetch.js";

import BACK_URL_LOCALHOST from "../../../../../urlLocalhost.js";

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
                            <select name="idClient" id="clientsSelect"></select>
                        </div>


                        <div class="quantityRooms">

                            <label>Cantidad de habitaciones</label>
                            <input id="roomsQuantityInput" name="quantityRooms" type="number" readonly
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
      if (key == "quantityRooms" && value == 0) {
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
      let resultUpdateBooking = await fetchUpdateBooking(bookingToUpdate);

      if (resultUpdateBooking) {
        let roomsToDelete = verfiyRoomsToDelete();

        if (roomsToDelete.length > 0) {
          let resultDeleteRooms = await fetchDeleteRoom({
            idBooking: bookingGlobal.idReserva,
            rooms: roomsToDelete,
          });

          if (!resultDeleteRooms.response) return;
        }

        let roomsNewsToAdd = verfiyRoomsNewsToAdd();

        if (roomsNewsToAdd.length > 0) {
          bookingToUpdate.rooms = roomsCart;
          bookingToUpdate.client = bookingToUpdate.idClient;
          let resultUpdateRooms = await POSTRooms(
            bookingToUpdate,
            "actualizar las habitaciones"
          );

          if (!resultUpdateRooms.response) return;
        }

        let resultPayUpdated = await PUTPay({
          idBooking: bookingGlobal.idReserva,
          newAmount: amount,
        });

        if (resultPayUpdated.response) {
          alertForm(
            "../../../img/tickAdmin.png",
            "¡Reserva actualizada exitosamente!",
            "Exito",
            "alertFormCorrect"
          );
        }
      }
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

const fetchUpdateBooking = async (bookingToUpdate) => {
  let data;
  bookingToUpdate.idBooking = bookingGlobal.idReserva;

  loadingForm(true);
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingRoutes.php`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingToUpdate),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw "Ups, error al actualizar la reserva";
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingForm(false);
    if (!data) {
      alertForm(
        "../../../img/advertenciaLogin.png",
        "Ups, error al actualizar la reserva",
        "Error",
        "alertFormError"
      );
    }
    return data;
  }
};

const verfiyRoomsToDelete = () => {
  let roomsToDelete = roomsBooking.filter((roomBooking) => {
    if (
      !roomsCart.find((roomCart) => roomCart.numRoom == roomBooking.numRoom)
    ) {
      return roomBooking.numRoom;
    }
  });

  roomsToDelete = roomsToDelete.map((room) => room.numRoom);
  return roomsToDelete;
};

const verfiyRoomsNewsToAdd = () => {
  let roomsNewsToAdd = roomsCart.filter((roomCart) => {
    if (
      !roomsBooking.find(
        (roomBooking) => roomBooking.numRoom == roomCart.numRoom
      )
    ) {
      return roomCart;
    }
  });

  return roomsNewsToAdd;
};
