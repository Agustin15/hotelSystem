import { invalidAuthentication } from "../../scriptsAdmin/userData.js";
import { BACK_URL_LOCALHOST } from "../../urlLocalhost.js";

export const POSTuser = async (newUser) => {
  let result;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/userRoutes.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        },
        body: JSON.stringify(newUser)
      }
    );
    result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else {
        throw result.error;
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

export const PUTuser = async (userToUpdate) => {
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/userRoutes.php`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        },
        body: JSON.stringify(userToUpdate)
      }
    );
    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result;
    }
    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const PATCHUserImage = async (userToUpdate) => {
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/userRoutes.php`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        },
        body: JSON.stringify({
          option: "updateImageUser",
          userToUpdate: userToUpdate
        })
      }
    );
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

export const PATCHUserPassword = async (userPasswordToUpdate) => {
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/userRoutes.php`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        },
        body: JSON.stringify({
          option: "updatePasswordUser",
          userPasswordToUpdate: userPasswordToUpdate
        })
      }
    );
    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result;
    }
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error.errorMessage);
    return error;
  }
};

export const getAllUsers = async () => {
  let users;

  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/userRoutes.php?params=` +
        JSON.stringify({
          option: "getAllUsers"
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
      } else {
        throw result.error;
      }
    }
    if (result) {
      users = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return users;
  }
};

export const getAllUsersLimitIndex = async (index) => {
  let users;

  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/userRoutes.php?params=` +
        JSON.stringify({
          option: "getAllUsersLimitIndex",
          index: index
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
      } else {
        throw result.error;
      }
    }
    if (result) {
      users = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return users;
  }
};

export const deleteUser = async (idUser) => {
  let userDeleted;

  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/userRoutes.php?params=` +
        JSON.stringify({
          idUser: idUser
        }),
      {
        method: "DELETE",
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
      } else {
        throw result.error;
      }
    }
    if (result) {
      userDeleted = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return userDeleted;
  }
};

export const getRols = async () => {
  let rols;

  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/rolRoutes.php`,
      {
        method: "GET",
        headers: {
          credentials: "include"
        }
      }
    );
    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else {
        throw result.error;
      }
    }
    if (result) {
      rols = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return rols;
  }
};
