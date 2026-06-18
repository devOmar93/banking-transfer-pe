import { html, LitElement } from "lit";
import { styles } from "./transfer-summary-card.css.js";
import "@/components/type-text/type-text.js";
import "@/compositions/transfer-summary-list/transfer-summary-list.js";
import { formatAmount } from "@/utils/format.js";

class TransferSummaryCard extends LitElement {
  static properties = {
    locale: {
      type: Object,
    },
    currency: { type: String },
    amount: { type: String },
    transactionNumber: { type: String },
    time: { type: String },
    date: { type: String },
    originAccount: { type: String },
    originAccountNumber: { type: String },
    beneficiaryName: { type: String },
    beneficiaryLastName: { type: String },
  };

  constructor() {
    super();
    this.locale = {};
    this.currency = "";
    this.amount = "";
    this.transactionNumber = "";
    this.time = "";
    this.date = "";
    this.originAccount = "";
    this.originAccountNumber = "";
    this.beneficiaryName = "";
    this.beneficiaryLastName = "";
    this.status = "";
  }

  static styles = styles;

  get _formattedAmount() {
    return formatAmount(this.amount, this.currency);
  }

  render() {
    return html`
      <div class="card">
        <header class="header-container">
          <type-text
            size="xs"
            .text=${this.locale["successful-transfer-page-amount-transferred"]}
          ></type-text>
          <div class="amount-container">
            <type-text
              .text=${this._formattedAmount}
              .weight=${"bold"}
              size="l"
            ></type-text>
          </div>
        </header>

        <section class="body-container">
          <transfer-summary-list
            .locale=${this.locale}
            .transactionNumber=${this.transactionNumber}
            .date=${this.date}
            .time=${this.time}
            .originAccount=${this.originAccount}
            .originAccountNumber=${this.originAccountNumber}
            .beneficiaryName=${this.beneficiaryName}
            .beneficiaryLastName=${this.beneficiaryLastName}
            .status=${this.status}
            .isDataReady=${this.isDataReady}
          ></transfer-summary-list>
        </section>
      </div>
    `;
  }
}

customElements.define("transfer-summary-card", TransferSummaryCard);
