import ES from "@/locales/locales.json";

const lang = ES["es_LA"];

export const CONFIRM_TRANSFER_PAGE_LITERALS = {
  header: {
    title: lang["confirm-transfer-page-title"],
  },
  backButton: {
    text: lang["confirm-transfer-page-go-back-button"],
  },
  submitButton: {
    text: lang["confirm-transfer-page-submit-button"],
  },
  transferSummary: {
    amountLabel: lang["confirm-transfer-page-amount-label"],
    sourceAccountLabel: lang["confirm-transfer-page-source-account-label"],
    beneficiaryLabel: lang["confirm-transfer-page-beneficiary-label"],
    emptySourceAccountText: lang["confirm-transfer-page-empty-source-account"],
    emptyBeneficiaryText: lang["confirm-transfer-page-empty-beneficiary"],
  },
};

export const CONFIRM_TRANSFER_PAGE_CONFIG = {
  modal: {
    variant: "page",
    scrollable: true,
    fullHeight: true,
    hasFooter: true,
  },
  backButton: {
    iconName: "arrow-left",
    iconPosition: "left",
    variant: "ghost",
    type: "button",
  },
  submitButton: {
    iconPosition: "right",
    variant: "default",
    type: "button",
  },
};