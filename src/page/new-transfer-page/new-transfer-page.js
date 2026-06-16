import { html, LitElement, nothing } from "lit";
import "@/compositions/type-modal/type-modal.js";
import "@/compositions/type-header/type-header.js";
import "@/page/action-modal/action-modal.js";
import "@/page/new-transfer-page/compositions/from-account-card/from-account-card.js";
import "@/page/new-transfer-page/compositions/transfer-form/transfer-form.js";
import "@/compositions/type-button/type-button.js";
import { TRANSFER_FORM_FIELDS } from "@/page/new-transfer-page/compositions/transfer-form/utils/configTransferForm.js";
import {
  NEW_TRANSFER_PAGE_LITERALS as LITERALS,
  NEW_TRANSFER_PAGE_CONFIG as CONFIG,
} from "@/page/new-transfer-page/utils/newTransferPageConfig.js";
import "@/page/action-modal/action-modal.js";
import { fireEvent } from "@/utils/utils";
import styles from "./new-transfer-page.css.js";

export class NewTransferPage extends LitElement {
  static properties = {
    accountCustomer: {
      type: Object,
    },

    destinationAccount: {
      type: Object,
    },

    dataForm: {
      type: Object,
    },

    _sourceAccount: {
      type: Object,
    },

    _actionType: {
      type: String,
    },

    _actionModalOpen: {
      type: Boolean,
    },
  };

  constructor() {
    super();
    this.accountCustomer = {};
    this._sourceAccount = {};
    this._actionType = "";
    this._actionModalOpen = false;
    this._retryCount = 0;
    this.destinationAccount = {};
    this.dataForm = {};
  }

  willUpdate(changedProperties) {
    if (
      changedProperties.has("destinationAccount") &&
      Object.keys(this.destinationAccount).length > 0
    ) {
      if (this.destinationAccount.status === "ACTIVE") {
        const finalPayload = {
          sourceAccount: this._sourceAccount,
          destinationAccount: this.destinationAccount,
        };

        return this._goNextStep(finalPayload);
      }
      this._openModalError(this.destinationAccount.status);
    }
  }

  _dispatchGetdestinationAccount(data) {
    fireEvent(this, "get-account-destinatari", data);
  }

  _handleFormSubmit({ detail }) {
    this.dataForm = detail;
    const sourceAccount = {
      ...this.accountCustomer,
      amount: this.dataForm.amount,
    };
    this._sourceAccount = sourceAccount;
    this._dispatchGetdestinationAccount(this.dataForm.destinationAccount);
  }

  _openModalError(idErrorModalType) {
    this._actionType = this._getActionModalType(idErrorModalType);
    this._actionModalOpen = true;
  }

  _getActionModalType(idErrorModalType) {
    const ERROR_MODAL_TYPES = {
      BLOCKED: "blockedAccount",
      INACTIVE: "inactiveAccount",
      NO_BALANCE: "insufficientBalance",
      NO_ACCOUNTS: "noAccountsAvailable",
      ALL_NO_BALANCE: "insufficientBalance",
    };

    return ERROR_MODAL_TYPES[idErrorModalType] ?? "";
  }

  _goNextStep(transferData) {
    this.dispatchEvent(
      new CustomEvent("confirm-requested", {
        detail: transferData,
        bubbles: true,
        composed: true,
      }),
    );
  }

  _getCurrency(currency) {
    const listCurrency = {
      USD: "dollar-sign",
      PEN: "dollar-sign",
    };
    return listCurrency[currency] ?? "dollar-sign";
  }

  _returnPage() {
    this.dispatchEvent(
      new CustomEvent("return-page", {
        detail: { step: 0 },
        bubbles: true,
        composed: true,
      }),
    );
  }
  _handleActionModalAction(event) {
    this._actionType = "";
    this._actionModalOpen = false;
    if (event.detail.buttonAction === "retry") {
      this._retryCount += 1;
      return this._dispatchGetdestinationAccount(this._sourceAccount);
    }
    this._retryCount = 0;
  }

  _renderActionModal() {
    return html`
      <action-modal
        role="alertdialog"
        aria-modal="true"
        aria-live="assertive"
        ?open=${true}
        action-type=${this._actionType}
        @action-modal-action=${this._handleActionModalAction}
      ></action-modal>
    `;
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <type-modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        class="modal-page-primary"
        ?open=${true}
        .variant=${CONFIG.modal.variant}
        ?scrollable=${CONFIG.modal.scrollable}
        ?full-height=${CONFIG.modal.fullHeight}
        ?has-footer=${CONFIG.modal.hasFooter}
      >
        <div slot="header">
          <type-button
            class="container-button"
            icon-name=${CONFIG.backButton.iconName}
            icon-position=${CONFIG.backButton.iconPosition}
            .text=${LITERALS.backButton.text}
            .variant=${CONFIG.backButton.variant}
            .type=${CONFIG.backButton.type}
            aria-label="Volver a la pantalla anterior"
            @click=${this._returnPage}
          ></type-button>

          <type-header
            id="modal-title"
            .title=${LITERALS.header.title}
            .subtitle=${LITERALS.header.subtitle}
          ></type-header>
        </div>

        <div slot="body" class="container-body">
          <from-account-card
            .account=${this.accountCustomer}
            .fromLabel=${LITERALS.fromAccountCard.fromLabel}
            .availableBalanceLabel=${LITERALS.fromAccountCard
              .availableBalanceLabel}
            .emptyAccountText=${LITERALS.fromAccountCard.emptyAccountText}
          ></from-account-card>
          <transfer-form
            aria-label="Formulario de transferencia"
            .configFormFields=${TRANSFER_FORM_FIELDS}
            .availableBalance=${this.accountCustomer.availableBalance}
            .currency=${this._getCurrency(this.accountCustomer.currency)}
            @form-submit="${this._handleFormSubmit}"
          ></transfer-form>
        </div>
      </type-modal>
      ${this._actionModalOpen ? this._renderActionModal() : nothing}
    `;
  }
}

customElements.define("new-transfer-page", NewTransferPage);
