export const drawForm = (data) => {
  let form = document.querySelector("form");

  form.innerHTML = `

<div class="contentForm">
  <div class="row1">
      <div class="name">

          <label for="inputName">Nombre</label>
          <input type="text" id="inputName" data-ref="nombre"
              autocomplete="off" value=${data.nombre} name="name" placeholder="Ingrese nombre">
          <div class="msjError">
              <img src="../../../img/warningInput.png">
              <span></span>
          </div>
      </div>

      <div class="lastName">

          <label for="inputLastName">Apellido</label>
          <input type="text" id="inputLastName" autocomplete="off" data-ref="apellido" 
          name="lastName" placeholder="Ingrese apellido" value=${data.apellido} >
          <div class="msjError">
              <img src="../../../img/warningInput.png">
              <span></span>
          </div>
      </div>
  </div>


  <div class="row2">
      <div class="phone">

          <label for="inputPhone">Telefono</label>
          <input type="text" id="inputPhone" autocomplete="off" onpaste="return false"
              data-ref="telefono" name="phone" value=${data.telefono}  placeholder="Ingrese telefono">
          <div class="msjError">
              <img src="../../../img/warningInput.png">
              <span></span>
          </div>
      </div>

      <div class="mail">

          <label for="inputMail">Correo</label>
          <input type="text" autocomplete="off" value=${data.correo}  id="inputMail" name="mail"
              data-ref="correo" placeholder="Ingrese correo">

          <div class="msjError"
              <img src="../../../img/warningInput.png">
              <span></span>
          </div>
      </div>
  </div>

  <div class="buttons">

      <button class="btnAdd" type="submit">Actualizar
          <img class="loadingForm" src="../../../img/spinnerBooking.gif"> </button>
      <button type="reset" class="btnClean">Limpiar</button>

  </div>

  <div class="alertForm">

      <img>
      <div class="body">
          <span></span>

          <p></p>
      </div>

  </div>
</div>`;

  let btnClean = document.querySelector(".btnClean");
  btnClean.addEventListener("click", (event) => {
    event.preventDefault();
    cleanInputs(form);
  });
};

const cleanInputs = (form) => {
  let inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
  console.log(inputs);
};
