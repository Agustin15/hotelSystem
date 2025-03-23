import { displayClients } from "../../../../scriptsOptionsCalendar/scriptFormAdd.js";
import {
  configRoomsCart,
  drawRoomsInCart,
  roomsCart,
  amount
} from "./scriptCartRooms.js";
import { inputAlert } from "../../../../scriptsOptionsCalendar/scriptFormAdd.js";

import {
  alertForm,
  loadingForm
} from "../../../../scriptsOptionsCalendar/scriptsMethodsFetch.js";
import { drawTable } from "../../../scriptTableBookings.js";

import { BACK_URL_LOCALHOST } from "../../../../../urlLocalhost.js";
import { invalidAuthentication } from "../../../../../scriptsAdmin/userData.js";
import { cleanRoomsCart } from "./scriptCartRooms.js";

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

            <h3>Editar Reserva ${booking.idReserva} </h3>
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
                <div class="titleCart">
                <h3>Habitaciones</h3>
                  <img src="../../../img/roomCart.png">
                </div>
                <ul></ul>

                <div class="total">
                  <img src="../../../img/amountService.png">
                    <span>Total:</span>

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
          msj: "Elija al menos una habitacion para la reserva"
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

const updateBooking = async (bookingToUpdate) => {
  bookingToUpdate.rooms = roomsCart;
  bookingToUpdate.idBooking = bookingGlobal.idReserva;
  bookingToUpdate.amount = amount;

  let resultBookingUpdated = await fetchUpdateBooking(bookingToUpdate);

  if (resultBookingUpdated.error) {
    alertForm(
      "../../../img/advertenciaLogin.png",
      resultBookingUpdated.error,
      "Error",
      "alertFormError"
    );
  } else if (resultBookingUpdated == true) {
    alertForm(
      "../../../img/tickAdmin.png",
      "¡Reserva actualizada exitosamente!",
      "Exito",
      "alertFormCorrect"
    );
    drawTable();
  }
};

const fetchUpdateBooking = async (bookingToUpdate) => {
  let data;

  loadingForm(true);
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/bookingRoutes.php`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        },
        body: JSON.stringify(bookingToUpdate)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result;
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log("Error", error.error);
    data = error;
  } finally {
    loadingForm(false);
    return data;
  }
};

export const cleanVariablesBooking = () => {
  startBookingSetting = null;
  endBookingSetting = null;
  cleanRoomsCart();
};
