import { LitElement, html } from "lit";
import "@/compositions/type-modal/type-modal.js";
import "@/compositions/type-header/type-header.js";
import { styles } from "./exit-page.css.js";

class ExitPage extends LitElement {
  static properties = {
    /**
     * Localization string for the page, used to display text in different languages based on user preference
     * @type {Object}
     * @default {}
     */
    locale: { type: String },
  };

  constructor() {
    super();
    this.locale = {};
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
        aria-label=${this.locale["exit-page-modal-aria"]}
      >
        <type-header
          slot="header"
          title=${this.locale["exit-page-title"]}
          subtitle=${this.locale["exit-page-subtitle"]}
        ></type-header>
      </type-modal>
    `;
  }
}

customElements.define("exit-page", ExitPage);
