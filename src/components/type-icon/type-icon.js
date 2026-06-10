import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { html, LitElement, nothing } from "lit";
import { validateAllowedProp } from "@utils/utils.js";
import { validateRequiredProp } from "@utils/utils";
import { ICONS, ICONS_RUTE } from "./utils/icons.js";
import styles from "./type-icon.css";

const ALLOWED_VARIANTS = ["default", "secondary"];
const ALLOWED_SIZES = ["xs", "s", "m", "l", "xl"];

export class TypeIcon extends LitElement {
  static properties = {
    /**
     * Icon name
     * @type { String }
     * @default ""
     */
    iconName: { type: String, attribute: "icon-name" },

    /**
     * Controls colors and background styles
     * @type { String }
     * @default ""
     */
    variant: { type: String, reflect: true },

    /**
     * Controls size
     * @type { String }
     * @default ""
     */
    size: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.iconName = "";
    this.variant = "";
    this.size = "";
  }

  get svg() {
    const key = `${ICONS_RUTE}/${this.iconName}.svg`;
    return ICONS[key] || null;
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("iconName")) {
      validateRequiredProp("iconName", this.iconName);
    }

    if (changedProperties.has("variant")) {
      validateAllowedProp("variant", this.variant, ALLOWED_VARIANTS);
    }

    if (changedProperties.has("size")) {
      validateAllowedProp("size", this.size, ALLOWED_SIZES);
    }

    if (changedProperties.has("iconName") && this.iconName) {
      if (!this.svg) {
        throw new Error(`No se encontró el ícono: ${this.iconName}`);
      }
    }
  }

  static styles = styles;

  render() {
    return html`
      <div class="container-icon" aria-hidden="true">
        ${unsafeSVG(this.svg)}
      </div>
    `;
  }
}

customElements.define("type-icon", TypeIcon);
