import { LitElement, html } from "lit";
import "@/compositions/transfer-summary-card/transfer-summary-card.js";
import "@/compositions/type-button/type-button.js";
import "@/compositions/type-modal/type-modal.js";
import "@/compositions/info-card/info-card.js";
import { fireEvent } from "@/utils/utils.js";
import { formatAmount } from "@/utils/format.js";
import { generateTransferSummaryPdf } from "./services/generate-transfer-summary-pdf.js";
import styles from "./successful-transfer-page.css.js";

/**
 * SuccessfulTransferPage component.
 * Displays the summary details of a successful banking transfer, allowing the user to download a PDF receipt, share the transaction status, or initiate a new transfer.
 * * @element successful-transfer-page
 */
export class SuccessfulTransferPage extends LitElement {
  static properties = {
    /**
     * Localization string for the page, used to display text in different languages based on user preference.
     * @type {Object}
     * @default {}
     */
    locale: {
      type: Object,
    },
    /**
     * Type of currency symbol or code (e.g., S/, $) currently being used.
     * @type {String}
     * @default ""
     */
    currency: {
      type: String,
    },
    /**
     * The monetary amount transferred.
     * @type {String}
     * @default ""
     */
    amount: {
      type: String,
    },
    /**
     * Unique transaction operation or voucher number.
     * @type {String}
     * @default ""
     */
    transactionNumber: {
      type: String,
    },
    /**
     * Time string when the transaction occurred (e.g., "11:30").
     * @type {String}
     * @default ""
     */
    time: {
      type: String,
    },
    /**
     * Date string when the transaction occurred (e.g., "16/06/2026").
     * @type {String}
     * @default ""
     */
    date: {
      type: String,
    },
    /**
     * The name/alias of the source bank account.
     * @type {String}
     * @default ""
     */
    originAccount: {
      type: String,
    },
    /**
     * The account number of the source bank account.
     * @type {String}
     * @default ""
     */
    originAccountNumber: {
      type: String,
    },
    /**
     * First name of the transfer beneficiary.
     * @type {String}
     * @default ""
     */
    beneficiaryName: {
      type: String,
    },
    /**
     * Last name of the transfer beneficiary.
     * @type {String}
     * @default ""
     */
    beneficiaryLastName: {
      type: String,
    },
    /**
     * Flag or object checking if the raw application data is fully loaded and ready.
     * @type {Boolean}
     * @default false
     */
    isDataReady: {
      type: Boolean,
    },
    /**
     * Controls the visibility state of the primary transfer modal page.
     * @type {Boolean}
     * @default false
     */
    isOpen: {
      type: Boolean,
    },
    /**
     * Internal state determining if the secondary sharing option dialog is visible.
     * @type {Boolean}
     * @default false
     * @private
     */
    _showShareModal: {
      type: Boolean, state: true
    },
  };

  constructor() {
    super();
    this.locale = {};
    this.currency = "";
    this.amount = "";
    this.transactionNumber = "";
    this.time = "";
    this.date = "";
    this.originAccount = "";
    this.originAccountNumber = "";
    this.beneficiaryName = "";
    this.beneficiaryLastName = "";
    this.status = "";
    this.isDataReady = false;
    this.isOpen = false;
    this._showShareModal = false;
  }

  static styles = styles;

  get _formattedAmount() {
    return formatAmount(this.amount, this.currency);
  }

  /**
   * Compiles transaction data and triggers the third-party PDF service download wrapper.
   * If an exception occurs, a generic error event is dispatched to the application layout.
   * * @private
   */
  _handleDownload() {
    const dataPdf = [
      {
        label: this.locale["successful-transfer-page-transaction-number"],
        value: this.transactionNumber,
      },
      {
        label: this.locale["successful-transfer-page-date"],
        value: this.date,
      },
      {
        label: this.locale["successful-transfer-page-time"],
        value: this.time,
      },
      {
        label: this.locale["successful-transfer-page-origin-account"],
        value: `${this.originAccount} - ${this.originAccountNumber}`,
      },
      {
        label: this.locale["successful-transfer-page-beneficiary"],
        value: `${this.beneficiaryName} ${this.beneficiaryLastName}`,
      },
      {
        label: this.locale["successful-transfer-page-status"],
        value: this.status,
      },
    ];
    try {
      generateTransferSummaryPdf(this._formattedAmount, dataPdf);
    } catch (error) {
      fireEvent(this, "error-retry", {
        title: "Error al descargar el PDF",
        message: error.message,
      });
    }
  }

