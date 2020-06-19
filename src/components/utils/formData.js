const formData = {
  input: {
    nome: {
      label: "Nome Completo",
      id: "registroNome",
      type: "text",
      value: sessionStorage.getItem("registroNome") || "",
      required: true,
    },
    usuarioGithub: {
      label: "Usuário Github",
      id: "registroUsuarioGithub",
      type: "text",
      value: sessionStorage.getItem("registroUsuarioGithub") || "",
      required: true,
    },
    //TODO: Add a datepicker
    dataNascimento: {
      label: "Data de Nascimento",
      id: "registroDataNascimento",
      type: "tel",
      value: sessionStorage.getItem("registroDataNascimento") || "",
      required: false,
    },
    cpf: {
      label: "CPF",
      id: "registroCPF",
      type: "tel",
      value: sessionStorage.getItem("registroCPF") || "",
      required: true,
    },
    celular: {
      label: "Celular",
      id: "registroCelular",
      type: "tel",
      value: sessionStorage.getItem("registroCelular") || "",
      required: true,
    },
    email: {
      label: "Email",
      id: "registroEmail",
      type: "email",
      value: sessionStorage.getItem("registroEmail") || "",
      required: true,
    },
    cep: {
      label: "CEP",
      id: "registroCEP",
      type: "tel",
      value: sessionStorage.getItem("registroCEP") || "",
      required: true,
    },
    logradouro: {
      label: "Logradouro",
      id: "registroLogradouro",
      type: "text",
      value: sessionStorage.getItem("registroLogradouro") || "",
      required: true,
    },
    numero: {
      label: "Número",
      id: "registroNumero",
      type: "tel",
      value: sessionStorage.getItem("registroNumero") || "",
      required: true,
    },
    complemento: {
      label: "Complemento",
      id: "registroComplemento",
      type: "text",
      value: sessionStorage.getItem("registroComplemento") || "",
      required: false,
    },
    bairro: {
      label: "Bairro",
      id: "registroBairro",
      type: "text",
      value: sessionStorage.getItem("registroBairro") || "",
      required: true,
    },
    cidade: {
      label: "Cidade",
      id: "registroCidade",
      type: "text",
      value: sessionStorage.getItem("registroCidade") || "",
      required: true,
    },
    uf: {
      label: "UF",
      id: "registroUF",
      type: "text",
      value: sessionStorage.getItem("registroUF") || "",
      required: true,
    },
  },
  textarea: {
    bio: {
      label: "Bio",
      id: "registroBio",
      rows: 3,
      value: sessionStorage.getItem("registroBio") || "",
      required: false,
    },
  },
};

export default formData;
