let pages;
let limitByPage = 10;
let indexPage = 0;

export const displayTable = async () => {

  await displaySelectYear();
  let quantityRows = await getQuantityBookingsActualYear();
  if (quantityRows) {
    drawIndex();
  
  } else {
    noData("No se encontraron reservas en esta año");
  }
};

const getQuantityBookingsActualYear = async (yearSelected) => {
  let year;
  let data = null;
  try {
    if (!yearSelected) {
      year = new Date().getFullYear();
    }
    let url =
      "http://localhost/sistema%20Hotel/routes/bookingRoutes.php?params=" +
      JSON.stringify({ option: "bookingsRowsYear", year: year });

    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
      if (result <= 10) {
        pages = 1;
      } else {
        pages = (result / limitByPage).toFixed(0);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

const noData = (error) => {
  let message = document.querySelector(".message");
  message.innerHTML = `
     <div class="noDataBookings">
      <img src="../../sinDatos.png">

      <h3>${error}</h3>
     </div>

  `;
};

const drawIndex = () => {
  let controlsIndex = document.querySelector(".controls");
  let indexText = controlsIndex.querySelector(".pageIndex");
  let prevPage = controlsIndex.querySelector(".prev");
  let nextPage = controlsIndex.querySelector(".next");

  prevPage.addEventListener("click", () => {
    if (indexPage + 1 > 1) {
      indexPage--;
    }
  });
  nextPage.addEventListener("click", () => {
    if (indexPage + 1 < pages) {
      indexPage++;
    }
  });

  indexText.textContent = `${indexPage + 1}/${pages}`;
};

const getBookingsYearLimit = async (yearSelected) => {
  let data = null;
  try {
    let url =
      "http://localhost/sistema%20Hotel/routes/bookingRoutes.php?params=" +
      JSON.stringify({
        option: "bookingsYearlimit",
        data: { year: 2024, indexPage: indexPage },
      });

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

const displaySelectYear = async () => {
  let url =
    "http://localhost/sistema%20Hotel/routes/bookingRoutes.php?params=" +
    JSON.stringify({ option: "allYearsBooking" });

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
    if (data) {
      drawYearsSelect(data);
    }
  }
};

const drawYearsSelect = (years) => {

 let selectYears= document.querySelector(".selectYears");

let yearsOptions= years.map((year)=>{

  return `
  <option value=${year}>${year["YEAR(fechaLlegada)"]}</option>
  `;
 })

 selectYears.innerHTML=yearsOptions.join("");
};
