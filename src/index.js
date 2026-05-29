import { LitElement, css, html } from 'lit'
import "./components/type-icon/type-icon";
import "./components/type-text/type-text";
import "./compositions/info-card/info-card";
import "./compositions/type-input/type-input";

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
      <info-card
        message="Tus transferencias estan protegias con encriptacion de extremo a extremo"
        icon="info"
      ></info-card>
    `
  }
}
window.customElements.define('my-element', MyElement)
