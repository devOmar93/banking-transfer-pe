import { LitElement, html, css } from 'lit';
import { styles } from "./exit-page.css.js";
import { fireEvent } from "@utils/utils.js";
import "@compositions/type-modal/type-modal.js";
import "@compositions/type-header/type-header.js";
import "@compositions/type-button/type-button.js";

class TransferExitPage extends LitElement {
  static properties = {
    locale: { type: String }
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
          title= ${this.locale["exit-page-title"]}
          subtitle=${this.locale["exit-page-subtitle"]}
        ></type-header>
      </type-modal>
    `;
  }
}

customElements.define('transfer-exit-page', TransferExitPage);