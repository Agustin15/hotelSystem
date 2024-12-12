import {
  loadingForm,
  alertForm,
} from "../scriptsReservas/scriptsOptionsCalendar/scriptsMethodsFetch.js";

export const POSTPay = async (booking) => {
  let url = "http://localhost/sistema%20Hotel/routes/revenuesRoutes.php";

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

    if (result.response == true) {
      data = result;
    } else {
      throw "Ups, error al agregar la reserva";
    }
  } catch (error) {
    console.log(error);
    alertForm(
      "../../../img/advertenciaLogin.png",
      error,
      "Error",
      "alertFormError"
    );
  } finally {
    loadingForm(false);
    return data;
  }
};

export const getPayById = async (idBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/routes/revenuesRoutes.php?params=" +
    JSON.stringify({ option: "getRevenue",idBooking:idBooking});

  let data=null;
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};
