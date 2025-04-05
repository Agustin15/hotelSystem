import {
  sendEmail,
  addEmail,
  getEmailBookingConfirmByIdBooking,
  patchStateUpdateEmailBookingById
} from "../scriptsFetchsBooking/scriptEmail.js";
import { stateBooking, idBooking } from "../details.js";

export const generatePDF = (option, email, name) => {
  let details = document.querySelector(".details");
  let orientation = "landscape";

  if (window.innerWidth < 1080) {
    orientation = "portrait";
  }

  html2canvas(details).then(function (canvas) {
    let format = [canvas.width - 220, canvas.height - 130];

    if (window.innerWidth < 1080) {
      format = [canvas.width - 300, canvas.height - 1075];
    }
    let srcCanvasElement = canvas.toDataURL();
    let doc = new jsPDF({
      orientation: orientation,
      unit: "px",
      format: format,
      putOnlyUsedFonts: true
    });

    doc.addImage(srcCanvasElement, "png", 14, 14);

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
