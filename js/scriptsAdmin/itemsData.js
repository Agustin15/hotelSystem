import { getMes } from "./chart.js";

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

const getRevenuesActualYear = async () => {
  let $url =
    "http://localhost/sistema%20Hotel/controller/admin/ganancias/opcionPago.php?option=itemDataDashboard";

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

const displayItemDataRevenuesActual = async () => {
  const dataRevenues = await getRevenuesActualYear();
  let liDataRevenues = document.createElement("li");
  let actualDate = new Date();
  let actualYear = actualDate.getFullYear();
  let actualMonth = actualDate.getMonth();
  let actualMonthString = getMes(actualMonth);

  liDataRevenues.innerHTML = `
      <div class="icon">
         <img src="../../img/revenuesDashboard.png">
         </div>
         <div class="dataRevenues">
               <h5>Ganancias actuales</h5>
               <span><a>${actualMonthString}:</a>US$${dataRevenues.totalRevenuesActualMonth}</span>
                 <span><a>${actualYear}</a>: US$${dataRevenues.totalRevenuesActualMonth}</span>
                 </div>
                 
        `;

  document.querySelector(".itemsData").appendChild(liDataRevenues);
};

const displayItemsDataCategoryRooms = async () => {
  const data = await getCategoryRoomsData();

  let items = data.map((dataRoom) => {
    return `  <li>
    <div class="icon">
       <img src="../../img/">
       </div>
       <div class="category">
             <h5>Habitacion ${dataRoom.category}</h5>
             <span><a>Total:</a>${dataRoom.totalRoomCategory}</span>
             <div class="data">
             <span><a>Libres:</a>${dataRoom.totalRoomCategoryFree}</span>
             <span><a>Ocupadas:</a>${dataRoom.totalRoomCategoryBusy}</span>
             </div>
             </div>
       </li>`;
  });

  document.querySelector(".itemsData").innerHTML += items.join("");
};

export { displayItemsDataCategoryRooms, displayItemDataRevenuesActual };
