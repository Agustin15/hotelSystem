import { BACK_URL_LOCALHOST } from "../urlLocalhost.js";
import { invalidAuthentication } from "../scriptsAdmin/userData.js";

export const getPayById = async (idBooking) => {
  let url =
    `${BACK_URL_LOCALHOST}routes/admin/revenuesRoutes.php?params=` +
    JSON.stringify({ option: "getRevenue", idBooking: idBooking });

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

export const getRevenuDetailsById = async (idBooking) => {
  let url =
    `${BACK_URL_LOCALHOST}routes/admin/revenuesRoutes.php?params=` +
    JSON.stringify({ option: "getRevenueDetailsById", idBooking: idBooking });

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

export const getAllYearsRevenues = async () => {
  let url =
    `${BACK_URL_LOCALHOST}routes/admin/revenuesRoutes.php?params=` +
    JSON.stringify({ option: "getAllYearsRevenues" });

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

export const getRevenuesByYear = async (year) => {
  let url =
    `${BACK_URL_LOCALHOST}routes/admin/revenuesRoutes.php?params=` +
    JSON.stringify({ option: "dashboardGraphic", year: year });

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
    }
    if (result.length > 0) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

export const getAllRevenuesByYear = async (year, index) => {
  let url =
    `${BACK_URL_LOCALHOST}routes/admin/revenuesRoutes.php?params=` +
    JSON.stringify({
      option: "getAllRevenuesByYear",

      year: year
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
    }
    if (result.length > 0) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

export const getAllRevenuesByYearLimitIndex = async (year, index) => {
  let url =
    `${BACK_URL_LOCALHOST}routes/admin/revenuesRoutes.php?params=` +
    JSON.stringify({
      option: "getAllRevenuesByYearLimitIndex",

      year: year,
      index: index
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
    }
    if (result.length > 0) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};
