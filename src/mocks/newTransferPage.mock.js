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
