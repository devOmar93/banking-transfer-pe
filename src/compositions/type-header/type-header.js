import { LitElement, html } from "lit";
import { styles } from "./type-header.css.js";
import "../../components/type-text/type-text.js";

export class TypeHeader extends LitElement {
  static properties = {
    title: { type: String },
    subtitle: { type: String },
    align: { type: String },
  };

  constructor() {
    super();
    this.title = "";
    this.subtitle = "";
    this.align = "left";
  }

  static styles = styles;

  _renderContent() {
    return html`
      <div class="header">
        <type-text
          tag="h1"
          size="l"
          weight="bold"
          text="${this.title}"
          align="${this.align}"
        ></type-text>

        <type-text
          tag="p"
          size="m"
          weight="regular"
          align="${this.align}"
          text="${this.subtitle}"
          class="subtitle"
        ></type-text>
      </div>
    `;
  }

  render() {
    return html`${this._renderContent()}`;
  }
}

customElements.define("type-header", TypeHeader);
