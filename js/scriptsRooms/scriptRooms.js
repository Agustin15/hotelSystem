import { BACK_URL_LOCALHOST } from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/userData.js";

export const getRoomsCategoryHotel = async () => {
  let data;
  let url =
    `${BACK_URL_LOCALHOST}routes/admin/roomsRoutes.php?params=` +
    JSON.stringify({ option: "getAllCategoryRooms" });

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
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
    `${BACK_URL_LOCALHOST}routes/admin/roomsRoutes.php?params= ` +
    JSON.stringify({ option: "getAllRoomsByCategory", category: category });
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
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
    `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params=` +
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
        credentials: "include"
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
    `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params=` +
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
        credentials: "include"
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
    `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params=` +
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
        credentials: "include"
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
    `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params=` +
    JSON.stringify({ option: "roomsFreeCategory", dataBooking: dataBooking });

  let data = null;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
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

export const getAllBookingsByRoomAndYearLimit = async (
  index,
  year,
  numRoom
) => {
  let data;

  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params=` +
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
          credentials: "include"
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
      `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params= ` +
        JSON.stringify({
          option: "getAllBookingsByRoomAndYear",
          numRoom: numRoom,
          year: year
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
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
      `${BACK_URL_LOCALHOST}routes/admin/roomsBookingRoutes.php?params= ` +
        JSON.stringify({
          option: "getBookingByRoomReserved",
          numRoom: numRoom
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
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

export const getDetailsCategoryRoom = async (category) => {
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/roomsRoutes.php?params= ` +
        JSON.stringify({
          option: "getDetailsCategoryRoom",
          category: category
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        }
      }
    );

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
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
