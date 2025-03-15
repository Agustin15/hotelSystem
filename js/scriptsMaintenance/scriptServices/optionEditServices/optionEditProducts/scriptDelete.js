import { closeModal } from "../../../scriptsUsers/optionsUsersTable/scriptDelete.js";
import BACK_URL_LOCALHOST from "../../../../urlLocalhost.js";
import { displayRows } from "../editProducts.js";

export const configDeleteProduct = (nameService, product, modal) => {
  let containDelete = document.querySelector(".containDelete");
  let titleDelete = document.querySelector(".titleDelete");
  titleDelete.textContent = `¿Desea eliminar el producto ${product.descripcionServicio}?`;

  let btnAccept = containDelete.querySelector(".btnAccept");
  let btnCancel = containDelete.querySelector(".btnCancel");

  btnAccept.addEventListener("click", async () => {
    let resultDelete = await DELETEService(product.idServicio);
    if (resultDelete) {
      closeModal(modal);
      displayRows();
    }
  });

  btnCancel.addEventListener("click", async () => {
    closeModal(modal);
  });
};

const errorDelete = () => {
  containDelete.querySelector(".error").innerHTML = `
     <img src="../../../img/advertenciaDelete.png">
    <span>Ups, no se pudo eliminar el usuario</span>
    `;
};

const DELETEService = async (idService) => {
  let url =
    `${BACK_URL_LOCALHOST}/sistema%20Hotel/routes/admin/servicesRoutes.php?params=` +
    JSON.stringify({ idService: idService });
  let data = null;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    });
    const result = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        invalidAuthentication();
      } else throw result;
    } else if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error.error);
    data = error;
  } finally {
    if (!data) {
      errorDelete();
    }
    return data;
  }
};
