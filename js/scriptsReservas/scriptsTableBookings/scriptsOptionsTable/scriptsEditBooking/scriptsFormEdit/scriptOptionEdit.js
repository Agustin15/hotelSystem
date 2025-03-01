import { drawFormEdit } from "./scriptFormEdit.js";
import BACK_URL_LOCALHOST from "../../../../../urlLocalhost.js";
import { invalidAuthentication } from "../../../../../scriptsAdmin/userData.js";

let body;

export const configEditForm = async (idBooking, bodyParam) => {
  body = bodyParam;
  const booking = await getBookingById(idBooking);

  if (booking) {
    const allClients = await getAllClients();
    if (allClients) {
      drawFormEdit(body, booking, allClients);
    }
  }
};

const getBookingById = async (idBooking) => {
  let data = null;

  loading(true);
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/bookingRoutes.php?params=` +
        JSON.stringify({ option: "getBookingById", idBooking: idBooking }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );
    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData("Ups, no se pudo encontrar la reserva");
    }
    return data;
  }
};

const getAllClients = async () => {
  let data = null;

  loading(true);
  try {
    let url =
      "http://localhost/sistema%20Hotel/routes/admin/clientRoutes.php?params=" +
      JSON.stringify({ option: "allClients" });

    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData("Ups, no se pudieron cargar los clientes");
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

const noData = (error) => {
  body.innerHTML = ` 
   
    <div class="noDataFormEdit">

    <img src="../../../img/sinDatos.png">
       <h3>${error}</h3>
    </div>
   `;
};
