import { html, LitElement } from "lit";
import { styles } from "./type-tag.css.js";
import "@/components/type-text/type-text.js";
import "@/components/type-icon/type-icon.js";

export class TypeTag extends LitElement {
  static properties = {
    text: { type: String },
  };

  constructor() {
    super();
    this.text = "";
  }

  static styles = styles;

  render() {
    return html`
      <div class="tag">
        <type-icon
          icon-name="bullet-point"
          variant="secondary"
          size="m"
        ></type-icon>
        <type-text .text=${this.text} .weight=${"semibold"}></type-text>
      </div>
    `;
  }
}

customElements.define("type-tag", TypeTag);
