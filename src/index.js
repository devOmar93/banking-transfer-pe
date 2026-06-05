import { LitElement, css, html } from "lit";
import { validateAllowedProp } from "./utils/utils.js";
import locales from "@locales/locales.json";
import "@DM/entelgy-global-transfers-api-dm/entelgy-global-transfers-api-dm.js";
import "@pages/successful-transfer-page/successful-transfer-page.js";

const ALLOWED_LANGUAGES = ["es_LA"];

export class MyElement extends LitElement {
  static properties = {
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

  async firstUpdated() {
    const dataManager = this.shadowRoot.getElementById("successfulTransferDm");
    if (dataManager) {
      await dataManager.executeTransfer();
    }
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("lang")) {
      validateAllowedProp("lang", this.lang, ALLOWED_LANGUAGES);
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
  }

  _handleError(event) {
    console.error("Error cargando los datos de la transferencia", event);
    this.isDataReady = true;
  }

  get locale() {
    return locales[this.lang];
  }

  render() {
    return html`
      <p>banking-transfer-pe</p>
    `;
  }
}
window.customElements.define("my-element", MyElement);
