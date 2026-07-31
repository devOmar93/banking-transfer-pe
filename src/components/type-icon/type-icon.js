import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { until } from "lit/directives/until.js";
import { html, LitElement } from "lit";
import { validateAllowedProp, validateRequiredProp } from "@/utils/utils.js";
import { ICONS } from "./utils/icons.js";
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
    variant: { type: String },

    /**
     * Controls size
     * @type { String }
     * @default ""
     */
    size: { type: String },
  };

  constructor() {
    super();
    this.iconName = "";
    this.variant = "";
    this.size = "";
  }

async loadSvg() {
    if (!this.iconName) return "";
    const iconLoader = ICONS[this.iconName];

    if (!iconLoader) {
      console.warn(`No se encontró el ícono: ${this.iconName}`);
      return "";
    }

    try {
      const svgText = await iconLoader();
      return svgText; 
    } catch (error) {
      console.error(`Error cargando el icono ${this.iconName}:`, error);
      return "";
    }
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

  }

  static styles = styles;

  render() {
    const svgPromise = this.loadSvg().then((svgString) => unsafeSVG(svgString));

    return html`
      <div class="container-icon" aria-hidden="true">
        ${until(svgPromise, html``)}
      </div>
    `;
  }
}

customElements.define("type-icon", TypeIcon);
