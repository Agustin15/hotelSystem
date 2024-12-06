import { loadingBooking } from "../personalData.js";
import { alertBooking } from "../alertsBooking.js";
export const fetchGETAvailableRoomsCategory = async (dataBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/rooms/roomsBookingController.php?option=roomsFreeCategory&&dataBooking=" +
    JSON.stringify(dataBooking);
  let data;

  loadingBooking(true, "Buscando habitaciones");
  try {
    const response = await fetch(url);

    const result = await response.json();
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    loadingBooking(false);
    alertBooking(
      "Error",
      "Ups, no se pudo realizar la reserva, vuelve a intentarlo más tarde"
    );
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return data;
  }
};

export const fetchPOSTRooms = async (roomsToBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/rooms/roomsBookingController.php";
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
    if (result.response == true) {
      data = result.response;
    } 
  } catch (error) {
    console.log(error);
    loadingBooking(false);
    alertBooking("Error","No se pudo realizar la reserva, vuelve a intentarlo más tarde");
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return data;
  }
};
