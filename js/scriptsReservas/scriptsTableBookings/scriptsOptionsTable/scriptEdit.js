import { drawFormEdit } from "./scriptsEditBooking/scriptFormEdit.js";
let body, idBooking;

export const configEdit = async () => {

  idBooking = document.querySelector(".containEditOption").id;
  body = document.querySelector(".body");

  const booking = await getBookingById();

  if (booking) {
    drawFormEdit(body, booking);
  }
};

const getBookingById = async () => {
  let data = null;

  loading(true);
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/routes/bookingRoutes.php?params= " +
        JSON.stringify({ option: "getBookingById", idBooking: idBooking })
    );
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData();
    }
    return data;
  }
};

const loading = () => {
  body.innerHTML = ` 
   
    <div class="loadingEdit">
 
    <span>Cargando datos</span>
    <img src="../../../img/spinnerMain.gif">
    </div>
   `;
};

const noData = () => {
  body.innerHTML = ` 
   
    <div class="noDataFormEdit">

    <img src="../../../img/sinDatos.png">
       <h3>Ups, no se pudo encontrar la reserva</h3>
    </div>
   `;
};
