import { LitElement, css, html } from "lit";
import "./components/type-icon/type-icon";
import "./components/type-text/type-text";
import "./compositions/info-card/info-card";
import "./compositions/type-input/type-input";
import "./compositions/type-header/type-header.js";
import "./page/accounts-page/compositions/account-card/account-card.js";
import "./compositions/type-header/type-header";
import "./page/successful-transfer-page/successful-transfer.js";
import { SuccessfulTransferMock } from "../src/mocks/successful-transfer.mock.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
      /**
       */
    };
  }
  constructor() {
    super();
    this.data = SuccessfulTransferMock();
  }
  render() {
    return html`
      <p>banking-transfer-pe</p>
      <successful-transfer .data=${this.data}></successful-transfer>
      
    `;
  }
}
window.customElements.define("my-element", MyElement);
