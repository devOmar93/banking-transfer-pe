import { html, LitElement } from "lit";
import { styles } from "./account-list.css.js";
import { getAccounts } from "../../../../services/accounts.service.js";
import { TypeIcon } from "../../../../components/type-icon/type-icon.js"  

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

  }
}

customElements.define("account-list", AccountList)