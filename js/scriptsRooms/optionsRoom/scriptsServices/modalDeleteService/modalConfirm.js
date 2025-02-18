export let footerModal;

export const modalConfirmDelete = async (service, modal) => {
  modal.innerHTML = `
     <div class="confirmDelete">
       <img src="../../../img/borrarAlerta.png">
  
       <p>¿Deseas eliminar ${
         service.nombreServicio == "Masajes" ||
         service.nombreServicio == "Telefono"
           ? `"Servicio ${service.nombreServicio}`
           : `${service.nombreServicio}(${service.descripcionServicio})`
       }"?</p>
  
       <div class="options">
       <button class="btnConfirm">Confirmar</button>
       <button class="btnCancel">Cancelar</button>
     </div>
           <div class="footer"></div>
  
       </div>
  
    `;

  modal.style.display = "flex";

  let btnConfirm = document.querySelector(".btnConfirm");
  let btnCancel = document.querySelector(".btnCancel");
  footerModal = modal.querySelector(".footer");
  return new Promise((resolve) => {
    btnConfirm.addEventListener("click", () => {
      resolve(true);
    });

    btnCancel.addEventListener("click", () => {
      resolve(false);
    });
  });
};
