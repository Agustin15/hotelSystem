import { loadingBooking } from "../personalData.js";
import { alertBooking } from "../alertsBooking.js";
import BACK_URL_LOCALHOST from "../../urlLocalhost.js";

export const fetchPOSTBooking = async (booking) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/bookingRoutes.php`;
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
    if (!response.ok) {
      throw result.error;
    } else if (result == true) {
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
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/bookingRoutes.php?params=` +
    JSON.stringify({
      option: "bookingByClientMailAndDate",
      dataBooking: dataBooking,
    });

  loadingBooking(true, "Cargando");
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (result) {
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
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/bookingRoutes.php`;
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
    if (!response.ok) {
      throw result.error;
    } else if (result == true) {
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
