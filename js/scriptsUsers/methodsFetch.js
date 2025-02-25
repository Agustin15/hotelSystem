import { invalidAuthentication } from "../scriptsAdmin/userData.js";
import BACK_URL_LOCALHOST from "../urlLocalhost.js";

export const PUTuser = async (userToUpdate) => {
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/userRoutes.php`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        },
        body: JSON.stringify(userToUpdate)
      }
    );
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }
    if (result) {
      return result;
    }
  } catch (error) {
    if (error.errorMessage.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
    return error;
  }
};

export const PATCHUserImage = async (userToUpdate) => {
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/userRoutes.php`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        },
        body: JSON.stringify({
          option: "updateImageUser",
          userToUpdate: userToUpdate
        })
      }
    );
    const result = await response.json();

    if (!response.ok) {
      throw result.error;
    }
    if (result) {
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

export const PATCHUserPassword = async (userPasswordToUpdate) => {
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/userRoutes.php`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        },
        body: JSON.stringify({
          option: "updatePasswordUser",
          userPasswordToUpdate: userPasswordToUpdate
        })
      }
    );
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error.errorMessage);
    if (error.errorMessage.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
    return error;
  }
};
