import getDataClientsTOGraphic from "./scriptGraficaCliente.js";

let option = document.querySelector(".option");

document.addEventListener("DOMContentLoaded", () => {
  getChartDocument();
});
const getChartDocument = async () => {
  const response = await fetch("grafica.php");

  const result = await response.text();

  option.innerHTML = result;

  getDataClientsTOGraphic();
};
