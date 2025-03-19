import {
  sendEmail,
  addEmail,
  getEmailBookingConfirmByIdBooking,
  patchStateUpdateEmailBookingById
} from "../scriptsFetchsBooking/scriptEmail.js";
import { stateBooking, idBooking } from "../details.js";

export const generatePDF = (option, email, name) => {
  let details = document.querySelector(".details");

  html2canvas(details).then(function (canvas) {
    let srcCanvasElement = canvas.toDataURL();

    let doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
      putOnlyUsedFonts: true
    });

    doc.addImage(srcCanvasElement, "png", 94, 15);

    if (option == "download") {
      doc.save("Detalles reserva.pdf");
    } else {
      let pdf = doc.output("blob");
      generateFileToSend(name, email, pdf);
    }
  });
};

const generateFileToSend = async (name, email, pdfBlob) => {
  const file = new File([pdfBlob], "Detalles reserva", {
    type: pdfBlob.type
  });

  let emailFound = await getEmailBookingConfirmByIdBooking(idBooking);

  if (
    !emailFound ||
    emailFound.stateConfirm == 0 ||
    (emailFound.stateUpdate == 0 && stateBooking == "Actualizacion")
  ) {
    let emailSent = await sendEmail(name, email, file, stateBooking);
    if (emailSent) {
      if (stateBooking == "Confirmacion") {
        addEmail(idBooking);
      } else if (stateBooking == "Actualizacion") {
        patchStateUpdateEmailBookingById(emailFound.idCorreo);
      }
    }
  }
};
