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
import "@DM/entelgy-global-new-transfer-api-dm/entelgy-global-new-transfer-api-dm.js";
import "@pages/successful-transfer-page/successful-transfer-page.js";
import "@pages/confirm-transfer-page/confirm-transfer-page.js";
import locales from "@locales/locales.json";
import "./page/exit-page/exit-page.js";
import "./page/action-modal/action-modal.js";
 import "./components/loading-overlay/loading-overlay.js";
 
export class MyElement extends LitElement {
  static properties = {
    step: {
      type: Number,
    },

    customerAccount: {
      type: Object,
    },

    destinationAccount: {
      type: Object,
    },

    _actionModalOpen: {
      type: Boolean,
    },

    _loading: {
      type: Boolean,
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
    _actionModalOpen: { type: Boolean },
    _actionType: { type: String },
    _retryCount: { type: Number },
    accountNumberDestinatari: { type: String }
  };
 
  constructor() {
    super();
    this.step = 0;
    this.customerAccount = {};
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
    this.destinationAccount = {};
    this._actionModalOpen = false;
    this._loading = true;
    this._retryCount = 0;
    this._actionType = "";
    this.accountNumberDestinatari = "";
  }

  firstUpdated() {
    this.shadowRoot.getElementById("accounts")?.getAccounts();
  }

  _handleSuccessAccounts(e) {
    const data = e.detail;
    this.accountsData = data.accounts ?? [];
    this._loading = false;
    this._retryCount = 0;
    this._actionModalOpen = false;
    this._actionType = "";
  }

  _handleErrorAccounts() {
    this._loading = false;

    if (this._retryCount >= 3) {
      this._actionType = "finalError";
      this.step = 4;
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
        //this._loadingAccounts = true;
        this._loading = true;
        this._callDm(dm);
        return;
      }

      this._actionType = "finalError";
      this._actionModalOpen = true;
      return;
    }
    this._retryCount = 0;
    //this.step = 4;
  }

  _callDm(dm){
    const fnDm = {
      "loadAccountsError": () => dm.getAccounts(),
      "technicalError": () => dm.getAccountDestination(this.accountNumberDestinatari),
    };
    return fnDm[this._actionType]();
  }

  _getDm(id) {
    const dm = {
      0: "accounts",
      1: "newTransfer",
    };
    return dm[id] ?? "" ;
  }
  
  _getAccountCustomer(event) {
    this.customerAccount = event.detail;
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
    this.destinationAccount = {};
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
    this._transferStatus = "error";
  }
 
  _updateStep(event) {
    this.step = event.detail;
    this.destinationAccount = {};
  }

  _updateExitStep(event) {
    this.step = event.detail.step;
  }
 
  get locale() {
    return locales[this.lang];
  }

  _getAccountDestinatari(event) {
    this._loading = true;
    this.accountNumberDestinatari =  event.detail;
    this.shadowRoot.getElementById("newTransfer")?.getAccountDestination(event.detail);
  }

  _handleSuccessAccountDestinatari(event) {
    this.destinationAccount = {...event.detail};
    this._loading = false;
  }

  _handleErrorAccountDestinatari(event) {
    this._loading = false;
    if (this._retryCount >= 3) {
      this.step = 0;
      this._actionType = "";
      this._retryCount = 0;
      return
    }
    this._actionType = "technicalError";
    this._actionModalOpen = true;
  }
  _renderAcountsPage() {
    return html`
      ${!this._loading && !this._actionModalOpen ? html`<accounts-page
        .data=${this.accountsData ?? []}
        @account=${this._getAccountCustomer}
        @exit=${this._updateExitStep}
      ></accounts-page>` : nothing}
      
    `;
    
  }

  _renderNewTransferPage() {
    return html`<new-transfer-page
      .customerAccount=${this.customerAccount}
      .destinationAccount=${this.destinationAccount}
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

  _renderActionModal() {
    return html`
      <action-modal
        ?open=${true}
        action-type=${this._actionType}
        @action-modal-action=${this._handleActionModal}
      ></action-modal>
    `;
  }

  render() {
    return html`
      ${this._loading ? html`<loading-overlay></loading-overlay>` : nothing}
      ${this._renderStep(this.step)}

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
      <entelgy-global-new-transfer-api-dm
        id="newTransfer"
        @new-tranfer-api-dm-success=${this._handleSuccessAccountDestinatari}
        @new-tranfer-api-dm-error=${this._handleErrorAccountDestinatari}
        >
      </entelgy-global-new-transfer-api-dm>
      ${this._actionModalOpen ? this._renderActionModal() : nothing}
    `;
  }
}
window.customElements.define("my-element", MyElement);