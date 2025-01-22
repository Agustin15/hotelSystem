import { modalOption } from "../../scriptTableBookings.js";
import BACK_URL_LOCALHOST from "../../../../urlLocalhost.js";
import { invalidAuthentication } from "../../../../scriptsAdmin/scriptsAdmin.js";
let body;
let idBooking;

export const configClient = async () => {
  body = document.querySelector(".body");
  idBooking = document.querySelector(".containDetailsBooking").id;
  let resultClient = await getDataClientByIdBooking();

  if (resultClient) {
    drawDataClient(resultClient);
  }

  closeWindow();
};

export const closeWindow = () => {
  document.querySelector(".btnCloseWindow").addEventListener("click", () => {
    modalOption(false, document.querySelector(".modalOptionsBookingDetails"));
  });
};

const paramToFindClient = (url) => {
  localStorage.setItem("actualOptionClient", "clientsTable.html");
  window.open(
    "http://localhost/sistema%20Hotel/views/admin/clientes/index.php?" + url
  );
};

const getDataClientByIdBooking = async () => {
  let data = null;
  loading(true, body);
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/bookingRoutes.php?params=` +
        JSON.stringify({
          option: "getClientByIdBooking",
          idBooking: idBooking,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin",
        },
      }
    );

    const clientData = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (clientData) {
      data = clientData;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    loading(false, body);
    if (!data) {
      noData("Ups, no se pudo encontrar al cliente", body);
    }
    return data;
  }
};

export const noData = (msj, body) => {
  body.innerHTML = `
  
  <div class="noData">
      <img src="../../../img/sinDatos.png">
           <span>${msj}</span>
  </div>
  
  `;
};

export const loading = (state, body) => {
  if (state) {
    body.innerHTML = `
  
  <div class="loadingDetails">
      <span>Cargando datos</span>
      <img src="../../../img/spinnerMain.gif">
  </div>
  
  `;
  } else {
    body.innerHTML = ``;
  }
};

const drawDataClient = (client) => {
  body.innerHTML = `
  <div data-client=${JSON.stringify(client)} class="dataClient">

   <li>
    <img src="../../../img/idClientIcon.png">
    <h4>Identificador:</h4><a class="idClient">${client.idCliente}</a>
    </li>
    <li>
    <img src="../../../img/nameAndLastnameClient.png">
    <h4>Nombre completo:</h4><span>${client.nombre} ${client.apellido}</span>
    </li>
     <li>
    <img src="../../../img/mailClient.png">
    <h4>Correo:</h4><span>${client.correo}</span>
    </li>
      <li>
    <img src="../../../img/phoneClient.png">
    <h4>Telefono:</h4><span>${client.telefono}</span>
    </li>

  </div>

  `;

  document.querySelector(".idClient").addEventListener("click", () => {
    let client = JSON.parse(
      document.querySelector(".dataClient").dataset.client
    );

    paramToFindClient(`idClient=${client.idCliente}`);
  });
};
