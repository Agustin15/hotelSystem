import { displayBill } from "./displayBill.js";
import { generatePDF } from "./optionsDetails/generatePdf.js";

document.addEventListener("DOMContentLoaded", async () => {
  await displayBill();
  generatePDF("download");
});
