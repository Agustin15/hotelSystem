import { contentMinibar, numRoom } from "../minibar.js";
import { contentBar } from "../bar.js";
import { displayCart, addService } from "./displayCart.js";
import { displayAlert } from "./displayAlert.js";
import { FRONT_URL_LOCALHOST } from "../../../../../urlLocalhost.js";
export let cart = [];
export let amount = 0;
export let productsShop, content, optionServiceProduct;

export const displayContentShop = (products, option) => {
  optionServiceProduct = option;

  if (optionServiceProduct == "minibar") {
    content = contentMinibar;
  } else {
    content = contentBar;
  }

  productsShop = products;
  content.innerHTML = `

  <div class="containOpenCartProducts">
  
    <div class="containNotificationQuantity">
     <span class="notificationQuantity">${cart.length}</span>
    </div>
    <img class="openCartProducts" src="../../../img/cartShopService2.png">
  </div>

  <ul class="products">
  </ul>
  <div class="containCart">
  <div class="titleCart">
   <h3>Carrito</h3>
   <img src="../../../img/cartService.png">
   </div>
   <ul class="items"></ul>
   <div class="totalCart">
   <div class="rowTotalCart">
   <img src="../../../img/amountService.png">
   <span></span>
   </div>
   <button class="btnAddService">
   Agregar servicio
   <img src="../../../img/spinnerBooking.gif">
   </button>
   </div>

  `;

  closeAndOpenCart();
  displayProducts();
  let btnAddService = document.querySelector(".btnAddService");
  btnAddService.addEventListener("click", async () => {
    addService(cart);
  });
};

const closeAndOpenCart = () => {
  let openCart = document.querySelector(".openCartProducts");
  let cart = document.querySelector(".containCart");

  openCart.addEventListener("click", () => {
    if (openCart.src == `${FRONT_URL_LOCALHOST}img/cartShopService2.png`) {
      openCart.src = `${FRONT_URL_LOCALHOST}img/cartShopService.png`;
      cart.classList.remove("cartHide");
      cart.classList.add("cartShow");
      cart.style.display = "flex";
    } else {
      openCart.src = `${FRONT_URL_LOCALHOST}img/cartShopService2.png`;
      cart.classList.add("cartHide");
      setTimeout(function () {
        cart.style.display = "none";
      }, 200);
    }
  });
};

const displayProducts = () => {
  let items = productsShop.map((product) => {
    if (!product.quantity) {
      product.quantity = 0;
    }
    return `
           <li class="product">
            <span title="${product.descripcionServicio}" class="name">${
      product.descripcionServicio
    }</span>
           <div class="rowProduct" id=${product.idServicio}>
           <div class="columnOne">
               <div class="icon">
               <img class=${
                 product.maxStock == 0 ? "noStock" : "stockAvailable"
               } src="data:image/png;base64,${product.imagen}">
               </div>
               </div>
               <div class="columnTwo">
               <span><a>Stock:</a>${product.maxStock}</span>
               <span><a>Precio:</a>U$S ${product.precio}</span>
               <div class="containQuantity">
                 <button class="btnMinus ${
                   product.maxStock == 0 ? "noStock" : "stockAvailable"
                 }"  ${product.maxStock == 0 ? "disabled" : ""}>-</button>
                 <a class="quantity">${product.quantity}</a>
                  <button class="btnPlus ${
                    product.maxStock == 0 ? "noStock" : "stockAvailable"
                  }"  ${product.maxStock == 0 ? "disabled" : ""}>+</button>
               </div>
               <button class="btnAdd ${
                 product.maxStock == 0 ? "noStock" : "stockAvailable"
               }"  ${product.maxStock == 0 ? "disabled" : ""}>Agregar
               <img src="../../../img/addService.png">
               </button>
               </div>
               </div>
           </li>
          `;
  });

  document.querySelector(".products").innerHTML = items.join("");

  document.querySelectorAll(".btnMinus").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeQuantity("subtract", btn);
    });
  });

  document.querySelectorAll(".btnPlus").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeQuantity("add", btn);
    });
  });

  document.querySelectorAll(".btnAdd").forEach((btn) => {
    btn.addEventListener("click", () => {
      let itemProduct = btn.parentElement.parentElement;
      let productId = itemProduct.id;
      let productFinded = findProductOfShop(productId);
      let elementQuantity = itemProduct.querySelector(".quantity");
      let quantity = elementQuantity.textContent;

      if (parseInt(quantity) == 0) {
        displayAlert(false, numRoom, "Ingresa una cantidad valida");
      } else {
        const productToCart = {
          id: cart.length + 1,
          idService: productFinded.idServicio,
          name: productFinded.descripcionServicio,
          icon: productFinded.imagen,
          quantity: parseInt(quantity),
          price: productFinded.precio,
          total: productFinded.precio * quantity
        };
        addToCart(productToCart);
      }
    });
  });

  displayCart();
};

