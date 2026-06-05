import { LitElement, html } from "lit";
import styles from "./successful-transfer.css.js";
import "../../compositions/type-modal/type-modal.js";
import "../../compositions/info-card/info-card.js";
import "../../compositions/type-header/type-header.js";
import "../../compositions/info-field/info-field.js";
import "../../compositions/type-button/type-button.js";
import { generateTransferPDF } from "../../page/successful-transfer-page/services/generate-pdf.js";
export class SuccessfulTransfer extends LitElement {
  static properties = {
    data: { type: Object },
    showShareModal: {
      type: Boolean,
    },
  };
  constructor() {
    super();
    this.data = {};
    this.showShareModal = false;
  }
  static get styles() {
    return styles;
  }

  _handleDownload() {
    generateTransferPDF(this.data);
  }

  _handleShare() {
    this.showShareModal = true;
    this.updateComplete.then(() => {
      const dialog = this.renderRoot.querySelector("#shareDialog");
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    });
  }
  
  _closeShareModal() {
    const dialog = this.renderRoot.querySelector("#shareDialog");
    if (dialog && dialog.open) {
      dialog.close();
    }
    this.showShareModal = false;
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
          <info-card></info-card>
        </div>
        <div slot="footer">
          <div class="actions">
            <type-button
              icon-name="download"
              icon-position="left"
              text=${"Descargar"}
              variant="secondary"
              @click=${this._handleDownload}
            ></type-button>
            <type-button
              icon-name="share-2"
              icon-position="left"
              text=${"Compartir"}
              variant="secondary"
              @click=${this._handleShare}
            ></type-button>
          </div>
          <type-button
            icon-name="house"
            icon-position="left"
            text=${"Nueva transferencia"}
            variant="primary"
          ></type-button>
          <div slot="value" class="note-box">
            <type-text .text=${this.data?.message}></type-text>
          </div>
        </div>
      </type-modal>
      ${this.showShareModal
        ? html`
            <dialog class="alert-dialog" id="shareDialog">
              <div class="alert-header">Comprobante compartido</div>
              <div class="alert-body">Comprobante compartido exitosamente</div>
              <div class="alert-footer">
                <type-button
                  .text=${"Aceptar"}
                  @click=${this._closeShareModal}
                ></type-button>
              </div>
            </dialog>
          `
        : null}
    `;
  }
}
customElements.define("successful-transfer", SuccessfulTransfer);
