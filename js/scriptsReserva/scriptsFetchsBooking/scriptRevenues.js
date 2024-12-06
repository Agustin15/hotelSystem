import { loadingBooking } from "../personalData.js";
import { alertBooking } from "../alertsBooking.js";

export const fetchPOSTPay = async (booking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/revenues/revenuesController.php";

  let data;
  loadingBooking(true, "Reservando habitaciones");
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
    }
  } catch (error) {
    console.log(error);
    alertBooking(
      "Error",
      "No se pudo realizar la reserva, vuelve a intentarlo más tarde"
    );
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loadingBooking(false);
    return data;
  }
};

export const fetchPUTPay = async (booking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/revenues/revenuesController.php";

  let data;
  loadingBooking(true, "Reservando habitaciones");
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });
    const result = await response.json();

    if (result.response == true) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    alertBooking(
      "Error",
      "No se pudo actualizar la reserva, vuelve a intentarlo más tarde"
    );
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loadingBooking(false);
    return data;
  }
};

export const fetchGETPay = async (idBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/revenues/revenuesController.php?option=getRevenue&&idBooking=" +
    JSON.stringify(idBooking);

  let data;
  loadingBooking(true, "Reservando habitaciones");
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    alertBooking(
      "Error",
      "No se pudo actualizar la reserva, vuelve a intentarlo más tarde"
    );
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loadingBooking(false);
    return data;
  }
};
