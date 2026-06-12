import { html, LitElement, nothing } from "lit";
import "../../compositions/type-modal/type-modal.js";
import "../../compositions/type-header/type-header.js";
import "./compositions/from-account-card/from-account-card.js";
import "./compositions/transfer-form/transfer-form.js";
import { TRANSFER_FORM_FIELDS } from "../../utils/transfer-form/configTransferForm.js";
import { resolveDestinationAccount } from "../../services/bankingTransferService.js";
import "../../components/loading-overlay/loading-overlay.js";
import "../../compositions/type-button/type-button.js";
import {
  NEW_TRANSFER_PAGE_LITERALS as LITERALS,
  NEW_TRANSFER_PAGE_CONFIG as CONFIG,
} from "@utils/new-transfer-page/newTransferPageConfig.js";

import "../action-modal/action-modal.js";
import styles from "./new-transfer-page.css.js";
export class NewTransferPage extends LitElement {
  static properties = {
    accountCustomer: {
      type: Object,
    },

    _lastFormPayload: {
      type: Object,
    },

    _loading: {
      type: Boolean,
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
    this._lastFormPayload = {};
    this._loading = false;
    this._actionType = "";
    this._actionModalOpen = false;
    this._retryCount = 0;
  }

  async _sendForm(lastFormPayload) {
    this._loading = true;
    const responseDestinationAccount = await resolveDestinationAccount(
      this._lastFormPayload.accountNumber,
      this._lastFormPayload.destinationAccount,
    );
    this._loading = false;
    if (responseDestinationAccount.status === "OK") {
      const finalFormPayload = {
        ...lastFormPayload,
        destinationAccountName:
          responseDestinationAccount.data.accountHolderName,
        destinationAccountCurrency: responseDestinationAccount.data.currency,
      };

      return this._goNextStep(finalFormPayload);
    }

    if (this._retryCount < 3) {
      return this._openModalError(responseDestinationAccount.errorCode);
    }
    this._returnPage();
  }

  _handleFormSubmit(event) {
    const lastFormPayload = {
      ...event.detail,
      ...this.accountCustomer,
    };
    this._lastFormPayload = lastFormPayload;
    this._sendForm(lastFormPayload);
  }

  _openModalError(configModal) {
    this._actionType = configModal;
    this._actionModalOpen = true;
  }

  _goNextStep(formField) {
    const transferData = {
      amount: formField.amount,
      currency: formField.currency,
      sourceAccount: {
        accountName: formField.accountName,
        accountNumber: formField.accountNumber,
        accountType: formField.accountType,
        availableBalance: formField.availableBalance,
      },
      beneficiary: {
        fullName: formField.destinationAccountName,
        accountNumber: formField.destinationAccount,
      },
    };

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
        detail: 0,
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
      return this._sendForm(this._lastFormPayload);
    }
    this._retryCount = 0;
  }

  _renderActionModal() {
    return html`
      <action-modal
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
      ${this._loading ? html`<loading-overlay></loading-overlay>` : nothing}
      <type-modal
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
            @click=${this._returnPage}
          ></type-button>
          <type-header
            .title=${LITERALS.header.title}
            .subtitle=${LITERALS.header.subtitle}
          ></type-header>
        </div>

        <div slot="body" class="container-body">
          <from-account-card
            .account=${this.accountCustomer}
          ></from-account-card>
          <transfer-form
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
