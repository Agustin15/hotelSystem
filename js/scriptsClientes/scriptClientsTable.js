import configDeleteClient from "./scriptOptionsTable/scriptDeleteClient.js";
import { configEditClient } from "./scriptOptionsTable/scriptEditClient.js";
import { configDetailsClient } from "./scriptOptionsTable/scriptDetailsClient.js";

let indexRegister = 0;
let page = 1;
let limitPage;

const getRowsClients = async () => {
  let data = null;

  try {
    let url =
      "http://localhost/sistema%20Hotel/routes/clientRoutes.php?params=" +
      JSON.stringify({ option: "clientsRows" });

    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (!data) {
      noData();
    }
    return data;
  }
};

export const getAllClients = async () => {
  let data = null;

  try {
    let url =
      "http://localhost/sistema%20Hotel/routes/clientRoutes.php?params=" +
      JSON.stringify({ option: "allClients" });

    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (!data) {
      noData();
    }
    return data;
  }
};

const getDataLimitClients = async () => {
  let data = null;

  loading(true);

  try {
    let url =
      "http://localhost/sistema%20Hotel/routes/clientRoutes.php?params=" +
      JSON.stringify({ option: "clientsTable", index: indexRegister });

    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      noData();
    }
    return data;
  }
};

export const loading = (state) => {
  if (state) {
    document.querySelector("tfoot").innerHTML = ` 
    
       <td rowspan="6" colspan="6">
    <div class="loading">
      <span>Cargando datos</span>
      <img src="../../../img/spinnerMain.gif">
    </div>
    </td>
    `;
  } else {
    document.querySelector("tfoot").innerHTML = ``;
  }
};

const displayTable = async () => {
  let table = document.querySelector(".tableClients");
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  let pagesText = document.querySelector(".pageIndex");
  let clientsRows = await getRowsClients();
  let clients = await getDataLimitClients();

  if (clients) {
    if (clientsRows <= 10) {
      limitPage = 1;
    } else {
      limitPage = clientsRows / 10;
    }

    let dataClients = clients.map((client, index) => {
      let classRow;
      if (index % 2 == 0) {
        classRow = "trGray";
      }

      table.classList.remove("tableClientsNoData");

      return `
      
      <tr class=${classRow}>
       <td class="tdId">
       <div class="idClient">
       ${client.idCliente}
              <img src="../../../img/usuarioTable.png">
       </div>
       </td>
        <td>${client.nombre}</td>
         <td>${client.apellido}</td>
          <td>${client.telefono}</td>
           <td>${client.correo}</td>
           <td class="tdOptions">

           <div class="buttons" id=${client.idCliente}>

            <button class="btnDelete"><img src="../../../img/borrar.png"></button>
                <button class="btnEdit"><img src="../../../img/editar.png"></button>
                    <button class="btnDetails"><img src="../../../img/detalles.png"></button>
            
           </div>
           </td>
      </tr>
     
  
      `;
    });

    table.querySelector("tbody").innerHTML = dataClients.join("");

    pagesText.textContent = `${page}/${limitPage.toFixed(0)}`;

    controls(next, prev);
    search();
    optionsClient();
  }
};

const controls = (next, prev) => {
  next.addEventListener("click", function () {
    if (page < limitPage) {
      indexRegister += 10;
      page++;
      displayTable();
    }
  });

  prev.addEventListener("click", function () {
    if (page > 1) {
      indexRegister -= 10;
      page--;
      displayTable();
    }
  });
};

export const search = () => {
  let inputSerch = document.querySelector(".inputSearch");
  let tfoot = document.querySelector("tfoot");

  let rows = document.querySelector("tbody").querySelectorAll("tr");
  inputSerch.addEventListener("keydown", () => {
    let value = inputSerch.value.trim();

    rows.forEach((row) => {
      if (row.innerText.indexOf(value) == -1) {
        row.style.display = "none";
      } else {
        row.style.display = "table-row";
      }
    });

    let totalRowsHide = [...rows].reduce((ac, row) => {
      row.style.display == "none" ? ac++ : ac;
      return ac;
    }, 0);

    if (rows.length == totalRowsHide) {
      tfoot.innerHTML = `
   <td rowspan="6" colspan="6">
  <div class="noResults">
      <img src="../../../img/noFind.png">
      <span>Sin Resultados</span>
  </div>
  </td>
  
  `;
    } else {
      tfoot.innerHTML = ``;
    }
  });
};

const noData = () => {
  document.querySelector("tfoot").innerHTML = `
      <td rowspan="6" colspan="6">
  <div class="noDataClients">

      <img src="../../../img/sinDatos.png">
      <span>No se encontraron clientes</span>
  </div>
  </td>
  `;

  document.querySelector(".controls").style.display = "none";
  document.querySelector(".containSearch").style.display = "none";
  document.querySelector(".titleTable").classList.add("titleNoData");
};

const getOptionClient = async (url) => {
  const response = await fetch(url);
  const result = await response.text();
  return result;
};

const optionsClient = () => {
  let btnsDelete = [...document.querySelectorAll(".btnDelete")];
  let btnsEdit = [...document.querySelectorAll(".btnEdit")];
  let btnsDetails = [...document.querySelectorAll(".btnDetails")];
  let result;

  btnsDelete.forEach((btnDelete) => {
    btnDelete.addEventListener("click", async () => {
      drawOption(
        btnDelete,
        "optionClient/delete.php?client=",
        configDeleteClient
      );
    });
  });

  btnsEdit.forEach((btnEdit) => {
    btnEdit.addEventListener("click", async () => {
      drawOption(btnEdit, "optionClient/edit.php?client=", configEditClient);
    });
  });

  btnsDetails.forEach((btnDetails) => {
    btnDetails.addEventListener("click", async () => {
      drawOption(
        btnDetails,
        "optionClient/details.php?client=",
        configDetailsClient
      );
    });
  });
};

const drawOption = async (btn, url, configOption) => {
  let id = btn.parentElement.id;
  let result = await getOptionClient(url + id);
  openModal(result);
  configOption();
};

const openModal = (result) => {
  let modalMainClient = document.querySelector(".modalMainClient");
  modalMainClient.style.display = "flex";
  modalMainClient.innerHTML = result;
};

export { displayTable };
