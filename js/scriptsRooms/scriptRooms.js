import {
  alertForm,
  loadingForm,
} from "../scriptsReservas/scriptsOptionsCalendar/scriptsMethodsFetch.js";

export const POSTRooms = async (booking) => {
  let url = "http://localhost/sistema%20Hotel/routes/roomsBookingRoutes.php";
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
      data = result.response;
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

export const getRoomsCategoryHotel = async () => {
  let data;
  let url =
    "http://localhost/sistema%20Hotel/routes/roomsRoutes.php";

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

export const getDataBookingRoomsWithCategory = async (idBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/routes/roomsBookingRoutes.php?params=" +
    JSON.stringify({
      option: "getDataRoomsBookingAndCategory",
      idBooking: idBooking,
    });

  let data = null;
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

export const getDataBookingRoomsGuests = async (idBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/routes/roomsBookingRoutes.php?params=" +
    JSON.stringify({
      option: "getDataRoomsBooking",
      idBooking: idBooking,
    });
  let data = null;
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

export const getRoomsFreeCategory = async (dataBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/routes/roomsBookingRoutes.php?params=" +
    JSON.stringify({ option: "roomsFreeCategory", dataBooking: dataBooking });

  let data = null;
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
