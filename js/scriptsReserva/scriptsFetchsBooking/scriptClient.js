import { loadingBooking } from "../personalData.js";
import { alertClientFormBooking, alertBooking } from "../alertsBooking.js";

export const fetchPOSTClient = async (client) => {
  loadingBooking(true, "Procesando cliente");

  let data = null;
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/routes/clientRoutes.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      }
    );

    const result = await response.json();
    if (result.advertencia) {
      throw result.advertencia;
    } else if (result.respuesta) {
      data = result.respuesta;
    }else{
      throw "Ups, no se pudo agregar el cliente";
    }
  } catch (error) {
    console.log(error);
    alertClientFormBooking(error);
    loadingBooking(false);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return data;
  }
};

export const fetchGetClient = async (client) => {
  loadingBooking(true, "Cargando");
  let data = null;

  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/routes/clientRoutes.php?params=" +
        JSON.stringify({ option: "getClientByMailAndName", client: client })
    );

    const result = await response.json();

    if (result) {
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
