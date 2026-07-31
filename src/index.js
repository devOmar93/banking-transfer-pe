import { LitElement, html, nothing } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import "@/providers/data-managers/entelgy-global-transfers-api-dm/entelgy-global-transfers-api-dm.js";
import "@/providers/data-managers/entelgy-global-accounts-api-dm/entelgy-global-accounts-api-dm.js";
import "@/providers/data-managers/entelgy-global-new-transfer-api-dm/entelgy-global-new-transfer-api-dm.js";
import "@/page/new-transfer-page/new-transfer-page.js";
import "@/page/accounts-page/AccountsPage.js";
import "@/page/successful-transfer-page/successful-transfer-page.js";
import "@/page/confirm-transfer-page/confirm-transfer-page.js";
import "@/page/exit-page/exit-page.js";
import "@/page/action-modal/action-modal.js";
import "@/components/loading-overlay/loading-overlay.js";
import locales from "@/locales/locales.json";
import { generateTransferSummaryPdf } from "./page/successful-transfer-page/services/generate-transfer-summary-pdf";

export class MyElement extends LitElement {
  transfersApiDm = createRef();
  accountsApiDm = createRef();
  newTransferApiDm = createRef();

  static properties = {
    /** 
     * Localization string for the page, used to display text in different languages based on user preference
     * @type {String}
     * @default ""
     */
    lang: {
      type: String
    },

    /** 
     * The current step in the transfer process
     * @type {Number}
     * @default 0
     * @private
     */
    _step: {
      type: Number,
      state: true
    },

    /** 
     * Customer accounts detail
     * @type {Array}
     * @default []
     * @private
     */
    _accountsData: {
      type: Array,
      state: true
    },

    /** 
     * Data from a single customer account
     * @type {Object}
     * @default {}
     * @private
     */
    _accountCustomer: {
      type: Object,
      state: true
    },

    /** 
     * Destination account data
     * @type {Object}
     * @default {}
     * @private
     */
    _destinationAccount: {
      type: Object,
      state: true
    },

    /** 
     * Transfer summary data
     * @type {Object}
     * @default {}
     * @private
     */
    _transferSummary: {
      type: Object,
      state: true
    },

    /** 
     * Data for executing the transfer
     * @type {Object}
     * @default {}
     * @private
     */
    _transferData: {
      type: Object,
      state: true
    },

    /** 
     * Status of the transfer process
     * @type {String}
     * @default ""
     * @private
     */
    _transferStatus: {
      type: String,
      state: true,
    },

    /** 
     * Indicates if the data is ready for use
     * @type {Boolean}
     * @default false
     * @private
     */
    _isDataReady: {
      type: Boolean,
      state: true
    },

    /** 
     * Specify whether the loading component should be displayed
     * @type {Boolean}
     * @default false
     * @private
     */
    _loaded: {
      type: Boolean,
      state: true
    },

    /** 
     * Number of times the operation has been retried
     * @type {Number}
     * @default 0
     * @private
     */
    _retryCount: {
      type: Number,
      state: true
    },

    /** 
     * Specify whether the action modal is open
     * @type {Boolean}
     * @default false
     * @private
     */
    _actionModalOpen: {
      type: Boolean,
      state: true
    },

    /** 
     * Indicates if an initial error has occurred
     * @type {Boolean}
     * @default false
     * @private
     */
    _isInitialError: {
      type: Boolean,
      state: true
    },
  };

  constructor() {
    super();
    this.lang = "";
    this._step = 0;
    this._accountCustomer = {};
    this._destinationAccount = {};
    this._transferSummary = {};
    this._transferData = {};
    this._transferStatus = "";
    this._isDataReady = false;
    this._accountsData = [];
    this._loaded = false;
    this._retryCount = 0;
    this._actionType = "";
    this._recipientAccountNumber = "";
    this._actionModalOpen = false;
    this._isInitialError = false;
  }

  async firstUpdated() {
    this._loaded = false;
    if (this.accountsApiDm.value) {
      await this.accountsApiDm.value.getAccounts();
    }
    this._loaded = true;
  }

