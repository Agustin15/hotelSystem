import { displayBill } from "./displayBill.js";
import { generatePDF } from "./optionsDetails/generatePdf.js";
import displayBarStagesAdvance from "./barStageAdvance.js";

document.addEventListener("DOMContentLoaded", async () => {
  displayBarStagesAdvance("#linePersonalData");
  await displayBill();
  btnDownloadPdf.style.display = "flex";

  let btnDownloadPdf = document.querySelector(".btnDownloadPdf");
  generatePDF("sendEmail", detailsBooking[0].correo, detailsBooking[0].nombre);

  btnDownloadPdf.addEventListener("click", async () => {
    // generatePDF("download");
  });
});
