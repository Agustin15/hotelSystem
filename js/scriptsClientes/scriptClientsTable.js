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
  let clients = await getDataClients();

  if (clients) {

    let dataClients= clients.map(client=>{

        
    });
  }
};