  _handleSuccessAccounts(e) {
    const data = e.detail;
    this._accountsData = data.accounts ?? [];
    this._loaded = true;
    this._retryCount = 0;
    this._actionModalOpen = false;
    this._actionType = "";
  }

  _handleErrorAccounts() {
    this._loaded = true;

    if (this._retryCount >= 3) {
      this._actionType = "finalError";
      this._step = 4;
    } else {
      this._actionType = "loadAccountsError";
    }

    this._actionModalOpen = true;
  }

  _closeActionModal({ detail }) {
    if (this._isInitialError) {
      this._isInitialError = false;
      this._actionModalOpen = false;
      this._step = 4;
      return;
    }

    this._handleActionModal(detail);
  }

  _handleActionModal(detail) {
    const { buttonAction, actionType } = detail;
    this._actionModalOpen = false;

    if (buttonAction === "retry") {
      if (this._retryCount < 3) {
        this._retryCount++;
        if (actionType === "downloadError") return;
        this._loaded = false;
        const dm =
          this._actionType === "loadAccountsError"
            ? this.accountsApiDm.value
            : this.newTransferApiDm.value;
        this._callDm(dm);
        return;
      }

      this._actionType = "finalError";
      this._actionModalOpen = true;
      return;
    }
    if (
      this._actionType === "loadAccountsError" ||
      this._actionType === "finalError"
    ) {
      this._step = 4;
    }
    this._retryCount = 0;
  }

  _callDm(dm) {
    if (!dm) return;
    const fnDm = {
      loadAccountsError: () => dm.getAccounts(),
      technicalError: () =>
        dm.getAccountDestination(this._recipientAccountNumber),
    };
    return fnDm[this._actionType]?.();
  }

  _getAccountCustomer({ detail }) {
    this._accountCustomer = detail.account;
    this._step = 1;
  }

  _handleConfirmRequested({ detail }) {
    console.log(detail)
    this._transferData = detail;
    this._transferStatus = "";
    this._step = 2;
  }

  async _handleConfirmAccept({ detail }) {
    this._loaded = false;
    const transferData = detail?.transferData ?? {};
    await this.transfersApiDm.value.executeTransfer(transferData);
  }

  _handleConfirmCancel() {
    this._transferStatus = "";
    this._step = 1;
    this._destinationAccount = {};
    this._isDataReady = false;
  }

  _handleTransferRetry() {
    this._transferStatus = "";
    if (this.transfersApiDm.value) {
      this.transfersApiDm.value.executeTransfer(this._transferData);
    }
  }

  _handleDataSuccess({ detail }) {
    this._loaded = true;
    const response = detail.response;
    const accounts = detail.accounts;
    this._transferSummary = { ...response };
    this._accountsData = [...accounts];
    this._isDataReady = true;
    this._transferStatus = "";
    this._step = 3;
  }

  _handleError() {
    this._loaded = true;
    this._transferStatus = "error";
  }

  _updateStep({ detail }) {
    this._step = detail?.step ?? detail ?? 0;
    this._destinationAccount = {};
    this._isDataReady = false;
  }

  get locale() {
    return locales[this.lang] ?? {};
  }

  _getAccountDestinatari({ detail }) {
    this._loaded = false;
    this._recipientAccountNumber = detail;
    if (this.newTransferApiDm.value) {
      this.newTransferApiDm.value.getAccountDestination(detail);
    }
  }

  _handleRecipientAccountSuccess({ detail }) {
    this._destinationAccount = { ...detail };
    this._loaded = true;
  }

  _handleDestinationAccountError() {
    this._loaded = true;
    if (this._retryCount >= 3) {
      this._step = 0;
      this._actionType = "";
      this._retryCount = 0;
      return;
    }
    this._actionType = "technicalError";
    this._actionModalOpen = true;
  }

  _handleChildAccountsError(e) {
    this._actionType = e.detail.actionType;
    this._actionModalOpen = true;
    this._isInitialError = e.detail.initialError;
  }

  _renderAcountsPage() {
    return html`<accounts-page
      ?open=${this._loaded}
      .data=${this._accountsData ?? []}
      @account-validated=${this._getAccountCustomer}
      @accounts-error=${this._handleChildAccountsError}
    ></accounts-page>`;
  }

