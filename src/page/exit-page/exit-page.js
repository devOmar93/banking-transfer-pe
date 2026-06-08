import { LitElement, html, css } from 'lit';
import { styles } from "./exit-page.css.js";
import { fireEvent } from "@utils/utils.js";
import "@compositions/type-modal/type-modal.js";
import "@compositions/type-header/type-header.js";
import "@compositions/type-button/type-button.js";

class TransferExitPage extends LitElement {

  handleTransferClick() {
    fireEvent(this, 'start-transfer');
  }

  static styles = styles;

  render() {
    return html`
      <type-modal
        ?open=${true}
        ?scrollable=${true}
        ?full-height=${true}
        ?has-footer=${true}
        class="modal-exit"
      >
        <type-header
          slot="header"
          title="¡Hasta luego!"
          subtitle="Has salido de la aplicación de transferencias">
        </type-header>
        <type-button 
          slot="body"
          text="Realizar otra transferencia"
          @click=${this.handleTransferClick}
          variant="default"
          type="button"
          icon-name="house"
          icon-position="left"
          aria-label="Realizar otra transferencia"
        ></type-button>
      </type-modal>
    `;
  }
}

customElements.define('transfer-exit-page', TransferExitPage);