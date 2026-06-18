import { html, LitElement, nothing } from "lit";
import { styles } from "./transfer-summary-list.css.js";
import "@/components/type-text/type-text.js";
import "@/components/type-tag/type-tag.js";
import "@/compositions/info-field/info-field.js";
import { getLastFourDigits } from "@/utils/format.js";

export class TransferSummaryList extends LitElement {
  static properties = {
    locale: { type: Object },
    transactionNumber: { type: String },
    time: { type: String },
    date: { type: String },
    originAccount: { type: String },
    originAccountNumber: { type: String },
    beneficiaryName: { type: String },
    beneficiaryLastName: { type: String },
    status: { type: String },
  };

  static styles = styles;

  constructor() {
    super();
    this.locale = {};
    this.transactionNumber = "";
    this.time = "";
    this.date = "";
    this.originAccount = "";
    this.originAccountNumber = "";
    this.beneficiaryName = "";
    this.beneficiaryLastName = "";
    this.status = "";
  }

  _renderTextValue(value) {
    if (!value) return nothing;
    return html`
      <type-text
        class="primary-text"
        .text=${value}
        .tag=${"p"}
        .weight=${"bold"}
        .align=${"right"}
      ></type-text>
    `;
  }

  _renderStackedText(primaryText, secondaryText) {
    if (!primaryText && !secondaryText) return nothing;
    return html`
      <div class="value-container">
        <type-text
          class="primary-text"
          .text=${primaryText}
          .tag=${"p"}
          .weight=${"bold"}
          .align=${"right"}
        ></type-text>
        <type-text
          class="secondary-text"
          .text=${secondaryText}
          .tag=${"p"}
          .weight=${"regular"}
          .align=${"right"}
        ></type-text>
      </div>
    `;
  }

  _renderStatusValue(value) {
    if (!value) return nothing;
    return html` <type-tag .text=${value}></type-tag> `;
  }

  get _fields() {
    return [
      {
        label: this.locale["successful-transfer-page-transaction-number"],
        value: this._renderTextValue(this.transactionNumber),
      },
      {
        label: this.locale["successful-transfer-page-date"],
        value: this._renderTextValue(this.date),
      },
      {
        label: this.locale["successful-transfer-page-time"],
        value: this._renderTextValue(this.time),
      },
      {
        label: this.locale["successful-transfer-page-origin-account"],
        value: this._renderStackedText(
          this.originAccount,
          this.originAccountNumber,
        ),
      },
      {
        label: this.locale["successful-transfer-page-beneficiary"],
        value: this._renderStackedText(
          this.beneficiaryName,
          this.beneficiaryLastName,
        ),
      },
      {
        label: this.locale["successful-transfer-page-status"],
        value: this._renderStatusValue(this.status),
      },
    ];
  }
  
  get _accessibleList() {
    return `
      ${this.locale["successful-transfer-page-transaction-number"]}. ${this.transactionNumber}.
      
      ${this.locale["successful-transfer-page-date"]}. ${this.date}.
      
      ${this.locale["successful-transfer-page-time"]}. ${this.time}.
      
      ${this.locale["successful-transfer-page-origin-account"]}.
      ${this.originAccount}.
      Cuenta terminada en ${getLastFourDigits(this.originAccountNumber)}.
      
      ${this.locale["successful-transfer-page-beneficiary"]}.
      ${this.beneficiaryName} ${this.beneficiaryLastName}.
      
      ${this.locale["successful-transfer-page-status"]}. ${this.status}.
    `.replace(/\s+/g, " ").trim();
  }

  _renderFields(label, value) {
    if (value === nothing) return nothing;
    return html`
      <li aria-hidden="true">
        <info-field>
          <div slot="label">
            <type-text .text=${label} .tag=${"p"}></type-text>
          </div>
          <div slot="value">${value}</div>
        </info-field>
      </li>
    `;
  }

  render() {
    return html`
      <ul class="container" aria-label=${this._accessibleList}>
        ${this._fields.map((item) =>
          this._renderFields(item.label, item.value),
        )}
      </ul>
    `;
  }
}

customElements.define("transfer-summary-list", TransferSummaryList);
