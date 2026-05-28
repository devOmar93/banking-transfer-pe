import { LitElement, css, html } from 'lit'
import './compositions/type-header.js'

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

   <type-header
  title="Transferencias"
  subtitle="Selecciona una cuenta para comenzar"
  align="right"
></type-header>
 <type-header
  title="REALIZO TRANFERENCIA EXITOSA"
  subtitle="felicidades, tu transferencia se ha realizado con éxito"
  align="center"
></type-header>

    `
  }
}

window.customElements.define('my-element', MyElement)
