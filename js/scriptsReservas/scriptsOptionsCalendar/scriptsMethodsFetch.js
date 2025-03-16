import { BACK_URL_LOCALHOST } from "../../urlLocalhost.js";
import { invalidAuthentication } from "../../scriptsAdmin/userData.js";

export const POSTBooking = async (booking) => {
  let url = `${BACK_URL_LOCALHOST}routes/admin/bookingRoutes.php`;
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
      } else throw result;
    } else if (result == true) {
      data = result;
    }
  } catch (error) {
    data = error;
    console.log("Error:",error.error);
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
