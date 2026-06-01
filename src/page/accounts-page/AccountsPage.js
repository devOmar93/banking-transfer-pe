import { html, LitElement } from "lit";
import { styles } from "./accounts-page.css.js";
import { TypeModal } from "../../compositions/type-modal/type-modal.js";
import { TypeHeader } from "../../compositions/type-header/type-header.js";
import { ES } from "../../locales/es.js";
import { accounts_base_case } from "../../mocks/accounts.mock.js";
import { AccountList } from "./compositions/account-list/account-list.js"
import { getAccounts } from "../../services/accounts.service.js";
import { TypeIcon } from "../../components/type-icon/type-icon.js"; 
import { ACCOUNTS_PAGE_CONFIG as CONFIG } from "../../constants/accounts-page/constants.js";

export class AccountsPage extends LitElement {
  static properties = {
    accounts: {type: Object},
    _loading: {type: Boolean},
    _error: {type: Boolean}
  }

  constructor(){
    super();
    this.accounts = {};
    this._loading = true;
    this._error = false;
  }

  static styles = styles;

  async firstUpdated() {
    try {
      const response = await getAccounts(accounts_base_case);
      this.accounts = response.accounts;
      this._loading = false;
      console.log(this.accounts)
    } catch (error) {
      this._error = true;
    }
  }

  _renderLoading(){
    return html`
    <div class="icon-container">
      <type-icon
        icon-name=${CONFIG.icon.iconName}
        size=${CONFIG.icon.size}
        ariaLabel=${CONFIG.icon.ariaLabel}
        class="icon-loading"
      ></type-icon>
    </div>
    `
  }

  _renderAccountsList(){
    return html`
      <account-list
        .accounts=${this.accounts}
      ></account-list>
    `
  }

  render(){
    return html`
      <type-modal
        ?open=${true}
        variant=${CONFIG.modal.variant}
        ?scrollable=${true}
        ?fullHeight=${true}
        ?hasFooter=${false}
      >
        <type-header
          slot="header"
          .title=${ES.accountsPage.header.title}
          .subtitle=${ES.accountsPage.header.subtitle}
        ></type-header>

        <div slot="body">
          ${this._loading ? this._renderLoading() 
            : this._error ? html`<div>Error</div>`
            : this._renderAccountsList()
          }
          <info-card
            .message=${ES.accountsPage.messageSecurity}
            icon-name=${CONFIG.infoCard.iconName}
            class="info-card"
          ></info-card>
        </div>
      </type-modal>
      `;
  }

}

customElements.define("accounts-page", AccountsPage);