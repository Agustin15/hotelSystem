import {
  alertForm,
  loadingForm
} from "../scriptsReservas/scriptsOptionsCalendar/scriptsMethodsFetch.js";
import BACK_URL_LOCALHOST from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/userData.js";

export const POSTRooms = async (booking, option) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php`;
  let data;
  loadingForm(true);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      },
      body: JSON.stringify(booking)
    });
    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
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
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsRoutes.php?params=` +
    JSON.stringify({ option: "getAllCategoryRooms" });

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
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
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsRoutes.php?params= ` +
    JSON.stringify({ option: "getAllRoomsByCategory", category: category });
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
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
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params=` +
    JSON.stringify({
      option: "getDataRoomsBookingAndCategory",
      idBooking: idBooking
    });

  let data = null;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
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
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params=` +
    JSON.stringify({
      option: "getRoomsBookingAndDetails",
      idBooking: idBooking
    });

  let data = null;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
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
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params=` +
    JSON.stringify({
      option: "getDataRoomsBooking",
      idBooking: idBooking
    });
  let data = null;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
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
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params=` +
    JSON.stringify({ option: "roomsFreeCategory", dataBooking: dataBooking });

  let data = null;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
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
    roomsToBooking: roomsCart
  };

  let roomsAvailables;

  loadingForm(true);
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params=` +
        JSON.stringify({
          option: "verifyStateRoomsToBooking",
          dataBookingToUpdate: dataBookingToUpdate
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw "Ups, error al actualizar la reserva";
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
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params=` +
        JSON.stringify(dataToDelete),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw "Ups, error al eliminar las habitaciones";
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

export const getAllBookingsByRoomAndYearLimit = async (
  index,
  year,
  numRoom
) => {
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params=` +
        JSON.stringify({
          option: "getAllBookingsByRoomAndYearLimit",
          numRoom: numRoom,
          year: year,
          index: index
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw "Ups, error al buscar las reservas";
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

export const getAllBookingsByRoomAndYear = async (year, numRoom) => {
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params= ` +
        JSON.stringify({
          option: "getAllBookingsByRoomAndYear",
          numRoom: numRoom,
          year: year
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw "Ups, error al buscar las reservas";
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

export const getBookingByRoomReserved = async (numRoom) => {
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/roomsBookingRoutes.php?params= ` +
        JSON.stringify({
          option: "getBookingByRoomReserved",
          numRoom: numRoom
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw "Ups, no se encontro la reserva";
    }
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};
