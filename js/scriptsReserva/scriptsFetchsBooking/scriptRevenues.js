import { loadingBooking } from "../personalData.js";
import { alertBooking } from "../alertsBooking.js";
import BACK_URL_LOCALHOST from "../../urlLocalhost.js";

export const fetchPOSTPay = async (booking) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/revenuesRoutes.php`;

  let data;
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
    } else if (result.response == true) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loadingBooking(false);
    if (!data) {
      alertBooking(
        "Error",
        "No se pudo realizar la reserva, vuelve a intentarlo más tarde"
      );
    }
    return data;
  }
};

export const fetchPUTPay = async (booking) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/revenuesRoutes.php`;

  let data;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result.response == true) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loadingBooking(false);
    if (!data) {
      alertBooking(
        "Error",
        "No se pudo actualizar la reserva, vuelve a intentarlo más tarde"
      );
    }
    return data;
  }
};

export const fetchGETPay = async (idBooking) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/revenuesRoutes.php?params=` +
    JSON.stringify({ option: "getRevenue", idBooking: idBooking });

  let data;

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
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loadingBooking(false);
    if (!data) {
      alertBooking(
        "Error",
        "No se pudo actualizar la reserva, vuelve a intentarlo más tarde"
      );
    }
    return data;
  }
};
