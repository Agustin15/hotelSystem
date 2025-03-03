import { getRols } from "../methodsFetch.js";
import { modal } from "../scriptTable.js";
import { closeModal } from "./scriptDelete.js";

let containRols;

export const configAdd = async () => {
  containRols = document.querySelector(".containRols");
  let btnClose = document.querySelector(".btnClose");

  btnClose.addEventListener("click", () => {
    closeModal(modal);
  });

  let rols = await allRols();

  if (rols) {
    displayRols(rols);
  }
};

const allRols = async () => {
  const rols = await getRols();

  if (!rols) {
    containRols.innerHTML = `
      <p>Ups, no se pudieron cargar los roles</p>
    `;
  }

  return rols;
};

const displayRols = (rols) => {
  let rolOptions = rols.map((rol) => {
    return `
      <li>
      ${rol.rol}
      </li>
    `;
  });

  containRols.innerHTML = rolOptions.join("");
};
