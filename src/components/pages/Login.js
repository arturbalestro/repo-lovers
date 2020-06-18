import locales from "../utils/locales";
import formData from "../utils/formData";

const renderInput = (fieldData) => {
  const { label, id, type } = fieldData;
  return (
    '<div class="form-group text-left">' +
    '<label for="' +
    id +
    '">' +
    label +
    "</label>" +
    '<input type="' +
    type +
    '" class="form-control" id="' +
    id +
    '" required>' +
    '<div class="invalid-feedback">' +
    locales.formInvalidError +
    "</div>" +
    "</div>"
  );
};

const renderTextArea = (fieldData) => {
  const { label, id, rows } = fieldData;
  return (
    '<div class="form-group text-left">' +
    '<label for="' +
    id +
    '">' +
    label +
    "</label>" +
    '<textarea class="form-control" id="' +
    id +
    '" rows="' +
    rows +
    '" required></textarea>' +
    '<div class="invalid-feedback">' +
    locales.formInvalidError +
    "</div>" +
    "</div>"
  );
};

window.addEventListener(
  "load",
  function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName("needs-validation");
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  },
  false
);

$("#login-form").submit((event) => {
  console.log("####event", event);
});

const Login = (mainContainer) => {
  mainContainer.append(
    '<div class="offset-md-3 col-md-6 text-center">' +
      '<form class="needs-validation" id="login-form" novalidate onSubmit="SubmitForm()">' +
      renderInput(formData.input.nome) +
      renderInput(formData.input.dataNascimento) +
      renderInput(formData.input.cpf) +
      renderInput(formData.input.celular) +
      renderInput(formData.input.email) +
      renderInput(formData.input.cep) +
      renderInput(formData.input.logradouro) +
      renderInput(formData.input.numero) +
      renderInput(formData.input.complemento) +
      renderInput(formData.input.bairro) +
      renderInput(formData.input.cidade) +
      renderInput(formData.input.uf) +
      renderTextArea(formData.textarea.bio) +
      '<button type="submit" class="btn btn-primary">Submit</button>' +
      "</form>" +
      "</div>"
  );
};

export default Login;
