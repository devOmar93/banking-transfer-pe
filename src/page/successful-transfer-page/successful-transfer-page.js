import { LitElement, html, nothing } from "lit";
import styles from "./successful-transfer-page.css.js";
import "@compositions/type-modal/type-modal.js";
import "@compositions/info-card/info-card.js";
import "@compositions/type-button/type-button.js";
import "@compositions/type-modal/type-modal.js";
import "@organisms/transfer-summary-card/transfer-summary-card.js";
import { generateTransferSummaryPdf } from "./services/generate-transfer-summary-pdf.js";

export class SuccessfulTransferPage extends LitElement {
  static properties = {
    locale: {
      type: Object,
    },
    current: { type: String },
    amount: { type: String },
    transactionNumber: { type: String },
    time: { type: String },
    date: { type: String },
    originAccount: { type: String },
    originAccountNumber: { type: String },
    beneficiaryName: { type: String },
    beneficiaryLastName: { type: String },
    concept: { type: String },
    isDataReady: { type: Object },
    isOpen: {
      type: Boolean,
    },
    _showShareModal: {
      type: Boolean,
    },
  };

  constructor() {
    super();
    this.locale = {};
    this.current = "";
    this.amount = "";
    this.transactionNumber = "";
    this.time = "";
    this.date = "";
    this.originAccount = "";
    this.originAccountNumber = "";
    this.beneficiaryName = "";
    this.beneficiaryLastName = "";
    this.concept = "";
    this.status = "";
    this.isDataReady = false;
    this.isOpen = false;
    this._showShareModal = false;
  }

  static styles = styles;

  _handleDownload() {
    generateTransferSummaryPdf(this.amount, [
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
        label: this.locale["successful-transfer-page-concept"],
        value: this.concept,
      },
      {
        label: this.locale["successful-transfer-page-status"],
        value: this.status,
      },
    ]);
  }

  _handleShare() {
    this._showShareModal = true;
    this.updateComplete.then(() => {
      const dialog = this.renderRoot.querySelector("#shareDialog");
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    });
  }

  _closeShareModal() {
    const dialog = this.renderRoot.querySelector("#shareDialog");
    if (dialog && dialog.open) {
      dialog.close();
    }
    this._showShareModal = false;
  }

  _handleNewTransfer() {
    this.dispatchEvent(new CustomEvent('return-home', {
      detail: 0,
      bubbles: true,
      composed:true
    }));
    this.isOpen = false;
  }

  render() {
    return html`
      <type-modal .open=${this.isOpen} .hasFooter=${true}>
        <div slot="body">
          <div class="header">
            <type-icon
              name="success"
              size="xl"
              .iconName=${"check-circle"}
              .variant=${"default"}
            ></type-icon>
            <type-text
              .text=${this.locale["successful-transfer-page-title"]}
              .tag=${"h1"}
              .weight=${"bold"}
              .size=${"l"}
              .align=${"center"}
            ></type-text>
            <type-text
              .text=${this.locale["successful-transfer-page-subtitle"]}
              .tag=${"p"}
              .size=${"m"}
              .align=${"center"}
            ></type-text>
          </div>
          <transfer-summary-card
            .locale=${this.locale}
            .current=${this.current}
            .amount=${this.amount}
            .transactionNumber=${this.transactionNumber}
            .date=${this.date}
            .time=${this.time}
            .originAccount=${this.originAccount}
            .originAccountNumber=${this.originAccountNumber}
            .beneficiaryName=${this.beneficiaryName}
            .beneficiaryLastName=${this.beneficiaryLastName}
            .concept=${this.concept}
            .status=${this.status}
          ></transfer-summary-card>
          <div class="actions">
            <type-button
              icon-name="download"
              icon-position="left"
              text=${this.locale["successful-transfer-page-download-button"]}
              variant="secondary"
              .type=${"button"}
              @click=${this._handleDownload}
            ></type-button>
            <type-button
              icon-name="share-2"
              icon-position="left"
              text=${this.locale["successful-transfer-page-share-button"]}
              variant="secondary"
              .type=${"button"}
              @click=${this._handleShare}
            ></type-button>
          </div>
          <type-button
            icon-name="house"
            icon-position="left"
            text=${this.locale["successful-transfer-page-new-transfer-button"]}
            variant="default"
            .type=${"button"}
            @click=${this._handleNewTransfer}
          ></type-button>
          <info-card
            .message=${this.locale["successful-transfer-page-message"]}
            ?hasIcon=${false}
          >
          </info-card>
        </div>
      </type-modal>
      <type-modal ?open=${this._showShareModal} variant=${"dialog"}>
        <div slot="header">
          <type-text
            .text=${this.locale["successful-transfer-page-share-modal-title"]}
            .weight=${"bold"}
            .tag=${"h1"}
            .size=${"m"}
          ></type-text>
          <type-text
            .text=${this.locale[
              "successful-transfer-page-share-modal-subtitle"
            ]}
            .tag=${"p"}
            .size=${"s"}
          ></type-text>
        </div>
        <div slot="body">
          <div class="alert-footer">
            <type-button
              .text=${this.locale[
                "successful-transfer-page-share-modal-accept-button"
              ]}
              .variant=${"default"}
              .type=${"button"}
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
