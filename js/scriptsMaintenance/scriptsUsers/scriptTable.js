import { getAllUsers, getAllUsersLimitIndex } from "./methodsFetch.js";
import { configDelete } from "./optionsUsersTable/scriptDelete.js";
import { configAdd } from "./optionsUsersTable/scriptAdd.js";
import { loadingPage, pageNotFound } from "../dashboard.js";

let controls, tableUsers;
let index = 0,
  pages = 0;

export let modal;

export const configTableUsers = async () => {
  tableUsers = document.querySelector(".tableUsers");
  controls = document.querySelector(".controls");
  let users = await allUsers();

  if (users) {
    if (users.length < 15) {
      pages = 1;
    } else {
      pages = (users.length / 15).toFixed(0);
    }
    displayTable();
  }
};

export const displayTable = async () => {
  let usersLimit = await allUsersLimitIndex(index);
  if (usersLimit) {
    displayRows(usersLimit);
  }
};

const displayRows = async (usersLimit) => {
  let rows = usersLimit.map((user, index) => {
    return `
        <tr class=${index % 2 == 0 ? "trGray" : "trNormal"}>
          <td>
          <div class="contentIdUser">
          ${user.idUsuario}
             <img src="data:image/png;base64,${user.imagen}">
          </div>
          </td>
         <td>${user.usuario}</td>
        <td>${user.nombre}</td>
          <td>${user.apellido}</td>
           <td>${user.rol}</td>
           <td>
           <div class="buttons" id='${JSON.stringify(user)}'>
        <button class="btnDelete" data-option="delete"><img src="../../../img/borrar.png"></button>
            <button class="btnEdit"><img src="../../../img/editar.png"></button>
                <button class="btnDetails"><img src="../../../img/detalles.png"></button>
           </div>
           </td>
        </tr>
        `;
  });

  tableUsers.querySelector("tbody").innerHTML = rows.join("");
  controlsIndex();
  search();

  let btnAddUser = document.querySelector(".btnAddUser");
  btnAddUser.addEventListener("click", () => {
    let optionFound = optionsUsers.find(
      (optionUsers) => optionUsers.url.indexOf("add") > -1
    );

    getPageOptionTable(optionFound);
  });

  let buttonsOptions = tableUsers
    .querySelector("tbody")
    .querySelectorAll("button");

  buttonsOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      let user = JSON.parse(btn.parentElement.id);
      let option = btn.dataset.option;

      let optionUser = optionsUsers.find(
        (optionUsers) => optionUsers.url.indexOf(option) > -1
      );

      getPageOptionTable(optionUser, user);
    });
  });
};

const controlsIndex = () => {
  let prev = controls.querySelector(".prev");
  let next = controls.querySelector(".next");
  let pageIndex = controls.querySelector(".pageIndex");

  pageIndex.innerHTML = `${index + 1}/${pages}`;

  prev.addEventListener("click", () => {
    if (index + 1 > 1) {
      index--;
      displayTable();
    }
  });
  next.addEventListener("click", () => {
    if (index + 1 < pages) {
      index++;
      displayTable();
    }
  });
};

const allUsers = async () => {
  let users;

  loading(true);
  try {
    const result = await getAllUsers();
    if (result) {
      users = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);

    if (!users) {
      noData();
    }
    return users;
  }
};

const allUsersLimitIndex = async () => {
  let users;

  loading(true);
  try {
    const result = await getAllUsersLimitIndex(index);
    if (result) {
      users = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);

    if (!users) {
      noData();
    }
    return users;
  }
};

const loading = (state) => {
  tableUsers.querySelector("tbody").innerHTML = ``;
  let tfoot = document.querySelector("tfoot");
  if (state) {
    tfoot.innerHTML = `
        <td cellspan="6" colspan="6">
      <div class="loading">
          <span>Cargando datos</span>
         <img src="../../../img/spinnerMain.gif">
      </div>
        </td>
      `;
  } else {
    tfoot.innerHTML = ``;
  }
};

const noData = () => {
  tableUsers.querySelector("tbody").innerHTML = ``;
  let tfoot = document.querySelector("tfoot");
  controls.style.display = "none";

  tfoot.innerHTML = `
    <td cellspan="6" colspan="6">
    <div class="noData">
   <img src="../../../img/sinDatos.png">
     <span>No se encontraron datos</span>
  </div>
  </td>
  `;
};

const search = () => {
  let btnInputSearch = document.querySelector(".btnSearchInput");
  let inputSearch = document.querySelector(".inputSearch");
  let tfoot = tableUsers.querySelector("tfoot");

  let rows = tableUsers.querySelector("tbody").querySelectorAll("tr");
  btnInputSearch.addEventListener("click", () => {
    let value = inputSearch.value.trim();

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

const optionsUsers = [
  { url: "optionsUsersTable/delete.html", function: configDelete },
  { url: "optionsUsersTable/add.html", function: configAdd }
];

const getPageOptionTable = async (optionUser, user) => {
  modal = document.querySelector(".modalMaintenance");
  let page;

  modal.style.display = "flex";
  loadingPage(true, modal);
  try {
    const response = await fetch(optionUser.url);
    const result = await response.text();

    if (response.ok && result) {
      page = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, modal);
    if (page) {
      displayOptionTable(page, user, optionUser);
    } else {
      pageNotFound(modal);
    }
  }
};

const displayOptionTable = (page, user, optionUser) => {
  modal.innerHTML = page;
  optionUser.function(user);
};
