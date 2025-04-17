import {
  displayBill,
  detailsBooking,
  dataToFindBooking
} from "./displayBill.js";
import { generatePDF } from "./optionsDetails/generatePdf.js";
import displayBarStagesAdvance from "./barStageAdvance.js";

document.addEventListener("DOMContentLoaded", async () => {
  displayBarStagesAdvance("#linePersonalData");
  let barStageAdvance = document.querySelector(".barStageAdvance");
  barStageAdvance.style.display = "flex";

  await displayBill();
  let btnDownloadPdf = document.querySelector(".btnDownloadPdf");
  btnDownloadPdf.style.display = "flex";
  generatePDF("sendEmail", detailsBooking[0].correo, detailsBooking[0].nombre);

  btnDownloadPdf.addEventListener("click", async () => {
    if (window.innerWidth < 1080) {
      window.open(
        "detailsBillToMobile.html?details=" +
          encodeURIComponent(JSON.stringify(dataToFindBooking))
      );
    } else {
      generatePDF("download");
    }
  });
});
