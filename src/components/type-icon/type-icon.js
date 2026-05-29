import {
  ICON_CONFIG,
  ICON_SIZES,
  ICON_VARIANTS,
} from "../../constants/type-icon/constants";
import ICONS from "../../utils/icons";
import { html, LitElement, nothing } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import styles from "./type-icon.css";

export class TypeIcon extends LitElement {
  static properties = {
    /**
     * Icon name
     * @type { String }
     * @default "check-circle"
     */
    iconName: { type: String, attribute: "icon-name" },

    /**
     * Controls colors and background styles (default, ghost, etc)
     * @type { String }
     * @default "default"
     */
    variant: { type: String, reflect: true },

    /**
     * Controls size (s, m, l, xl)
     * @type { String }
     * @default "m"
     */
    size: { type: String, reflect: true },

    /**
     * Accessible label for screen readers.
     * When provided, the icon is treated as informative.
     * @type { String | null }
     */
    ariaLabel: { type: String, attribute: "aria-label" },
  };

  constructor() {
    super();
    this.iconName = ICON_CONFIG.iconName.default;
    this.variant = ICON_CONFIG.variant.default;
    this.size = ICON_CONFIG.size.default;
    this.ariaLabel = null;
  }

  get svg() {
    const key = `../assets/icons/${this.iconName}.svg`;
    return ICONS[key] ?? ICONS["check-circle"];
  }

  willUpdate(changedProps) {
    if (changedProps.has("size") && !ICON_SIZES.includes(this.size)) {
      this.size = ICON_CONFIG.size.default;
    }

    if (changedProps.has("variant") && !ICON_VARIANTS.includes(this.variant)) {
      this.variant = ICON_CONFIG.variant.default;
    }
  }

  get hasAccessibleLabel() {
    return (
      typeof this.ariaLabel === "string" && this.ariaLabel.trim().length > 0
    );
  }

  get ariaRole() {
    return this.hasAccessibleLabel ? "img" : nothing;
  }

  get accessibleLabel() {
    return this.hasAccessibleLabel ? this.ariaLabel : nothing;
  }

  get ariaHidden() {
    return this.hasAccessibleLabel ? "false" : "true";
  }

  static styles = styles;

  render() {
    return html`
      <div
        focusable="false"
        class="container-icon"
        .role=${this.ariaRole}
        aria-label=${this.accessibleLabel}
        aria-hidden=${this.ariaHidden}
      >
        ${unsafeSVG(this.svg)}
      </div>
    `;
  }
}

customElements.define("type-icon", TypeIcon);