const changeQuantity = (option, btn) => {
  let itemProduct = btn.parentElement.parentElement.parentElement;
  let productId = itemProduct.id;
  let productFinded = findProductOfShop(productId);

  if (option == "subtract") {
    if (productFinded.quantity > 0) {
      productFinded.quantity = productFinded.quantity - 1;
      displayProducts();
    }
  } else {
    if (productFinded.quantity < productFinded.maxStock) {
      productFinded.quantity = productFinded.quantity + 1;
      displayProducts();
    }
  }
};

const findProductOfShop = (id) => {
  return productsShop.find((product) => product.idServicio == id);
};

const findProductInCartByName = (nameService) => {
  return cart.find((item) => item.name == nameService);
};

const findProductInCartById = (idItem) => {
  return cart.find((item) => item.id == idItem);
};

const addToCart = (productToCart) => {
  let productInCart = findProductInCartByName(productToCart.name);
  let productFound = findProductOfShop(productToCart.idService);

  if (productInCart) {
    if (
      productInCart.quantity + productToCart.quantity <=
      productFound.maxStock + productInCart.quantity
    ) {
      productInCart.quantity += productToCart.quantity;
      productInCart.total = productInCart.price * productInCart.quantity;
      itemAddedToCart(productToCart);
    }
  } else {
    cart.push(productToCart);
    itemAddedToCart(productToCart);
  }
};

const itemAddedToCart = (productToCart) => {
  let productFound = findProductOfShop(productToCart.idService);
  productFound.maxStock -= productToCart.quantity;
  productFound.quantity = 0;
  displayProducts();
};

export const deleteToCart = (idItem) => {
  let itemCartFound = findProductInCartById(idItem);
  let productFound = findProductOfShop(itemCartFound.idService);
  productFound.maxStock += itemCartFound.quantity;
  cart = cart.filter((item) => item.id != idItem);
  displayProducts();
};

export const subtractQuantityCart = (idItem) => {
  let itemInCart = findProductInCartById(idItem);
  let productFound = findProductOfShop(itemInCart.idService);

  if (itemInCart.quantity > 0) {
    itemInCart.quantity = itemInCart.quantity - 1;
    itemInCart.total = itemInCart.price * itemInCart.quantity;
    productFound.maxStock += 1;
    displayProducts();
  }
};

export const addQuantityCart = (idItem) => {
  let itemInCart = findProductInCartById(idItem);
  let productFound = findProductOfShop(itemInCart.idService);
  if (itemInCart.quantity < productFound.maxStock + itemInCart.quantity) {
    itemInCart.quantity = itemInCart.quantity + 1;
    itemInCart.total = itemInCart.price * itemInCart.quantity;
    productFound.maxStock -= 1;
    displayProducts();
  }
};

export const calculateTotalAmount = () => {
  amount = cart.reduce((ac, item) => {
    return (ac += item.total);
  }, 0);

  let elementAmount = document.querySelector(".totalCart");
  let spanAmount = elementAmount.querySelector("span");
  spanAmount.textContent = `Total:U$S ${amount}`;

  if (amount > 0) {
    elementAmount.style.display = "flex";
  } else {
    elementAmount.style.display = "none";
  }
};

export const cleanCart = (option) => {
  cart = [];
  if (option != "toCloseWindow") {
    displayCart();
  }
};
