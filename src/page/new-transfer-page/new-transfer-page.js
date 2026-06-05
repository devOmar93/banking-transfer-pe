import { html, LitElement, nothing } from "lit";
import "../../compositions/type-modal/type-modal.js";
import "../../compositions/type-header/type-header.js";
import "./compositions/from-account-card/from-account-card.js";
import "./compositions/transfer-form/transfer-form.js";
import { TRANSFER_FORM_FIELDS } from "../../utils/transfer-form/configTransferForm.js";
import { resolveDestinationAccount } from "../../services/bankingTransferService.js";
import "../../components/loading-overlay/loading-overlay.js";

//import styles from "./new-transfer-page.css.js";
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
    this.accountCustomer = {
      availableBalance: 100,
      accountNumber: 45151515151515,
      currency: "USD",
    };
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
        <type-header
          slot="header"
          .title=${"Nueva Transferencia"}
          .subtitle=${"Complete los datos de la transferencia"}
        ></type-header>

        <div slot="body">
          <from-account-card></from-account-card>
          <transfer-form
            .configFormFields=${TRANSFER_FORM_FIELDS}
            .availableBalance=${this.accountCustomer.availableBalance}
            @form-submit="${this._sendForm}"
          ></transfer-form>
        </div>
      </type-modal>
    `;
  }
}

customElements.define("new-transfer-page", NewTransferPage);
/*<from-account-card></from-account-card>*/
