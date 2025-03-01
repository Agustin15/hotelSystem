const displayBarStagesAdvance = (lineStage) => {
  let containBarStages = document.querySelector(".barStageAdvance");

  let itemsStages = [
    {
      stage: "RoomsSelected",
      icon: "http://localhost/sistema%20Hotel/img/stageRooms.png"
    },
    {
      stage: "PersonalData",
      icon: "http://localhost/sistema%20Hotel/img/stagePersonalData.png"
    },
    {
      stage: "BookingReady",
      icon: "http://localhost/sistema%20Hotel/img/stageBookingReady.png"
    }
  ];

  let displayBarStages = itemsStages.map((itemStage) => {
    let line = `<div id="line${itemStage.stage}" class="line">
      <div class="progress">
      </div>
      </div>`;

    itemStage.stage == "BookingReady" ? (line = ``) : false;

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
  switch (true) {
    case window.location.href.indexOf("detalles.html") > -1:
      completeStages = [
        "#itemRoomsSelected",
        "#lineRoomsSelected",
        "#itemPersonalData",
        "#itemBookingReady"
      ];

      break;

      case window.location.href.indexOf("datosCliente.html") > -1:
      completeStages = ["#itemRoomsSelected"];

      break;
  }

  return completeStages;
}

function completeStages(stagesToComplete) {
  stagesToComplete.forEach((element) => {
    document.querySelector(element).style.background =
      "linear-gradient(#126b91, #0498a0)";
  });
}

export default displayBarStagesAdvance;
