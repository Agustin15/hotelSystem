const inputAlert = (inputError) => {
  let namesInputs = [...document.getElementsByName(inputError.key)];
  let input = namesInputs[0];

  input.classList.add("inputAlert");
  

  removeAlertInputs();
};

const removeAlertInputs = () => {
  document.querySelectorAll("input").
    forEach((input) => {
      input.addEventListener("click", () => {
        input.classList.remove("inputAlert");
      });
    });
};

const submitAddForm = () => {
  let form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const client = {};
    let inputsCorrects = [];
    let formData = new FormData(event.target);

    formData.forEach((v, k) => {
      let inputToAlert = validations(v).find(
        (valid) => k == valid.key && !valid.validation
      );

      if (inputToAlert) {
        inputAlert(inputToAlert);
      } else {
        inputsCorrects.push({ k: v });
      }
    });
  });
};

const validations = (value) => {
  let validRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

  let validations = [
    {
      key: "name",
      validation: value.length > 0,
      msj: "Complete el campo nombre",
    },
    {
      key: "lastName",
      validation: value.length > 0,
      msj: "Complete el campo apellido",
    },
    {
      key: "phone",
      validation: value.length >= 8 && value.length <= 9,
      msj: "Ingresa un telefono válido",
    },
    {
      key: "mail",
      validation: value.match(validRegex),
      msj: "Ingresa un correo válido",
    },
  ];

  return validations;
};
export default submitAddForm;
