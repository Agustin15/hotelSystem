import { loadingBooking } from "../personalData.js";
import { alertBooking } from "../alertsBooking.js";
import BACK_URL_LOCALHOST from "../../urlLocalhost.js";

export const fetchGETAvailableRoomsCategory = async (dataBooking) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/roomsBookingRoutes.php?params=` +
    JSON.stringify({ option: "roomsFreeCategory", dataBooking: dataBooking });
  let data;

  loadingBooking(true, "Buscando habitaciones");
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    loadingBooking(false);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (!data) {
      alertBooking(
        "Error",
        "Ups, no se pudo realizar la reserva, vuelve a intentarlo más tarde"
      );
    }
    return data;
  }
};

export const fetchPOSTRooms = async (roomsToBooking) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/roomsBookingRoutes.php`;

  let data;
  loadingBooking(true, "Reservando habitaciones");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomsToBooking),
    });
    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (result.response == true) {
      data = result.response;
    }
  } catch (error) {
    console.log(error);
    loadingBooking(false);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (!data) {
      alertBooking(
        "Error",
        "No se pudo realizar la reserva, vuelve a intentarlo más tarde"
      );
    }
    return data;
  }
};
