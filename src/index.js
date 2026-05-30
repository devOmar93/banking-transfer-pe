import { LitElement, css, html } from 'lit'
import "./components/type-icon/type-icon";
import "./components/type-text/type-text";
import "./compositions/info-card/info-card";
import "./compositions/type-input/type-input";
import './compositions/type-header/type-header.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      /**
       * The number of times the button has been clicked.
       */
    }
  }
  constructor() {
    super()
  }

  render() {
    return html`
      <p>banking-transfer-pe</p>
    `
  }
}
window.customElements.define('my-element', MyElement)
