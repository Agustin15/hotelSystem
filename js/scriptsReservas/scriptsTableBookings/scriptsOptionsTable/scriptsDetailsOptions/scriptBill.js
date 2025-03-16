import { getPayById } from "../../../../scriptsRevenues/scriptRevenues.js";
import { modalOption } from "../../scriptTableBookings.js";
import { noData, closeWindow, loading } from "./scriptClient.js";
import { FRONT_URL_LOCALHOST } from "../../../../urlLocalhost.js";
let idBooking, body;

export const configBill = async () => {
  body = document.querySelector(".body");
  idBooking = document.querySelector(".alertRedirect").id;

  closeWindow();
  const resultRevenue = await getRevenue();

  if (resultRevenue) {
    drawAlertRedirect();
    let btnAccept = document.querySelector(".btnAccept");
    let btnCancel = document.querySelector(".btnCancel");

    let confirm = await confirmRedirection(btnAccept, btnCancel);
    modalOption(false, document.querySelector(".modalOptionsBookingDetails"));

    if (confirm) {
      localStorage.setItem("actualOptionRevenues", "tableBills.html");
      location.href =
        `${FRONT_URL_LOCALHOST}views/admin/ganancias/index.php?idBooking= ` +
        idBooking;
    }
  }
};

const getRevenue = async () => {
  let data = null;
  loading(true, body);
  try {
    const revenue = await getPayById(idBooking);

    if (revenue) {
      data = revenue;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false, body);
    if (!data) {
      noData("Ups, no se pudo encontrar la factura de la reserva", body);
      document.querySelector(".close").style.display = "flex";
    }
    return data;
  }
};

const drawAlertRedirect = () => {
  body.innerHTML = `
    <div class="title">
     <img src="../../../img/advertencia.png">
     <h3>Advertencia</h3>
    </div>
    <div class="content">
    <p>Este item tiene una redireccion</p> <p>¿Desea dirigirse a ganancias?</p>

    <div class="buttons">
     <button class="btnAccept">Aceptar</button>
      <button class="btnCancel">Cancelar</button>
    </div>
    </div>

  `;
};

const confirmRedirection = async (btnAccept, btnCancel) => {
  return new Promise((resolve) => {
    let confirm = false;
    btnCancel.addEventListener("click", () => {
      resolve(confirm);
    });

    btnAccept.addEventListener("click", () => {
      confirm = true;
      resolve(confirm);
    });
    return confirm;
  });
};
