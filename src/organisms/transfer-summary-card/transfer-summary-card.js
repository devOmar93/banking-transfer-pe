import { html, LitElement } from "lit";
import { styles } from "./transfer-summary-card.css.js";
import "@components/type-text/type-text.js";
import "@compositions/info-field/info-field.js";
import "@compositions/transfer-summary-list/transfer-summary-list.js";
import "@components/type-tag/type-tag.js";

class TransferSummaryCard extends LitElement {
  static properties = {
    labels: {
      type: Object,
    },
    transactionNumber: { type: String },
    time: { type: String },
    date: { type: String },
    originAccount: { type: String },
    beneficiary: { type: String },
    concept: { type: String },
    status: { type: Object },
  };

  constructor() {
    super();
    this.labels = {};
    this.transactionNumber = "";
    this.time = "";
    this.date = "";
    this.originAccount = "";
    this.beneficiary = "";
    this.concept = "";
    this.status = "";
  }

  static styles = styles;

  render() {
    return html`
      <div class="card">
        <header class="header-container">
          <type-text
            size="xs"
            .text=${this.labels["successful-transfer-page-amount-transferred"]}
          ></type-text>
          <div class="amount-container">

            <type-text
            .text=${this.current}
            .weight=${"bold"}
            size="l"
          ></type-text>
          <type-text
            .text=${this.amount}
            .weight=${"bold"}
            size="l"
            ></type-text>
          </div>
          </header>

        <section class="body-container">
          <transfer-summary-list
            .labels=${this.labels}
            .transactionNumber=${this.transactionNumber}
            .date=${this.date}
            .time=${this.time}
            .originAccount=${this.originAccount}
            .beneficiary=${this.beneficiary}
            .concept=${this.concept}
            .status=${this.status}
          ></transfer-summary-list>
        </section>
      </div>
    `;
  }
}

customElements.define("transfer-summary-card", TransferSummaryCard);
