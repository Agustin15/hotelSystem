import { loadingBooking } from "../personalData.js";

export const getBookingByClientMailAndDate = async (clientBooking) => {
  const dataBooking = {
    mail: clientBooking.client.mail,
    startBooking: clientBooking.booking.start,
    endBooking: clientBooking.booking.end,
  };

  let data = null;
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/bookings/bookingController.php?option=bookingByClientMailAndDate&&dataBooking=" +
    JSON.stringify(dataBooking);

  loadingBooking(true,"Cargando");
  try {
    const response = await fetch(url);
    const result = await response.json();

    console.log(result);
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingBooking(false);
    return data;
  }
};
