import { html, LitElement, nothing } from "lit";
import { styles } from "./accounts-page.css.js";
import "@compositions/type-modal/type-modal.js";
import "@compositions/type-header/type-header.js";
import "./compositions/account-list/account-list.js";
import "@components/loading-overlay/loading-overlay.js";
import "@compositions/info-card/info-card.js";
import { ACCOUNTS_BASE_CASE } from "@mocks/accounts.mock.js";
import { getAccounts } from "@services/accounts.service.js";
import { ACCOUNTS_PAGE_ES as ES, ACCOUNTS_PAGE_CONFIG as CONFIG, STATES, PROCESS_ACCOUNT_RULES } from "@utils/accounts-page/accounts.config.js";
import { processAccounts, filterTopAccounts, validateAccount } from "@utils/accounts-page/accounts.utils.js";
import { fireEvent } from "@utils/utils.js";

export class AccountsPage extends LitElement {
  static properties = {
    accounts: {type: Array},
    _loading: {type: Boolean},
    _error: {type: Boolean},
    _errorState: {type: String},
  }

  constructor(){
    super();
    this.accounts = [];
    this._loading = false;
    this._error = false;
    this._errorState = "";
  }

  static styles = styles;

  connectedCallback() {
    super.connectedCallback();
    this._loading = true;
  }

  async firstUpdated() {
    try {
      const { accounts } = await getAccounts(ACCOUNTS_BASE_CASE);
      const filteredAccounts = filterTopAccounts(accounts, CONFIG.accounts.limit, STATES.SUCCESS.ACTIVE);
      const result = processAccounts(filteredAccounts, PROCESS_ACCOUNT_RULES);
    
      if (result.errorState) {
        this._errorState = result.errorState;
        return;
      }

      if (result.singleAccount) {
        this._validateSingleAccount(result.singleAccount);
        return;
      }

      this.accounts = result.accounts;
    } catch {
      this._error = true;
    } finally {
      this._loading = false;
    }
  }

  _goToNextStep(account) {
    fireEvent(this, 'account', account);
  }

  _validateSingleAccount(account){
    const error = validateAccount(account, STATES.SUCCESS.ACTIVE, STATES.ERROR_TYPES);

    if(error){
      this._errorState = error;
      return;
    }

    this._goToNextStep(account);
  }

  _validateAccount(account) {
    return this._getStatusError(account) ?? this._getBalanceError(account);
  }

  _getStatusError(account) {
    return account.status !== STATES.SUCCESS.ACTIVE
      ? STATES.ERROR_TYPES[account.status]
      : null;
  }

  _getBalanceError(account) {
    return account.availableBalance === 0
      ? STATES.ERROR_TYPES.NO_BALANCE
      : null;
  }

  _selectedAccount(e){
    const account = e.detail;
    this._validateSingleAccount(account)
  }

  _renderErrorState() {
    const error = ES.errors[this._errorState];
    return html`
      <type-modal
        ?open=${true}
        variant=${CONFIG.modal.variant}
        ?scrollable=${true}
        ?fullHeight=${true}
        ?hasFooter=${false}
      >
      <div slot="body">
        <type-text .text=${error.title}></type-text>
        <type-text .text=${error.message}></type-text>
      </div>
      </type-modal>
    `;
  }

  _renderTechnicalError() {
    const error = ES.errors.ERROR_TECHNICAL;
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
      ${this._loading 
        ? html`<loading-overlay></loading-overlay>` 
        : html`
        <type-modal
          ?open=${true}
          ?scrollable=${true}
          ?full-height=${true}
          ?has-footer=${true}
          class="modal-accounts"
        >
          <type-header
            slot="header"
            .title=${ES.header.title}
            .subtitle=${ES.header.subtitle}
          ></type-header>

          <div slot="body">
              ${this._renderAccountsList()}
          </div>
          <info-card
            slot="footer"
            .message=${ES.messageSecurity}
            ?hasIcon=${true}
          ></info-card>
        </type-modal>
      `}
      ${this._error ? this._renderTechnicalError() : nothing}
      ${this._errorState ? this._renderErrorState() : nothing}
    `;
  }

}

customElements.define("accounts-page", AccountsPage);