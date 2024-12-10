import { modalOption, drawTable } from "../scriptTableBookings.js";

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
      await drawTable();
      modalOption(false, document.querySelector(".modalMainBookings"));
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
      "http://localhost/sistema%20Hotel/routes/bookingRoutes.php?params=" +
        JSON.stringify({ idBooking: idBooking }),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const bookingDeleted = await response.json();
    if (bookingDeleted) {
      data = bookingDeleted;
    } else {
      throw "Ups, no se pudo eliminar la reserva";
    }
  } catch (error) {
    console.log(error);
    errorDelete();
  } finally {
    return data;
  }
};

const errorDelete = () => {
  document.querySelector(".error").innerHTML = `
<div class="error">
 <img src="../../../img/advertenciaDelete.png">
<span>Ups, no se pudo eliminar el cliente</span>
</div>`;
};
