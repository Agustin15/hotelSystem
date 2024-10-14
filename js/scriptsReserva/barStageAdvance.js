const displayBarStagesAdvance = (lineStage) => {
  let containBarStages = document.querySelector(".barStageAdvance");

  let itemsStages = [
    {
      stage: "RoomsSelected",
      icon: "http://localhost/sistema%20Hotel/img/stageRooms.png",
    },
    {
      stage: "PersonalData",
      icon: "http://localhost/sistema%20Hotel/img/stagePersonalData.png",
    },
    {
      stage: "MethodPay",
      icon: "http://localhost/sistema%20Hotel/img/stagePay.png",
    },
  ];

  let displayBarStages = itemsStages.map((itemStage) => {
    let line = `<div id="line${itemStage.stage}" class="line">
      <div class="progress">
      </div>
      </div>`;

    itemStage.stage == "MethodPay" ? (line = ``) : false;

    return `<div id="item${itemStage.stage}" class="itemStage">
     
      <img src=${itemStage.icon}>
    
       </div>
      ${line}`;
  });

  containBarStages.innerHTML = displayBarStages.join("");

  document
    .querySelector(lineStage)
    .querySelector(".progress")
    .classList.add("progressStage");

  let stagesToComplete = definedCompleteBars();

  completeStages(stagesToComplete);
};

function definedCompleteBars() {
  let completeStages;
  switch (window.location.href) {
    case "http://localhost/sistema%20Hotel/views/reserva/pay/public/checkout.html":
      completeStages = ["#itemRoomsSelected","#lineRoomsSelected","#itemPersonalData"];

      break;

    case "http://localhost/sistema%20Hotel/views/reserva/datosCliente.php":
      completeStages = ["#itemRoomsSelected"];

      break;
  }

  return completeStages;
}



function completeStages(stagesToComplete) {
  stagesToComplete.forEach((element) => {
    document.querySelector(element).style.background = "linear-gradient(#126b91, #0498a0)";
  });
}

export default displayBarStagesAdvance;
