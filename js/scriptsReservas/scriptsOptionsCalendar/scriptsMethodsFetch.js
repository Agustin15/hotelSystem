export const POSTBooking = async (booking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/bookings/bookingController.php";
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

    if (result == true) {
      data = result;
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

export const getBookingByClientAndDate = async (booking) => {
  const dataBooking = {
    idClient: booking.client,
    startBooking: booking.startBooking,
    endBooking: booking.endBooking,
  };

  let data;
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/bookings/bookingController.php?option=bookingByClientAndDate&&dataBooking=" +
    JSON.stringify(dataBooking);

  loadingForm(true);
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
    alertForm(
      "../../../img/advertenciaLogin.png",
      "Ups, error al agregar la reserva",
      "Error",
      "alertFormError"
    );
  } finally {
    loadingForm(false);
    return data;
  }
};

export const loadingForm = (state) => {
  let loadingOfForm = document.querySelector(".loadingForm");

  if (state) {
    loadingOfForm.style.display = "flex";
  } else {
    loadingOfForm.style.display = "none";
  }
};

export const alertForm = (icon, msj, title, classToAdd) => {
  let alert = document.querySelector(".alertForm");
  alert.querySelector("img").src = icon;
  alert.querySelector("p").textContent = msj;
  alert.querySelector("span").textContent = title;
  alert.style.display = "flex";
  alert.classList.add(classToAdd);

  if (title == "Exito") {
    setTimeout(() => {
      removeAlertForm();
    }, 2000);
  }
};

export const removeAlertForm = () => {
  let alert = document.querySelector(".alertForm");
  alert.querySelector("img").src = "";
  alert.querySelector("p").textContent = "";
  alert.querySelector("span").textContent = "";
  alert.style.display = "none";
  alert.classList.remove("alertFormCorrect");
  alert.classList.remove("alertFormError");
};
