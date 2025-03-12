import {
  cart,
  deleteToCart,
  subtractQuantityCart,
  addQuantityCart,
  calculateTotalAmount,
  cleanCart,
  displayContentShop,
  amount,
  optionServiceProduct
} from "./displayProducts.js";

import { POSTService } from "../../../../../scriptsServices/scriptServices.js";
import { idBooking, numRoom, serviceByName } from "../minibar.js";
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

const loading = (state) => {
  let spinner = document.querySelector(".btnAddService").querySelector("img");

  if (state) {
    spinner.style.display = "flex";
  } else {
    spinner.style.display = "none";
  }
};

export const addService = async (cart) => {
  const servicesAdded = await postService(cart);

  if (servicesAdded == true) {
    displayAlert(true, numRoom);
    cleanCart();
  }
};

const postService = async (productsToAdd) => {
  const serviceToAdd = {
    idBooking: idBooking,
    numRoom: numRoom,
    option: optionServiceProduct,
    products: productsToAdd,
    amountService: amount
  };

  let resultPOST;
  loading(true);
  try {
    const result = await POSTService(serviceToAdd);
    if (result.error) {
      throw result;
    }
    if (result) {
      resultPOST = result;
    }
  } catch (error) {
    if (error) {
      displayAlert(false, numRoom);
    }
  } finally {
    loading(false);
    return resultPOST;
  }
};

export const refreshShop = async () => {
  let products = await serviceByName(
    optionServiceProduct == "minibar" ? "Minibar" : "Cantina"
  );

  if (products) displayContentShop(products, optionServiceProduct);
};
