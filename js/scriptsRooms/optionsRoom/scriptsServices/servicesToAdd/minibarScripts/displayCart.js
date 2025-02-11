import {
  cart,
  deleteToCart,
  subtractQuantityCart,
  addQuantityCart,
  calculateTotalAmount,
} from "./displayProducts.js";

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
