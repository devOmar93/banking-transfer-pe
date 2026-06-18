import { html, LitElement } from "lit";
import "@/components/type-text/type-text.js";
import { formatAmount, maskAccountNumber, getAccessibleAmount, getLastFourDigits } from "@/utils/format.js";
import { styles } from "./from-account-card.css.js";

export class FromAccountCard extends LitElement {
  static properties = {
    /** 
     * The source account details 
     * @type {Object}
     * @default {}
    */
    account: { type: Object },

    /** 
     * The label for the "From" section
     * @type {String}
     * @default ""
    */
    fromLabel: { type: String, attribute: "from-label" },

    /** 
     * The label for the available balance
     * @type {String}
     * @default ""
    */
    availableBalanceLabel: {
      type: String,
      attribute: "available-balance-label",
    },

    /**
     * The text to display when there is no account information available
     * @type {String}
     * @default ""
     * @attribute "empty-account-text"
     */
    emptyAccountText: { type: String, attribute: "empty-account-text" },
  };

  constructor() {
    super();
    this.account = {};
    this.fromLabel = "";
    this.availableBalanceLabel = "";
    this.emptyAccountText = "";
  }

  static styles = styles;

  get _hasAccount() {
    return Boolean(
      this.account &&
      typeof this.account === "object" &&
      !Array.isArray(this.account),
    );
  }

  get _accountName() {
    if (!this._hasAccount || !this.account.accountName) {
      return this.emptyAccountText;
    }
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
  
  get _accessibleFromAccount() {
    if (!this._hasAccount) return this.emptyAccountText;
    return `${this.fromLabel}. 
            ${this._accountName}. 
            Cuenta terminada en ${getLastFourDigits(this.account.accountNumber)}. 
            Saldo ${getAccessibleAmount(this.account.availableBalance, this.account.currency)}.
            `;
  }

  render() {
    return html`
      <article class="from-account-card" aria-label=${this._accessibleFromAccount}>
        <div class="from-account-card__content" aria-hidden="true">
          <div class="from-account-card__column">
            <type-text
              tag="p"
              size="xs"
              .text=${this.fromLabel}
              class="from-account-card__label"
            ></type-text>
            <type-text
              tag="p"
              size="m"
              weight="semibold"
              .text=${this._accountName}
            ></type-text>
            <type-text
              tag="p"
              size="s"
              .text=${this._accountNumber}
              class="from-account-card__muted"
            ></type-text>
          </div>

          <div class="from-account-card__column from-account-card__column--right">
            <type-text
              tag="p"
              size="xs"
              .text=${this.availableBalanceLabel}
              align="right"
              class="from-account-card__label"
            ></type-text>
            <type-text
              tag="p"
              size="m"
              weight="semibold"
              align="right"
              .text=${this._balance}
            ></type-text>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define("from-account-card", FromAccountCard);
