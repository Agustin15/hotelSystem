import { inputAlert } from "../../scriptsClientes/scriptAddClient.js";
import { getAllClients } from "../../scriptsClientes/scriptClientsTable.js";

export const configFormAddBooking = async (startBooking, endBooking) => {
  let form = document.querySelector("form");

  const clients = await getClients();

  if (clients) {
    form.style.display = "flex";
    displayClients(form, clients);
    setStartAndEndInputs(startBooking, endBooking, form);
    formAddSubmit(form);
  } else {
    form.style.display = "none";
    noData();
  }
};

const setStartAndEndInputs = async (startBooking, endBooking, form) => {
  let startInput = form.querySelector("#startInput");
  let endInput = form.querySelector("#endInput");

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  startBooking = new Date(startBooking);
  endBooking = new Date(endBooking);

  startInput.value = startBooking.toLocaleDateString("es-ar", options);
  endInput.value = endBooking.toLocaleDateString("es-ar", options);
};

const displayClients = async (form, clients) => {
  let select = form.querySelector("select");

  let clientsOptions = clients.map((client) => {
    return ` 
       <option value=${client.idCliente}>${client.nombre} ${client.apellido}(${client.correo})</option>   
   
   `;
  });

  select.innerHTML = clientsOptions.join("");
};

const getClients = async () => {
  loading(true);
  let data = null;
  try {
    const clients = await getAllClients();
    if (clients) {
      data = clients;
    } else {
      throw "Ups, no se pudieron cargar los clientes para la reserva";
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
    return data;
  }
};

const formAddSubmit = (form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const booking = {};
    let error;

    formData.forEach((value, key) => {
      if (key == "roomsQuantity" && value.length == 0) {
        return (error = {
          key: key,
          msj: "Elija al menos una habitacion para la reserva",
        });
      } else {
        booking[key] = value;
      }
    });

    if (error) {
      inputAlert(error);
    }
  });
};

const loading = (state) => {
  let loading = document.querySelector(".loading");

  if (state) {
    loading.style.display = "flex";
  } else {
    loading.style.display = "none";
  }
};

const noData = (error) => {
  let containNoData = document.querySelector(".noDataFormAdd");

  containNoData.display = "flex";
  containNoData.querySelector("h3").textContent = error;
};
