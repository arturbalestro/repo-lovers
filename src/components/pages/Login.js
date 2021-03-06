import axios from "axios";
import datepicker from "js-datepicker";

import locales from "../utils/locales";
import formData from "../utils/formData";
import { renderInput, renderTextArea } from "../utils/formFieldRenderer";
import maskInput from "../utils/maskInput";
import spinner from "../utils/spinner";

const { input, textarea } = formData;

const saveSession = (currentForm) => {
  sessionStorage.setItem(
    input.nome.id,
    currentForm.find("#" + input.nome.id).val()
  );
  sessionStorage.setItem(
    input.usuarioGithub.id,
    currentForm.find("#" + input.usuarioGithub.id).val()
  );
  sessionStorage.setItem(
    input.dataNascimento.id,
    currentForm.find("#" + input.dataNascimento.id).val()
  );
  sessionStorage.setItem(
    input.cpf.id,
    currentForm.find("#" + input.cpf.id).val()
  );
  sessionStorage.setItem(
    input.celular.id,
    currentForm.find("#" + input.celular.id).val()
  );
  sessionStorage.setItem(
    input.email.id,
    currentForm.find("#" + input.email.id).val()
  );
  sessionStorage.setItem(
    input.cep.id,
    currentForm.find("#" + input.cep.id).val()
  );
  sessionStorage.setItem(
    input.numero.id,
    currentForm.find("#" + input.numero.id).val()
  );
  sessionStorage.setItem(
    input.complemento.id,
    currentForm.find("#" + input.complemento.id).val()
  );
  sessionStorage.setItem(
    input.logradouro.id,
    currentForm.find("#" + input.logradouro.id).val()
  );
  sessionStorage.setItem(
    input.bairro.id,
    currentForm.find("#" + input.bairro.id).val()
  );
  sessionStorage.setItem(
    input.cidade.id,
    currentForm.find("#" + input.cidade.id).val()
  );
  sessionStorage.setItem(
    input.uf.id,
    currentForm.find("#" + input.uf.id).val()
  );
  sessionStorage.setItem(
    textarea.bio.id,
    currentForm.find("#" + textarea.bio.id).val()
  );
};

window.addEventListener(
  "load",
  function () {
    maskInput();
    getCEPInfo();

    //Add datepicker to date field
    if ($("#registroDataNascimento").length > 0) {
      datepicker("#registroDataNascimento", {
        formatter: (input, date, instance) => {
          input.value = date.toLocaleDateString();
        },
      });
    }

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = $(".needs-validation");
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        (event) => {
          spinner(true);
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            spinner(false);
          } else {
            // Save form data to sessionStorage
            const currentForm = $(event.target);
            saveSession(currentForm);
            spinner(false);
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
    spinner(true);
    axios
      .get("https://api.postmon.com.br/v1/cep/" + e.target.value)
      .then((response) => {
        const { logradouro, bairro, cidade, estado } = response.data;
        $("#registroLogradouro").val(logradouro);
        $("#registroBairro").val(bairro);
        $("#registroCidade").val(cidade);
        $("#registroUF").val(estado);
        spinner(false);
      })
      .catch((error) => {
        //Emptying values if CEP is not correct
        $("#registroCEP").val("");
        $("#registroLogradouro").val("");
        $("#registroBairro").val("");
        $("#registroCidade").val("");
        $("#registroUF").val("");

        spinner(false);

        $("#cepErrorModal").modal("show");
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
      renderInput(input.nome) +
      renderInput(input.usuarioGithub) +
      renderInput(input.dataNascimento) +
      renderInput(input.cpf) +
      renderInput(input.celular) +
      renderInput(input.email) +
      renderInput(input.cep) +
      renderInput(input.logradouro) +
      renderInput(input.numero) +
      renderInput(input.complemento) +
      renderInput(input.bairro) +
      renderInput(input.cidade) +
      renderInput(input.uf) +
      renderTextArea(textarea.bio) +
      '<button type="submit" class="btn btn-primary">' +
      locales.submitText +
      "</button>" +
      "</form>" +
      "</div>"
  );
};

export default Login;
