import { NEW_TRANSFER_PAGE_RESPONSE_MOCK as RESPONSE } from "../mocks/newTransferPage.mock.js";

export const getAccountApi = (accountNumberOrigin, accountNumberDestination ) => {
  return new Promise((resolve, reject) => {
    const operationSuccessful = true;
    setTimeout(() => {
      
      if (accountNumberDestination === "00000000000000") {
        reject(RESPONSE.ERRORS.technicalError);
        return;
      }

      if (accountNumberOrigin === accountNumberDestination) {
        resolve(RESPONSE.ERRORS.sameAccount);
        return;
      }

      if (accountNumberDestination === "99999999999999") {
        resolve(RESPONSE.ERRORS.blockedAccount);
        return;
      }
      resolve(RESPONSE.SUCCESS);
      return;
    }, 2500);
  });
};
