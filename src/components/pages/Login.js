import locales from "../utils/locales";
import formData from "../utils/formData";
import axios from "axios";

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
    getCEPInfo();

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = $(".needs-validation");
    // Loop over them and prevent submission
    let formValues = [];
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        (event) => {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            //TODO Adicionar um router pra trocar de página
          }
          form.classList.add("was-validated");
          //TODO Enviar esses dados pra próxima pagina
          formValues.push(event.target.value);
        },
        false
      );
    });
  },
  false
);

const getCEPInfo = () => {
  $("#registroCEP").blur((e) => {
    //TODO: Add spinner active
    axios
      .get("https://api.postmon.com.br/v1/cep/" + e.target.value)
      .then((response) => {
        const { logradouro, bairro, cidade, estado } = response.data;
        $("#registroLogradouro").val(logradouro);
        $("#registroBairro").val(bairro);
        $("#registroCidade").val(cidade);
        $("#registroUF").val(estado);
        //TODO: Add spinner inactive
      })
      .catch((error) => {
        //TODO: Add spinner inactive
        //TODO: Fix error message display
        alert(locales.cepNotFound);
      });
  });
};

const Login = (mainContainer) => {
  mainContainer.append(
    '<div id="page-login" class="offset-md-3 col-md-6 text-center">' +
      "<h2>" +
      locales.loginTitle +
      "</h2>" +
      '<form class="needs-validation" id="login-form" novalidate>' +
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
      '<button type="submit" class="btn btn-primary">' +
      locales.submitText +
      "</button>" +
      "</form>" +
      "</div>"
  );
};

export default Login;
