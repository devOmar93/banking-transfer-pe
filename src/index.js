import { LitElement, css, html, nothing } from 'lit'
import "./components/type-icon/type-icon.js";
import "./components/type-text/type-text";
import "./compositions/info-card/info-card";
import "./compositions/type-input/type-input";
import './compositions/type-header/type-header.js'
import "./page/new-transfer-page/new-transfer-page.js";
import "./page/accounts-page/AccountsPage.js";

export class MyElement extends LitElement {
  static properties = {
    step : {
      type: Number
    },

    accountCustomer : {
      type: Object
    }
  }

  constructor() {
    super();
    this.step = 0;
    this.accountCustomer = {};
  }

  getAccountCustomer(event) {
    this.accountCustomer = event.detail;
    this.step = 1;
    console.log('accountCustomer', this.accountCustomer);
  }

  _renderAcountsPage() {
    return html`<accounts-page @account=${this.getAccountCustomer}></accounts-page>`
  }

  _renderNewTransferPage() {
    return html`<new-transfer-page .accountCustomer=${this.accountCustomer}></new-transfer-page>`
  }

  _renderStep(page) {
    const steps = {
      0: this._renderAcountsPage(),
      1: this._renderNewTransferPage()
    }
    return steps[page] ?? nothing;
  }

  render() {
    return html`
    ${this._renderStep(this.step)}
    `
  }
}
window.customElements.define('my-element', MyElement)
