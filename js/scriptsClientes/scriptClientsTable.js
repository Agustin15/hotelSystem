let initRegister = 0;
let limitRegister = 1;
let page = 1;
let limitPage;

const getDataClients = async () => {
  let data = null;
  try {
    let url =
      "http://localhost/sistema%20Hotel/controller/admin/cliente/opcionCliente.php?option=clientsTable";
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      data = result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

const displayTable = async () => {
  let table = document.querySelector(".tableClients");
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  let pagesText = document.querySelector(".pageIndex");
  let clients = await getDataClients();

  limitPage = clients.length / 2;

  if (clients) {
    let clientsFilter = clients.filter((client, index) => {
      if (index >= initRegister && index <= limitRegister) {
        return client;
      }
    });

    let dataClients = clientsFilter.map((client, index) => {
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

           <div class="buttons">

            <button class="btnDelete"><img src="../../../img/borrar.png"></button>
                <button class="btnEdit"><img src="../../../img/editar.png"></button>
                    <button class="btnDetails"><img src="../../../img/detalles.png"></button>
            
           </div>
           </td>
      </tr>
     
  
      `;
    });

    table.querySelector("tbody").innerHTML = dataClients.join("");

    pagesText.textContent = `${page}/${limitPage.toFixed(0)}`;

    controls(next, prev);
  }
};

const controls = (next, prev) => {
  next.addEventListener("click", function () {
    if (page < limitPage) {
      initRegister += 2;
      limitRegister += 2;

      page++;
      displayTable();
    }
  });

  prev.addEventListener("click", function () {
    if (page > 1) {
      initRegister -= 2;
      limitRegister -= 2;

      page--;
      displayTable();
    }
  });
};

export default displayTable;
