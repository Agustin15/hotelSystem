const getCategoryRoomsData = async () => {
  let $url =
    "http://localhost/sistema%20Hotel/controller/admin/reservas/opcionHabitacion.php?option=itemDataDashboard";

  try {
    const response = await fetch($url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const displayItemsDataCategoryRooms = async () => {
  const data = await getCategoryRoomsData();

    data.map(dataRoom=>{

       
    });
  
};


export default displayItemsDataCategoryRooms;