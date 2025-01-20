import { getMes } from "./chart.js";
import BACK_URL_LOCALHOST from "../urlLocalhost.js";

const getCategoryRoomsData = async () => {
  let $url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/roomsBookingRoutes.php?params= ` +
    JSON.stringify({ option: "itemDataDashboard" });

  try {
    const response = await fetch($url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw data.error;
    } else if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getRevenuesActualYear = async () => {
  let $url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/revenuesRoutes.php?params=  ` +
    JSON.stringify({ option: "itemDataDashboard" });

  try {
    const response = await fetch($url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw data.error;
    } else if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const displayItemDataRevenuesActual = async () => {
  const dataRevenues = await getRevenuesActualYear();
  let liDataRevenues = document.createElement("li");
  let actualDate = new Date();
  let actualYear = actualDate.getFullYear();
  let actualMonth = actualDate.getMonth();
  let actualMonthString = getMes(actualMonth + 1);

  let details;
  if (dataRevenues) {
    details = ` <h5>Ganancias actuales</h5>
               <span><a>${actualMonthString}:</a>US$${dataRevenues.totalRevenuesActualMonth}</span>
                 <span><a>${actualYear}</a>: US$${dataRevenues.totalRevenuesActualMonth}</span>`;
  } else {
    details = `
      <div class="noData">
           <img src="../../img/sinDatos.png">
           <h3>No hay datos</h3>
           </div>
    `;
  }

  liDataRevenues.innerHTML = `
      <div class="icon">
         <img src="../../img/revenuesDashboard.png">
         </div>
         <div class="dataRevenues">
              
         ${details}
                 </div>
                 
        `;

  document.querySelector(".itemsData").appendChild(liDataRevenues);
};

const displayItemsDataCategoryRooms = async () => {
  const data = await getCategoryRoomsData();
  let details;

  let items = data.map((dataRoom) => {
    if (data) {
      details = `  <h5>Habitacion ${dataRoom.category}</h5>
                    <span><a>Total:</a>${dataRoom.totalRoomCategory}</span>
                    <div class="data">
                    <span><a>Libres:</a>${dataRoom.totalRoomCategoryFree}</span>
                    <span><a>Ocupadas:</a>${dataRoom.totalRoomCategoryBusy}</span>
                    </div>`;
    } else {
      details = ` 
           <div class="noData">
           <img src="../../img/sinDatos.png">
           <h3>No hay datos</h3>
           </div>
           `;
    }
    return `  <li>
    <div class="icon">
       <img src="../../img/roomInfo.png">
       </div>
       <div class="category">
            ${details}
             </div>
       </li>`;
  });
  document.querySelector(".itemsData").innerHTML += items.join("");
};

export { displayItemsDataCategoryRooms, displayItemDataRevenuesActual };
