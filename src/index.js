import { LitElement, css, html } from 'lit'

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
