import { html, LitElement, nothing } from "lit";
import { styles } from "./accounts-page.css.js";
import "@compositions/type-modal/type-modal.js";
import "@compositions/type-header/type-header.js";
import "./compositions/account-list/account-list.js";
import "@components/loading-overlay/loading-overlay.js";
import "@compositions/info-card/info-card.js";
import "../action-modal/action-modal.js";
import {
  ACCOUNTS_PAGE_ES as ES,
  ACCOUNTS_PAGE_CONFIG as CONFIG,
  STATES,
  PROCESS_ACCOUNT_RULES,
} from "@utils/accounts-page/accounts.config.js";
import {
  processAccounts,
  filterTopAccounts,
  validateAccount,
} from "@utils/accounts-page/accounts.utils.js";
import { fireEvent } from "@utils/utils.js";

export class AccountsPage extends LitElement {
  static properties = {
    /**
     * Represents the current state of the accounts flow (idle, loading, success, empty, error)
     * @type {string}
     */
    status: { type: String },

    /**
     * Holds the raw accounts data received from the parent component
     * @type {Array}
     */
    data: { type: Array },

    /**
     * Stores the business error code generated during account processing
     * @type {string}
     * @private
     */
    _errorState: { type: String },

    /**
     * Controls whether the action modal is visible in the UI
     * @type {boolean}
     * @private
     */
    _actionModalOpen: { type: Boolean },

    /**
     * Defines which type of action modal should be displayed
     * @type {string}
     * @private
     */
    _actionType: { type: String },

    /**
     * Counts how many retry attempts have been made after failures
     * @type {number}
     * @private
     */
    _retryCount: { type: Number },

    /**
     * Indicates if the error occurred during the initial load of accounts
     * @type {boolean}
     * @private
     */
    _isInitialError: { type: Boolean },

    /**
     * Contains the processed accounts ready to be rendered in the UI
     * @type {Array<any>}
     * @private
     */
    _accountsProcessed: { type: Array },
  };

  constructor() {
    super();
    this.status = "";
    this._errorState = "";
    this._actionModalOpen = false;
    this._actionType = "";
    this._retryCount = 0;
    this._isInitialError = false;
    this._accountsProcessed = [];
  }

  static styles = styles;

  willUpdate(changedProperties) {
    if (!changedProperties.has("status")) return;
    this._processIfNeeded();
  }

  _processIfNeeded() {
    const action = {
      success: () => this._loadAccounts(),
      empty: () => this._loadAccounts(),
      error: () => this._handleError(),
    }[this.status];

    action?.();
  }

  _handleError() {
    this._retryCount += 1;
    const actionType =
      this._retryCount >= 3 ? "finalError" : "loadAccountsError";
    this._showActionModal(actionType);
  }

  _loadAccounts() {
    const result = this._processAccounts();
    this._handleProcessResult(result);
  } 
  
  _processAccounts() {
    const filteredAccounts = filterTopAccounts(
      this.data,
      CONFIG.accounts.limit,
      STATES.SUCCESS.ACTIVE,
    );

    return processAccounts(filteredAccounts, PROCESS_ACCOUNT_RULES);
  }

  
  _handleProcessResult(result) {
    if (result.errorState) {
      this._errorState = result.errorState;
      this._isInitialError = true;
      this._accountsProcessed = result.accounts;
      return this._showActionModal(
          this._mapErrorStateToActionType(result.errorState),
        );
    }

    if (result.singleAccount) {
      this._accountsProcessed = [result.singleAccount];
      return this._validateSingleAccount(result.singleAccount, true);
    }
    this._accountsProcessed = result.accounts;
    this._retryCount = 0;
  }

  _goToNextStep(account) {
    fireEvent(this, "account", account);
  }
  
  _goToExitStep() {
    fireEvent(this, "exit", { step: 4 });
  }

  _validateSingleAccount(account, isInitial = false) {
    const error = validateAccount(
      account,
      STATES.SUCCESS.ACTIVE,
      STATES.ERROR_TYPES,
    );

    if (error) {
      this._errorState = error;
      this._isInitialError = isInitial;
      this._showActionModal(this._mapErrorStateToActionType(error));
      return;
    }

    this._goToNextStep(account);
  }

  _selectedAccount(e) {
    const account = e.detail;
    this._validateSingleAccount(account);
  }

   _mapErrorStateToActionType(errorState) {
    return (
      STATES.ERROR_MODAL_TYPES[errorState] || "loadAccountsError"
    );
  }

  _showActionModal(actionType) {
    this._actionType = actionType;
    this._actionModalOpen = true;
  }

  showActionModal(actionType) {
    this._showActionModal(actionType);
  }

  _closeActionModal() {
    if(this._isInitialError || this._retryCount === 3) {
      this._goToExitStep();
      return;
    }

    this._actionModalOpen = false;
    this._actionType = "";
  }

  _handleActionModalAction(e) {
    const { buttonAction } = e.detail;
    if (buttonAction === "retry") {
      this._actionModalOpen = false;
      this._actionType = "";
      this._requestRetry();
      return;
    }
    this._closeActionModal();
  }

  _requestRetry(){
    fireEvent(this, "retry-accounts");
  }

  _renderActionModal() {
    return html`
      <action-modal
        action-type=${this._actionType}
        @action-modal-action=${this._handleActionModalAction}
      ></action-modal>
    `;
  }

  _renderAccountsList() {
    return html`
      <account-list
        .accounts=${this._accountsProcessed ?? []}
        @select-account=${this._selectedAccount}
      ></account-list>
    `;
  }

  render() {
    return html`
      ${this.status === "loading"
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

              <div slot="body">${this._renderAccountsList()}</div>
              <info-card
                slot="footer"
                .message=${ES.messageSecurity}
                ?hasIcon=${true}
              ></info-card>
            </type-modal>
          `}
      ${this._actionModalOpen ? this._renderActionModal() : nothing}
    `;
  }
}

customElements.define("accounts-page", AccountsPage);
