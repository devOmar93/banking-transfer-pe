import { LitElement, css, html, nothing } from "lit";
import "./components/type-icon/type-icon.js";
import "./components/type-text/type-text";
import "./compositions/info-card/info-card";
import "./compositions/type-input/type-input";
import "./compositions/type-header/type-header.js";
import "./page/new-transfer-page/new-transfer-page.js";
import "./page/accounts-page/AccountsPage.js";
import "@DM/entelgy-global-transfers-api-dm/entelgy-global-transfers-api-dm.js";
import "@pages/successful-transfer-page/successful-transfer-page.js";
import locales from "@locales/locales.json";

const ALLOWED_LANGUAGES = ["es_LA"];

export class MyElement extends LitElement {
  static properties = {
    step: {
      type: Number,
    },

    accountCustomer: {
      type: Object,
    },

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
  };

  constructor() {
    super();
    this.step = 0;
    this.accountCustomer = {};
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
  }

  getAccountCustomer(event) {
    this.accountCustomer = event.detail;
    this.step = 1;
    console.log("accountCustomer", this.accountCustomer);
  }

  async executeTransfer(event) {
    const transferDm = this.shadowRoot.getElementById("transfers");
    const transferData = event.detail || {};
    if (transferDm) {
      console.log(transferDm);
      await transferDm.executeTransfer(transferData);
      console.log("XDDATA");
    }
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
    this.step = 2;
    this.isDataReady = true;
    console.log("XDDATA");
  }

  _handleError(event) {
    console.error("Error cargando los datos de la transferencia", event);
    this.isDataReady = true;
  }

  get locale() {
    return locales[this.lang];
  }

  _renderAcountsPage() {
    return html`<accounts-page
      @account=${this.getAccountCustomer}
    ></accounts-page>`;
  }

  _updateStep(event) {
    this.step = event.detail;
  }

  _renderNewTransferPage() {
    return html`<new-transfer-page
      .accountCustomer=${this.accountCustomer}
      @form-submit=${this.executeTransfer}
      @return-page=${this._updateStep}
    ></new-transfer-page>`;
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

  _renderStep(page) {
    const steps = {
      0: this._renderAcountsPage(),
      1: this._renderNewTransferPage(),
      2: this._renderSuccessfulTransferPage(),
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
    `;
  }
}
window.customElements.define("my-element", MyElement);