  /**
   * Updates state to display the native share dialogue modal and opens it safely after Lit updates DOM.
   * * @private
   */
  _handleShare() {
    this._showShareModal = true;
    this.updateComplete.then(() => {
      const dialog = this.renderRoot.querySelector("#shareDialog");
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    });
  }

  /**
   * Closes the active native sharing dialog element and resets visibility state trackers.
   * * @private
   */
  _closeShareModal() {
    const dialog = this.renderRoot.querySelector("#shareDialog");
    if (dialog && dialog.open) {
      dialog.close();
    }
    this._showShareModal = false;
  }

  /**
   * Handles navigation back to the app home dashboard view by bubbling up a custom global event.
   * Resets open modal attributes.
   * * @private
   */
  _handleNewTransfer() {
    this.dispatchEvent(
      new CustomEvent("return-home", {
        detail: 0,
        bubbles: true,
        composed: true,
      }),
    );
    this.isOpen = false;
  }

  render() {
    return html`
      <type-modal
        class="modal-page-primary"
        .open=${this.isOpen}
        .scrollable=${true}
        .hideScrollbar=${true}
        .hasFooter=${true}
        aria-label=${this.locale["successful-transfer-page-modal-aria"]}
      >
        <div class="modal-body" slot="body">
          <div class="header">
            <type-icon
              name="success"
              size="xl"
              .iconName=${"check-circle"}
              .variant=${"default"}
            ></type-icon>
            <type-text
              .text=${this.locale["successful-transfer-page-title"]}
              tag="h1"
              weight="bold"
              size="sl"
              align="center"
            ></type-text>
            <type-text
              .text=${this.locale["successful-transfer-page-subtitle"]}
              tag="p"
              size="m"
              align="center"
            ></type-text>
          </div>
          <transfer-summary-card
            .locale=${this.locale}
            .currency=${this.currency}
            .amount=${this.amount}
            .transactionNumber=${this.transactionNumber}
            .date=${this.date}
            .time=${this.time}
            .originAccount=${this.originAccount}
            .originAccountNumber=${this.originAccountNumber}
            .beneficiaryName=${this.beneficiaryName}
            .beneficiaryLastName=${this.beneficiaryLastName}
            .status=${this.status}
          ></transfer-summary-card>
          <div class="actions">
            <type-button
              icon-name="download"
              icon-position="left"
              text=${this.locale["successful-transfer-page-download-button"]}
              variant="secondary"
              type="button"
              @click=${this._handleDownload}
            ></type-button>
            <type-button
              icon-name="share-2"
              icon-position="left"
              text=${this.locale["successful-transfer-page-share-button"]}
              variant="secondary"
              type="button"
              @click=${this._handleShare}
            ></type-button>
          </div>
          <type-button
            icon-name="house"
            icon-position="left"
            text=${this.locale["successful-transfer-page-new-transfer-button"]}
            variant="default"
            type="button"
            @click=${this._handleNewTransfer}
          ></type-button>
          <info-card
            .message=${this.locale["successful-transfer-page-message"]}
            .messageSize=${"xs"}
            ?hasIcon=${false}
          >
          </info-card>
        </div>
      </type-modal>
      <type-modal 
        ?open=${this._showShareModal} 
        variant="dialog">
        <div slot="header">
          <type-text
            .text=${this.locale["successful-transfer-page-share-modal-title"]}
            weight="bold"
            tag="h1"
            size="m"
          ></type-text>
          <type-text
            .text=${this.locale[
              "successful-transfer-page-share-modal-subtitle"
            ]}
            tag="p"
            size="s"
          ></type-text>
        </div>
        <div slot="body">
          <div class="alert-footer">
            <type-button
              .text=${this.locale[
                "successful-transfer-page-share-modal-accept-button"
              ]}
              variant="default"
              type="button"
              @click=${this._closeShareModal}
              .iconPosition=${"left"}
            ></type-button>
          </div>
        </div>
      </type-modal>
    `;
  }
}
customElements.define("successful-transfer-page", SuccessfulTransferPage);
