import { LitElement, css, html, nothing } from "lit";
import "./components/type-icon/type-icon.js";
import "./components/type-text/type-text";
import "./compositions/info-card/info-card";
import "./compositions/type-input/type-input";
import "./compositions/type-header/type-header.js";
import "./page/new-transfer-page/new-transfer-page.js";
import "./page/accounts-page/AccountsPage.js";
import "./components/loading-overlay/loading-overlay.js";
import "./page/action-modal/action-modal.js";
import "@DM/entelgy-global-transfers-api-dm/entelgy-global-transfers-api-dm.js";
import "@DM/entelgy-global-accounts-api-dm/entelgy-global-accounts-api-dm.js";
import "@pages/successful-transfer-page/successful-transfer-page.js";
import "@pages/confirm-transfer-page/confirm-transfer-page.js";
import locales from "@locales/locales.json";
import "./page/exit-page/exit-page.js";
 
export class MyElement extends LitElement {
  static properties = {
    step: {
      type: Number,
    },
    accountCustomer: {
      type: Object,
    },

    _transferData: { type: Object },
    _transferStatus: { type: String },
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
    accountsData: { type: Array },
    _loadingAccounts: { type: Boolean },
    _actionModalOpen: { type: Boolean },
    _actionType: { type: String },
    _retryCount: { type: Number }
  };
 
  constructor() {
    super();
    this.step = 0;
    this.accountCustomer = {};
    this._transferData = null;
    this._transferStatus = "";
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
    this.accountsData = [];
    this._loadingAccounts = true;
    this._actionModalOpen = false;
    this._retryCount = 0;
    this._actionType = "";
  }

  firstUpdated() {
    this.shadowRoot.getElementById("accounts")?.getAccounts();
  }

  _handleSuccessAccounts(e) {
    const data = e.detail;
    this.accountsData = data.accounts ?? [];
    this._loadingAccounts = false;
    this._retryCount = 0;
    this._actionModalOpen = false;
    this._actionType = "";
  }

  _handleErrorAccounts() {
    this._loadingAccounts = false;

    if (this._retryCount >= 3) {
      this._actionType = "finalError";
    } else {
      this._actionType = "loadAccountsError";
    }

    this._actionModalOpen = true; 
  }

  _handleActionModal(event) {
    const { buttonAction } = event.detail;
    const idDm = this._getDm(this.step);
    const dm = this.shadowRoot.getElementById(idDm);

    this._actionModalOpen = false;

    if (buttonAction === "retry") {
      if (this._retryCount < 3) {
        this._retryCount++;
        this._loadingAccounts = true;
        this._callDm(dm);
        return;
      }

      this._actionType = "finalError";
      this._actionModalOpen = true;
      return;
    }
    this._retryCount = 0;
    this.step = 4;
  }

  _callDm(dm){
    const fnDm = {
      "loadAccountsError": () => dm.getAccounts(),
      "transfers": "",
    };
    return fnDm[this._actionType]();
  }

  _getDm(id) {
    console.log(id)
    const dm = {
      0: "accounts",
      1: "transfers",
    };
    return dm[id] ?? "" ;
  }
  
  _getAccountCustomer(event) {
    this.accountCustomer = event.detail;
    this.step = 1;
  }
 
  _handleConfirmRequested(event) {
    this._transferData = event.detail;
    this._transferStatus = "";
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
    this._transferStatus = "";
    this.step = 1;
  }

  _handleTransferRetry() {
    this._transferStatus = "";
    const transferDm = this.shadowRoot.getElementById("transfers");
    if (transferDm) {
      transferDm.executeTransfer(this._transferData);
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
    this.isDataReady = true;
    this._transferStatus = "";
    this.step = 3;
  }
 
  _handleError(event) {
    console.error("Error en la transferencia", event);
    this._transferStatus = "error";
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
    if (this._loadingAccounts) {
      return html`<loading-overlay></loading-overlay>`;
    }

    return html`
      <accounts-page
        .data=${this.accountsData ?? []}
        @account=${this._getAccountCustomer}
        @exit=${this._updateExitStep}
      ></accounts-page>
    `;
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
      .transferStatus=${this._transferStatus}
      @confirm-accept=${this._handleConfirmAccept}
      @confirm-cancel=${this._handleConfirmCancel}
      @transfer-retry=${this._handleTransferRetry}
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

  _renderActionModal() {
    return html`
      <action-modal
        ?open=${true}
        action-type=${this._actionType}
        @action-modal-action=${this._handleActionModal}
      ></action-modal>
    `;
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
      ${this._actionModalOpen
        ? this._renderActionModal()
        : this._renderStep(this.step)
      }

      <entelgy-global-transfers-api-dm
        id="transfers"
        @transfer-api-dm-create=${this._handleDataSuccess}
        @transfer-api-dm-fetch-error=${this._handleError}
      >
      </entelgy-global-transfers-api-dm>
      <entelgy-global-accounts-api-dm
        id="accounts"
        @accounts-api-dm-success=${this._handleSuccessAccounts}
        @accounts-api-dm-error=${this._handleErrorAccounts}
        >
      </entelgy-global-accounts-api-dm>
    `;
  }
}
window.customElements.define("my-element", MyElement);