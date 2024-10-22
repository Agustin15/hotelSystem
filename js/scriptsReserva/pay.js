import displayBarStagesAdvance from "./barStageAdvance.js";

let containItems = document.querySelector(".containItems");
let containAmount = document.querySelector(".amount");
let itemsDiv = document.querySelector(".items");
let controlItems = document.querySelector(".controlItems");
let lengthNumberCard = 0;

document.addEventListener("DOMContentLoaded", () => {
  displayBarStagesAdvance("#linePersonalData");

  let items = JSON.parse(localStorage.getItem("booking")).rooms;

  printItems(items);

  if (controlItems) {
    controlItems.addEventListener("click", () => {
      displayItemsRoomAmount(controlItems.dataset.state);
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

const displayItemsRoomAmount = (state) => {
  let propsDisplayItems;
  if (state == "close") {
    propsDisplayItems = {
      img: "../../../img/closeCart.png",
      classToRemove: "containItemsHide",
      classToAdd: "containItemsShow",
      containAmountDisplay: "block",
      itemsDivDisplay: "flex",
      stateDisplay: "open",
    };
  } else {
    propsDisplayItems = {
      img: "../../../img/closeCart.png",
      classToRemove: "containItemsShow",
      classToAdd: "containItemsHide",
      containAmountDisplay: "none",
      itemsDivDisplay: "none",
      stateDisplay: "close",
    };
  }

  propsItemsRoomAmount(propsDisplayItems);
};

function propsItemsRoomAmount(propsDisplayItems) {
  controlItems.querySelector("img").src = propsDisplayItems.img;
  containItems.classList.add(propsDisplayItems.classToAdd);

  setTimeout(() => {
    containAmount.style.display = propsDisplayItems.containAmountDisplay;
    itemsDiv.style.display = propsDisplayItems.itemsDivDisplay;
    containItems.classList.remove(propsDisplayItems.classToRemove);
    controlItems.dataset.state = propsDisplayItems.stateDisplay;
  }, 200);
}

document
  .querySelector("#idNumber")
  .addEventListener("input", (input) => {
    let digitEnter = validAloneNumberCard(input.target);

    lengthNumberCard = [...input.target.value.trim()].reduce((ac, char) => {
      char == "" || char == " " ? ac : ac++;
      return ac;
    }, 0);

    if (digitEnter && lengthNumberCard > 0 && lengthNumberCard % 4 == 0) {
      validSpacesNumberCard(input.target);
    }
  });

const validAloneNumberCard = (input) => {
  let digitEnter = replaceCharacter(input);
  return digitEnter;
};

const validSpacesNumberCard = (input) => {
  let newValue = input.value + " ";
  input.value = newValue;
};

function replaceCharacter(input) {
  let digitEnter = true;
  let ultimateCharacter = input.value
    .trim()
    .charAt(input.value.trim().length - 1);

  let valid = /\d/;
  if (!ultimateCharacter.match(valid)) {
    let newValue = input.value.replace(ultimateCharacter, "");
    input.value = newValue;
    digitEnter = false;
  }

  if (input.id == "idNumber") {
    return digitEnter;
  }
}

document.querySelector("#idExpire").addEventListener("input", function(input) {


  console.log(input.target);
  let inputExpire=input.target;
  replaceCharacter(inputExpire);

  // if (inputExpire.value.length >5) {
   
  
  // }

  if (inputExpire.value.length == 2) {
    inputExpire.value += "/";
  }
});
