import { BACK_URL_LOCALHOST } from "../../urlLocalhost.js";

export const sendEmail = async (name, email, file, stateBooking) => {
  let url = `${BACK_URL_LOCALHOST}routes/bookingClient/emailRoutes.php`;
  let data;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("destinary", email);
  formData.append("stateBooking", stateBooking);
  formData.append("subject", "Reserva en Hotel Five confirmada");
  formData.append("file", file);
  formData.append("optionPOST", "sendEmail");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });

    const result = await response.text();
    console.log(result);
    if (!response.ok) {
      throw result.error;
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

export const addEmail = async (idBooking) => {
  let url = `${BACK_URL_LOCALHOST}routes/bookingClient/emailRoutes.php`;
  let data;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idBooking: idBooking,
        optionPOST: "addEmail"
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw result.error;
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

export const patchStateUpdateEmailBookingById = async (idEmail) => {
  let url = `${BACK_URL_LOCALHOST}routes/bookingClient/emailRoutes.php`;
  let data;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        idEmailBooking: idEmail
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw result.error;
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

export const getEmailBookingConfirmByIdBooking = async (idBooking) => {
  let url = `${BACK_URL_LOCALHOST}routes/bookingClient/emailRoutes.php?params=${JSON.stringify(
    { idBooking: idBooking }
  )}`;

  let data;

  try {
    const response = await fetch(url, {
      method: "GET"
    });

    const result = await response.json();

    if (!response.ok) {
      throw result.error;
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
