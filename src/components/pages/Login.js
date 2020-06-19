import locales from "../utils/locales";
import formData from "../utils/formData";
import axios from "axios";

const renderInput = (fieldData) => {
  const { label, id, type, value, required } = fieldData;
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
    '" value="' +
    value +
    '" ' +
    required +
    ">" +
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
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        (event) => {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            //TODO Improve the session storing logic
            // Save form data to sessionStorage
            const currentForm = $(event.target);

            sessionStorage.setItem(
              "registroNome",
              currentForm.find("#registroNome").val()
            );
            sessionStorage.setItem(
              "registroUsuarioGithub",
              currentForm.find("#registroUsuarioGithub").val()
            );
            sessionStorage.setItem(
              "registroDataNascimento",
              currentForm.find("#registroDataNascimento").val()
            );
            sessionStorage.setItem(
              "registroCPF",
              currentForm.find("#registroCPF").val()
            );
            sessionStorage.setItem(
              "registroCelular",
              currentForm.find("#registroCelular").val()
            );
            sessionStorage.setItem(
              "registroEmail",
              currentForm.find("#registroEmail").val()
            );
            sessionStorage.setItem(
              "registroCEP",
              currentForm.find("#registroCEP").val()
            );
            sessionStorage.setItem(
              "registroNumero",
              currentForm.find("#registroNumero").val()
            );
            sessionStorage.setItem(
              "registroComplemento",
              currentForm.find("#registroComplemento").val()
            );
            sessionStorage.setItem(
              "registroLogradouro",
              currentForm.find("#registroLogradouro").val()
            );
            sessionStorage.setItem(
              "registroBairro",
              currentForm.find("#registroBairro").val()
            );
            sessionStorage.setItem(
              "registroCidade",
              currentForm.find("#registroCidade").val()
            );
            sessionStorage.setItem(
              "registroUF",
              currentForm.find("#registroUF").val()
            );
            sessionStorage.setItem(
              "registroBio",
              currentForm.find("#registroBio").val()
            );
          }
          form.classList.add("was-validated");
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
        console.log(locales.cepNotFound);
      });
  });
};

const Login = (mainContainer) => {
  mainContainer.append(
    '<div id="page-login" class="offset-md-3 col-md-6 text-center">' +
      "<h2>" +
      locales.loginTitle +
      "</h2>" +
      '<form action="/repo-list.html" method="get" class="needs-validation" id="login-form" novalidate>' +
      renderInput(formData.input.nome) +
      renderInput(formData.input.usuarioGithub) +
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
