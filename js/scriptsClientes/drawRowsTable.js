import { getDataLimitClients, optionsClient,getClientById } from "./scriptClientsTable.js";

export const drawRowsTable = async (option, table,idClient) => {
  let clients;

  if (option == "clients") {
    let clientsLimit = await getDataLimitClients();
    clients = clientsLimit;
  } else {
    let clientFound = await getClientById(idClient);
    clients = [clientFound];
  }

  if (clients) {
    table.classList.remove("tableClientsNoData");
    let dataClients = clients.map((client, index) => {
      let classRow;
      if (index % 2 == 0) {
        classRow = "trGray";
      }

      return `
  
  <tr class=${classRow}>
   <td class="tdId">
   <div class="idClient">
   ${client.idCliente}
          <img src="../../../img/usuarioTable.png">
   </div>
   </td>
    <td>${client.nombre}</td>
     <td>${client.apellido}</td>
      <td>${client.telefono}</td>
       <td>${client.correo}</td>
       <td class="tdOptions">

       <div class="buttons" id=${client.idCliente}>

        <button class="btnDelete"><img src="../../../img/borrar.png"></button>
            <button class="btnEdit"><img src="../../../img/editar.png"></button>
                <button class="btnDetails"><img src="../../../img/detalles.png"></button>
        
       </div>
       </td>
  </tr>
 

  `;
    });

    table.querySelector("tbody").innerHTML = dataClients.join("");
    optionsClient();
  }
};
