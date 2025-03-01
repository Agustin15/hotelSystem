import { loadingBooking } from "../personalData.js";
import { alertClientFormBooking, alertBooking } from "../alertsBooking.js";
import BACK_URL_LOCALHOST from "../../urlLocalhost.js";

export const fetchPOSTClient = async (client) => {
  
  let data = null;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/clientRoutes.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result.advertencia) {
      throw result.advertencia;
    } else if (result.respuesta) {
      data = result.respuesta;
    }
  } catch (error) {
    console.log(error);
    loadingBooking(false);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!data) {
      alertClientFormBooking("Ups, no se pudo agregar el cliente");
    }
    return data;
  }
};

export const fetchGetClient = async (client) => {
  loadingBooking(true, "Reservando");
  let data = null;

  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/bookingClient/clientRoutes.php?params=` +
        JSON.stringify({ option: "getClientByMailAndName", client: client })
    );

    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
  }
};
