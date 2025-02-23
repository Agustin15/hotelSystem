import BACK_URL_LOCALHOST from "../urlLocalhost.js";

export const getDataUserByToken = async () => {
  let data;

  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/userRoutes.php?params=` +
        JSON.stringify({ option: "getDataToken" }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "same-origin"
        }
      }
    );

    const tokenUserData = await response.json();
    if (!response.ok) {
      throw tokenUserData.error;
    } else if (tokenUserData.resultVerify) {
      data = tokenUserData.resultVerify;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  } finally {
    if (data) {
      data = await getUserByUsername(data);
    }
    return data;
  }
};

export const invalidAuthentication = async () => {
  localStorage.setItem("alertInvalidToken", true);
  logout();
};

export const logout = async () => {
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/logoutRoutes.php`
    );
    const result = await response.json();

    if (result.expired) {
      location.href = "http://localhost/sistema%20Hotel/views/loginAdmin/";
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserByUsername = async (userToken) => {
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/userRoutes.php?params=` +
        JSON.stringify({
          option: "getUserByUsername",
          username: userToken.user
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
      throw result.error;
    }
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
    if (error.indexOf("Autenticacion") > -1) {
      invalidAuthentication();
    }
  }
};
