export const NEW_TRANSFER_PAGE_RESPONSE_MOCK = {
  ERRORS: {
    sameAccount: {
      status: "ERROR",
      errorCode: "sameAccount",
    },
    blockedAccount: {
      status: "ERROR",
      errorCode: "blockedAccount",
    },
    technicalError: {
      status: "ERROR",
      errorCode: "technicalError",
    },
  },

  SUCCESS: {
    status: "OK",
    data: {
      accountNumber: "12345678910111213141",
      accountHolderName: "JUAN PEREZ LOPEZ",
      currency: "USD",
      isActive: true,
    },
  },
};

/* Case 6: Cuenta general*/
export const ACCOUNT_CASE_GENERAL = {
  account: {
    firstName: "Pedro",
    lastName: "Ramires Pardo",
    id: 999,
    accountNumber: "10000000000000",
    accountName: "Cuenta Corriente",
    accountType: "Corriente",
    availableBalance: 5250.0,
    currency: "USD",
    status: "ACTIVE",
  },
};

/* Case 6: Error Cuenta inextitente */
export const ACCOUNT_CASE_NOT_EXIST = {
  account: {
    status: "ERROR",
  },
};
