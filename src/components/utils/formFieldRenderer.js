import locales from "../utils/locales";

export const renderInput = (fieldData) => {
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
    (required ? "required" : "") +
    ">" +
    '<div class="invalid-feedback">' +
    locales.formInvalidError +
    "</div>" +
    "</div>"
  );
};

export const renderTextArea = (fieldData) => {
  const { label, id, rows, value, required } = fieldData;
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
    '" ' +
    required +
    ">" +
    value +
    "</textarea>" +
    '<div class="invalid-feedback">' +
    locales.formInvalidError +
    "</div>" +
    "</div>"
  );
};
