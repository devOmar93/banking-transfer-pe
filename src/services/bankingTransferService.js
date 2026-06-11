
import { getAccountApi } from "./bankingTransferApi.js";

export const resolveDestinationAccount = (accountNumber, accountNumberDestination) => {
  return getAccountApi(accountNumber, accountNumberDestination)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
