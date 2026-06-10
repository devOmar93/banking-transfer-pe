import { LitElement } from "lit";
import { ACCOUNTS_BASE_CASE } from "@mocks/accounts.mock.js";
import { fireEvent } from "@utils/utils";

class EntelgyGlobalAccountsApiDm extends LitElement {
  static properties = {
    simulateError: { type: Boolean }
  };

  constructor() {
    super();
    this.simulateError = false;
  }

  async getAccounts() {
    this._dispatchLoading(true);
    try {
      const responseData = await this._sendGet();
      this._dispatchSuccess(responseData);
    } catch (error) {
      this._dispatchError(error);
    } finally {
      this._dispatchLoading(false);
    }
  }

  _sendGet() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.simulateError) {
          reject(new Error("Error simulado"));
        } else {
          resolve(ACCOUNTS_BASE_CASE);
        }
      }, 1000);
    });
  }

  _dispatchSuccess(data) {
    fireEvent(this, "accounts-api-dm-success", data);
  }

  _dispatchError(error) {
    fireEvent(this, "accounts-api-dm-error", { message: error.message });
  }

  _dispatchLoading(isLoading) {
    fireEvent(this, "accounts-api-dm-loading", { isLoading });
  }

}

customElements.define("entelgy-global-accounts-api-dm", EntelgyGlobalAccountsApiDm);