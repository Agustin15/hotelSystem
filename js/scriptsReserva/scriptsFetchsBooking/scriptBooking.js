import { loadingBooking } from "../personalData.js";
import { BACK_URL_LOCALHOST } from "../../urlLocalhost.js";

export const fetchPOSTBooking = async (booking) => {
  let url = `${BACK_URL_LOCALHOST}routes/bookingClient/bookingRoutes.php`;

  let data;
  loadingBooking(true, "Reservando");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
    });
    const result = await response.json();

    if (!response.ok) {
      throw result;
    } else if (result == true) {
      data = result;
    }
  } catch (error) {
    console.log("Error", error.error);
    data = error;
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    loadingBooking(false);
    return data;
  }
};

export const fetchPUTBooking = async (booking) => {
  let url = `${BACK_URL_LOCALHOST}routes/bookingClient/bookingRoutes.php`;

  let data;

  loadingBooking(true, "Actualizando reserva");
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
    });
    const result = await response.json();

    if (!response.ok) {
      throw result;
    } else if (result == true) {
      data = result;
    }
  } catch (error) {
    console.log("Error:", error.error);
    data = error;
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    loadingBooking(false);
    return data;
  }
};
