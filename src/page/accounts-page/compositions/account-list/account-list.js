import { html, LitElement } from "lit";
import { styles } from "./account-list.css.js"; 
import { repeat } from "lit/directives/repeat.js";
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
    repeat(
      this.accounts,
      (account) => account.id,
      (account) => html`
        <account-card

        ></account-card>
      `
    )
  }
}

customElements.define("account-list", AccountList)