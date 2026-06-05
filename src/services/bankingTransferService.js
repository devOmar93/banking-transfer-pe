
import { getAccountApi } from "./bankingTransferApi.js";

export const resolveDestinationAccount = (accountNumber) => {
  return getAccountApi(accountNumber)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
