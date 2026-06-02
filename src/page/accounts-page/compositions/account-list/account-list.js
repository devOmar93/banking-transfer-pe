import { html, LitElement } from "lit";
import { styles } from "./account-list.css.js"; 
import { repeat } from "lit/directives/repeat.js";
import "../account-card/account-card.js"
export class AccountList extends LitElement{
  static properties = {
    accounts: {type: Object}
  }

  constructor(){
    super();
    this.accounts = {};
  }

  static styles = styles;

  _formatCurrency(currency) {
    const symbols = {
      PEN: 'S/',
      USD: '$/'
    }
    const symbol = symbols[currency] || ''
    return `${symbol}`;
  }
  
  _onSelect(e){
    this.dispatchEvent(new CustomEvent('select-account',{
      detail: e.detail,
      bubbles: true,
      composed: true
    }))
  }

  render(){
    return html`
      <div class="container-list">
        ${
          repeat(
            this.accounts,
            (account) => account.id,
            (account) => html`
              <account-card
                title=${account.accountName}
                number=${account.accountNumber}
                type=${account.accountType}
                status=${account.status}
                amount= ${account.availableBalance}
                currency=${this._formatCurrency(account.currency)}
                @account-selected=${this._onSelect}
              ></account-card>
            `
          )
        }
      </div>
    `
  }
}

customElements.define("account-list", AccountList)