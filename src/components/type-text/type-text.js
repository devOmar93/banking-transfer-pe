import { html, LitElement } from "lit";
import { styles } from "./type-text.css.js";
import { unsafeStatic, html as staticHtml } from "lit/static-html.js";
import { TYPOGRAPHY_CONFIG } from "../../constants/constants.js";

export class TypeText extends LitElement {
  static properties = {
    tag: { type: String },
    text: { type: String },
    size: { type: String },
    align: { type: String },
    weight: { type: String },
  };

  constructor() {
    super();
    this.text = "";
    this.tag = TYPOGRAPHY_CONFIG.tag.default;
    this.size = TYPOGRAPHY_CONFIG.size.default;
    this.align = TYPOGRAPHY_CONFIG.align.default;
    this.weight = TYPOGRAPHY_CONFIG.weight.default;
  }
  
  static styles = styles;

  
  _validate(value, config) {
    return config.allowed.includes(value) ? value : config.default;
  }

  _renderContent() { 
    const safeTag = this._validate(this.tag, TYPOGRAPHY_CONFIG.tag);
    const tag = unsafeStatic(safeTag);

    const size = this._validate(this.size, TYPOGRAPHY_CONFIG.size);
    const align = this._validate(this.align, TYPOGRAPHY_CONFIG.align);
    const weight = this._validate(this.weight, TYPOGRAPHY_CONFIG.weight);

    const className = [
      `size-${size}`,
      `align-${align}`,
      `weight-${weight}`
    ].join(" ");

    return staticHtml`
      <${tag}
        class=${className}
      >
        ${this.text}
      </${tag}>
    `;
  }

  render() {
    return html`${this._renderContent()}`;
  }
}

customElements.define("type-text", TypeText);