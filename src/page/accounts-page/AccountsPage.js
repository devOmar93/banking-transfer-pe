import { html, LitElement, nothing } from "lit";
import { styles } from "./accounts-page.css.js";
import "@compositions/type-header/type-header.js";
import "./compositions/account-list/account-list.js";
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
     * Holds the raw accounts data received from the parent component
     * @type {Array}
     */
    data: { type: Array },

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
    this.data = [];
    this._actionModalOpen = false;
    this._actionType = "";
    this._isInitialError = false;
    this._accountsProcessed = [];
  }

  static styles = styles;

  willUpdate(changedProps) {
    if (changedProps.has("data")) {
      this._loadAccounts();
    }
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

  _closeActionModal() {
    console.log("cerrar")
    if(this._isInitialError) {
      this._isInitialError = false;
      this._goToExitStep();
      return;
    }

    this._actionModalOpen = false;
    this._actionType = "";
  }

  _renderActionModal() {
    return html`
      <action-modal
        ?open=${true}
        action-type=${this._actionType}
        @action-modal-action=${this._closeActionModal}
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
          
      ${this._actionModalOpen ? this._renderActionModal() : nothing}
    `;
  }
}

customElements.define("accounts-page", AccountsPage);
