import ES from "@locales/locales.json";
const lang = ES["es_LA"];

export const ACCOUNTS_PAGE_ES = {
  header:{
    title: lang["account-page-header-title"],
    subtitle: lang["account-page-header-subtitle"],
  },
  messageSecurity: lang["account-page-messageSecurity"],
  errors: {
    BLOCKED: {
      title: lang["account-page-errors-blocked-title"],
      message: lang["account-page-errors-blocked-message"]
    },
    INACTIVE: {
      title: lang["account-page-errors-inactive-title"],
      message: lang["account-page-errors-inactive-message"]
    },
    NO_BALANCE: {
      title: lang["account-page-errors-no-balance-title"],
      message: lang["account-page-errors-no-balance-message"]
    },
    NO_ACCOUNTS: {
      title: lang["account-page-errors-no-accounts-title"],
      message: lang["account-page-errors-no-accounts-message"]
    },
    ALL_NO_BALANCE: {
      title: lang["account-page-errors-all-no-balance-title"],
      message: lang["account-page-errors-all-no-balance-message"]
    },
    ERROR_TECHNICAL: {
      title: lang["account-page-errors-error-technical-title"],
      message: lang["account-page-errors-error-technical-message"]
    }
  }
};

export const ACCOUNTS_PAGE_CONFIG = {
  icon:{
    iconName: "loader",
    size:"l",
    ariaLabel: "loading",
  },
  modal:{
    variant: "page",
  },
  infoCard:{
    iconName: "info",
  },
  accounts: {
    limit: 5,
  }
}

export const STATES = {
  ERROR_TYPES: {
    BLOCKED: 'BLOCKED',
    INACTIVE: 'INACTIVE',
    NO_BALANCE: 'NO_BALANCE',
    NO_ACCOUNTS: 'NO_ACCOUNTS',
    ALL_NO_BALANCE: 'ALL_NO_BALANCE'
  },
  ERROR_MODAL_TYPES: {
    BLOCKED: 'blockedAccount',
    INACTIVE: 'blockedAccount',
    NO_BALANCE: 'insufficientBalance',
    NO_ACCOUNTS: 'noAccountsAvailable',
    ALL_NO_BALANCE: 'insufficientBalance'
  },
  SUCCESS: {
    ACTIVE: 'ACTIVE'
  }
};

export const PROCESS_ACCOUNT_RULES = [
  {
    condition: accounts => accounts.length === 0,
    result: () => ({
      errorState: STATES.ERROR_TYPES.NO_ACCOUNTS,
      accounts: [],
    }),

  },
  {
    condition: accounts => accounts.every(account => account.availableBalance === 0),
    result: accounts => ({
      errorState: STATES.ERROR_TYPES.ALL_NO_BALANCE,
      accounts,
    }),
  },
  {
    condition: accounts => accounts.length === 1,
    result: accounts => ({ singleAccount: accounts[0] }),
  },
];
