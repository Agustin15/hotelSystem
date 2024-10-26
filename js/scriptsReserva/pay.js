import displayBarStagesAdvance from "./barStageAdvance.js";
import { alertErrorPay } from "./alertsPay.js";
import { inputsAlert } from "./alertsPay.js";

let containItems = document.querySelector(".containItems");
let containAmount = document.querySelector(".amount");
let itemsDiv = document.querySelector(".items");
let controlItems = document.querySelector(".controlItems");
let formPay = document.querySelector("form");
let validCard;

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
      img: "../../../img/openCart.png",
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

document.querySelectorAll(".denyBackSpace").forEach((input) => {
  input.addEventListener("keydown", function (event) {
    event.key == " " ? event.preventDefault() : true;
  });
});

const eventInputs = (idInput, lengthMax) => {
  document.querySelector(idInput).maxLength = lengthMax;
  document.querySelector(idInput).addEventListener("input", function (input) {
    switch (idInput) {
      case "#idNumber":
        let digitEnter = validAloneNumberCard(input.target);

        let numbersCard = removeSpacesCard(input.target.value.trim());

        if (
          digitEnter &&
          numbersCard.length > 0 &&
          numbersCard.length % 4 == 0
        ) {
          validSpacesNumberCard(input.target);
        }

        if (numbersCard.length == 16) {
          validCard = algoritmLuhnCard(numbersCard);
          if (!validCard) {
            inputsAlert("number", "*N° de Tarjeta ingresado incorrecto");
          } else {
            typeCardInputNumber(numbersCard);
          }
        } else {
          document.querySelector("#idNumber").style.backgroundImage =
            "url('../../../img/iconCardForm.png')";
        }
        break;

      case "#idExpire":
        let inputExpire = input.target;
        replaceCharacter(inputExpire);

        if (inputExpire.value.length == 2) {
          inputExpire.value += "/";
        }
        break;

      case "#idCvv":
        replaceCharacter(input.target);

        break;

      case "#idPostalCode":
        replaceCharacter(input.target);

        break;
    }
  });
};

eventInputs("#idNumber", 19);
eventInputs("#idExpire", 5);
eventInputs("#idCvv", 3);
eventInputs("#idPostalCode", 5);

formPay.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(formPay);

  let validate = false;
  const dataPay = {};

  const validationsInputs = [
    {
      key: "number",
      validation: 19,
      msj: "Ingresa un número de tarjeta entre (12 o 19 digitos)",
    },
    {
      key: "expiration",
      validation: 5,
      msj: "Ingresa una fecha de vencimiento válida",
    },
    {
      key: "cvv",
      validation: 3,
      msj: "Ingresa CVV (3 digitos)",
    },
    {
      key: "postalCode",
      validation: 5,
      msj: "Ingresa un código postal (5 digitos)",
    },
  ];

  formData.forEach((value, key) => {

      let inputToAlert = validationsInputs.find(
        (validInput) =>
          validInput.key == key && value.length < validInput.validation
      );

      if (inputToAlert) {
        inputsAlert(inputToAlert.key,inputToAlert.msj);
        return;
      } else {
        dataPay[key] = value.trim();
        validate=true;
      }
    
  });

  if(validate){
    console.log(dataPay);
  }
  
});

let inputs = [...formPay.querySelectorAll("input")];

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    input.classList.remove("inputAlert");
  });
});

const removeSpacesCard = (value) => {
  let array = Array.from(value);

  let numberCard = array.reduce((ac, number) => {
    number !== " " ? (ac += number) : ac;
    return ac;
  }, 0);

  return numberCard.toString().substring(1, numberCard.length);
};

const algoritmLuhnCard = (value) => {
  let valid = false;
  let arrayNumbers = Array.from(value);
  let total = arrayNumbers.reduce((ac, number, index) => {
    let numberCard = parseInt(number);

    if ((index + 1) % 2 != 0) {
      if (numberCard * 2 > 9) {
        let digitOne = parseInt((numberCard * 2).toString().charAt(0));
        let digitTwO = parseInt((numberCard * 2).toString().charAt(1));
        ac += digitOne + digitTwO;
      } else {
        ac += numberCard * 2;
      }
    } else {
      ac += numberCard * 1;
    }

    return ac;
  }, 0);

  if (total % 10 == 0) {
    valid = true;
  }

  return valid;
};

const typeCardInputNumber = (numbersCard) => {
  let iconCard = null;

  let firstNumber = numbersCard.charAt(0);
  switch (firstNumber) {
    case "3":
      iconCard = "../../../img/amex.png";
      break;
    case "4":
      iconCard = "../../../img/visa.png";
      break;

    case "5":
      iconCard = "../../../img/mastercard.png";
      break;

    case "6":
      iconCard = "../../../img/discover.png";
      break;
  }

  document.querySelector(
    "#idNumber"
  ).style.backgroundImage = ` url(${iconCard})`;
};
