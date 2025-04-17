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
    orientation = "landscape";

    if (
      window.innerWidth <= 600 ||
      (window.innerWidth >= 601 && window.innerWidth < 1080)
    ) {
      orientation = "portrait";
    }

    let srcCanvasElement = canvas.toDataURL();
    let doc = new jsPDF({
      orientation: orientation,
      unit: "px",
      format: [
        details.getBoundingClientRect().width,
        details.getBoundingClientRect().height
      ],
      putOnlyUsedFonts: true
    });

    doc.addImage(
      srcCanvasElement,
      "png",
      14,
      5,
      details.clientWidth / 1.5,
      details.clientHeight / 1.5
    );

    if (option == "download") {
      doc.save("Detalles reserva.pdf");
    } else {
      send(name, email, booking);
    }
  });
};

const formats = (widthImageParam, heightImageParam, orientationParam) => {
  widthImage = widthImageParam;
  heightImage = heightImageParam;
  orientation = orientationParam;
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
