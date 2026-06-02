import { html, LitElement, nothing } from "lit";
import { styles } from "./accounts-page.css.js";
import "../../compositions/type-modal/type-modal.js";
import "../../compositions/type-header/type-header.js";
import "./compositions/account-list/account-list.js";
import "../../components/type-icon/type-icon.js"; 
import { ES } from "../../locales/es.js";
import { accounts_base_case } from "../../mocks/accounts.mock.js";
import { getAccounts } from "../../services/accounts.service.js";
import { ACCOUNTS_PAGE_CONFIG as CONFIG, STATES, VALIDATIONS_ERROR } from "../../constants/accounts-page/constants.js";

export class AccountsPage extends LitElement {
  static properties = {
    accounts: {type: Array},
    _loading: {type: Boolean},
    _error: {type: Boolean},
    selectedAccount: {type: Object},
    _errorState: {type: String},
  }

  constructor(){
    super();
    this.accounts = [];
    this._loading = true;
    this._error = false;
    this.selectedAccount = {};
    this._errorState = "";
  }

  static styles = styles;

  async firstUpdated() {
    try {
      const { accounts } = await getAccounts(accounts_base_case);
      this.accounts = this._topAccounts(accounts);
      
      if (!this.accounts.length) {
        this._errorState = STATES.ERROR_TYPES.NO_ACCOUNTS;
        return;
      }

      if (this.accounts.length === 1) {
        this._validateSingleAccount(this.accounts);
        return;
      }

      if (this.accounts.every(acc => acc.availableBalance === 0)) {
        this._errorState = STATES.ERROR_TYPES.ALL_NO_BALANCE;
        return;
      }
    } catch {
      this._error = true;
    } finally {
      this._loading = false;
    }
  }
  
  _priorityAccounts(accounts) {
    const isActive = accounts.status === STATES.SUCCESS.ACTIVE;
    const hasBalance = accounts.availableBalance > 0;
    return (isActive ? 0 : 2) + (hasBalance ? 0 : 1) + 1;
  }

  _topAccounts(accounts){
    return [...accounts]
      .sort((a, b) => this._priorityAccounts(a) - this._priorityAccounts(b))
      .slice(0, 5);
  }

  _goToNextStep(account) {
    console.log("GO NEXT", account);
  }

  _validateSingleAccount(accounts){
    const error = this._validateAccount(accounts[0]);

    if(error){
      this._errorState = error;
      return;
    }

    this._goToNextStep(accounts[0]);
  }

  _validateAccount(account){
    const validation = VALIDATIONS_ERROR.find(val => val.condition(account));
    return validation ? validation.error : null;
  }

  _selectedAccount(e){
    const account = e.detail;
    const error = this._validateAccount(account);
    if(error){
      this._errorState = error;
      return;
    }
    this.selectedAccount = account;
    console.log(this.selectedAccount)
  }

  _renderErrorState() {
    const error = ES.accountsPage.errors[this._errorState];
    return html`
      <type-modal
        ?open=${true}
        variant=${CONFIG.modal.variant}
        ?scrollable=${true}
        ?fullHeight=${true}
        ?hasFooter=${false}
      >
      <div slot="body">
        <span>${error.message}</span>
        <span>${error.title}</span>
      </div>
      </type-modal>
    `;
  }

  _renderTechnicalError() {
    const error = ES.accountsPage.errors.ERROR_TECHNICAL;
    return html`
      <type-modal
        ?open=${true}
        variant=${CONFIG.modal.variant}
        ?scrollable=${true}
        ?fullHeight=${true}
        ?hasFooter=${false}
      >
      <div slot="body">
        <span>${error.message}</span>
        <span>${error.title}</span>
      </div>
      </type-modal>
    `;
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
        @select-account=${this._selectedAccount}
      ></account-list>
    `
  }

  render(){
    return html`
      ${this._loading ? this._renderLoading() : html`
        <type-modal
          ?open=${true}
          variant=${CONFIG.modal.variant}
          ?scrollable=${true}
          ?full-height=${true}
          ?has-footer=${true}
          class="modal-accounts"
        >
          <type-header
            slot="header"
            .title=${ES.accountsPage.header.title}
            .subtitle=${ES.accountsPage.header.subtitle}
          ></type-header>

          <div slot="body">
              ${this._renderAccountsList()}
          </div>
          <info-card
            slot="footer"
            .message=${ES.accountsPage.messageSecurity}
            icon-name=${CONFIG.infoCard.iconName}
            class="info-card"
          ></info-card>
        </type-modal>
      `}
      ${this._error ? this._renderTechnicalError() : nothing}
      ${this._errorState ? this._renderErrorState() : nothing}
    `;
  }

}

customElements.define("accounts-page", AccountsPage);