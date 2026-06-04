import { LitElement, css, html } from "lit";
import "./components/type-icon/type-icon";
import "./components/type-text/type-text";
import "./compositions/info-card/info-card";
import "./compositions/type-input/type-input";
import "./compositions/type-header/type-header";
import "./page/successful-transfer-page/successful-transfer.js";

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
    this.data = {
      amount: "$1,234.00",
      transaction: "TRF177932287994",
      date: "20 de mayo de 2026",
      time: "07:38 p.m.",
      account: "Cuenta de Ahorros ****5678",
      beneficiary: "Juan Pérez",
      concept: "Pago servicios",
    };
  }
  render() {
    return html`
      <p>banking-transfer-pe</p>
      <successful-transfer .data=${this.data}></successful-transfer>
    `;
  }
}
window.customElements.define("my-element", MyElement);
