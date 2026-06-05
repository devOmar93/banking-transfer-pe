import { html, LitElement } from "lit";
import { styles } from "./transfer-summary.css.js";
import "@components/type-text/type-text.js";
import "@compositions/info-field/info-field.js";
import { formatAmount, maskAccountNumber } from "@utils/format.js";
 
export class TransferSummary extends LitElement {
  static properties = {
    transferData: { type: Object },
    amountLabel: { type: String, attribute: "amount-label" },
  };
 
  constructor() {
    super();
    this.transferData = null;
    this.amountLabel = "Monto a transferir";
  }
 
  static styles = styles;
 
  get _data() {
    return this.transferData ?? {};
  }
 
  get _formattedAmount() {
    return formatAmount(this._data.amount, this._data.currency);
  }
 
  get _sourceAccountName() {
    return this._data.sourceAccount?.accountName ?? "Sin cuenta";
  }
 
  get _sourceAccountNumber() {
    return maskAccountNumber(this._data.sourceAccount?.accountNumber);
  }
 
  get _beneficiaryName() {
    return this._data.beneficiary?.fullName ?? "Sin beneficiario";
  }
 
  get _beneficiaryAccount() {
    return maskAccountNumber(this._data.beneficiary?.accountNumber);
  }
 
  _renderAmountCard() {
    return html`
      <div class="transfer-summary__amount-card">
        <type-text
          tag="span"
          size="s"
          weight="medium"
          text=${this.amountLabel}
          class="transfer-summary__amount-label"
        ></type-text>
        <type-text
          tag="p"
          size="xl"
          weight="bold"
          text=${this._formattedAmount}
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
          text="Cuenta origen"
        ></type-text>
        <div slot="value" class="transfer-summary__value-block">
          <type-text
            tag="span"
            size="s"
            weight="semibold"
            align="right"
            text=${this._sourceAccountName}
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
          text="Beneficiario"
        ></type-text>
        <div slot="value" class="transfer-summary__value-block">
          <type-text
            tag="span"
            size="s"
            weight="semibold"
            align="right"
            text=${this._beneficiaryName}
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