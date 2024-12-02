import { loadingBooking } from "../personalData.js";
import { alertClientFormBooking } from "../alertsBooking.js";

export const fetchPOSTClient = async (client) => {
  let data = null;
  loadingBooking(true, "Procesando cliente");

  setTimeout(async () => {
    try {
      const response = await fetch(
        "http://localhost/sistema%20Hotel/controller/admin/client/clientController.php",
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
      } else {
        throw "Ups, no se pudo agregar el cliente";
      }
    } catch (error) {
      console.log(error);
      loadingBooking(false);
      alertClientFormBooking(error);
    } finally {
      return data;
    }
  }, 2000);
};
