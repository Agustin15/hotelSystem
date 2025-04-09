import { BACK_URL_LOCALHOST, FRONT_URL_LOCALHOST } from "../urlLocalhost.js";

export const getDataUserByToken = async () => {
  let data;

  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/userRoutes.php?params=` +
        JSON.stringify({ option: "getDataToken" }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        }
      }
    );

    const tokenUserData = await response.json();
  
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result.error;
    } else if (tokenUserData.resultVerify) {
      data = tokenUserData.resultVerify;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (data) {
      data = await getUserById(data);
    }
    return data;
  }
};

export const invalidAuthentication = async () => {
  // logout();
};

export const logout = async () => {
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/logoutRoutes.php`,
      {
        method: "GET",
        headers: {
          credentials: "include"
        }
      }
    );
    const result = await response.json();

    if (result.expired) {
      location.href = `${FRONT_URL_LOCALHOST}views/loginAdmin/`;
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (userToken) => {
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/userRoutes.php?params=` +
        JSON.stringify({
          option: "getUserById",
          idUser: userToken.idUser
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
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};
