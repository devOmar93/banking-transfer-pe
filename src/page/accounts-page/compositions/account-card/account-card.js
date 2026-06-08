// src/compositions/account-card/account-card.js
import { html, LitElement } from "lit";
import { styles } from "./account-card.css.js";
import "@components/type-icon/type-icon.js";
import "@components/type-text/type-text.js";

export class AccountCard extends LitElement {
  /**
   * Component properties (inputs)
   */

  static properties = {
    accountName: { type: String },
    accountNumber: { type: String },
    accountType: { type: String },
    currency: { type: String },
    availableBalance: { type: Number },
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

  /**
   * Renders the account card content
   */

  _renderContent() {
    return html`
      <div
        class="account-card"
        role="button"
        tabindex="0"
        @click=${this._onClick}
        @keydown=${this._onKeyDown}
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
          <type-text
            tag="p"
            size="ml"
            weight="bold"
            .text=${`${this._formatCurrency()} ${this.availableBalance}`}
          ></type-text>

          <type-icon
            icon-name="arrow-right"
            size="s"
            variant="secondary"
          ></type-icon>
        </div>
      </div>
    `;
  }

  /**
   * Handles click event
   * Dispatches a custom event with account data
   */

  _onClick() {
    this.dispatchEvent(
      new CustomEvent("account-selected", {
        detail: {
          accountName: this.accountName,
          accountNumber: this.accountNumber,
          accountType: this.accountType,
          availableBalance: this.availableBalance,
          currency: this.currency,
          status: this.status,
        },
        bubbles: true,
        composed: true,
      }),
    );
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
