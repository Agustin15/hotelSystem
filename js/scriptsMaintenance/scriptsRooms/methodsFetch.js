import { BACK_URL_LOCALHOST } from "../../urlLocalhost.js";
import { invalidAuthentication } from "../../scriptsAdmin/userData.js";

export const getAllCategoryRoomsWithDetails = async () => {
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/roomsRoutes.php?
        params=${JSON.stringify({
          option: "getAllCategoryRoomsWithDetails"
        })}`,
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
      }
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

export const PUTCategoryRoom = async (categoryRoomToUpdate) => {
  let data;
  try {
    const response = await fetch(
      `${BACK_URL_LOCALHOST}routes/admin/roomsRoutes.php`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        },
        body: JSON.stringify(categoryRoomToUpdate)
      }
    );

    const result = await response.json();
    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      }
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
