export const getRoomsCategoryHotel = async () => {
  let data;
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/rooms/roomsBookingController.php?option=roomsHotelCategory";

  try {
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

export const getDataBookingRoomsWithCategory = async (idBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/rooms/roomsBookingController.php?option=getDataRoomsBookingAndCategory&&idBooking=" +
    idBooking;

  let data = null;
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

export const getDataBookingRoomsGuests = async (idBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/rooms/roomsBookingController.php?option=getDataRoomsBooking&&idBooking=" +
    idBooking;

  let data = null;
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};
