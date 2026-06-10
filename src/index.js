import { LitElement, css, html, nothing } from "lit";
import "./components/type-icon/type-icon.js";
import "./components/type-text/type-text";
import "./compositions/info-card/info-card";
import "./compositions/type-input/type-input";
import "./compositions/type-header/type-header.js";
import "./page/new-transfer-page/new-transfer-page.js";
import "./page/accounts-page/AccountsPage.js";
import "@DM/entelgy-global-transfers-api-dm/entelgy-global-transfers-api-dm.js";
import "@DM/entelgy-global-accounts-api-dm/entelgy-global-accounts-api-dm.js";
import "@pages/successful-transfer-page/successful-transfer-page.js";
import "@pages/confirm-transfer-page/confirm-transfer-page.js";
import locales from "@locales/locales.json";
import "./page/exit-page/exit-page.js";
 
const ALLOWED_LANGUAGES = ["es_LA"];
 
export class MyElement extends LitElement {
  static properties = {
    step: {
      type: Number,
    },
    accountCustomer: {
      type: Object,
    },

    _transferData: { type: Object },
    lang: { type: String },
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
    status: { type: String },
    isDataReady: { type: Boolean },
    accountsStatus: { type: String },
    accountsData: { type: Array },
  };
 
  constructor() {
    super();
    this.step = 0;
    this.accountCustomer = {};
    this._transferData = null;
    this.lang = "";
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
    this.accountsStatus = "";
    this.accountsData = [];
  }

  firstUpdated() {
    setTimeout(() => {
      const accountsDm = this.shadowRoot.getElementById("accounts");
      if(accountsDm) {
        accountsDm.getAccounts();
      }
    });
  }

  _handleLoadingAccounts(e) {
    const isLoading = e.detail.isLoading;
    if (isLoading) {
      this.accountsStatus = "loading";
      this.accountsData = [];
    }
  }

  _handleSuccessAccounts(e) {
    const data = e.detail;
    this.accountsData = data.accounts ?? [];
    this.accountsStatus = data.accounts?.length ? "success" : "empty";
  }

  _handleErrorAccounts() {
    this.accountsData = [];
    this.accountsStatus = "error";
  }

  _handleRetryAccounts(){ 
    const accountsDm = this.shadowRoot.getElementById("accounts");
    if(accountsDm) {
      accountsDm.getAccounts();
    }
  }

  _getAccountCustomer(event) {
    this.accountCustomer = event.detail;
    this.step = 1;
  }
 
  _handleConfirmRequested(event) {
    this._transferData = event.detail;
    this.step = 2;
  }

  async _handleConfirmAccept(event) {
    const transferDm = this.shadowRoot.getElementById("transfers");
    const transferData = event.detail?.transferData ?? {};
    if (transferDm) {
      await transferDm.executeTransfer(transferData);
    }
  }
 
  _handleConfirmCancel() {
    this.step = 1;
  }
 
  _handleDataSuccess(event) {
    const data = event.detail;
    this.current = data.current;
    this.amount = data.amount;
    this.transactionNumber = data.transactionNumber;
    this.date = data.date;
    this.time = data.time;
    this.originAccount = data.originAccount;
    this.originAccountNumber = data.originAccountNumber;
    this.beneficiaryName = data.beneficiaryName;
    this.beneficiaryLastName = data.beneficiaryLastName;
    this.concept = data.concept;
    this.status = data.status;
    this.isDataReady = true;
    this.step = 3;
  }
 
  _handleError(event) {
    console.error("Error cargando los datos de la transferencia", event);
    this.isDataReady = true;
  }
 
  _updateStep(event) {
    this.step = event.detail;
  }

  _updateExitStep(event) {
    this.step = event.detail.step;
  }
 
  get locale() {
    return locales[this.lang];
  }

  _renderAcountsPage() {
    return html`<accounts-page
      @account=${this._getAccountCustomer}
      @exit=${this._updateExitStep}
      @retry-accounts=${this._handleRetryAccounts}
      .status=${this.accountsStatus}
      .data=${this.accountsData ?? []}
    ></accounts-page>`;
  }

  _renderNewTransferPage() {
    return html`<new-transfer-page
      .accountCustomer=${this.accountCustomer}
      @confirm-requested=${this._handleConfirmRequested}
      @return-page=${this._updateStep}
    ></new-transfer-page>`;
  }
 
  _renderConfirmTransferPage() {
    return html`<confirm-transfer-page
      ?open=${true}
      .transferData=${this._transferData}
      @confirm-accept=${this._handleConfirmAccept}
      @confirm-cancel=${this._handleConfirmCancel}
    ></confirm-transfer-page>`;
  }
 
  _renderSuccessfulTransferPage() {
    return html` <successful-transfer-page
      .locale=${this.locale}
      .current=${this.current}
      .amount=${this.amount}
      .transactionNumber=${this.transactionNumber}
      .time=${this.time}
      .date=${this.date}
      .originAccount=${this.originAccount}
      .originAccountNumber=${this.originAccountNumber}
      .beneficiaryName=${this.beneficiaryName}
      .beneficiaryLastName=${this.beneficiaryLastName}
      .concept=${this.concept}
      .status=${this.status}
      .isDataReady=${this.isDataReady}
      .isOpen=${this.isDataReady}
      @return-home=${this._updateStep}
    ></successful-transfer-page>`;
  }

  _renderExitPage(e) {
    return html`<transfer-exit-page
      .locale=${this.locale}
      ></transfer-exit-page>`;
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
 
  render() {
    return html`
      ${this._renderStep(this.step)}
      <entelgy-global-transfers-api-dm
        id="transfers"
        @transfer-api-dm-create=${this._handleDataSuccess}
        @transfer-api-dm-fetch-error=${this._handleError}
      >
      </entelgy-global-transfers-api-dm>
      <entelgy-global-accounts-api-dm
        id="accounts"
        @accounts-api-dm-loading=${this._handleLoadingAccounts}
        @accounts-api-dm-success=${this._handleSuccessAccounts}
        @accounts-api-dm-error=${this._handleErrorAccounts}
        >
      </entelgy-global-accounts-api-dm>
    `;
  }
}
window.customElements.define("my-element", MyElement);