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
import styles from "./new-transfer-page.css.js";
export class NewTransferPage extends LitElement {
  static properties = {
    accountCustomer: {
      type: Object,
    },

    _loading: {
      type: Boolean,
    },
  };

  constructor() {
    super();
    this.accountCustomer = {};
    this._loading = false;
  }

  async _sendForm(event) {
    const accountCustomer = this.accountCustomer.accountNumber;
    this._loading = true;
    const responseDestinationAccount =
      await resolveDestinationAccount(accountCustomer);
    this._loading = false;
    if (responseDestinationAccount.success) {
      const formField = {
        ...event.detail,
        ...this.accountCustomer,
        destinationAccountName:
          responseDestinationAccount.data.accountHolderName,
        destinationAccountCurrency: responseDestinationAccount.data.currency,
      };

      return this._goNextStep(formField);
    }

    return this._openModalError(responseDestinationAccount.error);
  }

  _openModalError(configModal) {
    console.log("configModal", configModal);
  }

  _goNextStep(formField) {
    //console.log("formField", formField);
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

  async _getDestinationAccountDetails(accountCustomer) {
    const responseDestinationAccount =
      await resolveDestinationAccount(accountCustomer);
    console.log("responseDestinationAccount", responseDestinationAccount);
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

  _renderActionModal() {
    return html`
      <action-modal
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
            @form-submit="${this._sendForm}"
          ></transfer-form>
        </div>
      </type-modal>
    `;
  }
}

customElements.define("new-transfer-page", NewTransferPage);
/*<from-account-card></from-account-card>*/
