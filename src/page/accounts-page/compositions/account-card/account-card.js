// src/compositions/account-card/account-card.js
import { html, LitElement } from "lit";
import { styles } from "./account-card.css.js";
import "../../../../components/type-icon/type-icon.js";
import "../../../../components/type-text/type-text.js";


export class AccountCard extends LitElement {

/**
   * Component properties (inputs)
   */

  static properties = {
    title: { type: String },
    number: { type: String },
    type: { type: String },
    currency: { type: String },
    amount: { type: Number },
    status: { type: String },
  };

  constructor() {
    super();
    this.title = "";
    this.number = "";
    this.type = "";
    this.amount = "";
    this.status = "";
  }

  static styles = styles;

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
          <!-- Left section: icon + account info -->
        <div class="account-left">
          <type-icon icon-name="wallet" size="m"></type-icon>

          <div class="account-info">
            <type-text
              tag="p"
              size="m"
              weight="semibold"
              text="${this.title}"
            ></type-text>

            <type-text
              tag="p"
              size="s"
              weight="medium"
              class="p-subtitle"
              text="${this.number}"
            ></type-text>

            <type-text
              tag="p"
              size="xs"
              class="p-subtitle"
              weight="regular"
              text="${this.type}"
            ></type-text>
          </div>
        </div>

        <!-- Right section: amount + arrow -->

        <div class="account-right">
          <type-text
            tag="p"
            size="ml"
            weight="bold"
            text="${this.currency}"
          ></type-text>
          
          <type-text
            tag="p"
            size="ml"
            weight="bold"
            text="${this.amount}"
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
          title: this.title,
          number: this.number,
          type: this.type,
          amount: this.amount,
          currency: this.currency,
          status: this.status,
        },
        bubbles: true,
        composed: true,
      })
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
 