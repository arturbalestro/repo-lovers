const formData = {
  input: {
    nome: {
      label: "Nome Completo",
      id: "registroNome",
      type: "text",
      helpText: "helpNome",
    },
    dataNascimento: {
      label: "Data de Nascimento",
      id: "registroDataNascimento",
      type: "tel",
      helpText: "helpDataNascimento",
    },
    cpf: {
      label: "CPF",
      id: "registroCPF",
      type: "tel",
      helpText: "helpCPF",
    },
    celular: {
      label: "Celular",
      id: "registroCelular",
      type: "tel",
      helpText: "helpCelular",
    },
    email: {
      label: "Email",
      id: "registroEmail",
      type: "email",
      helpText: "helpEmail",
    },
    cep: {
      label: "CEP",
      id: "registroCEP",
      type: "tel",
      helpText: "helpCEP",
    },
    logradouro: {
      label: "Logradouro",
      id: "registroLogradouro",
      type: "text",
      helpText: "helpLogradouro",
    },
    numero: {
      label: "Número",
      id: "registroNumero",
      type: "tel",
      helpText: "helpNumero",
    },
    complemento: {
      label: "Complemento",
      id: "registroComplemento",
      type: "text",
      helpText: "helpComplemento",
    },
    bairro: {
      label: "Bairro",
      id: "registroBairro",
      type: "text",
      helpText: "helpBairro",
    },
    cidade: {
      label: "Cidade",
      id: "registroCidade",
      type: "text",
      helpText: "helpCidade",
    },
    uf: {
      label: "UF",
      id: "registroUF",
      type: "text",
      helpText: "helpUF",
    },
  },
  textarea: {
    bio: {
      label: "Bio",
      id: "registroBio",
      rows: 3,
      helpText: "helpBio",
    },
  },
};

export default formData;
