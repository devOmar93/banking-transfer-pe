import ES from "@locales/locales.json";
const lang = ES["es-PE"];

export const TRANSFER_FORM_FIELDS = {
  destinationAccount: {
    name: "destinationAccount",
    type: "text",
    label: lang["new-transfer-page-field-destination-label"],
    placeholder: lang["new-transfer-page-field-destination-placeholder"],

    nativeValidation: {
      required: true,
      minLength: 14,
      maxLength: 20,
    },

    errorMessages: {
      default: lang["new-transfer-page-field-destination-error-default"],
      minLength: lang["new-transfer-page-field-destination-error-min-Length"],
      maxLength: lang["new-transfer-page-field-destination-error-max-Length"],
      nonNumericaAccount: lang["new-transfer-page-field-destination-error-not-numerical"],
    },

    businessValidation: true,
  },

  amount: {
    name: "amount",
    type: "text",
    label: lang["new-transfer-page-field-amount-label"],
    placeholder: lang["new-transfer-page-field-amount-placeholder"],
    formatCurrency: "0.01",
    hasIcon: true,

    nativeValidation: {
      required: true,
    },

    errorMessages: {
      default: lang["new-transfer-page-field-amount-error-default"],
      insufficientBalance: lang["new-transfer-page-field-amount-error-insufficient-balance"],
      amountNotAllowed: lang["new-transfer-page-field-amount-error-amount-not-allowed"],
    },

    businessValidation: true,
  },
};
