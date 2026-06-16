import { LitElement } from "lit";
import { fireEvent } from "@/utils/utils";
import { createSuccessfulTransferMock } from "@/mocks/transfer.mock";

const EXCHANGE_RATE = {
  USD: 1,
  PEN: 3.4,
};

class EntelgyGlobalTransfersApiDm extends LitElement {
  static properties = {
    simulateError: { type: Boolean, attribute: "simulate-error" },
    accounts: { type: Array },
  };

  constructor() {
    super();
    this.simulateError = false;
    this.accounts = [];
  }

  async executeTransfer(transferData) {
    try {
      const sourceNo = transferData.sourceAccount.accountNumber;
      const destNo = transferData.destinationAccount.accountNumber;
      const baseAmount = transferData.sourceAccount.amount;
      const baseCurrency = transferData.sourceAccount.currency;

      const responseData = await this._sendPost(
        sourceNo,
        destNo,
        transferData,
        baseAmount,
        baseCurrency,
      );

      this._dispatchSuccess({
        response: responseData,
        accounts: this.accounts,
      });
    } catch (error) {
      this._dispatchError(error);
    }
  }

  _sendPost(sourceNo, destNo, transferData, baseAmount, baseCurrency) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.simulateError) {
          return reject(new Error("Error simulado de transferencia"));
        }

        this._updateBalances(sourceNo, destNo, baseAmount, baseCurrency);

        const response = createSuccessfulTransferMock(transferData);
        resolve(response);
      }, 800);
    });
  }

  _updateBalances(sourceNo, destNo, baseAmount, baseCurrency) {
    this.accounts = this.accounts.map((account) => {
      if (account.accountNumber === sourceNo) {
        return this._removeFunds(account, baseAmount);
      }
      if (account.accountNumber === destNo) {
        return this._addFunds(account, baseAmount, baseCurrency);
      }
      return account;
    });
  }

  _addFunds(account, baseAmount, baseCurrency) {
    const amount = this._convertAmount(
      baseAmount,
      baseCurrency,
      account.currency,
    );
    return { ...account, availableBalance: account.availableBalance + amount };
  }
  _removeFunds(account, baseAmount) {
    return {
      ...account,
      availableBalance: account.availableBalance - baseAmount,
    };
  }

  _convertAmount(amount, fromCurrency, toCurrency) {
    const converted =
      (amount / EXCHANGE_RATE[fromCurrency]) * EXCHANGE_RATE[toCurrency];
    return Number(converted.toFixed(2));
  }

  _dispatchSuccess(data) {
    fireEvent(this, "transfer-api-dm-create", data);
  }

  _dispatchError(error) {
    fireEvent(this, "transfer-api-dm-fetch-error", { message: error.message });
  }
}

customElements.define(
  "entelgy-global-transfers-api-dm",
  EntelgyGlobalTransfersApiDm,
);