  _renderNewTransferPage() {
    return html`<new-transfer-page
      .accountCustomer=${this._accountCustomer}
      .destinationAccount=${this._destinationAccount}
      @confirm-requested=${this._handleConfirmRequested}
      @get-account-destinatari=${this._getAccountDestinatari}
      @return-page=${this._updateStep}
    ></new-transfer-page>`;
  }

  _renderConfirmTransferPage() {
    return html`<confirm-transfer-page
      ?open=${true}
      .transferData=${this._transferData}
      .transferStatus=${this._transferStatus}
      @confirm-accept=${this._handleConfirmAccept}
      @confirm-cancel=${this._handleConfirmCancel}
      @transfer-retry=${this._handleTransferRetry}
    ></confirm-transfer-page>`;
  }

  _renderSuccessfulTransferPage() {
    return html` <successful-transfer-page
      .locale=${this.locale}
      ?isOpen=${this._isDataReady}
      @return-home=${this._updateStep}
      .amount=${this._transferSummary.amount}
      .currency=${this._transferSummary.currency}
      .transactionNumber=${this._transferSummary.transactionNumber}
      .time=${this._transferSummary.time}
      .date=${this._transferSummary.date}
      .originAccount=${this._transferSummary.originAccount}
      .originAccountNumber=${this._transferSummary.originAccountNumber}
      .beneficiaryName=${this._transferSummary.beneficiaryName}
      .beneficiaryLastName=${this._transferSummary.beneficiaryLastName}
      .status=${this._transferSummary.status}
      @accounts-error=${this._handleChildAccountsError}
      @download-summary-pdf=${this._generatePDF}
    ></successful-transfer-page>`;
  }

  _renderExitPage() {
    return html`<exit-page .locale=${this.locale}></exit-page>`;
  }

  _generatePDF({ detail }) {
    const dataPdf = detail.dataPdf;
    const amount = detail.amount;

    try {
      generateTransferSummaryPdf(amount, dataPdf);
    } catch (error) {
      throw new Error("Error al descargar el PDF");
    }
  }

  _renderStep(page) {
    const steps = {
      0: () => this._renderAcountsPage(),
      1: () => this._renderNewTransferPage(),
      2: () => this._renderConfirmTransferPage(),
      3: () => this._renderSuccessfulTransferPage(),
      4: () => this._renderExitPage(),
    };
    return steps[page]?.() ?? nothing;
  }

  get _renderActionModal() {
    return html`
      <action-modal
        ?open=${this._actionModalOpen}
        .actionType=${this._actionType}
        @action-modal-action=${this._closeActionModal}
      ></action-modal>
    `;
  }

  get _renderTransfersApiDm() {
    return html`
      <entelgy-global-transfers-api-dm
        ${ref(this.transfersApiDm)}
        .accounts=${this._accountsData}
        @transfer-api-dm-create=${this._handleDataSuccess}
        @transfer-api-dm-fetch-error=${this._handleError}
      ></entelgy-global-transfers-api-dm>
    `;
  }

  get _renderAccountsApiDm() {
    return html`
      <entelgy-global-accounts-api-dm
        ${ref(this.accountsApiDm)}
        @accounts-api-dm-success=${this._handleSuccessAccounts}
        @accounts-api-dm-error=${this._handleErrorAccounts}
      >
      </entelgy-global-accounts-api-dm>
    `;
  }

  get _renderNewTransferApiDm() {
    return html`
      <entelgy-global-new-transfer-api-dm
        ${ref(this.newTransferApiDm)}
        @new-transfer-api-dm-success=${this._handleRecipientAccountSuccess}
        @new-transfer-api-dm-error=${this._handleDestinationAccountError}
      ></entelgy-global-new-transfer-api-dm>
    `;
  }

  render() {
    return html`
      <loading-overlay ?active=${!this._loaded}></loading-overlay>
      ${this._renderStep(this._step)} ${this._renderAccountsApiDm}
      ${this._renderTransfersApiDm} ${this._renderNewTransferApiDm}
      ${this._actionModalOpen ? this._renderActionModal : nothing}
    `;
  }
}
window.customElements.define("my-element", MyElement);
