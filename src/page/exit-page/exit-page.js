import { LitElement, html } from 'lit';
import "@/compositions/type-modal/type-modal.js";
import "@/compositions/type-header/type-header.js";
import { styles } from "./exit-page.css.js";

class ExitPage extends LitElement {
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
        class="modal-page-primary"
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

customElements.define('exit-page', ExitPage);