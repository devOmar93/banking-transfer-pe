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
            Object.values(this.accounts),
            (account) => account.id,
            (account) => html`
              <account-card
                .accountName=${account.accountName}
                .accountNumber=${account.accountNumber}
                .accountType=${account.accountType}
                .status=${account.status}
                .availableBalance=${account.availableBalance}
                .currency=${account.currency}
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