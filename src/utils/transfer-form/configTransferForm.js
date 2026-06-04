export const TRANSFER_FORM_FIELDS = {
  destinationAccount: {
    name: "destinationAccount",
    type: "text",
    label: "Cuenta del destinatario",
    placeholder: "00000000000000",

    nativeValidation: {
      required: true,
      minLength: 14,
      maxLength: 20,
    },

    errorMessages: {
      default: "La cuenta es obligatoria.",
      minLength: "Debe tener al menos 14 dígitos.",
      maxLength: "No puede superar los 20 dígitos.",
      nonNumericaAccount: "La cuenta tiene que ser númerica.",
    },

    businessValidation: true,
  },

  amount: {
    name: "amount",
    type: "number",
    label: "Monto a transferir",
    placeholder: "0.00",
    formatCurrency: "0.01",

    nativeValidation: {
      required: true,
    },

    errorMessages: {
      default: "El monto es obligatorio.",
      insufficientBalance: "Tu saldo es insuficiente para pagar.",
      amountNotAllowed: "El monto debe ser mayor que 0.",
    },

    businessValidation: true,
  },
};
