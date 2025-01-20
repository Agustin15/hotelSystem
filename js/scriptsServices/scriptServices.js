import BACK_URL_LOCALHOST from "../urlLocalhost.js";

export const getDataServices = async (idBooking) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/servicesRoutes.php?params=` +
    JSON.stringify({ option: "getServicesBooking", idBooking: idBooking });

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
