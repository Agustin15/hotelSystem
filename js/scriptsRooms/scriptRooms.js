import {
  alertForm,
  loadingForm,
} from "../scriptsReservas/scriptsOptionsCalendar/scriptsMethodsFetch.js";

export const POSTRooms = async (booking, option) => {
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

    if (!response.ok) {
      throw result.error;
    } else if (result.response == true) {
      data = result.response;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingForm(false);
    if (!data) {
      alertForm(
        "../../../img/advertenciaLogin.png",
        `Ups, error al ${option}`,
        "Error",
        "alertFormError"
      );
    }
    return data;
  }
};

export const getRoomsCategoryHotel = async () => {
  let data;
  let url =
    "http://localhost/sistema%20Hotel/routes/roomsRoutes.php?params=" +
    JSON.stringify({ option: "getAllCategoryRooms" });

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

export const getAllRoomsByCategory = async (category) => {
  let data;
  let url =
    "http://localhost/sistema%20Hotel/routes/roomsRoutes.php?params=" +
    JSON.stringify({ option: "getAllRoomsByCategory", category: category });
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

export const getBookingRoomsDetails = async (idBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/routes/roomsBookingRoutes.php?params=" +
    JSON.stringify({
      option: "getRoomsBookingAndDetails",
      idBooking: idBooking,
    });

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

export const getRoomsFreeCategory = async (dataBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/routes/roomsBookingRoutes.php?params=" +
    JSON.stringify({ option: "roomsFreeCategory", dataBooking: dataBooking });

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

export const verifyStateRoomsToBooking = async (
  bookingToUpdate,
  roomsCart,
  idBooking
) => {
  let dataBookingToUpdate = {
    idBooking: idBooking,
    startBooking: bookingToUpdate.startBooking,
    endBooking: bookingToUpdate.endBooking,
    roomsToBooking: roomsCart,
  };

  let roomsAvailables;

  loadingForm(true);
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/routes/roomsBookingRoutes.php?params=" +
        JSON.stringify({
          option: "verifyStateRoomsToBooking",
          dataBookingToUpdate: dataBookingToUpdate,
        })
    );

    const result = await response.json();
    if (!response.ok) {
      throw "Ups, error al actualizar la reserva";
    }
    if (result) {
      roomsAvailables = result;
    }
  } catch (error) {
    console.log(error);
    loadingForm(false);
  } finally {
    if (!roomsAvailables) {
      alertForm(
        "../../../img/advertenciaLogin.png",
        "Ups, error al actualizar la reserva",
        "Error",
        "alertFormError"
      );
    }
    return roomsAvailables;
  }
};

export const fetchDeleteRoom = async (dataToDelete) => {
  let roomsDeleted;
  try {
    const response = await fetch(
      "http://localhost/sistema%20Hotel/routes/roomsBookingRoutes.php?params=" +
        JSON.stringify(dataToDelete),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw "Ups, error al eliminar las habitaciones";
    }
    if (result) {
      roomsDeleted = result;
    }
  } catch (error) {
    console.log(error);
    loadingForm(false);
  } finally {
    if (!roomsDeleted) {
      alertForm(
        "../../../img/advertenciaLogin.png",
        "Ups, error al eliminar las habitaciones",
        "Error",
        "alertFormError"
      );
    }
    return roomsDeleted;
  }
};
