import {
  cart,
  deleteToCart,
  subtractQuantityCart,
  addQuantityCart,
  calculateTotalAmount,
  cleanCart,
  amount
} from "./displayProducts.js";

import { invalidAuthentication } from "../../../../../scriptsAdmin/scriptsAdmin.js";
import BACK_URL_LOCALHOST from "../../../../../urlLocalhost.js";
import {
  POSTService,
  getStatesOfProductsServices,
  PUTServiceHotel,
  PUTService
} from "../../../../../scriptsServices/scriptServices.js";
import { getPayById } from "../../../../../scriptsRevenues/scriptRevenues.js";
import { idBooking, numRoom } from "../minibar.js";
import { displayAlert } from "./displayAlert.js";

let ulCart;

export const displayCart = () => {
  ulCart = document.querySelector(".items");
  if (cart.length == 0) {
    calculateTotalAmount();
    noItems();
  } else {
    displayItems();
  }
};

const displayItems = () => {
  const items = cart.map((product) => {
    return ` 
     <li class="item" id=${product.id}>
             <div class="header">
            <span title="${product.name}" class="itemName">${product.name}</span>
            <img class="btnDelete" src="../../../img/basura.png">
            </div>
           <div class="rowItem">
           <div class="columnOneItem">
               <div class="icon">
               <img src="data:image/png;base64,${product.icon}">
               </div>
               </div>
               <div class="columnTwoItem">
               <span>Cantidad:</span>
               <div class="containQuantityItem">
                 <button class="btnMinusItem">-</button>
                 <a class="quantity">${product.quantity}</a>
                  <button class="btnPlusItem">+</button>
               </div>
               <span class="totalItem">Total:U$S${product.total}</span>
               </div>
               </div>
           </li>
    `;
  });

  ulCart.innerHTML = items.join("");

  calculateTotalAmount();

  document.querySelectorAll(".btnDelete").forEach((btn) => {
    btn.addEventListener("click", () => {
      let idItem = btn.parentElement.parentElement.id;
      deleteToCart(idItem);
    });
  });

  document.querySelectorAll(".btnMinusItem").forEach((btn) => {
    btn.addEventListener("click", () => {
      let idItem =
        btn.parentElement.parentElement.parentElement.parentElement.id;
      subtractQuantityCart(idItem);
    });
  });

  document.querySelectorAll(".btnPlusItem").forEach((btn) => {
    btn.addEventListener("click", () => {
      let idItem =
        btn.parentElement.parentElement.parentElement.parentElement.id;
      addQuantityCart(idItem);
    });
  });
};

const noItems = () => {
  ulCart.innerHTML = ` 
      <div class="noItems">
        <img src="../../../img/emptyCart.png">
        <span>Carrito vacio</span>
      </div>
    `;
};

export const addService = async () => {
  let productsState = await statesOfProductsServices();

  if (productsState) {
    let productsToAdd = productsState.filter(
      (productsState) => productsState.state == "toAdd"
    );

    if (productsToAdd.length > 0) {
      let serviceAdded = postService(productsToAdd);
      if (serviceAdded) {
        let resultUpdatePay = putPay();
        if (resultUpdatePay) {
          let resultUpdateService = putHotelService();

          if (resultUpdateService) {
            cleanCart();
          }
        }
      }
    }
  }
};

const loading = (state) => {
  let spinner = document.querySelector(".btnAddService").querySelector("img");

  if (state) {
    spinner.style.display = "flex";
  } else {
    spinner.style.display = "none";
  }
};

const statesOfProductsServices = async () => {
  loading(true);
  let data;
  try {
    const result = await getStatesOfProductsServices(cart, idBooking, numRoom);
    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!data) {
      displayAlert(false);
    }
    return data;
  }
};

const postService = async (productsToAdd) => {
  const serviceToAdd = {
    idBooking: idBooking,
    numRoom: numRoom,
    option: "minibar",
    products: productsToAdd
  };

  let resultPOST;
  loading(true);
  try {
    const result = await POSTService(serviceToAdd);
    if (result) {
      resultPOST = result;
    }
  } catch (error) {
    console.log(error);
    loading(false);
  } finally {
    if (!resultPOST) {
      displayAlert(false);
    }
    return resultPOST;
  }
};

const putPay = async () => {
  let revenueById = await getPayById(idBooking);

  if (revenueById) {
    let newAmount = revenueById.deposito + amount;
    let resultPUTRevenue;

    loading(true);
    try {
      const response = await fetch(
        `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/revenuesRoutes.php`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            credentials: "same-origin"
          },
          body: JSON.stringify({ idBooking: idBooking, newAmount: newAmount })
        }
      );
      const result = await response.json();
      if (result) {
        resultPUTRevenue = result;
      }
    } catch (error) {
      console.log(error);
      loading(false);
      if (error.indexOf("Autenticacion") > -1) {
        invalidAuthentication();
      }
    } finally {
      if (!resultPUTRevenue) {
        displayAlert(false);
      }
      return resultPUTRevenue;
    }
  }
};

const putHotelService = async () => {
  const serviceToUpdate = {
    products: cart,
    option: "updateStockProductByServiceToRoom"
  };

  let resultPUT;
  loading(true);
  try {
    const result = await PUTServiceHotel(serviceToUpdate);
    if (result) {
      resultPUT = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    if (!resultPUT) {
      displayAlert(false);
    }
    return resultPUT;
  }
};
