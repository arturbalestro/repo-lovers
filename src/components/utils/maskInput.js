import Inputmask from "inputmask";
import formData from "./formData";

const { input } = formData;

const maskInput = () => {
  if (document.getElementById("login-form") !== null) {
    Inputmask({ mask: "99/99/9999" }).mask(
      document.getElementById(input.dataNascimento.id)
    );
    Inputmask({ mask: "999.999.999-99" }).mask(
      document.getElementById(input.cpf.id)
    );
    Inputmask({ mask: "(999) 999-9999" }).mask(
      document.getElementById(input.celular.id)
    );
    Inputmask({ mask: "99999-999" }).mask(
      document.getElementById(input.cep.id)
    );
    Inputmask({ regex: "\\d*" }).mask(document.getElementById(input.numero.id));
    Inputmask({ mask: "aa" }).mask(document.getElementById(input.uf.id));
  }
};

export default maskInput;
