import { LitElement } from "lit";
import { SUCCESSFUL_TRANSFER_RESPONSE_MOCK } from "@mocks/transfer.mock.js";
import { fireEvent } from "@utils/utils";

class EntelgyGlobalTransfersApiDm extends LitElement {

  static properties = {
    simulateError: { type: Boolean, attribute: "simulate-error" },
  };

  constructor() {
    super();
    this.simulateError = false;
  }

  async executeTransfer(transferData) {
    try {
      const responseData = await this._sendPost(transferData);
      this._dispatchSuccess(responseData);
    } catch (error) {
      this._dispatchError(error);
    }
  }

  _sendPost(transferData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.simulateError) {
          reject(new Error("Error simulado de transferencia"));
          return;
        }
        resolve(SUCCESSFUL_TRANSFER_RESPONSE_MOCK);
      }, 800);
    });
  }

  _dispatchSuccess(data) {
    fireEvent(this, "transfer-api-dm-create", data);
  }

  _dispatchError(error) {
    fireEvent(this, "transfer-api-dm-fetch-error", { message: error.message });
  }
}

customElements.define("entelgy-global-transfers-api-dm", EntelgyGlobalTransfersApiDm);
