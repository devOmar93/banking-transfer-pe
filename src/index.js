import { LitElement, html, nothing } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import "@/providers/data-managers/entelgy-global-transfers-api-dm/entelgy-global-transfers-api-dm.js";
import "@/providers/data-managers/entelgy-global-accounts-api-dm/entelgy-global-accounts-api-dm.js";
import "@/page/new-transfer-page/new-transfer-page.js";
import "@/page/accounts-page/AccountsPage.js";
import "@/page/successful-transfer-page/successful-transfer-page.js";
import "@/page/confirm-transfer-page/confirm-transfer-page.js";
import "@/page/exit-page/exit-page.js";
import locales from "@locales/locales.json";

export class MyElement extends LitElement {
  transfersApiDm = createRef();
  accountsApiDm = createRef();

  static properties = {
    lang: {
      type: String,
    },
    _step: {
      type: Number,
    },
    _accountsData: {
      type: Array,
    },
    _accountCustomer: {
      type: Object,
    },
    _transferSummary: {
      type: Object,
    },
    _transferData: {
      type: Object,
    },
    _transferStatus: {
      type: String,
    },
    _isDataReady: {
      type: Boolean,
    },
    _accountsStatus: {
      type: String,
    },
  };

  constructor() {
    super();
    this.lang = "";
    this._step = 0;
    this._accountCustomer = {};
    this._transferSummary = {};
    this._transferData = null;
    this._transferStatus = "";
    this._isDataReady = false;
    this._accountsStatus = "";
    this._accountsData = [];
  }

  firstUpdated() {
    if (this.accountsApiDm.value) {
      this.accountsApiDm.value.getAccounts();
    }
  }

  _handleLoadingAccounts(e) {
    const isLoading = e.detail.isLoading;
    if (isLoading) {
      this._accountsStatus = "loading";
      this._accountsData = [];
    }
  }

  _handleSuccessAccounts(e) {
    const data = e.detail;
    this._accountsData = data.accounts ?? [];
    this._accountsStatus = data.accounts?.length ? "success" : "empty";
  }

  _handleErrorAccounts() {
    this._accountsData = [];
    this._accountsStatus = "error";
  }

  async _handleRetryAccounts() {
    await this.accountsApiDm.value.getAccounts();
  }

  _handleAccountValidated({ detail }) {
    this._accountCustomer = detail.account;
    this._step = 1;
  }

  _handleConfirmRequested({ detail }) {
    this._transferData = detail;
    this._transferStatus = "";
    this._step = 2;
  }

  async _handleConfirmAccept({ detail }) {
    const transferData = detail?.transferData ?? {};
    await this.transfersApiDm.value.executeTransfer(transferData);
  }

  _handleConfirmCancel() {
    this._transferStatus = "";
    this._step = 1;
  }

  _handleTransferRetry() {
    this._transferStatus = "";
    if (this.transfersApiDm.value) {
      this.transfersApiDm.value.executeTransfer(this._transferData);
    }
  }

  _handleDataSuccess(event) {
    const response = event.detail.response;
    const accounts = event.detail.accounts;
    this._transferSummary = { ...response };
    this._isDataReady = true;
    this._transferStatus = "";
    this._accountsData = [...accounts];
    this._step = 3;
  }

  _handleError() {
    this._transferStatus = "error";
  }

  _updateStep(event) {
    this._step = event.detail.step;
  }

  get locale() {
    return locales[this.lang];
  }

  _renderAcountsPage() {
    return html`<accounts-page
      @account-validated=${this._handleAccountValidated}
      @exit=${this._updateStep}
      @retry-accounts=${this._handleRetryAccounts}
      .status=${this._accountsStatus}
      .data=${this._accountsData ?? []}
    ></accounts-page>`;
  }

  _renderNewTransferPage() {
    return html`<new-transfer-page
      .accountCustomer=${this._accountCustomer}
      @confirm-requested=${this._handleConfirmRequested}
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
      .current=${this._transferSummary.current}
      .transactionNumber=${this._transferSummary.transactionNumber}
      .time=${this._transferSummary.time}
      .date=${this._transferSummary.date}
      .originAccount=${this._transferSummary.originAccount}
      .originAccountNumber=${this._transferSummary.originAccountNumber}
      .beneficiaryName=${this._transferSummary.beneficiaryName}
      .beneficiaryLastName=${this._transferSummary.beneficiaryLastName}
      .concept=${this._transferSummary.concept}
      .status=${this._transferSummary.status}
    ></successful-transfer-page>`;
  }

  _renderExitPage() {
    return html`<exit-page .locale=${this.locale}></exit-page>`;
  }

  _renderStep(page) {
    const steps = {
      0: this._renderAcountsPage(),
      1: this._renderNewTransferPage(),
      2: this._renderConfirmTransferPage(),
      3: this._renderSuccessfulTransferPage(),
      4: this._renderExitPage(),
    };
    return steps[page] ?? nothing;
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
        @accounts-api-dm-loading=${this._handleLoadingAccounts}
        @accounts-api-dm-success=${this._handleSuccessAccounts}
        @accounts-api-dm-error=${this._handleErrorAccounts}
      >
      </entelgy-global-accounts-api-dm>
    `;
  }

  render() {
    return html`
      ${this._renderStep(this._step)} ${this._renderTransfersApiDm}
      ${this._renderAccountsApiDm}
    `;
  }
}
window.customElements.define("my-element", MyElement);
