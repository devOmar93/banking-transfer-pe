import { html, LitElement } from "lit";
import { styles } from "./confirm-transfer-page.css.js";
import "@compositions/type-modal/type-modal.js";
import "@compositions/type-header/type-header.js";
import "@compositions/type-button/type-button.js";
import "@compositions/transfer-summary/transfer-summary.js";
 
export class ConfirmTransferPage extends LitElement {
  static properties = {
    transferData: { type: Object },
    open: { type: Boolean, reflect: true },
    loading: { type: Boolean, reflect: true },
  };
 
  constructor() {
    super();
    this.transferData = null;
    this.open = false;
    this.loading = false;
  }
 
  static styles = styles;
 
  _handleAccept() {
    if (this.loading) return;
    this.dispatchEvent(new CustomEvent("confirm-accept", {
      detail: { transferData: this.transferData },
      bubbles: true,
      composed: true,
    }));
  }
 
  _handleCancel() {
    if (this.loading) return;
    this.dispatchEvent(new CustomEvent("confirm-cancel", {
      bubbles: true,
      composed: true,
    }));
  }
 
  render() {
    return html`
      <type-modal
        variant="page"
        ?open=${this.open}
        ?scrollable=${true}
        ?full-height=${true}
        ?has-footer=${true}
      >
        <div slot="header" class="confirm-transfer-page__header">
          <type-button
            class="confirm-transfer-page__back-btn"
            type="button"
            text="Volver"
            variant="secondary"
            icon-name="arrow-left"
            icon-position="left"
            ?disabled=${this.loading}
            @click=${this._handleCancel}
          ></type-button>
          <type-header
            .title=${"Confirmar transferencia"}
          ></type-header>
        </div>
 
        <div slot="body">
          <transfer-summary
            .transferData=${this.transferData}
            amount-label="Monto a transferir"
          ></transfer-summary>
        </div>
 
        <div slot="footer" class="confirm-transfer-page__footer">
          <type-button
            type="button"
            text="Transferir"
            icon-position="right"
            variant="default"
            ?disabled=${this.loading}
            @click=${this._handleAccept}
          ></type-button>
        </div>
      </type-modal>
    `;
  }
}
 
customElements.define("confirm-transfer-page", ConfirmTransferPage);