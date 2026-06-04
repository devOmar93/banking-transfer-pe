import { html, LitElement, nothing } from "lit";
import { styles } from "./accounts-page.css.js";
import "@compositions/type-modal/type-modal.js";
import "@compositions/type-header/type-header.js";
import "./compositions/account-list/account-list.js";
import "@components/type-icon/type-icon.js"; 
import { accounts_base_case } from "@mocks/accounts.mock.js";
import { getAccounts } from "@services/accounts.service.js";
import { ACCOUNTS_PAGE_ES as ES, ACCOUNTS_PAGE_CONFIG as CONFIG, STATES, PROCESS_ACCOUNT_RULES } from "@utils/config-accounts-page.js";

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
      const { accounts } = await getAccounts(accounts_base_case);
      const result = this._processAccounts(this._filterTopAccounts(accounts));
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

  _processAccounts(filtered) {
    const rule = PROCESS_ACCOUNT_RULES.find(r => r.condition(filtered));

    return rule
      ? (typeof rule.result === "function"
          ? rule.result(filtered)
          : rule.result)
      : { accounts: filtered };
  }

  _filterPriorityAccounts(account) {
    const isActive = account.status === STATES.SUCCESS.ACTIVE;
    const hasBalance = account.availableBalance > 0;
    return (isActive ? 0 : 2) + (hasBalance ? 0 : 1) + 1;
  }

  _filterTopAccounts(accounts){
    return [...accounts]
      .sort((a, b) => this._filterPriorityAccounts(a) - this._filterPriorityAccounts(b))
      .slice(0, 5);
  }

  _goToNextStep(account) {
    this.dispatchEvent(new CustomEvent('account',{
      detail: account,
      bubbles: true,
      composed: true
    }))
  }

  _validateSingleAccount(account){
    const error = this._validateAccount(account);

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
    return account.amount === 0
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
        <span>${error.message}</span>
        <span>${error.title}</span>
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
            .title=${ES.header.title}
            .subtitle=${ES.header.subtitle}
          ></type-header>

          <div slot="body">
              ${this._renderAccountsList()}
          </div>
          <info-card
            slot="footer"
            .message=${ES.messageSecurity}
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