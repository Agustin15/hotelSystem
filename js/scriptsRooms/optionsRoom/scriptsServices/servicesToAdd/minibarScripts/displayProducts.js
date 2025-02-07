import { contentMinibar } from "../minibar.js";

export const displayProducts = (productsMinibar) => {
  contentMinibar.innerHTML = `<ul class="products"></ul>`;
  let items = productsMinibar.map((product) => {
    product.quantity = 0;
    return `
           <li class="product">
           <div class="columnOne">
           <div class="name">
           </div>
               <div class="icon">
               <img src="data:image/png;base64,${product.imagen}">
               </div>
               </div>
               <div class="columnTwo">
               <span><a>Stock:</a>${product.maxStock}</span>
               <span><a>Precio:</a>U$S ${product.precio}</span>
               <div class="quantity">
                 <button class="btnMinus">-</button>
                 ${product.quantity}
                  <button class="btnPlus">+</button>
               </div>
               </div>
           </li>
          `;
  });

  document.querySelector(".products").innerHTML = items.join("");
};
