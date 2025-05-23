import { formatDate } from "./scriptTableBills.js";
import { getRevenuDetailsById } from "./scriptRevenues.js";
import { BACK_URL_LOCALHOST } from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/userData.js";

export let contentBill;
export let idRevenueBooking;
export let billBookingDetails;
  
export const displayBill = async (option) => {
  let urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.get("idRevenueBooking")) {
    location.href = "../index.php";
  } else {
    contentBill = document.querySelector(".contentBill");

    idRevenueBooking = urlParams.get("idRevenueBooking");
    let revenueBooking = await dataBillBooking(idRevenueBooking);

    if (revenueBooking) {
      if (option == "billNotMobile") {
        let title = document.querySelector(".title").querySelector("h3");
        title.textContent = `Factura reserva ${revenueBooking.idReservaPago}`;
      }

      billBookingDetails = await getBillBookingDetailsById(
        revenueBooking.idReservaPago
      );
      billBookingDetails = billBookingDetails.flat();

      if (billBookingDetails) {
        contentBill.classList.add("border");
        drawBill(billBookingDetails, revenueBooking, contentBill);

        if (option == "billNotMobile") {
          generatePDF(revenueBooking.idReservaPago);
        }
      }
    }
  }
};
const dataBillBooking = async (idRevenueBooking) => {
  let data;

  loading(true);
  try {
    const result = await getRevenuDetailsById(idRevenueBooking);
    if (result) {
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
const getBillBookingDetailsById = async (idBooking) => {
  let url =
    `${BACK_URL_LOCALHOST}routes/admin/billRoutes.php?params=` +
    JSON.stringify({
      idBooking: idBooking
    });

  let data = null;

  loading(true);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      }
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    }
    if (result) {
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

const generatePDF = (idBooking) => {
  let download = document.querySelector(".download");
  download.addEventListener("click", () => {
    if (window.innerWidth <= 600) {
      window.open("billToGenerateByMobile.php?idRevenueBooking=" + idBooking);
    } else {
      html2canvas(contentBill).then(function (canvas) {
        let imageURLCanva = canvas.toDataURL();

        let doc = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height],
          putOnlyUsedFonts: true
        });
        doc.addImage(imageURLCanva, "png", 95, 35);
        doc.save("Factura reserva numero " + idBooking);
      });
    }
  });
};

const noData = () => {
  contentBill.innerHTML = `
    <div class="noDataBill">
   <img src="../../../../img/sinDatos.png">
    <span>Ups,no se pudo cargar la factura</span>
  </div>
  
  `;
};

const loading = (state) => {
  if (state) {
    contentBill.innerHTML = `
    <div class="loadingBill">
    <span>Cargando factura</span>
     <img src="../../../../img/spinnerMain.gif">
  </div>
  
  `;
  } else {
    contentBill.innerHTML = ``;
  }
};

const drawBill = (billBookingDetails, revenueBooking, elementWhereDraw) => {
  let startDate = formatDate(new Date(revenueBooking.fechaLlegada), "/");
  let endDate = formatDate(new Date(revenueBooking.fechaSalida), "/");

  let nigths =
    (new Date(revenueBooking.fechaSalida).getTime() -
      new Date(revenueBooking.fechaLlegada).getTime()) /
    (1000 * 60 * 60 * 24);

  elementWhereDraw.innerHTML = `
   <div class="billDetails">

   <div class="row">
   <div class="infoBooking">
    <div class="icon">
    <img src="../../../../img/revision.png">
    <h3>Hotel System</h3>
    </div>
     <li class="liIdBooking">
     <span>Numero de Reserva</span>
     <span class="blackFont">${revenueBooking.idReservaPago}</span>
     </li>
      <li>
     <span>Llegada</span>
     <span class="blackFont">${startDate}</span>
     </li>
      <li>
     <span>Salida</span>
     <span class="blackFont">${endDate}</span>
     </li>
     <li>
     <span>Noches</span>
     <span class="blackFont">${nigths}</span>
     </li>
   </div>

   <div class="column">
   <div class="senderDataAndClientData">
   <li> 
   <span>DE</span>
   <h4 class="nameCompany">Hotel System</h4>
   <p>David Abidal 627, 11300 Montevideo</p>
   <span>systemFiveHotel@gmail.com</span>
   <span>+(598) 93 647 321</span>
   </li>

   <li> 
   <span>Para</span>
   <h4 class="nameClient">${revenueBooking.nombre} ${revenueBooking.apellido}</h4>
   <span>${revenueBooking.correo}</span>
   <span>${revenueBooking.telefono}</span>
   </li>
   </div>
   <div class="scroll">
   <table class="tableDetailsBill">
   <thead>
   <th>Descripcion</th>
   <th>Precio</th>
   <th>Cantidad</th>
   <th>Total</th>
   </thead>
   <tbody></tbody>
   </table>
   </div>
   <div class="totalAmount">
   <span>Total:US$ ${revenueBooking.deposito}</span>
   </div>
   </div>
   </div>
   </div>

  `;

  displayTable(billBookingDetails);
};

const displayTable = (billBookingDetails) => {
  let tableBills = document.querySelector(".tableDetailsBill");

  let rows = billBookingDetails.map((bill) => {
    return `
      <tr>
      <td>
      <div class="description">
      ${bill.description}
      </div>
      </td>
      <td>US$ ${bill.price}</td>
      <td>${bill.quantity}</td>
       <td>US$ ${bill.amount}</td>
      </tr>
    `;
  });
  tableBills.querySelector("tbody").innerHTML = rows.join("");
};
