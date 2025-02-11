import { contentMinibar } from "../minibar.js";
import { displayCart } from "./displayCart.js";
export let cart = [];

export const displayContentMinibar = (productsMinibar) => {
  contentMinibar.innerHTML = `
  <ul class="products">
  </ul>
  <div class="containCart">
  <div class="titleCart">
   <h3>Carrito</h3>
   <img src="../../../img/cartService.png">
   </div>
   <ul class="items"></ul>
   <div class="totalCart">
   <img src="../../../img/amountService.png">
   <span></span>
   </div>
  `;

  displayProducts(productsMinibar);
};

const displayProducts = (productsMinibar) => {
  let items = productsMinibar.map((product) => {
    if (!product.quantity) {
      product.quantity = 0;
    }

    return `
           <li class="product">
            <span title="${product.descripcionServicio}" class="name">${product.descripcionServicio}</span>
           <div class="rowProduct" id=${product.idServicio}>
           <div class="columnOne">
               <div class="icon">
               <img src="data:image/png;base64,${product.imagen}">
               </div>
               </div>
               <div class="columnTwo">
               <span><a>Stock:</a>${product.maxStock}</span>
               <span><a>Precio:</a>U$S ${product.precio}</span>
               <div class="containQuantity">
                 <button class="btnMinus">-</button>
                 <a class="quantity">${product.quantity}</a>
                  <button class="btnPlus">+</button>
               </div>
               <button class="btnAdd">Agregar
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
      changeQuantity(productsMinibar, "subtract", btn);
    });
  });

  document.querySelectorAll(".btnPlus").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeQuantity(productsMinibar, "add", btn);
    });
  });

  document.querySelectorAll(".btnAdd").forEach((btn) => {
    btn.addEventListener("click", () => {
      let itemProduct = btn.parentElement.parentElement;
      let productId = itemProduct.id;
      let productFinded = findProductOfMinibar(productId, productsMinibar);
      let elementQuantity = itemProduct.querySelector(".quantity");
      let quantity = elementQuantity.textContent;

      const productToCart = {
        id: cart.length + 1,
        idService: productFinded.idServicio,
        name: productFinded.descripcionServicio,
        icon: productFinded.imagen,
        quantity: parseInt(quantity),
        maxStock: productFinded.maxStock,
        price: productFinded.precio,
        total: productFinded.precio * quantity,
      };
      addToCart(productToCart, productsMinibar);
    });
  });

  displayCart();
};

const changeQuantity = (productsMinibar, option, btn) => {
  let itemProduct = btn.parentElement.parentElement.parentElement;
  let productId = itemProduct.id;
  let productFinded = findProductOfMinibar(productId, productsMinibar);

  if (option == "subtract") {
    if (productFinded.quantity > 0) {
      productFinded.quantity = productFinded.quantity - 1;
      displayProducts(productsMinibar);
    }
  } else {
    if (productFinded.quantity < productFinded.maxStock) {
      productFinded.quantity = productFinded.quantity + 1;
      displayProducts(productsMinibar);
    }
  }
};

const findProductOfMinibar = (id, productsMinibar) => {
  return productsMinibar.find((product) => product.idServicio == id);
};

const findProductInCartByName = (nameService) => {
  return cart.find((item) => item.name == nameService);
};

const findProductInCartById = (idItem) => {
  return cart.find((item) => item.id == idItem);
};

const addToCart = (productToCart, productsMinibar) => {
  let productInCart = findProductInCartByName(productToCart.name);

  if (productInCart) {
    if (
      productInCart.quantity + productToCart.quantity <
      productToCart.maxStock
    ) {
      productInCart.quantity += productToCart.quantity;
      productInCart.total = productInCart.price * productInCart.quantity;
      itemAddedToCart(productToCart.idService, productsMinibar);
    }
  } else {
    cart.push(productToCart);
    itemAddedToCart(productToCart.idService, productsMinibar);
  }
};

const itemAddedToCart = (idService, productsMinibar) => {
  let productToCleanQuantity = findProductOfMinibar(idService, productsMinibar);

  productToCleanQuantity.quantity = 0;
  displayProducts(productsMinibar);
};

export const deleteToCart = (idItem) => {
  cart = cart.filter((item) => item.id != idItem);
  displayCart();
};

export const subtractQuantityCart = (idItem) => {
  let itemInCart = findProductInCartById(idItem);
  if (itemInCart.quantity > 0) {
    itemInCart.quantity = itemInCart.quantity - 1;
    itemInCart.total = itemInCart.price * itemInCart.quantity;
    displayCart();
  }
};

export const addQuantityCart = (idItem) => {
  let itemInCart = findProductInCartById(idItem);
  if (itemInCart.quantity < itemInCart.maxStock) {
    itemInCart.quantity = itemInCart.quantity + 1;
    itemInCart.total = itemInCart.price * itemInCart.quantity;
    displayCart();
  }
};

export const calculateTotalAmount = () => {
  let amount = cart.reduce((ac, item) => {
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
