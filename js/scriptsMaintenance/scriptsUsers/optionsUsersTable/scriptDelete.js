import { deleteUser } from "../methodsFetch.js";
import { configTableUsers, modal } from "../scriptTable.js";

let containDelete;

export const configDelete = async (user) => {
  containDelete = document.querySelector(".containDelete");
  let title = containDelete.querySelector(".titleDelete");
  title.textContent = `¿Desea eliminar a usuario ${user.usuario}? `;

  let btnAccept = containDelete.querySelector(".btnAccept");
  let btnCancel = containDelete.querySelector(".btnCancel");

  btnAccept.addEventListener("click", async () => {
    let resultDelete = await userDelete(user.idUsuario);
    if (resultDelete) {
      configTableUsers();
      closeModal();
    }
  });

  btnCancel.addEventListener("click", async () => {
    closeModal(modal);
  });
};

export const userDelete = async (idUser) => {
  let resultDelete;
  try {
    const result = await deleteUser(idUser);
    if (result) {
      resultDelete = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (!resultDelete) {
      errorDelete();
    }
    return resultDelete;
  }
};

const errorDelete = () => {
  containDelete.querySelector(".error").innerHTML = `
   <img src="../../../img/advertenciaDelete.png">
  <span>Ups, no se pudo eliminar el usuario</span>
  `;

};

export const closeModal = (modal) => {
  modal.style.display = "none";
  modal.innerHTML = ``;
};
