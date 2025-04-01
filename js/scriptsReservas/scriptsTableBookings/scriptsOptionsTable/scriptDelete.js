import {
  modalOption,
  drawTable,
  displayControlIndex
} from "../scriptTableBookings.js";
import { BACK_URL_LOCALHOST } from "../../../urlLocalhost.js";
import { invalidAuthentication } from "../../../scriptsAdmin/userData.js";
let body;

export const configDelete = () => {
  body = document.querySelector(".body");
  let containDelete = document.querySelector(".containDelete");
  let idBooking = containDelete.id;
  let btnAccept = document.querySelector(".btnAccept");
  let btnCancel = document.querySelector(".btnCancel");

  btnAccept.addEventListener("click", async () => {
    let result = await deleteBooking(idBooking);
    if (result) {
      modalOption(false, document.querySelector(".modalMainBookings"));
      await displayControlIndex();
      drawTable();
    }
  });

  btnCancel.addEventListener("click", () => {
    modalOption(false, document.querySelector(".modalMainBookings"));
  });
  
};

const deleteBooking = async (idBooking) => {
  let data = null;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/bookingRoutes.php?params= ` +
        JSON.stringify({ idBooking: idBooking }),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const bookingDeleted = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (bookingDeleted) {
      data = bookingDeleted;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (!data) {
      errorDelete();
    }
    return data;
  }
};

const errorDelete = () => {
  document.querySelector(".error").innerHTML = `
<div class="error">
 <img src="../../../img/advertenciaDelete.png">
<span>Ups, no se pudo eliminar la reserva</span>
</div>`;
};
