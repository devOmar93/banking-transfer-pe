import { html, LitElement, nothing } from "lit";
import "../../compositions/type-modal/type-modal.js";
import "../../compositions/type-header/type-header.js";
import "./compositions/from-account-card/from-account-card.js";
import "./compositions/transfer-form/transfer-form.js";
import { TRANSFER_FORM_FIELDS } from "../../utils/transfer-form/configTransferForm.js";
import { resolveDestinationAccount } from "../../services/bankingTransferService.js";
import "../../components/loading-overlay/loading-overlay.js";
import "../../compositions/type-button/type-button.js";
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
    console.log("formField", formField);
  }

  async _getDestinationAccountDetails(accountCustomer) {
    const responseDestinationAccount =
      await resolveDestinationAccount(accountCustomer);
    console.log("responseDestinationAccount", responseDestinationAccount);
  }

  _getCurrency(currency) {
    if (currency === "USD") {
      return "dollar-sign";
    }
    if (currency === "PEN") {
      return "dollar-sign";
    }
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

  static get styles() {
    return styles;
  }

  render() {
    return html`
      ${this._loading ? html`<loading-overlay></loading-overlay>` : nothing}
      <type-modal
        ?open=${true}
        variant="page"
        ?scrollable=${true}
        ?full-height=${true}
        ?has-footer=${true}
        class="modal-accounts"
      >
        <div slot="header">
          <type-button
            class="container-button"
            icon-name="arrow-left"
            icon-position="left"
            text="Volver"
            variant="secondary"
            .type=${"button"}
            @click=${this._returnPage}
          ></type-button>
          <type-header
            .title=${"Nueva Transferencia"}
            .subtitle=${"Complete los datos de la transferencia"}
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
