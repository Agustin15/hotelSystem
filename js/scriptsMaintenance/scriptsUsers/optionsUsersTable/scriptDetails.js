import { modal } from "../scriptTable.js";
import { closeModal } from "./scriptDelete.js";

export const configDetails = async (user) => {
  let btnClose = document.querySelector(".btnClose");

  btnClose.addEventListener("click", () => {
    closeModal(modal);
  });

  if (user) {
    displayDetails(user);
  } else {
    noData();
  }
};

const displayDetails = (user) => {
  let details = document.querySelector(".details");

  let creationDate = new Date(user.creacion);

  creationDate = creationDate.toLocaleDateString("es-UY", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  details.innerHTML = `
  
   <div class="avatar">
   <img src="data:image/png;base64,${user.imagen}">
    <h3>${user.usuario}</h3>
   </div>

   <div class="column">
     <a>Se unio el ${creationDate}</a>
    <span>Nombre: <a>${user.nombre}</a></span>
     <span>Apellido: <a>${user.apellido}</a></span>
    <span>Rol: <a>${user.rol}</a></span>
    <span>Correo: <a>${user.correo}</a></span>  
   </div>

  `;
};

const noData = () => {
  let details = document.querySelector(".details");

  details.innerHTML = ` 
     <div class="noDataUser"> 
     <img src="../../../img/sinDatos.png">
     <h3>Ups no se pudo cargar el usuario</h3>
     </div>
  `;
};
