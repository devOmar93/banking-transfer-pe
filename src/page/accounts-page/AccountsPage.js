import { html, LitElement, nothing } from "lit";
import { styles } from "./accounts-page.css.js";
import "@compositions/type-modal/type-modal.js";
import "@compositions/type-header/type-header.js";
import "./compositions/account-list/account-list.js";
import "@components/loading-overlay/loading-overlay.js";
import "@compositions/info-card/info-card.js";
import "../action-modal/action-modal.js";
import { ACCOUNTS_CASE_1 } from "@mocks/accounts.mock.js";
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
    accounts: { type: Array },
    loading: { type: Boolean },
    error: { type: Boolean },
    _errorState: { type: String },

    _actionModalOpen: { type: Boolean },
    _actionType: { type: String },
    _retryCount: { type: Number },

    _isInitialError: { type: Boolean },
    _accountsProcessed: { type: Array },
  };

  constructor() {
    super();
    this._accounts = [];
    this.loading = false;
    this.error = false;
    this._errorState = "";
    this._actionModalOpen = false;
    this._actionType = "";
    this._retryCount = 0;
    this._isInitialError = false;
    this._accountsProcessed = [];
  }

  static styles = styles;

set accounts(value) {
  const old = this._accounts;
  this._accounts = value;
  this.requestUpdate("accounts", old);

 
   
console.log("Cuentas actualizadas:", this._accounts);
console.log("Loading:", this.loading);
if (!this.loading) {
    this._loadAccounts();
  }


}

get accounts() {
  return this._accounts;
}



  _loadAccounts() {
    this._actionModalOpen = false;
    this._actionType = "";

    try {
      const filteredAccounts = filterTopAccounts(
        this.accounts,
        CONFIG.accounts.limit,
        STATES.SUCCESS.ACTIVE,
      );
      const result = processAccounts(filteredAccounts, PROCESS_ACCOUNT_RULES);

      if (result.errorState) {
        this._errorState = result.errorState;
        this._isInitialError = true;
        this._showActionModal(
          this._mapErrorStateToActionType(result.errorState),
        );
        return;
      }

      if (result.singleAccount) {
        this._validateSingleAccount(result.singleAccount);
        return;
      }

      this._accountsProcessed = result.accounts;
      this._retryCount = 0;
    } catch {
      this._retryCount += 1;
      if (this._retryCount >= 3) {
        this._showActionModal("finalError");
      } else {
        this._showActionModal("loadAccountsError");
      }
    }
  }

  _goToNextStep(account) {
    fireEvent(this, "account", account);
  }
  
  _goToExitStep() {
    fireEvent(this, "exit", { step: 4 });
  }

  _validateSingleAccount(account) {
    const error = validateAccount(
      account,
      STATES.SUCCESS.ACTIVE,
      STATES.ERROR_TYPES,
    );

    if (error) {
      this._errorState = error;
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
    if(this._isInitialError) {
      this._goToExitStep();
      return;
    }
    this._actionModalOpen = false;
    this._actionType = "";
  }

  // Escucha la acción del modal y decide qué hacer según el botón pulsado.
  _handleActionModalAction(e) {
    const { buttonAction } = e.detail;
    if (buttonAction === "retry") {
      this._closeActionModal();
      this._loadAccounts();
      return;
    }

    // Para 'exit', 'cancel', 'understood' o cualquier otra acción, cerramos el modal.
    this._closeActionModal();
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
      ${this.loading
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
