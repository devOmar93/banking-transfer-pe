import { html, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import "@/page/accounts-page/compositions/account-card/account-card.js"
import { styles } from "./account-list.css.js"; 

export class AccountList extends LitElement{
  static properties = {
    accounts: {type: Object}
  }

  constructor(){
    super();
    this.accounts = {};
  }

  static styles = styles;
  
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
              ></account-card>
            `
          )
        }
      </div>
    `
  }
}

customElements.define("account-list", AccountList)