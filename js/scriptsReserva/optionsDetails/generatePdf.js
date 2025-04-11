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
} from "../details.js";

let widthImage, heightImage, format, orientation;

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
    format = [canvas.width - 224, canvas.height - 114];
    orientation = "landscape";

    if (window.innerWidth <= 600) {
      formats([canvas.width / 3.7, canvas.height / 4], 245, 954, "portrait");
    } else if (window.innerWidth >= 601 && window.innerWidth < 1080) {
      formats([canvas.width / 4.4, canvas.height / 5], 445, 454, "portrait");
    }

    let srcCanvasElement = canvas.toDataURL();
    let doc = new jsPDF({
      orientation: orientation,
      unit: "px",
      format: format,
      putOnlyUsedFonts: true
    });

    doc.addImage(srcCanvasElement, "png", 14, 14, widthImage, heightImage);

    if (option == "download") {
      doc.save("Detalles reserva.pdf");
    } else {
      send(name, email, booking);
    }
  });
};

const formats = (
  formatParam,
  widthImageParam,
  heightImageParam,
  orientationParam
) => {
  format = formatParam;
  widthImage = widthImageParam;
  heightImage = heightImageParam;
  orientation = orientationParam;
};
const send = async (name, email, booking) => {
  let emailFound = await getEmailBookingConfirmByIdBooking(idBooking);

  emailFound = null;
  if (
    !emailFound ||
    emailFound.stateConfirm == 0 ||
    (emailFound.stateUpdate == 0 && stateBooking == "Actualizacion")
  ) {
    let emailSent = await sendEmail(name, email, booking, stateBooking);

    if (emailSent) {
      if (stateBooking == "Confirmacion") {
        // addEmail(idBooking);
      } else if (stateBooking == "Actualizacion") {
        patchStateUpdateEmailBookingById(emailFound.idCorreo);
      }
    }
  }
};
