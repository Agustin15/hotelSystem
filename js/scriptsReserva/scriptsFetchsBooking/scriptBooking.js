import { loadingBooking } from "../personalData.js";
import { alertBooking } from "../alertsBooking.js";

export const fetchPOSTBooking = async (booking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/bookings/bookingController.php";
  let data;

  loadingBooking(true, "Reservando");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });
    const result = await response.json();

    if (result == true) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    loadingBooking(false);
    alertBooking(
      "Error",
      "No se pudo realizar la reserva, vuelve a intentarlo más tarde"
    );
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return data;
  }
};

export const getBookingByClientMailAndDate = async (clientBooking) => {
  const dataBooking = {
    mail: clientBooking.client.mail,
    startBooking: clientBooking.booking.date.start,
    endBooking: clientBooking.booking.date.end,
  };

  let data = null;
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/bookings/bookingController.php?option=bookingByClientMailAndDate&&dataBooking=" +
    JSON.stringify(dataBooking);

  loadingBooking(true, "Cargando");
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    loadingBooking(false);
    alertBooking(
      "Error",
      "No se pudo realizar la reserva, vuelve a intentarlo más tarde"
    );
    console.log(error);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return data;
  }
};

export const fetchPUTBooking = async (dataBookingToUpdate) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/bookings/bookingController.php";
  let data;

  loadingBooking(true, "Actualizando reserva");
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBookingToUpdate),
    });
    const result = await response.json();

    if (result == true) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    loadingBooking(false);
    alertBooking(
      "Error",
      "No se pudo actualizar la reserva, vuelve a intentarlo más tarde"
    );
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return data;
  }
};
