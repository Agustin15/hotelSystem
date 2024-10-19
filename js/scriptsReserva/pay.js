import displayBarStagesAdvance from "./barStageAdvance.js";

let containItems = document.querySelector(".containItems");
let containAmount = document.querySelector(".amount");
let itemsDiv = document.querySelector(".items");
let controlItems = document.querySelector(".controlItems");

document.addEventListener("DOMContentLoaded", () => {
  displayBarStagesAdvance("#linePersonalData");

  let items = JSON.parse(localStorage.getItem("booking")).rooms;

  printItems(items);

  if (controlItems) {
    controlItems.addEventListener("click", () => {
      if (controlItems.dataset.state == "close") {
        displayItemsRoomAmount();
      } else {
        closeItemsRoomAmount();
      }
    });
  }
});

const printItems = (items) => {
  let divItems = document.querySelector(".items");

  let printItems = items.map((item) => {
    return ` 
   
      <li>
       <img src=data:image/png;base64,${item.images.imageTwo}>
       <div class="body">
      <div class="header">
      <span>Habitacion ${item.category}</span>
      </div>
      <div class="footer">
      <span>U$S ${item.total}</span>
      <span>x${item.quantity}</span>
      </div>
      </div>
      </li>
   `;
  });

  divItems.innerHTML = printItems.join("");
  calculateAmount(items);
};

const calculateAmount = (items) => {
  let amount = items.reduce((ac, item) => {
    return (ac += item.total);
  }, 0);

  document
    .querySelector(".amount")
    .querySelector("span").textContent = `U$S ${amount}`;
};

const displayItemsRoomAmount = () => {
  controlItems.dataset.state = "open";
  controlItems.querySelector("img").src = "../../../img/nextRoom.png";
  containItems.classList.remove("containItemsHide");
  containItems.classList.add("containItemsShow");

  setTimeout(() => {
    containAmount.style.display = "block";
    itemsDiv.style.display = "flex";
  }, 400);
};

const closeItemsRoomAmount = () => {
  controlItems.dataset.state = "close";
  controlItems.querySelector("img").src = "../../../img/prevRoom.png";
  containAmount.style.display = "none";
  itemsDiv.style.display = "none";
  containItems.classList.add("containItemsHide");

  setTimeout(() => {
    containItems.style.display = "none";
    containItems.classList.remove("containItemsShow");
  }, 350);
};
