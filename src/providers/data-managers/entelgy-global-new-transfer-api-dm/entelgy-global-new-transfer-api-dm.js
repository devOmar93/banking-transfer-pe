import { LitElement } from "lit";
import { ACCOUNTS_BASE_CASE } from "@/mocks/accounts.mock.js";
import { ACCOUNT_CASE_NOT_EXIST } from "@/mocks/newTransferPage.mock.js";
import { fireEvent } from "@/utils/utils";
class EntelgyGlobalNewTransferApiDm extends LitElement {
  static properties = {};

  constructor() {
    super();
  }

  async getAccountDestination(accountNumberDestinatari) {
    try {
      const responseAccountDestinatari = await this._getAccountApi(
        accountNumberDestinatari,
      );
      this._dispatchSuccess(responseAccountDestinatari);
    } catch (error) {
      this._dispatchError(error);
    }
  }

  _getAccountApi(accountNumberDestinatari) {
    const AccountDestinatari = this._findAccountDestinatari(
      accountNumberDestinatari,
    );
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (AccountDestinatari.status === 'ERROR') {
          reject(AccountDestinatari);
        } else {
          resolve(AccountDestinatari)
        }
      }, 2500);
    });
  }

  _findAccountDestinatari(accountNumberDestinatari) {
    const accountDestinatari = ACCOUNTS_BASE_CASE.accounts.find(
      (account) => account.accountNumber === accountNumberDestinatari,
    );

    if (accountDestinatari) {
      return { ...ACCOUNTS_BASE_CASE.accountHolder, ...accountDestinatari };
    }

    return ACCOUNT_CASE_NOT_EXIST.account;
  }

  _dispatchSuccess(responseAccountDestinatari) {
    fireEvent(this, "new-transfer-api-dm-success", responseAccountDestinatari);
  }

  _dispatchError(error) {
    fireEvent(this, "new-transfer-api-dm-error", { message: error.message });
  }
}

customElements.define("entelgy-global-new-transfer-api-dm", EntelgyGlobalNewTransferApiDm);