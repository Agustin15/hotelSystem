import { closeModal } from "../../scriptsUsers/optionsUsersTable/scriptDelete.js";
import {
  getServiceByName,
  getServiceByNameLimit
} from "../../../scriptsServices/scriptServices.js";
import { configDeleteProduct } from "./optionEditProducts/scriptDelete.js";
import { configEditProduct } from "./optionEditProducts/scriptEdit.js";
import { loadingPage, pageNotFound } from "../../dashboard.js";
import { configAddProduct } from "./optionEditProducts/scriptAdd.js";

let serviceData, tbody, controls;
let index = 1;
let offset = 0;

export const configEditProducts = (service) => {
  serviceData = service;

  let modalServices = document.querySelector(".modalServices");
  let btnCloseWindow = document.querySelector(".btnCloseWindow");
  let title = document.querySelector(".titleEditProducts").querySelector("h3");
  controls = document.querySelector(".controls");

  let iconTitle = document
    .querySelector(".titleEditProducts")
    .querySelector("img");
  tbody = document.querySelector("tbody");

  title.textContent = `Editar productos ${serviceData.nombreServicio.toLowerCase()}`;
  iconTitle.src =
    serviceData.nombreServicio == "Minibar"
      ? "../../../img/minibar.png"
      : "../../../img/bar-counter.png";

  btnCloseWindow.addEventListener("click", () => {
    closeModal(modalServices);
  });

  displayTable();
};

const noProducts = () => {
  let tfoot = document.querySelector("tfoot");
  tbody.innerHTML = ``;
  tfoot.innerHTML = ` <td colspan="5" rowspan="5">
  <div class="noDataProducts">
      <img src="../../../img/sinDatos.png">
      <span>No hay productos</span>
  </div>
</td>
`;
};

const loading = (state) => {
  let tfoot = document.querySelector("tfoot");

  tbody.innerHTML = ``;
  if (state) {
    tfoot.innerHTML = ` <td colspan="5" rowspan="5">
  <div class="loadingProducts">
        <span>Cargando productos</span>
       <img src="../../../img/spinnerMain.gif">
  </div>
</td>
`;
  } else {
    tfoot.innerHTML = ``;
  }
};

const optionsUrlProduct = [
  {
    urlPage: "optionEditService/optionsEditProduct/delete.html",
    function: configDeleteProduct
  },

  {
    urlPage: "optionEditService/optionsEditProduct/edit.html",
    function: configEditProduct
  },
  {
    urlPage: "optionEditService/optionsEditProduct/add.html",
    function: configAddProduct
  }
];

const displayTable = async () => {
  let btnAddProduct = document.querySelector(".btnAddProduct");

  btnAddProduct.addEventListener("click", () => {
    let optionFound = optionsUrlProduct.find(
      (optionUrl) => optionUrl.urlPage.indexOf("add") > -1
    );

    drawPageOption(optionFound.urlPage, null, optionFound.function);
  });

  let products = await getProducts();
  if (products) {
    displayControlsIndex(products);
    let productsLimit = await getProductsLimit();
    drawRowsTable(productsLimit);
  }
};

export const displayRows = async () => {
  let productsLimit = await getProductsLimit();
  drawRowsTable(productsLimit);
};

const drawRowsTable = async (products) => {
  let row = products.map((product, index) => {
    return `
      <tr class=${index % 2 == 0 ? "trGray" : "trWhite"}>
         <td>
         <div class="iconProduct">
         <img src="data:image/png;base64,${product.imagen}">
         </div>
         </td> 
        <td>
        <div class="nameService">
        ${product.descripcionServicio}
        </div>
        </td>
      <td>US$${product.precio}</td> 
     <td>${product.maxStock}</td>   
     <td>
     <div class="options" id=${product.idServicio}>
      <button class="btnDeleteProduct" id="delete">
        Eliminar
       <img src="../../../img/borrar.png">
     </button>
      <button class="btnEditProduct" id="edit">
       Editar
       <img src="../../../img/editProfileAvatar.png">
     </button>
     </div>
     </td>   
     
     
      </tr>
    `;
  });

  tbody.innerHTML = row.join("");
  search();

  let buttons = tbody.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let optionFound = optionsUrlProduct.find(
        (optionUrl) => optionUrl.urlPage.indexOf(button.id) > -1
      );

      if (optionFound) {
        let idService = button.parentElement.id;
        let productFound = products.find(
          (product) => product.idServicio == idService
        );

        drawPageOption(optionFound.urlPage, productFound, optionFound.function);
      }
    });
  });
};

const getProducts = async () => {
  let products;

  loading(true);
  try {
    products = await getServiceByName(serviceData.nombreServicio);
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!products) {
      noProducts();
    }
    return products;
  }
};

const getProductsLimit = async () => {
  let productsLimit;

  loading(true);
  try {
    productsLimit = await getServiceByNameLimit(
      serviceData.nombreServicio,
      offset
    );
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!productsLimit) {
      noProducts();
    }
    return productsLimit;
  }
};

const search = () => {
  let btnInputSearch = document.querySelector(".btnSearchInput");
  let inputSearch = document.querySelector(".inputSearch");
  let tfoot = document.querySelector("tfoot");

  let rows = tbody.querySelectorAll("tr");
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
   <td rowspan="5" colspan="5">
  <div class="noResultsProductFound">
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

const drawPageOption = async (url, product, configFunction) => {
  let page;
  let modal = document.querySelector(".modalProducts");
  modal.style.display = "flex";
  loadingPage(true, modal);
  try {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok && result) {
      page = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingPage(false, modal);
    if (!page) {
      pageNotFound(modal);
    } else {
      modal.innerHTML = page;
      configFunction(serviceData.nombreServicio, product, modal);
    }
  }
};

const displayControlsIndex = (products) => {
  let limitPages = Math.ceil(products.length / 4);
  
  controls.querySelector(".pageIndex").textContent = `${index}/${limitPages}`;

  controls.querySelector(".prev").addEventListener("click", () => {
    if (index > 1) {
      index--;
      offset -= 4;
      controls.querySelector(
        ".pageIndex"
      ).textContent = `${index}/${limitPages}`;
      displayRows();
    }
  });
  controls.querySelector(".next").addEventListener("click", () => {
    if (index < limitPages) {
      index++;
      offset += 4;
      controls.querySelector(
        ".pageIndex"
      ).textContent = `${index}/${limitPages}`;
      displayRows();
    }
  });
};
