import ES from "@/locales/locales.json";
const lang = ES["es_LA"];

export const NEW_TRANSFER_PAGE_LITERALS = {
  header: {
    title: lang["new-transfer-page-title"],
    subtitle: lang["new-transfer-page-subtitle"],
  },

  backButton: {
    text: lang["new-transfer-page-go-back-button"],
  },

  continueButton: {
    text: lang["new-transfer-page-continue-button"],
  },

  fromAccountCard: {
    fromLabel: lang["new-transfer-page-from-account-label"],
    availableBalanceLabel: lang["new-transfer-page-available-balance-label"],
    emptyAccountText: lang["new-transfer-page-empty-account"],
  },

  errors: {
    BLOCKED: {
      title: lang["account-page-errors-blocked-title"],
      message: lang["account-page-errors-blocked-message"],
    },
    INACTIVE: {
      title: lang["account-page-errors-inactive-title"],
      message: lang["account-page-errors-inactive-message"],
    },
  },
};

export const NEW_TRANSFER_PAGE_CONFIG = {
  modal: {
    variant: "page",
    scrollable: true,
    fullHeight: true,
    hasFooter: true,
  },

  backButton: {
    iconName: "arrow-left",
    iconPosition: "left",
    variant: "secondary",
    type: "button",
  },

  continueButton: {
    iconName: "arrow-right",
    iconPosition: "right",
    variant: "default",
    type: "button",
  },
};
