import { html, LitElement } from "lit";
import { styles } from "./from-account-card.css.js";
import "@components/type-text/type-text.js";
import { formatAmount, maskAccountNumber } from "@utils/format.js";
 
export class FromAccountCard extends LitElement {
  static properties = {
    account: { type: Object },
  };
 
  constructor() {
    super();
    this.account = null;
  }
 
  static styles = styles;
 
  get _hasAccount() {
    return Boolean(
      this.account &&
      typeof this.account === "object" &&
      !Array.isArray(this.account)
    );
  }
 
  get _accountName() {
    if (!this._hasAccount || !this.account.accountName) return "Sin cuenta";
    return this.account.accountName;
  }
 
  get _accountNumber() {
    if (!this._hasAccount) return "";
    return maskAccountNumber(this.account.accountNumber);
  }
 
  get _balance() {
    if (!this._hasAccount) return "";
    return formatAmount(this.account.availableBalance, this.account.currency);
  }
 
  render() {
    return html`
      <article class="from-account-card">
        <div class="from-account-card__column">
          <type-text
            tag="span"
            size="xs"
            text="Desde"
            class="from-account-card__label"
          ></type-text>
          <type-text
            tag="p"
            size="m"
            weight="semibold"
            text=${this._accountName}
          ></type-text>
          <type-text
            tag="span"
            size="s"
            text=${this._accountNumber}
            class="from-account-card__muted"
          ></type-text>
        </div>
 
        <div class="from-account-card__column from-account-card__column--right">
          <type-text
            tag="span"
            size="xs"
            text="Saldo disponible"
            align="right"
            class="from-account-card__label"
          ></type-text>
          <type-text
            tag="p"
            size="m"
            weight="semibold"
            align="right"
            text=${this._balance}
          ></type-text>
        </div>
      </article>
    `;
  }
}
 
customElements.define("from-account-card", FromAccountCard);