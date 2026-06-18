import { html, LitElement } from "lit";
import "@/compositions/type-modal/type-modal.js";
import "@/compositions/type-header/type-header.js";
import "@/compositions/info-card/info-card.js";
import "./compositions/account-list/account-list.js";
import { styles } from "./accounts-page.css.js";
import {
  ACCOUNTS_PAGE_ES as ES,
  ACCOUNTS_PAGE_CONFIG as CONFIG,
  STATES,
  PROCESS_ACCOUNT_RULES,
} from "@/page/accounts-page/utils/accounts.config.js";
import {
  processAccounts,
  filterTopAccounts,
  validateAccount,
} from "@/page/accounts-page/utils/accounts.utils.js";
import { fireEvent } from "@/utils/utils.js";

export class AccountsPage extends LitElement {
  static properties = {
    /**
     * Holds the raw accounts data received from the parent component
     * @type {Array}
     * @default []
     */
    data: { type: Array },

    /**
     * Open modal
     * @type {Boolean}
     * @default false
     */
    open: { type: Boolean },

    /**
     * Controls whether the action modal is visible in the UI
     * @type {boolean}
     * @default false
     * @private
     */
    _actionModalOpen: { 
      type: Boolean,
      state: true
    },

    /**
     * Defines which type of action modal should be displayed
     * @type {string}
     * @default ""
     * @private
     */
    _actionType: { 
      type: String,
      state: true 
    },

    /**
     * Contains the processed accounts ready to be rendered in the UI
     * @type {Array}
     * @default []
     * @private
     */
    _accountsProcessed: { 
      type: Array,
      state: true 
    },
  };

  constructor() {
    super();
    this.data = [];
    this._actionModalOpen = false;
    this._actionType = "";
    this._accountsProcessed = [];
    this.open = false;
  }

  static styles = styles;

  willUpdate(changedProps) {
    if (this.open && changedProps.has("data")) {
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
      this._accountsProcessed = result.accounts;
      const actionType = this._mapErrorStateToActionType(result.errorState);
      fireEvent(this, "accounts-error", { 
        actionType,
        initialError: true 
      });
      return;
    }

    if (result.singleAccount) {
      this._accountsProcessed = [result.singleAccount];
      return this._validateSingleAccount(result.singleAccount, true);
    }
    this._accountsProcessed = result.accounts;
  }

  _goToNextStep(account) {
    fireEvent(this, "account-validated", { account });
  }

  _validateSingleAccount(account, isInitial = false) {
    const error = validateAccount(
      account,
      STATES.SUCCESS.ACTIVE,
      STATES.ERROR_TYPES,
    );

    if (error) {
      const actionType = this._mapErrorStateToActionType(error);
      fireEvent(this, "accounts-error", { 
        actionType,
        ...(isInitial && { initialError: true })
      });
      return;
    }

    this._goToNextStep(account);
  }

  _handleAccountSelected({detail}) {
    const account = detail.account;
    this._validateSingleAccount(account);
  }

  _mapErrorStateToActionType(errorState) {
    return STATES.ERROR_MODAL_TYPES[errorState] || "loadAccountsError";
  }

  _renderAccountsList() {
    return html`
      <account-list
        .accounts=${this._accountsProcessed ?? []}
        @account-selected=${this._handleAccountSelected}
      ></account-list>
    `;
  }

  render() {
    return html`
      <type-modal
        ?open=${this.open}
        ?scrollable=${true}
        ?hide-scrollbar=${true}
        ?full-height=${true}
        ?has-footer=${true}
        class="modal-accounts"
        aria-label=${ES.modal}
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
    `;
  }
}

customElements.define("accounts-page", AccountsPage);
