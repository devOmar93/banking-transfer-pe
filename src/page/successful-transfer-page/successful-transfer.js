import { LitElement, html } from "lit";
import styles from "./successful-transfer.css.js";
import "../../compositions/type-modal/type-modal.js";
import "../../compositions/info-card/info-card.js";
import "../../compositions/type-header/type-header.js";
import "../../compositions/info-field/info-field.js";
import "../../compositions/type-button/type-button.js";
``;
export class SuccessfulTransfer extends LitElement {
  static properties = {
    data: { type: Object },
  };
  constructor() {
    super();
    this.data = {};
  }
  static get styles() {
    return styles;
  }
  render() {
    return html`
      <type-modal .open=${true} .hasFooter=${true}>
        <div slot="header" class="header">
          <type-icon name="success" size="xl"></type-icon>
          <div class="title">Transferencia exitosa</div>
          <div class="subtitle">
            Tu dinero ha sido transferido correctamente.
          </div>
        </div>
        <div slot="body">
          <info-card variant="gradient"> </info-card>
        </div>
        <div slot="footer">
          <div class="actions">
            <type-button
              icon-name="download"
              icon-position="left"
              text=${"Descargar"}
              variant="secondary"
            ></type-button>
            <type-button
              icon-name="share-2"
              icon-position="left"
              text=${"Compartir"}
              variant="secondary"
            ></type-button>
          </div>
          <type-button
            icon-name="house"
            icon-position="left"
            text=${"Nueva transferencia"}
            variant="primary"
          ></type-button>
          <info-card>
            <div slot="value" class="note-box">
              <type-text
                .text=${"Guarde este comprobante para sus registros. El dinero será reflejado en la cuenta del beneficiario en un plazo de 24 horas."}
                tag="p"
              ></type-text>
            </div>
          </info-card>
        </div>
      </type-modal>
    `;
  }
}
customElements.define("successful-transfer", SuccessfulTransfer);
