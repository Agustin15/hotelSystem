import {
  sendEmail,
  addEmail,
  getEmailBookingConfirmByIdBooking,
  patchStateUpdateEmailBookingById
} from "../scriptsFetchsBooking/scriptEmail.js";
import {
  stateBooking,
  idBooking,
  detailsBooking,
  startBooking,
  endBooking,
  roomsToDisplay
} from "../displayBill.js";

export const generatePDF = async (option, email, name) => {
  let booking = {
    idBooking: idBooking,
    date: { startBooking: startBooking, endBooking: endBooking },
    client: {
      name: name,
      lastname: detailsBooking[0].apellido,
      email: email,
      phone: detailsBooking[0].telefono
    },
    rooms: roomsToDisplay,
    amount: detailsBooking[0].deposito
  };

  let details = document.querySelector(".details");

  html2canvas(details).then(function (canvas) {
    let srcCanvasElement = canvas.toDataURL();
    let doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width / 1.3, canvas.height / 1.3],
      putOnlyUsedFonts: true
    });

    doc.addImage(srcCanvasElement, "png", 8, 5);

    if (option == "download") {
      doc.save("Detalles reserva.pdf");
      if (window.innerWidth < 1080) {
        window.close();
      }
    } else {
      send(name, email, booking);
    }
  });
};

const send = async (name, email, booking) => {
  let emailFound = await getEmailBookingConfirmByIdBooking(idBooking);

  if (
    !emailFound ||
    emailFound.stateConfirm == 0 ||
    (emailFound.stateUpdate == 0 && stateBooking == "Actualizacion")
  ) {
    let emailSent = await sendEmail(name, email, booking, stateBooking);

    if (emailSent) {
      if (stateBooking == "Confirmacion") {
        addEmail(idBooking);
      } else if (stateBooking == "Actualizacion") {
        patchStateUpdateEmailBookingById(emailFound.idCorreo);
      }
    }
  }
};
