import {
  loadingForm,
  alertForm,
} from "../scriptsReservas/scriptsOptionsCalendar/scriptsMethodsFetch.js";
import BACK_URL_LOCALHOST from "../urlLocalhost.js";

export const POSTPay = async (booking) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/revenuesRoutes.php`;

  let data;
  loadingForm(true);
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
    loadingForm(false);
    if (!data) {
      alertForm(
        "../../../img/advertenciaLogin.png",
        "Ups, error al agregar el pago",
        "Error",
        "alertFormError"
      );
    }
    return data;
  }
};

export const PUTPay = async (booking) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/revenuesRoutes.php `;

  let data;
  loadingForm(true);
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
    loadingForm(false);
    if (!data) {
      alertForm(
        "../../../img/advertenciaLogin.png",
        "Ups, error al actualizar el pago",
        "Error",
        "alertFormError"
      );
    }
    return data;
  }
};

export const getPayById = async (idBooking) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/revenuesRoutes.php?params=` +
    JSON.stringify({ option: "getRevenue", idBooking: idBooking });

  let data = null;
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
    return data;
  }
};
