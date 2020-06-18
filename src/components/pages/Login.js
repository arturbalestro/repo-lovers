import locales from "../atoms/locales";
import formData from "../atoms/formData";

const renderInput = (fieldData) => {
  const { label, id, type, helpText } = fieldData;
  return (
    '<div class="form-group text-left">' +
    '<label for="' +
    id +
    '">' +
    label +
    "</label>" +
    '<input type="' +
    type +
    '" class="form-control required" id="' +
    id +
    '" aria-describedby="' +
    helpText +
    '">' +
    '<small id="' +
    helpText +
    '" class="form-text hidden text-muted text-center">' +
    locales.formInvalidError +
    "</small>" +
    "</div>"
  );
};

const renderTextArea = (fieldData) => {
  const { label, id, rows, helpText } = fieldData;
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
    '" aria-describedby="' +
    helpText +
    '"></textarea>' +
    '<small id="' +
    helpText +
    '" class="form-text hidden text-muted text-center">' +
    locales.formInvalidError +
    "</small>" +
    "</div>"
  );
};

const Login = (mainContainer) => {
  mainContainer.append(
    "<form>" + renderInput(formData.input.nome),
    renderInput(formData.input.dataNascimento),
    renderInput(formData.input.cpf),
    renderInput(formData.input.celular),
    renderInput(formData.input.email),
    renderInput(formData.input.cep),
    renderInput(formData.input.logradouro),
    renderInput(formData.input.numero),
    renderInput(formData.input.complemento),
    renderInput(formData.input.bairro),
    renderInput(formData.input.cidade),
    renderInput(formData.input.uf),
    renderTextArea(formData.textarea.bio),
    '<button type="submit" class="btn btn-primary">Submit</button>' + "</form>"
  );
};

export default Login;
