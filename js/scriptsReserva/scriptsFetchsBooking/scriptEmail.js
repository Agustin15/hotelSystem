import { BACK_URL_LOCALHOST } from "../../urlLocalhost.js";

export const sendEmail = async (name, email, booking, stateBooking) => {
  let url = `${BACK_URL_LOCALHOST}routes/bookingClient/emailRoutes.php`;
  let data;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        destinary: email,
        booking: booking,
        optionPOST: "sendEmail",
        subject: "Reserva en Hotel Five confirmada",
        stateBooking: stateBooking
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

export const addEmail = async (idBooking) => {
  let url = `${BACK_URL_LOCALHOST}routes/bookingClient/emailRoutes.php`;
  let data;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      },
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
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      },
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      }
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
