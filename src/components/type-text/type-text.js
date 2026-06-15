import { html, LitElement } from "lit";
import { styles } from "./type-text.css.js";
import { unsafeStatic, html as staticHtml } from "lit/static-html.js";
import { TYPOGRAPHY_CONFIG, validateText} from "./utils/type-text.utils.js";

export class TypeText extends LitElement {
  static properties = {
    /**
     * HTML tag to render
     * @type { String }
     * @default ""
     */
    tag: { type: String },

    /**
     * Text content to display inside the component
     * @type { String }
     * @default ""
     */
    text: { type: String },

    /**
     * Typography size (s, m, l, xl)
     * @type { String }
     * @default ""
     */
    size: { type: String },

    /**
     * Horizontal alignment (left, center, right)
     * @type { String }
     * @default ""
     */
    align: { type: String },

    /**
     * Font weight (light, regular, semibold, bold)
     * @type { String }
     * @default ""
     */
    weight: { type: String },
  };

  constructor() {
    super();
    this.text = "";
    this.tag = "";
    this.size = "";
    this.align = "";
    this.weight = "";
  }
  
  static styles = styles;

  willUpdate(changedProps) {
    for (const prop of changedProps.keys()) {
      const config = TYPOGRAPHY_CONFIG[prop];
      if (!config) continue;

      const validValue = validateText(this[prop], config);

      if (this[prop] !== validValue) {
        this[prop] = validValue;
      }
    }
  }

  _renderContent() { 
    const tag = unsafeStatic(this.tag);
    
    const className = [
      `size-${this.size}`,
      `align-${this.align}`,
      `weight-${this.weight}`
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