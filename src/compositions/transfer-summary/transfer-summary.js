import { html, LitElement } from "lit";
import { styles } from "./transfer-summary.css.js";
import "@/components/type-text/type-text.js";
import "@/compositions/info-field/info-field.js";
import { formatAmount, maskAccountNumber } from "@/utils/format.js";
 
export class TransferSummary extends LitElement {
  static properties = {
    transferData: { type: Object },
    amountLabel: { type: String, attribute: "amount-label" },
    sourceAccountLabel: { type: String, attribute: "source-account-label" },
    beneficiaryLabel: { type: String, attribute: "beneficiary-label" },
    emptySourceAccountText: {
      type: String,
      attribute: "empty-source-account-text",
    },
    emptyBeneficiaryText: {
      type: String,
      attribute: "empty-beneficiary-text",
    },
  };
 
  constructor() {
    super();
    this.transferData = {};
    this.amountLabel = "";
    this.sourceAccountLabel = "";
    this.beneficiaryLabel = "";
    this.emptySourceAccountText = "";
    this.emptyBeneficiaryText = "";
  }
 
  static styles = styles;
 
  get _data() {
    return this.transferData ?? {};
  }
 
  get _formattedAmount() {
    return formatAmount(this._data.sourceAccount.amount, this._data.sourceAccount.currency);
  }
 
  get _sourceAccountName() {
    return this._data.sourceAccount?.accountName ?? this.emptySourceAccountText;
  }
 
  get _sourceAccountNumber() {
    return maskAccountNumber(this._data.sourceAccount?.accountNumber);
  }
 
  get _beneficiaryName() {
    return `${this._data.destinationAccount?.firstName} ${this._data.destinationAccount?.lastName}`;
  }
 
  get _beneficiaryAccount() {
    return maskAccountNumber(this._data.destinationAccount?.accountNumber);
  }
 
  _renderAmountCard() {
    return html`
      <div class="transfer-summary__amount-card">
        <type-text
          tag="span"
          size="s"
          weight="medium"
          .text=${this.amountLabel}
          class="transfer-summary__amount-label"
        ></type-text>
        <type-text
          tag="p"
          size="xl"
          weight="bold"
          .text=${this._formattedAmount}
          class="transfer-summary__amount-value"
        ></type-text>
      </div>
    `;
  }
 
  _renderSourceAccountField() {
    return html`
      <info-field>
        <type-text
          slot="label"
          tag="span"
          size="s"
          text=${this.sourceAccountLabel}
          class="transfer-summary__field-label"
        ></type-text>
        <div slot="value" class="transfer-summary__value-block">
          <type-text
            tag="span"
            size="s"
            weight="semibold"
            align="right"
            text=${this._sourceAccountName}
            class="transfer-summary__field-value"
          ></type-text>
          <type-text
            tag="span"
            size="xs"
            align="right"
            text=${this._sourceAccountNumber}
            class="transfer-summary__muted"
          ></type-text>
        </div>
      </info-field>
    `;
  }
 
  _renderBeneficiaryField() {
    return html`
      <info-field>
        <type-text
          slot="label"
          tag="span"
          size="s"
          text=${this.beneficiaryLabel}
          class="transfer-summary__field-label"
        ></type-text>
        <div slot="value" class="transfer-summary__value-block">
          <type-text
            tag="span"
            size="s"
            weight="semibold"
            align="right"
            text=${this._beneficiaryName}
            class="transfer-summary__field-value"
          ></type-text>
          <type-text
            tag="span"
            size="xs"
            align="right"
            text=${this._beneficiaryAccount}
            class="transfer-summary__muted"
          ></type-text>
        </div>
      </info-field>
    `;
  }
 
  render() {
    return html`
      <section class="transfer-summary">
        ${this._renderAmountCard()}
        <div class="transfer-summary__fields">
          ${this._renderSourceAccountField()}
          ${this._renderBeneficiaryField()}
          <slot></slot>
        </div>
      </section>
    `;
  }
}
 
customElements.define("transfer-summary", TransferSummary);