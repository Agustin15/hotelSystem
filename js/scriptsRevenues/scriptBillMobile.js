import { displayBill, idRevenueBooking } from "./functionsBill.js";

let contentBill;

document.addEventListener("DOMContentLoaded", async function () {
  contentBill = this.querySelector(".contentBill");
  await displayBill("billInMobile");
  generatePDFInMobile();
});

const generatePDFInMobile = () => {
  html2canvas(contentBill).then(function (canvas) {
    let imageURLCanva = canvas.toDataURL();

    let doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
      putOnlyUsedFonts: true
    });
    doc.addImage(imageURLCanva, "png", 95, 35);
    doc.save("Factura reserva numero " + idRevenueBooking);
    window.close();
  });
};
