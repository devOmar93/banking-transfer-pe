// src/compositions/account-card/account-card.js
import { html, LitElement } from "lit";
import { styles } from "./account-card.css.js";
import "@/components/type-icon/type-icon.js";
import "@/components/type-text/type-text.js";
import { fireEvent } from "@/utils/utils.js";

export class AccountCard extends LitElement {
  /**
   * Component properties (inputs)
   */

  static properties = {
    /**
     * The name of the account
     * @type {String}
     * @default ""
     **/
    accountName: { type: String },

    /**
     * The number of the account
     * @type {String}
     * @default ""
     */
    accountNumber: { type: String },

    /**
     * The type of the account
     * @type {String}
     * @default ""
     */
    accountType: { type: String },

    /**
     * The type currency of the account
     * @type {String}
     * @default ""
     */
    currency: { type: String },

    /**
     * The available balance of the account
     * @type {Number}
     * @default 0
     */
    availableBalance: { type: Number },

    /**
     * The status of the account (e.g., active, inactive)
     * @type {String}
     * @default ""
     */
    status: { type: String },
  };

  constructor() {
    super();
    this.accountName = "";
    this.accountNumber = "";
    this.accountType = "";
    this.currency = "";
    this.availableBalance = 0;
    this.status = "";
  }

  static styles = styles;

  _formatCurrency(currency = this.currency) {
    const symbols = {
      PEN: "S/",
      USD: "$",
    };
    return symbols[currency] || "";
  }

  _formatAmount() {
    return new Intl.NumberFormat("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.availableBalance);
  }

  /**
   * Renders the account card content
   */

  _renderContent() {
    return html`
      <button
        type="button"
        class="account-card"
        tabindex="0"
        aria-label=${`Cuenta ${this.accountName}, saldo ${this._formatCurrency()}${this._formatAmount()}`}
        @click=${() => this._onClick()}
        @keydown=${(e) => this._onKeyDown(e)}
      >
        <div class="account-left">
          <type-icon
            variant="secondary"
            icon-name="wallet"
            size="m"
          ></type-icon>

          <div class="account-info">
            <type-text
              tag="p"
              size="m"
              weight="semibold"
              .text=${this.accountName}
            ></type-text>

            <type-text
              tag="p"
              size="s"
              weight="medium"
              class="p-subtitle"
              .text=${this.accountNumber}
            ></type-text>

            <type-text
              tag="p"
              size="xs"
              class="p-subtitle"
              weight="regular"
              .text=${this.accountType}
            ></type-text>
          </div>
        </div>

        <div class="account-right">
          <div class="balance">
            <type-text
              tag="p"
              size="ml"
              weight="bold"
              .text=${`${this._formatCurrency()} ${this._formatAmount()}`}
            ></type-text>
          </div>

          <type-icon
            icon-name="arrow-right"
            size="m"
            variant="secondary"
          ></type-icon>
        </div>

      </button>
    `;
  }

  /**
   * Handles click event
   * Dispatches a custom event with account data
   */

  _onClick() {
    fireEvent(this, "account-selected", {
      account: {
        accountName: this.accountName,
        accountNumber: this.accountNumber,
        accountType: this.accountType,
        availableBalance: this.availableBalance,
        currency: this.currency,
        status: this.status,
      },
    });
  }

  /**
   * Handles keyboard interaction (Enter / Space)
   * Enables accessibility for non-mouse users
   */

  _onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._onClick();
    }
  }

  /**
   * Main render method
   */

  render() {
    return html`${this._renderContent()}`;
  }
}

customElements.define("account-card", AccountCard);
