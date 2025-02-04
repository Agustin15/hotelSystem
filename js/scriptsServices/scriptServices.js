import BACK_URL_LOCALHOST from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/scriptsAdmin.js";

export const getDataServices = async (idBooking) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/servicesRoutes.php?params=` +
    JSON.stringify({ option: "getServicesBooking", idBooking: idBooking });

  let data = null;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    return data;
  }
};

export const getHistoryServicesByCurrentBookingRoom = async (
  numRoom,
  idBooking
) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/servicesRoutes.php?params=` +
    JSON.stringify({
      option: "getHistoryServicesByCurrentBookingRoom",
      numRoom: numRoom,
      idBooking: idBooking,
    });

  let data = null;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
    });
    const result = await response.json();
  
    if (!response.ok) {
      throw result.error;
    } else if (result.length > 0) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    return data;
  }
};

export const getAllServicesHotel = async () => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/servicesRoutes.php?params=` +
    JSON.stringify({
      option: "getAllServicesHotel",
    });

  let data = null;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result.length > 0) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    return data;
  }
};

export const getServiceByName = async (nameService) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/servicesRoutes.php?params=` +
    JSON.stringify({
      option: "getServiceByName",
      nameService: nameService,
    });

  let data = null;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    return data;
  }
};

export const getServiceByIdAndNumRoomAndBooking = async (serviceToAdd) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/servicesRoutes.php?params=
  ${JSON.stringify({
    option: "getServiceByIdAndNumRoomAndBooking",
    serviceToAdd: serviceToAdd,
  })}`;
  let data = null;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    data = "error";
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    return data;
  }
};

export const POSTService = async (serviceToAdd) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/servicesRoutes.php`;
  let data = null;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
      body: JSON.stringify(serviceToAdd),
    });
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    return data;
  }
};

export const PUTService = async (serviceToUpdate) => {
  let url = `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/servicesRoutes.php`;
  let data = null;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
      },
      body: JSON.stringify(serviceToUpdate),
    });
    const result = await response.json();
    if (!response.ok) {
      throw result.error;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    return data;
  }
};
