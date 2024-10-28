import displayBarStagesAdvance from "./barStageAdvance.js";
import { alertErrorPay } from "./alertsPay.js";
import { inputsAlert } from "./alertsPay.js";

let containItems = document.querySelector(".containItems");
let containAmount = document.querySelector(".amount");
let itemsDiv = document.querySelector(".items");
let controlItems = document.querySelector(".controlItems");
let formPay = document.querySelector("form");
let inputNumberCard = document.getElementById("idNumber");
let inputs = [...formPay.querySelectorAll("input")];

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

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", (input) => {
    switch (input.target.id) {
      case "idNumber":
        let digitEnter = validAloneNumberCard(input.target);

        let numbersCard = removeSpacesCard(input.target.value.trim());

        if (digitEnter && numbersCard.length > 0) {
          if (numbersCard.charAt(0) == "3") {
            document.querySelector("#idNumber").maxLength = 17;

            if (numbersCard.length == 4 || numbersCard.length == 10) {
              validSpacesNumberCard(input.target, 17);
            }
          } else if (numbersCard.length % 4 == 0) {
            document.querySelector("#idNumber").maxLength = 19;
            validSpacesNumberCard(input.target, 19);
          }
        }

        if (numbersCard.length > 13 && numbersCard.length < 19) {
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

      case "idExpire":
        let inputExpire = input.target;
        replaceCharacter(inputExpire);

        if (inputExpire.value.length == 2) {
          inputExpire.value += "/";
        }
        break;

      case "#idPostalCode":
      case "idCvv":
        replaceCharacter(input.target);
        break;
    }
  });
});

const validAloneNumberCard = (input) => {
  let digitEnter = replaceCharacter(input);
  return digitEnter;
};

const validSpacesNumberCard = (input, limit) => {
  if (limit != input.value.length) {
    let newValue = input.value + " ";
    input.value = newValue;
  }
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

document.querySelectorAll(".denySpace").forEach((input) => {
  input.addEventListener("keydown", function (event) {
    event.key == " " ? event.preventDefault() : true;
  });
});

const denyBackspaceCard = (input, event) => {
  if (event.key == "Backspace") {
    if (input.value.charAt(input.selectionStart - 1) == " ") {
      event.preventDefault();
    }
  }
};

inputNumberCard.addEventListener("keydown", function (event) {
  {
    denyBackspaceCard(this, event);
  }
});

const validationsInputs = (value) => {
  const validations = [
    {
      key: "name",
      validation: value !== "",
      msj: "*Ingresa nombre y apellido completos",
    },
    {
      key: "number",
      validation: value.length >= 12 && value.length <= 19,
      msj: "*Ingresa un número de tarjeta entre (12 o 19 digitos)",
    },
    {
      key: "expiration",
      validation: value.length == 5,
      msj: "*Ingresa fecha de vencimiento",
    },
    {
      key: "cvv",
      validation: value.length == 3,
      msj: "*Ingresa CVV (3 digitos)",
    },
    {
      key: "street",
      validation: value !== "",
      msj: "*Ingresa una direccion",
    },
    {
      key: "city",
      validation: value !== "",
      msj: "*Ingresa una ciudad",
    },
    {
      key: "postalCode",
      validation: value.length == 5,
      msj: "*Ingresa un código postal (5 digitos)",
    },
  ];

  return validations;
};

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

const typeCardInputNumber = (numbersCard, option) => {
  let iconCard = null;

  let firstNumber = numbersCard.charAt(0);
  switch (firstNumber) {
    case "3":
      iconCard = "../../../img/amex.png";
      card = "amex";
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

formPay.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(formPay);

  let validate = false;
  const dataPay = {};
  let inputsValidates = [];
  let quantityInputs = inputs.length;

  formData.forEach((value, key) => {
    let inputToAlert = validationsInputs(value).find(
      (validInput) => key == validInput.key && !validInput.validation
    );

    if (inputToAlert) {
      inputsAlert(inputToAlert.key, inputToAlert.msj);
    } else {
      inputsValidates.push({ key: key, value: value });
    }
  });

  if (inputsValidates == quantityInputs) {
    inputsValidates.forEach((inputVal) => {
      dataPay[inputVal.key] = inputVal.value;
    });
    console.log(dataPay);
  }
});

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    input.classList.remove("inputAlert");
  });
});
