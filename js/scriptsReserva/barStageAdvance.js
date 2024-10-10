const displayBarStagesAdvance = (idStage) => {
    let containBarStages = document.querySelector(".barStageAdvance");
  
    let itemsStages = [
      { stage: "RoomsSelected", icon: "../img/stageRooms.png" },
      { stage: "PersonalData", icon: "../img/stagePersonalData.png" },
      { stage: "MethodPay", icon: "../img/stagePay.png" },
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
      .querySelector(idStage)
      .querySelector(".progress")
      .classList.add("progressStage");
  
      document.querySelector("#itemRoomsSelected").style.backgroundColor="#0ea7af";
  };

  
 export default displayBarStagesAdvance;