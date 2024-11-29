export const getDataServices = async (idBooking) => {
  let url =
    "http://localhost/sistema%20Hotel/controller/admin/services/servicesController.php?option=getServicesBooking&&idBooking=" +
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
